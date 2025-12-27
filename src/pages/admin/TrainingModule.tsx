import React from "react";
import { PlusCircle, Video, FileText, Tag, Loader2 } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminService from "../../services/admin.service";
import { toast } from "react-toastify";
import { Button } from "../../components/common/Button";
import ErrorComponent from "../../components/ErrorComponent";

const trainingModuleSchema = z.object({
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

const TrainingModulePage: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,

    register,
  } = useForm<trainingModuleData>({
    resolver: zodResolver(trainingModuleSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: trainingModuleData) => {
      const res = await adminService.createTrainingModule(data);
      return res;
    },

    onSuccess: () => {
      toast.success("Cohort created successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["module"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create cohort");
    },
  });

  const onSubmit = (data: trainingModuleData) => {
    console.log("training module:", data);
    mutate(data);
  };

  const {
    data: modules,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      const data = await adminService.getTrainingModule();
      console.log(data);
      return data.data;
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

  return (
    <div className="min-h-screen mt-28 bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold">New Module</h2>
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
                  <p className="text-red-600 text-xs">
                    {errors.status.message}
                  </p>
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
                Publish Module
              </Button>
            </form>
          </div>
        </div>

        {/* --- RIGHT: LIST SECTION --- */}
        <div className="lg:col-span-8 md:overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-800">
              Training Catalog
            </h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {modules?.length} Modules
            </span>
          </div>

          {isLoading ? (
            <div className="animate-pulse flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules?.map((m: trainingModuleData) => (
                <div
                  key={m.slug}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        m.level === "beginner"
                          ? "bg-green-100 text-green-700"
                          : m.level === "intermediate"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.level}
                    </div>
                    <span className="text-gray-400 font-mono text-sm">
                      #{m.order}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors mb-2">
                    {m.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {m.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      <Tag size={12} /> {m.skill_tag}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex gap-4">
                      {m.resources?.video && (
                        <a
                          href={m.resources.video}
                          className="text-blue-500 hover:text-blue-700 transition"
                          title="Watch Video"
                        >
                          <Video size={20} />
                        </a>
                      )}
                      {m.resources?.pdf && (
                        <a
                          href={m.resources.pdf}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Download PDF"
                        >
                          <FileText size={20} />
                        </a>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        m.status === "active"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingModulePage;
