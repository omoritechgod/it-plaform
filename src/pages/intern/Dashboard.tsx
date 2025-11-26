import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../stores/useAuthStore";

export const InternDashboard: React.FC = () => {
  const { user } = useAuthStore();

  console.log(user)
  const progressData = {
    stage: "Training",
    progress: 65,
    nextStage: "Projects",
    walletBalance: 25000,
    tasksCompleted: 12,
    totalTasks: 20,
  };

  const upcomingTasks = [
    {
      title: "Complete React Hooks Module",
      due: "Tomorrow",
      priority: "high",
      type: "learning",
    },
    {
      title: "Submit E-commerce Project",
      due: "3 days",
      priority: "medium",
      type: "project",
    },
    {
      title: "Peer Review: Shopping Cart",
      due: "1 week",
      priority: "low",
      type: "review",
    },
  ];

  const achievements = [
    {
      title: "First Test Passed",
      icon: <Trophy className="w-5 h-5" />,
      date: "2 days ago",
    },
    {
      title: "Module Completed",
      icon: <CheckCircle className="w-5 h-5" />,
      date: "1 week ago",
    },
    {
      title: "Project Submitted",
      icon: <BookOpen className="w-5 h-5" />,
      date: "2 weeks ago",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="mt-20 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Intern!
        </h1>
        <p className="text-gray-600 mt-2">Continue your learning journey</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-[#0f266c] to-[#007bff] text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">
                Current Stage: {progressData.stage}
              </h2>
              <p className="text-blue-100 mb-4">
                You're {progressData.progress}% through your journey
              </p>
              <div className="w-full md:w-64 bg-white bg-opacity-20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progressData.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm">Next Stage</p>
              <p className="text-xl font-semibold">{progressData.nextStage}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{progressData.walletBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progressData.tasksCompleted}/{progressData.totalTasks}
                </p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Learning Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
              <div className="bg-orange-50 text-orange-600 p-3 rounded-xl">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Upcoming Tasks
            </h3>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {task.type === "learning" && (
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      )}
                      {task.type === "project" && (
                        <Trophy className="w-5 h-5 text-purple-600" />
                      )}
                      {task.type === "review" && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Due {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Tasks
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-[#007bff] mt-1">{achievement.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center">
              <BookOpen className="w-6 h-6 mb-2" />
              Continue Learning
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
            >
              <Trophy className="w-6 h-6 mb-2" />
              Take Skill Test
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 mb-2" />
              Submit Project
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
            >
              <DollarSign className="w-6 h-6 mb-2" />
              View Wallet
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
