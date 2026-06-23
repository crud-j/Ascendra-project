/**
 * Zustand UI store — pure UI state only.
 *
 * RULE: Never copy server state into Zustand. Server state (user balances,
 * reputation, course data, etc.) belongs in React Query. Zustand is only
 * for ephemeral UI state that is not fetched from the server: sidebar
 * open/closed, active modal, theme preference, etc.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Active modal (name-based — avoids prop-drilling)
  activeModal: string | null;
  openModal: (name: string) => void;
  closeModal: () => void;

  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;

  // Notification panel
  notificationPanelOpen: boolean;
  setNotificationPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      activeModal: null,
      openModal: (name) => set({ activeModal: name }),
      closeModal: () => set({ activeModal: null }),

      theme: "system",
      setTheme: (theme) => set({ theme }),

      notificationPanelOpen: false,
      setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),
    }),
    {
      name: "ascendra-ui",
      // Only persist theme preference — everything else resets on load
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
