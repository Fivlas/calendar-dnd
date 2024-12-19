import { create } from "zustand";

interface ModalState {
    isOpenCreateModal: boolean;
    modalData: any; // Adjust type as necessary, could be a specific object like `EventData`
    toggleCreateModal: () => void;
    setModalData: (data: any) => void; // Function to set data
}

export const useStore = create<ModalState>((set) => ({
    isOpenCreateModal: false,
    modalData: null, // Initial modal data is null
    toggleCreateModal: () => set((state) => ({ isOpenCreateModal: !state.isOpenCreateModal })),
    //@ts-ignore
    setModalData: (data) => set((state) => ({ modalData: data })),
}));
