import { toast } from "react-toastify";
import { TrainingModule } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../../services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Pencil, X } from "lucide-react";
import { Button } from "../common/Button";
import { useEffect } from "react";
import z from "zod";

const trainingModuleSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .lowercase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase, numbers, and hyphens only (e.g., react-basics)"
    ),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .max(500, "Keep description under 500 characters"),
  skill_tag: z.string().min(2, "Tag is required").max(20, "Tag too long"),
  level: z.enum(["beginner", "intermediate", "advanced"]).catch("beginner"),
  order: z.number().min(1, "Order must be at least 1"),
  resources: z.object({
    video: z
      .string()
      .url("Must be a valid YouTube/Video URL")
      .or(z.literal("")),
    pdf: z.string().url("Must be a valid Document URL").or(z.literal("")),
  }),
  status: z.enum(["active", "inactive"]),
});

export type trainingModuleData = z.infer<typeof trainingModuleSchema>;

const EditModuleModal = ({
  module,
  onClose,
}: {
  module: TrainingModule | null;
  onClose: () => void;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<trainingModuleData>({
    resolver: zodResolver(trainingModuleSchema),
  });

  const queryClient = useQueryClient();


  const onSubmit = (data: trainingModuleData) => {
    mutate(data);
  };

  useEffect(() => {
    if (module) {
      reset({
        id: Number(module.id),
        title: module.title,
        slug: module.slug,
        skill_tag: module.skill_tag,
        description: module.description,
        level: module.level,
        order: module.order,
        status: module.status,
        resources: module.resources,
      });
    }
  }, [module, reset]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="text-red-600" size={24} />
      </button>

      <div className="flex items-center gap-2 mb-6">
        <Pencil className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Edit Module</h2>
      </div>

      <div>
        <p className="text-red-600">{errors.root?.message}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module Title
          </label>
          <input
            {...register("id", { valueAsNumber: true })}
            className="w-10 text-center p-2 my-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            readOnly
          />

          <input
            {...register("title")}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="e.g. Advanced TypeScript"
          />

          {errors?.title && (
            <p className="text-red-600 ">{errors?.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              {...register("slug")}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder="adv-ts"
            />
            {errors?.slug && (
              <p className="text-red-600 ">{errors?.slug.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Tag
            </label>
            <input
              {...register("skill_tag")}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder="React"
            />
            {errors?.skill_tag && (
              <p className="text-red-600 ">{errors?.skill_tag.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 h-24 text-sm"
            placeholder="What will they learn?"
          />

          {errors?.description && (
            <p className="text-red-600 ">{errors?.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              {...register("level")}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {errors?.level && (
              <p className="text-red-600 ">{errors?.level.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              type="number"
              {...register("order", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />

            {errors?.order && (
              <p className="text-red-600 ">{errors?.order.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-600 text-xs">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resources
          </label>
          <input
            {...register("resources.video")}
            className={`w-full px-4 py-2 rounded-lg border border-gray-200 text-sm`}
            placeholder="Video URL"
          />
          {errors?.resources?.video && (
            <p className="text-red-600 my-2">
              {errors?.resources?.video.message}
            </p>
          )}
          <input
            {...register("resources.pdf")}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            placeholder="PDF Guide URL"
          />
          {errors?.resources?.pdf && (
            <p className="text-red-600 my-2">
              {errors?.resources?.pdf.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center gap-2 justify-center bg-blue hover:bg-blue/90 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 mt-4"
        >
          {isPending && (
            <Loader2 className="animate-spin w-10 h-10 text-blue-700 mb-4" />
          )}{" "}
          Publish Edit
        </Button>
      </form>
    </div>
  );
};

export default EditModuleModal;
