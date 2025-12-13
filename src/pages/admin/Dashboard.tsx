import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../components/common/Card";
import CreateCohortModal from "../../components/admin/CreateCohortModal";
import ApplicationForm from "../../components/admin/ApplicationForm";

export const AdminDashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false);
  const [showRegitrationForm, setShowRegistrationForm] =
    React.useState<boolean>(false);

  const stats = [
    {
      title: "Total Interns",
      value: "156",
      change: "+12%",
      icon: <Users className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Cohorts",
      value: "3",
      change: "+1",
      icon: <BookOpen className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Wallet Balance",
      value: "₦2.4M",
      change: "-8.2%",
      icon: <DollarSign className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Projects Active",
      value: "28",
      change: "+5",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivity = [
    {
      title: "New intern application",
      description: "John Doe applied for Frontend Development",
      time: "2 hours ago",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      title: "Payment processed",
      description: "₦50,000 paid to React development cohort",
      time: "4 hours ago",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      title: "Project submitted",
      description: "E-commerce project submitted by Sarah Wilson",
      time: "6 hours ago",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      title: "Skill test completed",
      description: "15 interns completed JavaScript assessment",
      time: "1 day ago",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="mt-28 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your internship platform
          </p>
        </div>
        <button
          onClick={() => setShowRegistrationForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
         Create Apply form
        </button>
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
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
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

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Enrollment Trends
            </h3>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart visualization coming soon</p>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <div
                    className={`${activity.color} p-2 rounded-lg bg-gray-50`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-4 text-left bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200"
            >
              <Users className="w-6 h-6 mb-2" />
              <p className="font-medium">Add New Cohort</p>
              <p className="text-sm opacity-90">
                Create a new internship cohort
              </p>
            </button>
            <button className="p-4 text-left bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200">
              <DollarSign className="w-6 h-6 mb-2" />
              <p className="font-medium">Fund Wallet</p>
              <p className="text-sm opacity-90">Add funds to admin wallet</p>
            </button>
            <button className="p-4 text-left bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
              <BookOpen className="w-6 h-6 mb-2" />
              <p className="font-medium">Create Test</p>
              <p className="text-sm opacity-90">Add new skill assessment</p>
            </button>
            <button className="p-4 text-left bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
              <TrendingUp className="w-6 h-6 mb-2" />
              <p className="font-medium">Post Project</p>
              <p className="text-sm opacity-90">Create new intern project</p>
            </button>
          </div>
        </Card>
      </motion.div>
      {showCreateModal && (
        <CreateCohortModal
          setShowCreateModal={setShowCreateModal}
          showCreateModal={showCreateModal}
        />
      )}

      {showRegitrationForm && (
        <ApplicationForm
          showCreateModal={showRegitrationForm}
          setShowCreateModal={setShowRegistrationForm}
        />
      )}
    </div>
  );
};
