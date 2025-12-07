import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEditorStore = create(
  persist(
    (set, get) => ({
      designData: null,
      selectedFrame: null,
      setDesignData: (data) => set({ designData: data }),
      setSelectedFrame: (frame) => set({ selectedFrame: frame }),
      clearDesign: () => set({ designData: null, selectedFrame: null })
    }),
    { name: 'omgs-editor' }
  )
);
