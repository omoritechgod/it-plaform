import React from "react";
import { motion } from "framer-motion";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import adminService from "../../services/admin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface CreateCohortModalProps {
  setShowCreateModal: (show: boolean) => void;
  showCreateModal?: boolean;
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

type cohortData = z.infer<typeof cohortSchema>;

const CreateCohortModal = ({
  setShowCreateModal,
  showCreateModal,
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

  const mutation = useMutation({
    mutationFn: async (data: cohortData) => {
      const res = await adminService.createCohort(data);
      return res;
    },
  });

  const onSubmit = (data: cohortData) => {
    console.log("Cohort Data:", data);
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Cohort created successfully");

        queryClient.invalidateQueries({ queryKey: ["cohorts"] });

        setShowCreateModal(false);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to create cohort");
      },
    });
    reset();
  };

  React.useEffect(() => {
    if (showCreateModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreateModal]);

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 left-0 bottom-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Create New Cohort
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
              Create Cohort
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateModal(false)}
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
