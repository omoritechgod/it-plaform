import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../common/Button";
import { SkillQuestion } from "../../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../../../services/admin.service";
import { Plus } from "lucide-react";

const QuestionsManagement = ({
  moduleId,
  refetch,
  questions,
}: {
  moduleId: string | number;
  refetch: () => void;
  questions: SkillQuestion[];
}) => {
  // const [questions, setQuestions] = useState<SkillQuestion[]>([
  //   {
  //     skill_tag: "laravel",
  //     difficulty: "medium",
  //     type: "mcq",
  //     question_text:
  //       "Which command is used to create a new Laravel controller?",
  //     options: [
  //       "php artisan make:controller",
  //       "php make controller",
  //       "php artisan new:controller",
  //     ],
  //     correct_answer: ["php artisan make:controller"],
  //     explanation:
  //       "Laravel uses the artisan CLI to generate controllers and other classes.",
  //     metadata: {
  //       time_limit: 60,
  //       points: 5,
  //     },
  //   },
  //   {
  //     skill_tag: "laravel",
  //     difficulty: "medium",
  //     type: "mcq",
  //     question_text:
  //       "Which command is used to create a new Laravel controller?",
  //     options: [
  //       "php artisan make:controller",
  //       "php make controller",
  //       "php artisan new:controller",
  //     ],
  //     correct_answer: ["php artisan make:controller"],
  //     explanation:
  //       "Laravel uses the artisan CLI to generate controllers and other classes.",
  //     metadata: {
  //       time_limit: 60,
  //       points: 5,
  //     },
  //   },
  // ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<SkillQuestion | null>(null);

  const [isAdding, setIsAdding] = useState(false);

  // Delete question
  const handleDelete = (id: SkillQuestion) => {
    toast.success(`Question deleted ${id.id}`);
  };

  useEffect(() => {
    if (isAdding) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAdding]);

  return (
    <div className="mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Question Management</h1>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Question
          </Button>
        </div>

        {/* Questions Grid */}
        {questions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-4">
              No questions added yet
            </p>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-5 rounded-xl shadow-sm border space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h2 className="font-semibold text-sm">
                    {index + 1}. {q.question_text}
                  </h2>

                  <span className="text-xs px-2 py-1 rounded bg-gray-100 capitalize">
                    {q.type}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">
                    Skill: {q.skill_tag}
                  </span>

                  <span className="px-2 py-1 rounded bg-purple-50 text-purple-700 capitalize">
                    Difficulty: {q.difficulty}
                  </span>

                  <span className="px-2 py-1 rounded bg-green-50 text-green-700">
                    ⏱ {q.metadata.time_limit}s
                  </span>

                  <span className="px-2 py-1 rounded bg-yellow-50 text-yellow-700">
                    ⭐ {q.metadata.points} pts
                  </span>
                </div>

                {/* Options */}
                <ul className="text-sm space-y-2">
                  {q.options.map((opt: string, i: number) => {
                    const isCorrect = q.correct_answer.includes(opt);

                    return (
                      <li
                        key={i}
                        className={`p-2 rounded border flex items-center justify-between
                        ${
                          isCorrect
                            ? "bg-green-50 border-green-300 text-green-800 font-medium"
                            : "bg-gray-50 border-gray-200"
                        }
                      `}
                      >
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="text-xs">✔ Correct</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Explanation */}
                {q.explanation && (
                  <div className="text-xs bg-gray-50 p-3 rounded border">
                    <span className="font-medium">Explanation:</span>{" "}
                    {q.explanation}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditData(q);
                      setIsEditing(true);
                      setIsAdding(true);
                    }}
                    className="px-3 py-1 text-xs rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(q)}
                    className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Question Modal */}
      {isAdding && (
        <QuestionModal
          setIsAdding={setIsAdding}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editData={editData}
          moduleId={moduleId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

// question form
const quizQuestionSchema = z
  .object({
    skill_tag: z
      .string()
      .min(2, "Skill tag is required")
      .max(50, "Skill tag is too long"),

    difficulty: z.enum(["easy", "medium", "hard"], {
      required_error: "difficulty is required",
      invalid_type_error: "type smust be either easy, medium or hard",
    }),

    type: z.enum(["mcq", "multi_select", "short_text", "file_upload"], {
      required_error: "type is required",
      invalid_type_error: "type smust be either mcq, theory or code",
    }),

    question_text: z
      .string()
      .min(10, "Question must be at least 10 characters"),

    options: z
      .array(z.string().min(1, "Option cannot be empty"))
      .min(2, "At least two options are required"),

    correct_answer: z
      .array(z.string())
      .min(1, "Select at least one correct answer"),

    explanation: z
      .string()
      .min(5, "Explanation must be at least 5 characters")
      .optional(),

    metadata: z.object({
      time_limit: z
        .number()
        .min(10, "Time limit must be at least 10 seconds")
        .max(600, "Time limit too high"),

      points: z
        .number()
        .min(1, "Points must be at least 1")
        .max(100, "Points too high"),
    }),
  })
  .superRefine((data, ctx) => {
    data.correct_answer.forEach((answer) => {
      if (!data.options.includes(answer)) {
        ctx.addIssue({
          path: ["correct_answer"],
          message: `Correct answer "${answer}" must be one of the options`,
          code: z.ZodIssueCode.custom,
        });
      }
    });
  });

export type QuizQuestionFormValues = z.infer<typeof quizQuestionSchema>;

const QuestionModal = ({
  setIsAdding,
  isEditing,
  editData,
  setIsEditing,
  moduleId,
  refetch,
}: {
  setIsAdding: React.Dispatch<boolean>;
  isEditing: boolean;
  editData: SkillQuestion | null;
  moduleId: string | number;
  refetch: () => void;
  setIsEditing: React.Dispatch<boolean>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(quizQuestionSchema),
    defaultValues: {
      options: ["", "", "", ""],
      correct_answer: [],
    },
  });

  const options = watch("options");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SkillQuestion) => {
      const res = adminService.createQuestionModule(data, moduleId);
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shedule", moduleId] });
      refetch();
      toast.success("you have successfully created skill questions");
    },
    onError: () => {
      toast.error("an error occured");
    },
  });
  const { mutate: updateMutate, isPending: pending } = useMutation({
    mutationFn: (data: SkillQuestion) => {
      const res = adminService.updateQuestionModule(data, moduleId);
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shedule", moduleId] });
      refetch();

      toast.success("you have successfully created skill questions");
    },
    onError: () => {
      toast.error("an error occured");
    },
  });

  const onSubmit = (data: QuizQuestionFormValues) => {
    console.log(data);
    if (isEditing) {
      return updateMutate(data);
    } else {
      return mutate(data);
    }
  };

  useEffect(() => {
    if (editData && isEditing) {
      reset({
        correct_answer: editData.correct_answer,
        difficulty: editData.difficulty,
        explanation: editData.explanation,
        metadata: editData.metadata,
        options: editData.options,
        question_text: editData.question_text,
        skill_tag: editData.skill_tag,
        type: editData.type,
      });
    }
  }, [editData, isEditing]);

  return (
    <div className="fixed w-full h-full inset-0 bg-black bg-opacity-50 shadow-lg ">
      <div className="bg-white max-w-[500px] w-[98%] h-full mx-auto mt-28 max-h-[500px] overflow-y-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Edit Question" : "Add New Question"}
        </h2>

        {errors.root && (
          <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6"
        >
          {/* Skill Tag */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Skill Tag</label>
            <input
              {...register("skill_tag")}
              placeholder="e.g. laravel, react, nodejs"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Difficulty</label>
            <select
              {...register("difficulty")}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Type</label>
            <select
              {...register("type")}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="mcq">mcq</option>
              <option value="theory">theory</option>
              <option value="code">code</option>
            </select>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Question</label>
            <textarea
              {...register("question_text")}
              placeholder="Which command is used to create a new Laravel controller?"
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Options (mark correct answers)
            </label>

            {options?.map((_: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 border rounded-md p-2"
              >
                <input
                  type="checkbox"
                  value={options[index]}
                  {...register("correct_answer")}
                  className="h-4 w-4"
                />

                <input
                  {...register(`options.${index}`)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Explanation (optional)
            </label>
            <textarea
              {...register("explanation")}
              placeholder="Explain why this is the correct answer..."
              rows={2}
              className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Time Limit (seconds)
              </label>
              <input
                type="number"
                {...register("metadata.time_limit", { valueAsNumber: true })}
                placeholder="60"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Points</label>
              <input
                type="number"
                {...register("metadata.points", { valueAsNumber: true })}
                placeholder="5"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              disabled={isEditing ? pending : isPending}
              type="submit"
              className="bg-blue/60 text-white  px-4 py-2 rounded hover:bg-blue/80"
            >
              {isEditing ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionsManagement;
