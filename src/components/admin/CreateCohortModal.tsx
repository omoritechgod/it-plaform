import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import adminService from "../../services/admin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Cohort } from "../../types";

interface CreateCohortModalProps {
  setShowCreateModal: (show: boolean) => void;
  showCreateModal?: boolean;
  setEditingCohort: React.Dispatch<React.SetStateAction<boolean>>;
  editingCohort: boolean;
  selectedCohort: Cohort | null;
  setSelectedCohort: React.Dispatch<React.SetStateAction<Cohort | null>>;
}

const cohortSchema = z.object({
  name: z.string().min(3, "Cohort name must be at least 3 characters"),
  description: z.string("Description is required"),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  is_accepting: z.boolean("Acceptance status is required"),
  max_slot: z.number().min(1, "Max interns must be at least 1"),
  settings: z.object({
    duration: z.string("Duration is required"),
    level: z.string("Level is required"),
  }),
});

export type cohortData = z.infer<typeof cohortSchema>;

const CreateCohortModal = ({
  setShowCreateModal,
  showCreateModal,
  setEditingCohort,
  editingCohort,
  selectedCohort,
  setSelectedCohort,
}: CreateCohortModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<cohortData>({
    resolver: zodResolver(cohortSchema),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (showCreateModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreateModal]);

  useEffect(() => {
    if (editingCohort) {
      reset({
        name: selectedCohort?.name,
        description: selectedCohort?.description,
        is_accepting: selectedCohort?.is_accepting,
        max_slot: selectedCohort?.max_slot,
        settings: {
          level: selectedCohort?.settings?.level,
          duration: selectedCohort?.settings?.duration,
        },

        start_date: selectedCohort?.start_date,
      });
    }
  }, [editingCohort]);

  const mutation = useMutation({
    mutationFn: async (data: cohortData) => {
      const res = await adminService.createCohort(data);
      return res;
    },
    onSuccess: () => {
      toast.success("Cohort created successfully");
      reset();

      queryClient.invalidateQueries({ queryKey: ["cohorts"] });

      setShowCreateModal(false);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create cohort");
    },
  });

  const onSubmit = (data: cohortData) => {
    console.log("Cohort Data:", data);
    if (editingCohort) {
      setEditingCohort(false);
      setShowCreateModal(false);
      setSelectedCohort(null);
      return toast.success(
        "updated successful not set to dataBas sha..end ponit not existing yet",
      );
    } else {
      return mutation.mutate(data);
    }
  };

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 left-0 bottom-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editingCohort ? "Edit" : " Create"} New Cohort
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Cohort Name"
            placeholder="e.g., Frontend Development 2025"
            {...register("name")}
            error={errors.name?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className={`w-full px-3 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
              {...register("description")}
              placeholder="Brief description of the cohort"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              {...register("start_date")}
              error={errors.start_date?.message}
              type="date"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                {...register("settings.duration")}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.settings?.duration
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
            </div>
          </div>

          <Input
            {...register("max_slot", { valueAsNumber: true })}
            error={errors.max_slot?.message}
            label="Max Interns"
            type="number"
            placeholder="25"
          />

          <label className="flex items-center space-x-2">
            <input {...register("is_accepting")} type="checkbox" />
            <span className="text-sm text-gray-700">
              Currently accepting applications
            </span>
            {errors.is_accepting && (
              <p className="text-sm text-red-600">
                {errors.is_accepting.message}
              </p>
            )}
          </label>
          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              set a level for the cohort
            </span>
            <select
              {...register("settings.level")}
              className={`ml-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.settings?.level ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.settings?.level && (
              <p className="text-sm text-red-600">
                {errors.settings?.level.message}
              </p>
            )}
          </label>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingCohort ? "Edit Cohort" : "Create Cohort"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setEditingCohort(false);
                setSelectedCohort(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCohortModal;
