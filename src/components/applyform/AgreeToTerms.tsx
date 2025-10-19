import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useApplyStore } from "../../stores/useApplystore";
import z from "zod";
import { Button } from "../common/Button";

const applicationSchema = z.object({
  agreement_accepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the agreement"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

type Props = {
  next: () => void;
  previous: () => void;
};

const AgreeToTerms: React.FC<Props> = ({ next, previous }) => {
 const agreement_accepted = useApplyStore((state) => state.agreement_accepted);

  const updateField = useApplyStore((state) => state.updateField);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    defaultValues: {
      agreement_accepted,
    },
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (
    data: ApplicationFormData,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    console.log(data.agreement_accepted)
    updateField("agreement_accepted", data.agreement_accepted);
    next();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <FileText className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Internship Agreement
          </h2>
          <p className="text-gray-600">Please read and accept our terms</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">
            Internship Program Agreement
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              By accepting this agreement, you commit to participating in our
              4-month internship program with the following terms:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Complete all assigned learning modules and assessments</li>
              <li>Maintain regular communication with mentors and peers</li>
              <li>Participate actively in projects and peer reviews</li>
              <li>Adhere to professional conduct standards</li>
              <li>Complete the program duration of 4 months</li>
              <li>
                Respect intellectual property and confidentiality agreements
              </li>
            </ul>
            <p>
              In return, we provide structured learning, mentorship, real
              project experience, and potential stipends based on performance.
            </p>
          </div>
        </div>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register("agreement_accepted")}
            className="mt-1 rounded border-gray-300 text-[#007bff] focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the internship program terms and
            conditions. I commit to completing the 4-month program.
          </span>
        </label>

        {errors.agreement_accepted && (
          <p className="text-sm text-red-600">
            {errors.agreement_accepted.message}
          </p>
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
    </>
  );
};

export default AgreeToTerms;
