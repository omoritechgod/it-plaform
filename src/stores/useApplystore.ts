import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApplyStore {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string[];
  agreement_accepted: boolean;
}

interface ApplyActions {
  updateManyFields: (fields: Partial<ApplyStore>) => void;
  updateField: <K extends keyof ApplyStore>(
    key: K,
    value: ApplyStore[K]
  ) => void;
  reset: () => void;
}

export const useApplyStore = create<ApplyStore & ApplyActions>()(
  persist(
    (set) => ({
      // Default state
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: [],
      agreement_accepted: false,

      // Generic updater
      updateField: (key, value) => set({ [key]: value } as Partial<ApplyStore>),

      // update many fields
      updateManyFields: (fields) => set(fields),

      // Reset to default
      reset: () =>
        set({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          skills: [],
          agreement_accepted: false,
        }),
    }),
    {
      name: "apply-storage",
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        skills: state.skills,
        agreement_accepted: state.agreement_accepted,
      }),
    }
  )
);
