import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, Ban as Bank, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  bank_account: {
    account_name: string;
    account_number: string;
    bank_name: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  admin_notes?: string;
}

export const Wallet: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock data
  const walletBalance = 125000; // ₦125,000
  const hasBankAccount = true;
  
  const bankAccount = {
    account_name: 'John Doe',
    account_number: '1234567890',
    bank_name: 'First Bank Nigeria',
    bank_code: '011',
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 50000,
      description: 'Monthly stipend payment',
      status: 'completed',
      created_at: '2025-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'credit',
      amount: 25000,
      description: 'Project completion bonus',
      status: 'completed',
      created_at: '2025-01-10T14:20:00Z',
    },
    {
      id: '3',
      type: 'credit',
      amount: 75000,
      description: 'Skill test performance reward',
      status: 'completed',
      created_at: '2025-01-05T09:15:00Z',
    },
    {
      id: '4',
      type: 'debit',
      amount: 25000,
      description: 'Withdrawal to bank account',
      status: 'completed',
      created_at: '2025-01-03T16:45:00Z',
    },
  ];

  const withdrawalRequests: WithdrawalRequest[] = [
    {
      id: '1',
      amount: 30000,
      bank_account: bankAccount,
      status: 'pending',
      created_at: '2025-01-16T12:00:00Z',
    },
    {
      id: '2',
      amount: 25000,
      bank_account: bankAccount,
      status: 'completed',
      created_at: '2025-01-03T16:45:00Z',
    },
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > walletBalance) return;

    // Add withdrawal request logic here
    console.log('Withdrawal request:', { amount, bankAccount });
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const WithdrawModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Withdraw Funds</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">Available Balance</p>
            <p className="text-2xl font-bold text-blue-900">₦{walletBalance.toLocaleString()}</p>
          </div>
          
          <Input
            label="Withdrawal Amount (₦)"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount to withdraw"
            max={walletBalance}
          />

          {hasBankAccount && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Withdrawal to:</p>
              <p className="font-medium text-gray-900">{bankAccount.account_name}</p>
              <p className="text-sm text-gray-600">{bankAccount.bank_name}</p>
              <p className="text-sm text-gray-600">{bankAccount.account_number}</p>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              Withdrawal requests are processed within 1-3 business days. You'll receive an email confirmation once processed.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleWithdraw}
              className="flex-1"
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > walletBalance}
            >
              Request Withdrawal
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowWithdrawModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const BankAccountModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Connect Bank Account</h3>
        <form className="space-y-4">
          <Input label="Account Name" placeholder="Enter account name" />
          <Input label="Account Number" placeholder="Enter account number" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select your bank</option>
              <option value="011">First Bank Nigeria</option>
              <option value="044">Access Bank</option>
              <option value="057">Zenith Bank</option>
              <option value="058">GTBank</option>
              <option value="070">Fidelity Bank</option>
            </select>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              Your bank account information is encrypted and secure. We use Paystack for secure bank verification.
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Connect Account</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowBankModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your earnings and withdrawals</p>
        </div>
        <div className="flex space-x-3">
          {!hasBankAccount && (
            <Button variant="outline" onClick={() => setShowBankModal(true)}>
              <Bank className="w-4 h-4 mr-2" />
              Connect Bank
            </Button>
          )}
          <Button 
            onClick={() => setShowWithdrawModal(true)}
            disabled={!hasBankAccount || walletBalance <= 0}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Wallet Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-[#0f266c] to-[#007bff] text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-blue-100 text-sm">Wallet Balance</p>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-100 hover:text-white"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-4xl font-bold mb-4">
                {showBalance ? `₦${walletBalance.toLocaleString()}` : '₦••••••'}
              </p>
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <ArrowDownLeft className="w-4 h-4 mr-1" />
                  <span>Total Earned: ₦{transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <DollarSign className="w-16 h-16 text-white opacity-20" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₦75,000</p>
              <p className="text-sm text-green-600">+50% from last month</p>
            </div>
            <ArrowDownLeft className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Withdrawals</p>
              <p className="text-2xl font-bold text-gray-900">
                {withdrawalRequests.filter(w => w.status === 'pending').length}
              </p>
              <p className="text-sm text-yellow-600">₦30,000 total</p>
            </div>
            <CreditCard className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              <p className="text-sm text-blue-600">All time</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Bank Account Info */}
      {hasBankAccount && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Connected Bank Account</h3>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bank className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{bankAccount.account_name}</p>
              <p className="text-sm text-gray-600">{bankAccount.bank_name}</p>
              <p className="text-sm text-gray-500">••••••{bankAccount.account_number.slice(-4)}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Transactions & Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transactions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                    }
                  `}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Withdrawal Requests */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Requests</h3>
          <div className="space-y-4">
            {withdrawalRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">₦{request.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{request.bank_account.bank_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                {request.admin_notes && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                    <strong>Admin Note:</strong> {request.admin_notes}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modals */}
      {showWithdrawModal && <WithdrawModal />}
      {showBankModal && <BankAccountModal />}
    </div>
  );
};