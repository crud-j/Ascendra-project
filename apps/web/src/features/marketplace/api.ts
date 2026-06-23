import apiClient from "@/lib/api-client";
import type { Bounty, PaginatedResponse } from "@/types";

export const marketplaceApi = {
  getBounties: async (params?: {
    page?: number;
    status?: string;
    tag?: string;
  }): Promise<PaginatedResponse<Bounty>> => {
    const { data } = await apiClient.get("/marketplace/bounties", { params });
    return data;
  },

  getBounty: async (bountyId: string): Promise<Bounty> => {
    const { data } = await apiClient.get(`/marketplace/bounties/${bountyId}`);
    return data;
  },

  postBounty: async (payload: {
    title: string;
    description: string;
    skill_coin_reward: number;
    deadline?: string;
    tags: string[];
  }): Promise<Bounty> => {
    const { data } = await apiClient.post("/marketplace/bounties", payload);
    return data;
  },

  claimBounty: async (bountyId: string): Promise<void> => {
    await apiClient.post(`/marketplace/bounties/${bountyId}/claim`);
  },

  completeBounty: async (bountyId: string): Promise<void> => {
    await apiClient.post(`/marketplace/bounties/${bountyId}/complete`);
  },
};
