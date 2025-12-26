import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Card } from "../../components/common/Card";
import { useAuthStore } from "../../stores/useAuthStore";
import authService from "../../services/auth.service";
import { ROUTES } from "../../config/constants";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const isAdmin = searchParams.get("type") === "admin";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = isAdmin
        ? await authService.adminLogin(data)
        : await authService.login(data);

      console.log(response);

      if (response.status === true) {
        setUser(response.data);
        const redirectTo =
          response.data?.role === "admin"
            ? ROUTES.ADMIN_DASHBOARD
            : ROUTES.INTERN_DASHBOARD;
        navigate(redirectTo);
      } else {
        setError("root", { message: response.message || "Login failed" });
      }
    } catch (error: any) {
      setError("root", {
        message: error.message || "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f266c] via-[#007bff] to-[#0056b3] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="bg-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0f266c] to-[#007bff] rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">IP</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isAdmin ? "Admin Login" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 mt-2">
              {isAdmin
                ? "Access your admin dashboard"
                : "Sign in to your intern account"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="Enter your email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#007bff] focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#007bff] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              {isAdmin ? "Sign In to Admin" : "Sign In"}
            </Button>
          </form>

          {!isAdmin && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to={ROUTES.APPLY}
                  className="text-[#007bff] hover:underline font-medium"
                >
                  Apply here
                </Link>
              </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link
              to={isAdmin ? ROUTES.LOGIN : `${ROUTES.LOGIN}?type=admin`}
              className="text-sm text-gray-500 hover:text-[#007bff]"
            >
              {isAdmin ? "← Back to Intern Login" : "Admin Login →"}
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
