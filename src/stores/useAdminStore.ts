import { create } from 'zustand';
import { Transaction, WithdrawalRequest } from '../types';

interface AdminState {
  walletBalance: number;
  transactions: Transaction[];
  withdrawalRequests: WithdrawalRequest[];
  isLoadingWallet: boolean;
  
  setWalletBalance: (balance: number) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  setWithdrawalRequests: (requests: WithdrawalRequest[]) => void;
  setLoadingWallet: (loading: boolean) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  walletBalance: 0,
  transactions: [],
  withdrawalRequests: [],
  isLoadingWallet: false,
  
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  
  setTransactions: (transactions) => set({ transactions }),
  
  addTransaction: (transaction) => set({
    transactions: [transaction, ...get().transactions],
  }),
  
  setWithdrawalRequests: (requests) => set({ withdrawalRequests: requests }),
  
  setLoadingWallet: (loading) => set({ isLoadingWallet: loading }),
}));