import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Users,
  Calendar,
  Settings,
  Trash2,
  Edit,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import adminService from "../../services/admin.service";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import CreateCohortModal from "../../components/admin/CreateCohortModal";
import ErrorComponent from "../../components/ErrorComponent";

interface Cohort {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_slot: number;
  settings: {
    duration: string;
    level: string;
  };
  current_interns: number;
  is_accepting: boolean;
  created_at: string;
}

export const Cohorts: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  // const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);
  const queryClient = useQueryClient();

  // Fetch cohorts from API

  const {
    data: cohorts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const token = localStorage.getItem("auth_token");

      const res = await api.get("/api/cohorts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cohorts loaded:", res);
      return res.data;
    },
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="fixed w-full z-50 backdrop-blur bg-black/70 flex justify-center items-center h-full left-0 bottom-0">
        <div className="w-96 h-48 bg-blue rounded-lg shadow-lg flex flex-col justify-center items-center p-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-700 mb-4" />
          <p className="text-blue-600 text-lg">Loading</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent error={error.message} refetch={refetch} />;
  }

  //   {
  //     id: "1",
  //     name: "Frontend Development Cohort 2025",
  //     description:
  //       "Comprehensive React and modern frontend development program",
  //     start_date: "2025-02-01",
  //     end_date: "2025-06-01",
  //     max_interns: 25,
  //     current_interns: 18,
  //     is_accepting: true,
  //     created_at: "2025-01-15",
  //   },
  //   {
  //     id: "2",
  //     name: "Backend Development Cohort 2025",
  //     description: "Node.js, Python, and database management focus",
  //     start_date: "2025-03-01",
  //     end_date: "2025-07-01",
  //     max_interns: 20,
  //     current_interns: 12,
  //     is_accepting: true,
  //     created_at: "2025-01-10",
  //   },
  //   {
  //     id: "3",
  //     name: "UI/UX Design Cohort 2024",
  //     description: "Design thinking, prototyping, and user experience",
  //     start_date: "2024-10-01",
  //     end_date: "2025-02-01",
  //     max_interns: 15,
  //     current_interns: 15,
  //     is_accepting: false,
  //     created_at: "2024-09-15",
  //   },
  // ]);

  // // Toggle accepting via API
  const toggleAccepting = async (cohortId: string) => {
    try {
      const target = cohorts.find((c: { id: string }) => c.id === cohortId);
      if (!target) return;

      await adminService.toggleAccepting(cohortId, !target.is_accepting);
      toast.success("Cohort status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // // Delete cohort via API
  const deleteCohort = async (cohortId: string) => {
    if (!window.confirm("Are you sure you want to delete this cohort?")) return;

    try {
      await adminService.deleteCohort(cohortId);
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      toast.success("Cohort deleted");
    } catch (err) {
      toast.error("Failed to delete cohort");
    }
  };

  // // Original modal but wired to API

  // RETURN UI (unchanged)
  return (
    <div className="mt-28 space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900">
            Cohort Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage internship cohorts and enrollment
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Cohort
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cohorts</p>
              <p className="text-2xl font-bold text-gray-900">
                {cohorts.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Cohorts</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  cohorts.filter((c: { is_accepting: any }) => c.is_accepting)
                    .length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Interns</p>
              <p className="text-2xl font-bold text-gray-900">
                {cohorts.reduce(
                  (sum: any, c: { current_interns: any }) =>
                    sum + c.current_interns,
                  0
                ) || 0}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Slots</p>
              <p className="text-2xl font-bold text-gray-900">
                {cohorts.reduce(
                  (sum: number, c: { max_slot: number }) => sum + c.max_slot,
                  0
                )}
              </p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Slots</p>
              <p className="text-2xl font-bold text-gray-900">
                {cohorts.reduce(
                  (sum: number, c: { max_slot: number }) => sum + c.max_slot,
                  0
                )}
              </p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Cohorts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cohorts.map((cohort: Cohort, index: number) => (
          <motion.div
            key={cohort.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cohort.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {cohort.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAccepting(cohort.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        cohort.is_accepting
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {cohort.is_accepting ? (
                        <ToggleRight className="w-6 h-6" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteCohort(cohort.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Start Date:</span>
                    <p className="font-medium">
                      {new Date(cohort.start_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">duration:</span>
                    <p className="font-medium">
                      {JSON.stringify(cohort.settings)
                        .split(",")[0]
                        .split(":")[1]
                        .slice(2, -2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrollment Progress</span>
                    <span className="font-medium">
                      {cohort.current_interns}/{cohort.max_slot} interns
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#0f266c] to-[#007bff] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (cohort.current_interns / cohort.max_slot) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        cohort.is_accepting ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span className="text-sm text-gray-600">
                      {cohort.is_accepting
                        ? "Accepting Applications"
                        : "Closed"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCohortModal
          setShowCreateModal={setShowCreateModal}
          showCreateModal={showCreateModal}
        />
      )}
    </div>
  );
};
