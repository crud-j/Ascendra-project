import apiClient from "@/lib/api-client";
import type { User, TokenResponse } from "@/types";

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  display_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<User> => {
    const { data } = await apiClient.post<User>("/auth/register", payload);
    return data;
  },

  login: async (payload: LoginPayload): Promise<TokenResponse> => {
    const { data } = await apiClient.post<TokenResponse>("/auth/login", payload);
    // Persist tokens
    if (typeof window !== "undefined") {
      localStorage.setItem("ascendra_access_token", data.access_token);
      localStorage.setItem("ascendra_refresh_token", data.refresh_token);
    }
    return data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("ascendra_refresh_token");
    if (refreshToken) {
      await apiClient.post("/auth/logout", { refresh_token: refreshToken });
    }
    localStorage.removeItem("ascendra_access_token");
    localStorage.removeItem("ascendra_refresh_token");
  },

  me: async (): Promise<User> => {
    const { data } = await apiClient.get<User>("/auth/me");
    return data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    await apiClient.post("/auth/forgot-password", payload);
  },
};
