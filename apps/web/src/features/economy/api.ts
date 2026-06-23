import apiClient from "@/lib/api-client";
import type { EconomySnapshot } from "@/types";

export const economyApi = {
  getSnapshot: async (userId: string): Promise<EconomySnapshot> => {
    const { data } = await apiClient.get<EconomySnapshot>(
      `/economy/users/${userId}/snapshot`
    );
    return data;
  },

  getBalance: async (userId: string): Promise<EconomySnapshot> => {
    const { data } = await apiClient.get<EconomySnapshot>(
      `/economy/users/${userId}/balance`
    );
    return data;
  },
};
