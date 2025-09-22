import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle, User, Mail, Lock, Code, FileText, Video } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { VideoRecorder } from '../../components/forms/VideoRecorder';
import internService from '../../services/intern.service';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  agreement_accepted: z.boolean().refine(val => val === true, 'You must accept the agreement'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const skillOptions = [
  'Frontend Development (React, Vue, Angular)',
  'Backend Development (Node.js, Python, PHP)',
  'Mobile Development (React Native, Flutter)',
  'UI/UX Design',
  'Data Science & Analytics',
  'DevOps & Cloud Computing',
  'Digital Marketing',
  'Content Writing',
  'Project Management',
  'Quality Assurance Testing',
];

export const Apply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      skills: [],
      agreement_accepted: false,
    },
  });

  const selectedSkills = watch('skills') || [];

  const toggleSkill = (skill: string) => {
    const current = selectedSkills;
    const updated = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    setValue('skills', updated);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!videoFile) {
      setError('root', { message: 'Please record your affirmation video' });
      return;
    }

    setIsLoading(true);
    try {
      await internService.submitApplication({
        ...data,
        affirmation_video: videoFile,
      });
      setSubmitted(true);
    } catch (error: any) {
      setError('root', { message: error.message || 'Application submission failed' });
    } finally {
      setIsLoading(false);
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
              Thank you for applying to our internship program. We'll review your application and get back to you within 3-5 business days.
            </p>
            <p className="text-sm text-gray-500">
              Check your email for further instructions and updates on your application status.
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Skills', icon: <Code className="w-5 h-5" /> },
    { number: 3, title: 'Agreement', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Video', icon: <Video className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f266c] via-[#007bff] to-[#0056b3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step.number 
                    ? 'bg-white text-[#007bff]' 
                    : 'bg-white bg-opacity-20 text-white'
                  }
                `}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${currentStep > step.number ? 'bg-white' : 'bg-white bg-opacity-20'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Apply for Internship</h1>
            <p className="text-blue-100">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errors.root && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>

                  <Input
                    label="Full Name"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="Enter your email address"
                  />

                  <Input
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                    placeholder="Create a strong password"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {/* Step 2: Skills Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Code className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Select Your Skills</h2>
                    <p className="text-gray-600">Choose the areas you're interested in learning</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`
                          p-4 text-left border-2 rounded-lg transition-all duration-200
                          ${selectedSkills.includes(skill)
                            ? 'border-[#007bff] bg-blue-50 text-[#007bff]'
                            : 'border-gray-200 hover:border-gray-300'
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
                </div>
              )}

              {/* Step 3: Agreement */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <FileText className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Internship Agreement</h2>
                    <p className="text-gray-600">Please read and accept our terms</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
                    <h3 className="font-semibold text-gray-900 mb-4">Internship Program Agreement</h3>
                    <div className="space-y-4 text-sm text-gray-700">
                      <p>
                        By accepting this agreement, you commit to participating in our 4-month internship program with the following terms:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Complete all assigned learning modules and assessments</li>
                        <li>Maintain regular communication with mentors and peers</li>
                        <li>Participate actively in projects and peer reviews</li>
                        <li>Adhere to professional conduct standards</li>
                        <li>Complete the program duration of 4 months</li>
                        <li>Respect intellectual property and confidentiality agreements</li>
                      </ul>
                      <p>
                        In return, we provide structured learning, mentorship, real project experience, and potential stipends based on performance.
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register('agreement_accepted')}
                      className="mt-1 rounded border-gray-300 text-[#007bff] focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and agree to the internship program terms and conditions. I commit to completing the 4-month program.
                    </span>
                  </label>

                  {errors.agreement_accepted && (
                    <p className="text-sm text-red-600">{errors.agreement_accepted.message}</p>
                  )}
                </div>
              )}

              {/* Step 4: Video Recording */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Video className="w-12 h-12 text-[#007bff] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Affirmation Video</h2>
                    <p className="text-gray-600">Record a brief introduction video</p>
                  </div>

                  <VideoRecorder
                    onVideoCapture={setVideoFile}
                    maxDuration={120}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto">
                  <Button
                    type="submit"
                    loading={isLoading}
                    className="min-w-32"
                  >
                    {currentStep === 4 ? 'Submit Application' : 'Next'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};