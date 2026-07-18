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
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import adminService from "../../services/admin.service";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import CreateCohortModal from "../../components/admin/CreateCohortModal";
import ErrorComponent from "../../components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import { Cohort } from "../../types";

export const Cohorts: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editingCohort, setEditingCohort] = useState<boolean>(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Fetch cohorts from API

  const {
    data: cohorts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const res = await api.get("/api/cohorts");
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
    // return <ErrorComponent error={error.message} refetch={refetch} />;
  }

  const toggleAccepting = async (cohort: Cohort) => {
    try {
      const target = cohorts.find((c: { id: string }) => c.id === cohort.id);
      if (!target) return;

      await adminService.toggleAccepting(cohort, !target.is_accepting);
      toast.success("Cohort status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteCohort = async (cohort: Cohort) => {
    if (!window.confirm("Are you sure you want to delete this cohort?")) return;

    try {
      await adminService.deleteCohort(cohort);
      await queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      toast.success("Cohort deleted");
    } catch (err) {
      toast.error("Failed to delete cohort");
    }
  };

  return (
    <div className="mt-28 space-y-8">
      {/* Header */}

      <div className="flex justify-between items-start md:items-center">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900">
            Cohort Management
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Manage internship cohorts and enrollment
          </p>
        </div>
        <Button
          className="text-sm md:text-base"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Cohort
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cohorts</p>
              <p className="text-2xl font-bold text-gray-900">
                {cohorts?.length}
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
                  cohorts?.filter((c: { is_accepting: any }) => c.is_accepting)
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
                {cohorts?.reduce(
                  (sum: any, c: { current_interns: any }) =>
                    sum + c.current_interns,
                  0,
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
                  0,
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
                {cohorts?.reduce(
                  (sum: number, c: { max_slot: number }) => sum + c.max_slot,
                  0,
                )}
              </p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Cohorts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cohorts?.map((cohort: Cohort, index: number) => (
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
                      onClick={() => toggleAccepting(cohort)}
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
                    <button
                      onClick={() => {
                        setEditingCohort(true);
                        setSelectedCohort(cohort);
                        setShowCreateModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteCohort(cohort)}
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
                      {10}/{cohort.max_slot} interns
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#0f266c] to-[#007bff] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(10 / cohort.max_slot) * 100}%`,
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
                    <span className="text-xs d:text-sm text-gray-600">
                      {cohort.is_accepting ? "Accepting" : "Closed"}
                    </span>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/admin/cohort/${cohort.id}/courses`)
                    }
                    className="flex items-center text-sm md:text-base"
                    variant="outline"
                    size="sm"
                  >
                    Manage Courses
                    <ChevronRight />
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
          setEditingCohort={setEditingCohort}
          editingCohort={editingCohort}
          selectedCohort={selectedCohort}
          setSelectedCohort={setSelectedCohort}
        />
      )}
    </div>
  );
};
