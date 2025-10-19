import React from "react";
import { Input } from "../common/Input";
import { User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplyStore } from "../../stores/useApplystore";
import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../common/Button";

const applicationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ApplicationFormData = z.infer<typeof applicationSchema>;

type Props = {
  next: () => void;
};

const PersonalInfo: React.FC<Props> = ({ next }) => {
  const { name, email, password, confirmPassword, updateManyFields } =
    useApplyStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    defaultValues: {
      name: name,
      email: email,
      password: password ,
      confirmPassword: confirmPassword
    },
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (
    data: ApplicationFormData,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    console.log(data)
    updateManyFields(data);
    next();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <User className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h2>
            <p className="text-gray-600">Tell us about yourself</p>
          </div>

          <Input
            label="Full Name"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Enter your email address"
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Create a strong password"
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your password"
          />
        </div>

        <div className="w-full flex items-start mt-8 justify-end">
          <Button type="submit" className="min-w-32">
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
