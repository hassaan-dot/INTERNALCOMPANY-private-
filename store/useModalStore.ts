import { create } from "zustand";

type useModalStore = {
  isClientModalOpen: boolean;
  setIsClientModalOpen: (isClientModalOpen: boolean) => void;
};

export const useModalStore = create<useModalStore>((set) => ({
    isClientModalOpen: false,
    setIsClientModalOpen: (isClientModalOpen) => set({isClientModalOpen})
}));
