import { create } from "zustand";

/**
 * Zustand 스토어 예시
 * 전역 상태 관리 예시
 */
interface ExampleState {
  count: number;
  name: string;
  increment: () => void;
  decrement: () => void;
  setName: (name: string) => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  name: "Guest",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (name) => set({ name }),
  reset: () => set({ count: 0, name: "Guest" }),
}));
