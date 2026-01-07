import { PlayCircle, Clock, Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { Lesson } from "../../types/index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminService from "../../services/admin.service";
import { toast } from "react-toastify";

type LessonFormProps = {
  moduleId: number | string;
  lesson: Lesson | null;
  onCancel: () => void;
};

const lessonSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(3, "Lesson title must be at least 3 characters")
    .max(150, "Lesson title is too long"),

  content: z.string().min(10, "Lesson content is required"),

  video_url: z
    .string()
    .url("Video URL must be a valid URL")
    .optional()
    .or(z.literal("")),

  order: z.number().min(1, "Order must be at least 1"),

  duration_minutes: z
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(600, "Duration seems too long"),
});

type LessonFormData = z.infer<typeof lessonSchema>;

const LessonForm = ({ lesson, onCancel, moduleId }: LessonFormProps) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(lessonSchema),
  });
  const queryClient = useQueryClient();

  const { mutate: creatLesson, isPending } = useMutation({
    mutationFn: (data: LessonFormData) => {
      return adminService.createLessonModule(data, moduleId);
    },

    onSuccess: (data) => {
      console.log("create lesson", data);

      toast.success("creating lesson was successful");
      onCancel();
      queryClient.invalidateQueries({
        queryKey: ["lesson"],
      });
    },
    onError: () => {
      console.log("create lesson");
      toast.error("error creating lesson");
    },
  });

  const { mutate: updateLesson, isPending: pending } = useMutation({
    mutationFn: (data: LessonFormData) => {
      return adminService.updateLessonModule(data, lesson?.id);
    },

    onSuccess: (data) => {
      console.log("create lesson", data);
      toast.success("updated lesson successful");
      onCancel();
      queryClient.invalidateQueries({
        queryKey: ["lesson"],
      });
    },
    onError: () => {
      console.log("update lesson");
      toast.error("error updating lesson");
    },
  });

  const onSubmit = (data: LessonFormData) => {
    console.log(lesson);

    if (lesson === undefined || lesson === null) {
      return creatLesson(data);
    } else {
      return updateLesson(data);
    }
  };

  useEffect(() => {
    if (lesson) {
      reset({
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        duration_minutes: lesson.duration_minutes,
        order: lesson.order,
        video_url: lesson.videoUrl,
      });
    }
  }, [reset, lesson]);
  return (
    <div className="p-6 absolute bg-white/80 rounded-lg backdrop-blur w-full overflow-y-scroll left-0 bottom-0 space-y-4 border-t">
      <h4 className="font-semibold">
        {lesson ? "Edit Lesson" : "Create Lesson"}
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-4 border-t"
      >
        {/* Title */}
        <div>
          <input
            {...register("title")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Lesson title"
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>
        {lesson !== undefined && (
          <input
            {...register("id", { valueAsNumber: true })}
            readOnly
            className="w-20 text-center border rounded-lg p-2 text-sm"
          />
        )}
        {/* Content */}
        <div>
          <textarea
            {...register("content")}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Lesson content (HTML or text)"
          />
          {errors.content && (
            <p className="text-xs text-red-600 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Video URL */}
        <div>
          <input
            {...register("video_url")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Video URL (optional)"
          />
          {errors.video_url && (
            <p className="text-xs text-red-600 mt-1">
              {errors.video_url.message}
            </p>
          )}
        </div>

        {/* Order + Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              {...register("order", { valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Order"
            />
            {errors.order && (
              <p className="text-xs text-red-600 mt-1">
                {errors.order.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register("duration_minutes", { valueAsNumber: true })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Duration (mins)"
            />
            {errors.duration_minutes && (
              <p className="text-xs text-red-600 mt-1">
                {errors.duration_minutes.message}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <Button
            type="submit"
            disabled={lesson ? pending : isPending}
            className="flex items-center gap-2"
          >
            {lesson ? "Update Lesson" : "Create Lesson"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const LessonModal = ({ moduleId }: { moduleId: number | string }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const res = await adminService.getLessonModule();
      console.log(res);
      return res.data;
    },
    enabled: true,
  });

  const queryClient = useQueryClient();

  const lesson = lessons.filter((p: Lesson) => p.module_id === moduleId);

  const { mutate } = useMutation({
    mutationKey: ["deleteLesson"],
    mutationFn: async (id: string | number) => {
      const res = await adminService.deleteLesson(id);
      return res.data;
    },
  });

  const onDelete = (id: string | number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this candidate? This action cannot be undone."
      )
    ) {
      return;
    }

    mutate(id);

    queryClient.invalidateQueries({ queryKey: ["lesson"] });
  };

  return (
    <div className="bg-white relative rounded-2xl mt-4 border border-gray-100 shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-sm text-gray-500"> Loading</p>
        </div>
      )}
      {/* Header */}
      {showForm && (
        <LessonForm
          lesson={lesson[0]}
          moduleId={moduleId}
          onCancel={() => setShowForm(false)}
        />
      )}
      {lesson.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 mb-4">No lessons added yet</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <Plus size={16} /> Add Lesson
          </button>
        </div>
      ) : (
        lesson.map((lesson: Lesson) => (
          <ul key={lesson.id} className="divide-y">
            <li className="group flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <PlayCircle className="text-blue-500" size={20} />

                <div>
                  <p className="font-medium text-gray-900">
                    {lesson?.order}. {lesson?.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Clock size={12} />
                    {lesson.duration_minutes} mins
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                className="flex gap-2 opacity-0 group-hover:opacity-100 transition"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="p-1.5 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() =>  onDelete(lesson.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default LessonModal;
