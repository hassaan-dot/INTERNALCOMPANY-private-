import { useGetUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { create } from "zustand";

type UserStore = {
  UserData: any;
  setUserData: (rowData: any) => void;
  isClientModalOpen: boolean;
  setIsClientModalOpen: (isClientModalOpen: boolean) => void;
  isUserModalOpen: boolean;
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
};



export const UserStore = create<UserStore>((set) => ({
    
  isClientModalOpen: false,
  setIsClientModalOpen: (isClientModalOpen) => set({ isClientModalOpen }),
  isUserModalOpen: false,
  setIsUserModalOpen: (isUserModalOpen) => set({ isUserModalOpen }),
  UserData: null,
  setUserData: (UserData) => set({ UserData }),
//   handleFunction()
}));
