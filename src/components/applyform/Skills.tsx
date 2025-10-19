import { zodResolver } from "@hookform/resolvers/zod";
import { useApplyStore } from "../../stores/useApplystore";
import { useForm } from "react-hook-form";
import z from "zod";
import { CheckCircle, Code } from "lucide-react";
import { Button } from "../common/Button";

const applicationSchema = z.object({
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const skillOptions = [
  "Frontend Development (React, Vue, Angular)",
  "Backend Development (Node.js, Python, PHP)",
  "Mobile Development (React Native, Flutter)",
  "UI/UX Design",
  "Data Science & Analytics",
  "DevOps & Cloud Computing",
  "Digital Marketing",
  "Content Writing",
  "Project Management",
  "Quality Assurance Testing",
];
type Props = {
  next: () => void;
  previous: () => void;
};

const Skills: React.FC<Props> = ({ next, previous }) => {
  const skills = useApplyStore((state) => state.skills);

  const updateField = useApplyStore((state) => state.updateField);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    defaultValues: {
      skills,
    },
    resolver: zodResolver(applicationSchema),
  });

  const selectedSkills = watch("skills") || [];

  const toggleSkill = (skill: string) => {
    const current = selectedSkills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    setValue("skills", updated);
  };

  const onSubmit = (
    data: ApplicationFormData,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    updateField("skills", data.skills);
    next();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <Code className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Select Your Skills
          </h2>
          <p className="text-gray-600">
            Choose the areas you're interested in learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`
                          p-4 text-left border-2 rounded-lg transition-all duration-200
                          ${
                            selectedSkills.includes(skill)
                              ? "border-[#007bff] bg-blue-50 text-[#007bff]"
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{skill}</span>
                {selectedSkills.includes(skill) && (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
            </button>
          ))}
        </div>

        {errors.skills && (
          <p className="text-sm text-red-600">{errors.skills.message}</p>
        )}

        <div className="w-full flex items-start mt-8 justify-between">
          <Button type="button" onClick={previous} className="min-w-32">
            previous
          </Button>
          <Button type="submit" className="min-w-32">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Skills;
