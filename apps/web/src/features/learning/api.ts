import apiClient from "@/lib/api-client";
import type { Course, Lesson, PaginatedResponse } from "@/types";

export const learningApi = {
  getCourses: async (params?: {
    page?: number;
    difficulty?: string;
    search?: string;
  }): Promise<PaginatedResponse<Course>> => {
    const { data } = await apiClient.get<PaginatedResponse<Course>>("/learning/courses", {
      params,
    });
    return data;
  },

  getCourse: async (courseId: string): Promise<Course> => {
    const { data } = await apiClient.get<Course>(`/learning/courses/${courseId}`);
    return data;
  },

  getLessons: async (courseId: string): Promise<Lesson[]> => {
    const { data } = await apiClient.get<Lesson[]>(
      `/learning/courses/${courseId}/lessons`
    );
    return data;
  },

  completeLesson: async (lessonId: string): Promise<{ xp_awarded: number }> => {
    const { data } = await apiClient.post<{ xp_awarded: number }>(
      `/learning/lessons/${lessonId}/complete`
    );
    return data;
  },

  enroll: async (courseId: string): Promise<void> => {
    await apiClient.post(`/learning/courses/${courseId}/enroll`);
  },
};
