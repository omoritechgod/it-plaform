import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Award, DollarSign } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { ROUTES } from "../../config/constants";
import bg_image from "../../assets/bg-hero.jpg";
import hero_image from "../../assets/videos/hero-bg.gif";

export const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-16 h-16" />,
      title: "Structured Learning",
      description:
        "Progress through beginner to advanced levels with curated content and skill tests.",
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "Real Projects",
      description:
        "Work on actual client projects and contribute to innovative digital products.",
    },

    {
      icon: <Award className="w-16 h-16" />,
      title: "Certification",
      description:
        "Earn recognized certifications and build a portfolio that stands out.",
    },
    {
      icon: <DollarSign className="w-16 h-16" />,
      title: "Paid Internships",
      description:
        "Receive stipends and rewards for your contributions and achievements.",
    },
  ];
  const [rate, setRate] = useState({});
  const ref = useRef(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        stats.forEach((item, index) => {
          let current = item.start;

          const interval = setInterval(() => {
            if (current < item.end) {
              current++;
              setRate((prev) => ({ ...prev, [index]: current }));
            } else {
              clearInterval(interval);
            }
          }, 300);
        });
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="overflow w-full h-screen relative text-white"
        style={{
          backgroundImage: `url(${bg_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-black/5 backdrop-blur-sm backdrop-saturate-100 z-30 absolute  left-0 right-0"></div>
        <div className="w-full h-full z-40 absolute left-0 right-0 pt-[40%] md:pt-[10%] px-5 md:px-10 lg:px-20">
          <div className="max-w-3xl w-full h-full flex flex-col gap-2">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              {["Launch", " Your ", "Tech ", "Career"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="text transition-colors duration-500"
                  style={{
                    color:
                      index === count ? "#fff" : "rgba(209, 213, 219, 0.75)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              Join our comprehensive internship program and transform from a
              beginner to a skilled professional ready for the tech industry.
            </p>
            <div className="flex gap-4 justify-start">
              <Link to={ROUTES.APPLY}>
                <Button
                  size="lg"
                  variant="outline"
                  className="relative group bg-none hover:bg-transparent border-white text-[#0f266c] overflow-hidden"
                >
                  <span className="z-30 bg-transparent flex justify-between items-center group-hover:text-[#fff]">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                  </span>
                  <span className="z-20 w-full group-hover:w-0 h-full absolute right-0 bottom-0 bg-white transition-all duration-300"></span>
                </Button>
              </Link>

              <Link to={ROUTES.ABOUT}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-none border-white relative text-white overflow-hidden hover:bg-transparent"
                >
                  <span className="z-30 bg-transparent group-hover:text-[#0f266c]">
                    Learn More
                  </span>
                  <span className="z-20 w-0 group-hover:w-full h-full absolute left-0 bottom-0 bg-white transition-all duration-300"></span>
                </Button>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src={hero_image}
            alt="Hero"
            className="w-full max-w-3xl mt-10 rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full h-[200px] absolute bottom-0 left-0">
          <div className="animate-clip w-full h-full bg-gradient-to-b from-transparent to-[#0f266c] block"></div>
        </div>
      </section>

      {/* how it works section */}
      <section>
        <div className="max-w-7xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto text-center basis-3/4 "
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A clear step-by-step process that takes you from learning the
              basics to contributing on real projects and getting paid for your
              work
            </p>
          </motion.div>
          <div className="w-full py-4 overflow-hidden mt-8 ">
            <motion.div className="w-full h-full flex gap-4 animate-slide">
              {howItWorks.map((item, _index) => (
                <Card key={item.step} className="min-w-[300px] max-h-80 p-4">
                  <div className="w-full h-full flex gap-2 flex-col text-center items-center">
                    <span className="bg-black/70 rounded-full p-4 text-white font-extrabold">
                      {item.step}
                    </span>
                    <h1 className="text-xl text-[#007bff]">{item.title}</h1>
                    <h4>{item.tagline}</h4>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto text-center basis-3/4 "
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive learning experience that bridges the gap
            between theory and real-world application.
          </p>
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 lg:px-8">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full md:basis-3/4 sticky overflow-y-auto top-28 z-30 max-h-64"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Platform Benefit Overview
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto"></p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-md shadow-lg p-4 gap-2 min-h-52"
                >
                  <h3 className="text-[#007bff]">{item.icon}</h3>
                  <p className="text-xl">{item.title}</p>
                  <p className="text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={ref}
        className="py-24 bg-gradient-to-r from-[#0f266c] to-[#007bff] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold mb-2">
                  {rate[index]}
                  {index == 2 ? "%" : "+"}
                </div>
                <div className="text-blue-100 capitalize">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of interns who have successfully launched their
              careers through our comprehensive program.
            </p>
            <Link to={ROUTES.APPLY}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494]"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const stats = [
  {
    start: 450,
    end: 500,
    title: "intern trained",
  },
  {
    start: 0,
    end: 50,
    title: "client project",
  },
  {
    start: 35,
    end: 80,
    title: "Job placement rate",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Apply",
    description:
      "Fill out the application form, upload your affirmation video, and showcase your starting skills.",
    tagline: "Your journey starts with one application.",
  },
  {
    step: 2,
    title: "Get Assessed",
    description:
      "Complete a timed skill test (CBT) and optional interview to determine your entry level.",
    tagline: "Show what you know, and we’ll place you where you’ll grow",
  },
  {
    step: 3,
    title: "Learn",
    description:
      "Access structured learning modules, quizzes, and beginner-friendly resources to build a solid foundation",
    tagline: "Step-by-step training designed for growth",
  },
  {
    step: 4,
    title: "Build Projects",
    description:
      "Work on mini-projects, peer reviews, and practical tasks that simulate real-world challenges.",
    tagline: "Apply your skills in real scenarios",
  },
  {
    step: 5,
    title: "Join Real Client Projects",
    description:
      "Get assigned to actual company or lab projects, collaborate with teams, and contribute to meaningful outcomes",
    tagline: "From practice to impact real projects, real experience",
  },
  {
    step: 6,
    title: "Earn & Grow",
    description:
      "Unlock your wallet, receive stipends and rewards, and track your progress toward certification and career opportunities.",
    tagline: "Get rewarded for your effort, and prepare for the job market",
  },
];
