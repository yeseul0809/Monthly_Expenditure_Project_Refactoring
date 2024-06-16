import { create } from "zustand";

const useIndexStore = create((set) => ({
  activeIndex: "",
  setActiveIndex: (index) => set((state) => ({ activeIndex: index })),
}));

export default useIndexStore;
