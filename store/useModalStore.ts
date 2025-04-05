import { create } from "zustand";

type useModalStore = {
  rowData: any;
  setRowData: (rowData: any) => void;

  isClientModalOpen: boolean;
  setIsClientModalOpen: (isClientModalOpen: boolean) => void;

  isUserModalOpen: boolean;
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;

  isRequestModalOpen: boolean;
  setIsRequestModalOpen: (isUserModalOpen: boolean) => void;

  isInvoicePoModalOpen: boolean;
  setisInvoicePoModalOpen: (isInvoicePoModalOpen: boolean) => void;

  isNoteModalOpen: boolean;
  setIsNoteModalOpen: (isNoteModalOpen: boolean) => void;

  isAssignEmployeeModalOpen: boolean;
  setisAssignEmployeeModalOpen: (isAssignEmployeeModalOpen: boolean) => void;

  isActivityIndicator: boolean;
  setisActivityIndicator: (isActivityIndicator: boolean) => void;

  UserData: any;
  setUserData: (UserData: any) => void;

  filters: { page: string | number; pageSize: string | number };
  setFilters: (filters: {
    page: string | number;
    pageSize: string | number;
  }) => void;

  isStatusModalOpen: boolean;
  setIsStatusModalOpen: (isStatusModalOpen: boolean) => void;
};

export const useModalStore = create<useModalStore>((set) => ({
  isClientModalOpen: false,
  setIsClientModalOpen: (isClientModalOpen) => set({ isClientModalOpen }),

  isUserModalOpen: false,
  setIsUserModalOpen: (isUserModalOpen) => set({ isUserModalOpen }),

  isRequestModalOpen: false,
  setIsRequestModalOpen: (isRequestModalOpen) => set({ isRequestModalOpen }),

  isNoteModalOpen: false,
  setIsNoteModalOpen: (isNoteModalOpen) => set({ isNoteModalOpen }),

  isInvoicePoModalOpen: false,
  setisInvoicePoModalOpen: (isInvoicePoModalOpen) =>
    set({ isInvoicePoModalOpen }),

  rowData: null,
  setRowData: (rowData) => set({ rowData }),

  UserData: null,
  setUserData: (UserData) => set({ UserData }),

  filters: { page: "1", pageSize: "25" },
  setFilters: (filters) => set({ filters }),

  isStatusModalOpen: false,
  setIsStatusModalOpen: (isStatusModalOpen) => set({ isStatusModalOpen }),

  isActivityIndicator: false,
  setisActivityIndicator: (isActivityIndicator) => set({ isActivityIndicator }),

  isAssignEmployeeModalOpen: false,
  setisAssignEmployeeModalOpen: (isAssignEmployeeModalOpen) =>
    set({ isAssignEmployeeModalOpen }),
}));
