import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, User, Code, FileText, Video } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { VideoRecorder } from "../../components/forms/VideoRecorder";
import SubHero from "../../components/common/SubHero";
import { ROUTES } from "../../config/constants";
import { useApplyStore } from "../../stores/useApplystore";
import PersonalInfo from "../../components/applyform/PersonalInfo";
import Skills from "../../components/applyform/Skills";
import AgreeToTerms from "../../components/applyform/AgreeToTerms";
import { toast } from "react-toastify";
import authService from "../../services/auth.service";

export const Apply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    name,
    email,
    password,
    phone,
    confirmPassword,
    agreement_accepted,
    skills,
    reset,
  } = useApplyStore();

  const next = () => setCurrentStep((prev) => prev + 1);
  const previous = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      // PASSWORD VALIDATION
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long."
        );
        return; // Stop submission if invalid
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setIsLoading(true);

      const data = {
        name,
        email,
        password,
        agreement_accepted,
        confirmPassword,
        skills,
        phone,
        // videoFile,
      };

      const response = await authService.signup(data);

      console.log(response);

      if (response.status === true) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 20000);
        toast.success(response.message);
      }

      reset();
    } catch (error) {
      console.log(error);
      toast.error("check your network connection and try again");
    } finally {
      setIsLoading(false);
      setCurrentStep(1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f266c] via-[#007bff] to-[#0056b3] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to our internship program. We'll review
              your application and get back to you within 3-5 business days.
            </p>
            <p className="text-sm text-gray-500">
              Check your email for further instructions and updates on your
              application status.
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="w-5 h-5" /> },
    { number: 2, title: "Skills", icon: <Code className="w-5 h-5" /> },
    { number: 3, title: "Agreement", icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: "Video", icon: <Video className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen">
      <SubHero title="login here" description={ROUTES.APPLY} />
      <div className="max-w-4xl w-[98%] mt-32 mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 p-10 rounded-lg bg-gradient-to-br from-[#0f266c] via-[#007bff] to-[#0056b3]">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      currentStep >= step.number
                        ? "bg-white text-[#007bff]"
                        : "bg-white bg-opacity-20 text-white"
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-16 h-1 mx-2
                      ${
                        currentStep > step.number
                          ? "bg-white"
                          : "bg-white bg-opacity-20"
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Apply for Internship</h1>
            <p className="text-blue-100">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {currentStep === 1 && <PersonalInfo next={next} />}
              {currentStep === 2 && <Skills next={next} previous={previous} />}
              {currentStep === 3 && <AgreeToTerms next={next} previous={previous} />}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Video className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Affirmation Video</h2>
                    <p className="text-gray-600">Record a brief introduction video</p>
                  </div>

                  <VideoRecorder onVideoCapture={setVideoFile} maxDuration={120} />
                </div>
              )}

              <div className="flex justify-between pt-6">
                <div className="ml-auto">
                  {currentStep === 4 && (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      loading={isLoading}
                      className="min-w-32"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
