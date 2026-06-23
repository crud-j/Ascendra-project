import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityApi } from "../api";

export function useQuestions(params?: {
  page?: number;
  tag?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["questions", params],
    queryFn: () => communityApi.getQuestions(params),
  });
}

export function useQuestion(questionId: string) {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: () => communityApi.getQuestion(questionId),
    enabled: !!questionId,
  });
}

export function useAnswers(questionId: string) {
  return useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => communityApi.getAnswers(questionId),
    enabled: !!questionId,
  });
}

export function useAcceptAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerId: string) => communityApi.acceptAnswer(answerId),
    onSuccess: () => {
      // Economy snapshot will update via the event flow:
      // answer.accepted -> Economy Core -> economy.reputation.changed + economy.skillcoin.minted
      // The frontend polls the snapshot; invalidating here triggers an immediate refresh.
      queryClient.invalidateQueries({ queryKey: ["economy"] });
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });
}
