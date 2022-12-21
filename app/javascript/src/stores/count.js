import create from "zustand";

const useCountStore = create(set => ({
  count: 0,
  setCount: count => set({ count }),
}));

export default useCountStore;
