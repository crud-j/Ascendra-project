import apiClient from "@/lib/api-client";
import type { MentorProfile, MentorSession, PaginatedResponse } from "@/types";

export const mentorApi = {
  getMentors: async (params?: {
    page?: number;
    specialization?: string;
  }): Promise<PaginatedResponse<MentorProfile>> => {
    const { data } = await apiClient.get("/mentor/mentors", { params });
    return data;
  },

  getMentor: async (userId: string): Promise<MentorProfile> => {
    const { data } = await apiClient.get(`/mentor/mentors/${userId}`);
    return data;
  },

  requestSession: async (payload: {
    mentor_id: string;
    scheduled_at: string;
    duration_minutes: number;
    topic: string;
  }): Promise<MentorSession> => {
    const { data } = await apiClient.post("/mentor/sessions", payload);
    return data;
  },

  confirmSession: async (sessionId: string): Promise<void> => {
    await apiClient.post(`/mentor/sessions/${sessionId}/confirm`);
  },

  getMySessions: async (): Promise<MentorSession[]> => {
    const { data } = await apiClient.get("/mentor/sessions/me");
    return data;
  },
};
