import create from "zustand";

const useStatusStore = create(set => ({
  status: null,
  setStatus: status => set({ status }),
  resetStatus: () => set({ status: null }),
}));

export default useStatusStore;
