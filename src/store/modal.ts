import { create } from 'zustand';

type Store = {
  show: boolean;
  toggleModal: () => void;
};

const useModalStore = create<Store>()((set) => ({
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export default useModalStore;
