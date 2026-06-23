import apiClient from "@/lib/api-client";
import type { Question, Answer, PaginatedResponse } from "@/types";

export const communityApi = {
  getQuestions: async (params?: {
    page?: number;
    tag?: string;
    search?: string;
  }): Promise<PaginatedResponse<Question>> => {
    const { data } = await apiClient.get("/community/questions", { params });
    return data;
  },

  getQuestion: async (questionId: string): Promise<Question> => {
    const { data } = await apiClient.get(`/community/questions/${questionId}`);
    return data;
  },

  getAnswers: async (questionId: string): Promise<Answer[]> => {
    const { data } = await apiClient.get(
      `/community/questions/${questionId}/answers`
    );
    return data;
  },

  askQuestion: async (payload: {
    title: string;
    body: string;
    tags: string[];
  }): Promise<Question> => {
    const { data } = await apiClient.post("/community/questions", payload);
    return data;
  },

  postAnswer: async (questionId: string, body: string): Promise<Answer> => {
    const { data } = await apiClient.post(
      `/community/questions/${questionId}/answers`,
      { body }
    );
    return data;
  },

  acceptAnswer: async (answerId: string): Promise<void> => {
    await apiClient.post(`/community/answers/${answerId}/accept`);
  },
};
