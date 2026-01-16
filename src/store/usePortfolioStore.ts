import { create } from "zustand";
import { Project, ToastState } from "@/lib/types";

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

interface PortfolioState {
    activeView: string;
    isDarkMode: boolean;
    searchQuery: string;
    selectedProject: Project | null;
    isHireModalOpen: boolean;
    toast: ToastState;

    setActiveView: (view: string) => void;
    toggleTheme: () => void;
    setSearchQuery: (query: string) => void;
    setSelectedProject: (project: Project | null) => void;
    setHireModalOpen: (isOpen: boolean) => void;
    showToast: (message: string, type?: ToastState['type']) => void;
    hideToast: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    activeView: 'overview',
    isDarkMode: true,
    searchQuery: '',
    selectedProject: null,
    isHireModalOpen: false,
    toast: { show: false, message: '', type: 'success' },

    setActiveView: (view) => set({ activeView: view }),
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedProject: (project) => set({ selectedProject: project }),
    setHireModalOpen: (isOpen) => set({ isHireModalOpen: isOpen }),
    showToast: (message, type = 'success') => {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
        set({ toast: { show: true, message, type } });
        toastTimeout = setTimeout(() => {
            set((state) => ({ toast: { ...state.toast, show: false } }));
            toastTimeout = null;
        }, 3000);
    },
    hideToast: () => {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }
        set((state) => ({ toast: { ...state.toast, show: false } }));
    },
}));
