import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import AdminService from '../../services/admin.service';

export const AdminDashboard: React.FC = () => {
  // State to hold dynamic stats
  const [stats, setStats] = useState([
    {
      title: 'Total Interns',
      value: '156',
      change: '+12%',
      icon: <Users className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Cohorts',
      value: '3',
      change: '+1',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Wallet Balance',
      value: '₦2.4M',
      change: '-8.2%',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Projects Active',
      value: '28',
      change: '+5',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]);

  const recentActivity = [
    {
      title: 'New intern application',
      description: 'John Doe applied for Frontend Development',
      time: '2 hours ago',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600',
    },
    {
      title: 'Payment processed',
      description: '₦50,000 paid to React development cohort',
      time: '4 hours ago',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-600',
    },
    {
      title: 'Project submitted',
      description: 'E-commerce project submitted by Sarah Wilson',
      time: '6 hours ago',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-purple-600',
    },
    {
      title: 'Skill test completed',
      description: '15 interns completed JavaScript assessment',
      time: '1 day ago',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-orange-600',
    },
  ];

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await AdminService.getDashboardStats();
        if (response.status && response.data) {
          setStats([
            {
              title: 'Total Interns',
              value: response.data.total_interns,
              change: '+12%', // Or compute dynamically if API provides previous data
              icon: <Users className="w-8 h-8" />,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
            },
            {
              title: 'Active Cohorts',
              value: response.data.active_cohorts,
              change: '+1',
              icon: <BookOpen className="w-8 h-8" />,
              color: 'text-green-600',
              bgColor: 'bg-green-50',
            },
            {
              title: 'Wallet Balance',
              value: `₦${response.data.wallet_balance.toLocaleString()}`,
              change: '-8.2%',
              icon: <DollarSign className="w-8 h-8" />,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
            },
            {
              title: 'Projects Active',
              value: response.data.active_projects,
              change: '+5',
              icon: <TrendingUp className="w-8 h-8" />,
              color: 'text-orange-600',
              bgColor: 'bg-orange-50',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mt-28 space-y-8">
      {/* Original code remains untouched */}
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your internship platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* The rest of your Dashboard JSX remains unchanged */}
    </div>
  );
};
