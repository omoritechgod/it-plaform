import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Plus, ArrowUpRight, ArrowDownLeft, Filter, Search, CreditCard } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import paystackService from '../../services/paystack.service';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  recipient?: string;
}

export const Wallets: React.FC = () => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [showPayInternModal, setShowPayInternModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [selectedIntern, setSelectedIntern] = useState('');
  const [payDescription, setPayDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const walletBalance = 2450000; // ₦2,450,000
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 500000,
      description: 'Wallet funding via Paystack',
      reference: 'PAY_123456789',
      status: 'completed',
      created_at: '2025-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'debit',
      amount: 50000,
      description: 'Stipend payment to John Doe',
      reference: 'STI_987654321',
      status: 'completed',
      created_at: '2025-01-14T15:45:00Z',
      recipient: 'John Doe',
    },
    {
      id: '3',
      type: 'debit',
      amount: 75000,
      description: 'Project completion bonus to Sarah Wilson',
      reference: 'BON_456789123',
      status: 'completed',
      created_at: '2025-01-13T09:20:00Z',
      recipient: 'Sarah Wilson',
    },
  ]);

  const interns = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  const handleFundWallet = async () => {
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) return;

    setIsLoading(true);
    try {
      await paystackService.initializePayment({
        key: 'pk_test_your_key', // Replace with actual key
        email: 'admin@internshipplatform.com',
        amount: amount,
        callback: (response) => {
          console.log('Payment successful:', response);
          // Add transaction to list
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'credit',
            amount: amount,
            description: 'Wallet funding via Paystack',
            reference: response.reference,
            status: 'completed',
            created_at: new Date().toISOString(),
          };
          setTransactions([newTransaction, ...transactions]);
          setShowFundModal(false);
          setFundAmount('');
        },
        onClose: () => {
          console.log('Payment cancelled');
        },
      });
    } catch (error) {
      console.error('Payment initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayIntern = () => {
    const amount = parseFloat(payAmount);
    if (!amount || amount <= 0 || !selectedIntern || !payDescription) return;

    const intern = interns.find(i => i.id === selectedIntern);
    if (!intern) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'debit',
      amount: amount,
      description: payDescription,
      reference: `PAY_${Date.now()}`,
      status: 'completed',
      created_at: new Date().toISOString(),
      recipient: intern.name,
    };

    setTransactions([newTransaction, ...transactions]);
    setShowPayInternModal(false);
    setPayAmount('');
    setSelectedIntern('');
    setPayDescription('');
  };

  const FundWalletModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fund Admin Wallet</h3>
        <div className="space-y-4">
          <Input
            label="Amount (₦)"
            type="number"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="Enter amount to fund"
          />
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              You will be redirected to Paystack to complete the payment securely.
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleFundWallet}
              loading={isLoading}
              className="flex-1"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Fund Wallet
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowFundModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const PayInternModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Pay Intern</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Intern</label>
            <select
              value={selectedIntern}
              onChange={(e) => setSelectedIntern(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose an intern</option>
              {interns.map(intern => (
                <option key={intern.id} value={intern.id}>
                  {intern.name} ({intern.email})
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Amount (₦)"
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            placeholder="Enter payment amount"
          />
          <Input
            label="Description"
            value={payDescription}
            onChange={(e) => setPayDescription(e.target.value)}
            placeholder="e.g., Monthly stipend, Project bonus"
          />
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              Current wallet balance: ₦{walletBalance.toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handlePayIntern}
              className="flex-1"
              disabled={!selectedIntern || !payAmount || !payDescription}
            >
              Send Payment
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowPayInternModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-8 mt-28">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-gray-600 mt-2">Manage admin wallet and intern payments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowPayInternModal(true)}>
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Pay Intern
          </Button>
          <Button onClick={() => setShowFundModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Fund Wallet
          </Button>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-[#0f266c] to-[#007bff] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Admin Wallet Balance</p>
              <p className="text-4xl font-bold mb-4">₦{walletBalance.toLocaleString()}</p>
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <ArrowDownLeft className="w-4 h-4 mr-1" />
                  <span>Total In: ₦{transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>Total Out: ₦{transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</span>
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
              <p className="text-2xl font-bold text-gray-900">₦125,000</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-yellow-600">₦45,000 total</p>
            </div>
            <Filter className="w-8 h-8 text-yellow-600" />
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

      {/* Transactions */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                  }
                `}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{transaction.reference}</span>
                    {transaction.recipient && (
                      <>
                        <span>•</span>
                        <span>{transaction.recipient}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Modals */}
      {showFundModal && <FundWalletModal />}
      {showPayInternModal && <PayInternModal />}
    </div>
  );
};