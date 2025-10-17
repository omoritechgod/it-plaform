import { create } from "zustand";

interface ApplyStore {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string[];
  agreement_accepted: boolean;
}
interface ApplyActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setSkills: (skills: string[]) => void;
  setAgreementAccepted: (accepted: boolean) => void;
  reset: () => void;
}

export const useApplyStore = create<ApplyStore & ApplyActions>((set) => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  skills: [],
  agreement_accepted: false,

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setSkills: (skills) => set({ skills }),
  setAgreementAccepted: (accepted) => set({ agreement_accepted: accepted }),

  reset: () => set({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: [],
    agreement_accepted: false,
  }),
}));
