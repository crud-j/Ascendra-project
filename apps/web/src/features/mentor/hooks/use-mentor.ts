import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mentorApi } from "../api";

export function useMentors(params?: { page?: number; specialization?: string }) {
  return useQuery({
    queryKey: ["mentors", params],
    queryFn: () => mentorApi.getMentors(params),
  });
}

export function useMySessions() {
  return useQuery({
    queryKey: ["mentor-sessions", "me"],
    queryFn: mentorApi.getMySessions,
  });
}

export function useConfirmSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => mentorApi.confirmSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentor-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["economy"] });
    },
  });
}
