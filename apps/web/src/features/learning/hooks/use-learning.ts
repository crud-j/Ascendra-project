import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { learningApi } from "../api";

export function useCourses(params?: {
  page?: number;
  difficulty?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => learningApi.getCourses(params),
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => learningApi.getCourse(courseId),
    enabled: !!courseId,
  });
}

export function useLessons(courseId: string) {
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => learningApi.getLessons(courseId),
    enabled: !!courseId,
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => learningApi.enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => learningApi.completeLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["economy"] });
    },
  });
}
