import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Award,
  DollarSign,
  Check,
  Users,
  Briefcase,
  BarChart2,
  Wallet,
  Star,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { ROUTES } from "../../config/constants";
import bg_image from "../../assets/bg-hero.jpg";
import hero_image from "../../assets/videos/hero-bg.gif";
import BtnWhite from "../../components/ui/BtnWhite";
import BtnTransparent from "../../components/ui/BtnTransparent";
import Title from "../../components/ui/Title";

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const organisation: FeatureItem[] = [
  {
    id: "manage-cohorts",
    title: "Manage cohorts",
    description: "Manage cohorts, candidates, and tests easily.",
    icon: <Users className="w-10 h-10" />,
  },
  {
    id: "post-projects",
    title: "Post projects",
    description: "Post company projects and assign by skill.",
    icon: <Briefcase className="w-10 h-10"  />,
  },
  {
    id: "monitor-progress",
    title: "Track & report",
    description: "Monitor intern progress and generate reports.",
    icon: <BarChart2 className="w-10 h-10" />,
  },
  {
    id: "fund-stipends",
    title: "Payments & wallet",
    description: "Fund stipends securely through the admin wallet.",
    icon: <Wallet className="w-10 h-10" />,
  },
];

export const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Structured Learning",
      description:
        "Progress through beginner to advanced levels with curated content and skill tests.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Real Projects",
      description:
        "Work on actual client projects and contribute to innovative digital products.",
    },

    {
      icon: <Award className="w-10 h-10"  />,
      title: "Certification",
      description:
        "Earn recognized certifications and build a portfolio that stands out.",
    },
    {
      icon: <DollarSign className="w-10 h-10"  />,
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
        <div className="w-full h-full bg-black/80 backdrop-saturate-100 z-30 absolute  left-0 right-0"></div>
        <div className="w-full h-full z-40 absolute left-0 right-0 pt-[40%] sm:pt-[32%] md:pt-[12%] px-5 md:px-10 lg:px-20">
          <div className="max-w-3xl w-full h-full flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              {["Launch", " Your ", "Tech ", "Career"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="text transition-colors duration-500"
                  style={{
                    color: index === count ? "#0077C0" : "#FAFAFA",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl text-gray-400 font-normal">
              Join our comprehensive internship program and transform from a
              beginner to a skilled professional ready for the tech industry.
            </p>

            <ul className=" mt-6">
              {["gain experience", "build projects", "get hired"].map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex text-gray-300 items-center gap-2 mb-1 capitalize"
                  >
                    <Check className="w-8 h-8" /> {item}
                  </li>
                )
              )}
            </ul>
            <div className="flex gap-4 justify-start">
              <Link to={ROUTES.APPLY}>
                <BtnWhite>Apply Now</BtnWhite>
              </Link>

              <Link to={ROUTES.ABOUT}>
                <BtnTransparent>Get To About Us</BtnTransparent>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src={hero_image}
            alt="Hero"
            className="w-full h-[550px] max-w-3xl mt-10 rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full h-[200px] absolute bottom-0 left-0">
          <div className="animate-clip w-full h-full bg-gradient-to-b from-transparent to-dark_blue block"></div>
        </div>
      </section>

      {/* breif narriation */}
      <section className="flex flex-col md:flex-row items-start justify-between py-20 px-8 gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h2 className="mb-6 text-blue text-3xl md:text-4xl">
            Internships should be more than checklists — they should be journeys
            of growth.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe internships should be more than tasks — they should be
            journeys of discovery and growth. Our platform connects interns with
            real-world projects, mentors, and learning paths that help them gain
            hands-on experience while developing practical skills. Whether
            you’re just starting out or refining your expertise, we make it easy
            to learn, build, and grow — every step of the way.
          </p>
        </div>

        <div className="md:w-1/2">
          <img
            src="data:image/jpeg;base64,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"
            alt="Interns collaborating on project"
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          />
        </div>
      </section>

      {/* how it works section */}
      <section>
        <div className="max-w-7xl mx-auto py-12">
          <Title
            title="How the Platform Works"
            description=" Simple, guided stages from application to real-world impact."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto text-center basis-3/4 "
          ></motion.div>
          <div className="w-full py-4 overflow-hidden mt-8 ">
            <motion.div className="w-full h-full grid grid-col-1 md:grid-cols-2 gap-4">
              {howItWorks.map((item, _index) => (
                <Card
                  key={item.step}
                  className="min-w-[300px] shadow-none max-h-80 p-4"
                >
                  <div className="w-full h-full flex gap-2 flex-col text-center items-center">
                    <span className="bg-black/70 rounded-[50%] p-6 px-8 text-white font-extrabold">
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
          <div className="w-full py-4 flex justify-center items-center overflow-hidden mt-8 ">
            <Link to={ROUTES.APPLY} className="mx-auto text-center">
              <BtnWhite>Get Started Today</BtnWhite>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={ref}
        className="py-24 bg-gradient-to-b from-light_blue to-[#007bff] text-white radius"
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
                <h3 className="text-4xl font-bold mb-2">
                  {rate[index]}
                  {index == 2 ? "%" : "+"}
                </h3>
                <div className="font-bold capitalize">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Title
          title="Why Choose Us?"
          description="We provide a comprehensive learning experience that bridges the gap
            between theory and real-world application."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 lg:px-8">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full md:basis-3/4 hidden md:block sticky  overflow-y-auto top-28 z-30 max-h-64"
            >
              <h2 className="text-3xl font-bold text-gray-600 mb-4">
                Platform Benefit Overview
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built to make internship management transparent, efficient, and
                rewarding for everyone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((item, index) => (
                <Card className="flex flex-col mb-2 gap-2" key={index}>
                  <h3 className="text-[#007bff]">{item.icon}</h3>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* for organization */}
      <section className="py-20">
        <Title
          title="Powering Smarter Intern Management"
          description="Streamline recruitment, tracking, and payments with a centralized admin dashboard."
        />
        <div className="max-w-7xl flex flex-col md:flex-row-reverse gap-8 md:gap-[5%] items-start justify-between mx-auto px-4 sm:px-6 mt-12 lg:px-8">
          <div className="h-full md:basis-[35%] static md:sticky  overflow-y-auto top-28 z-30 max-h-64">
            <img
              src="https://media1.tenor.com/m/SOU9_-UCEsYAAAAd/dhis2-dashboard.gif"
              alt="overview of how the admin works"
              className="rounded-2xl shadow-lg object-cover w-full h-auto"
            />
          </div>
          <div className="grid md:basis-[60%] md:grid-cols-2 gap-8">
            {organisation.map((item, _index) => (
              <Card key={item.id} className="flex flex-col mb-2 gap-2 ">
                <h3 className="text-[#007bff]">{item.icon}</h3>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section>
        <div className="max-w-7xl mx-auto py-12">
          <Title
            title="Real Growth, Real Impact"
            description="Hear from interns and teams using the platform."
          />
          <div className="w-full py-4 overflow-hidden mt-8 ">
            <motion.div className="w-full h-full flex gap-4 animate-slide">
              {testimonials.map((item, _index) => (
                <Card
                  key={item.id}
                  className="min-w-[300px] shadow-none max-h-80 p-4"
                >
                  <div className="w-full h-full flex gap-2 flex-col text-center items-center">
                    <p className="text-gray-500 text-xs">{item.compliment}</p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-[50%] object-fit"
                      />
                      <div>
                        <h1 className="text-base text-[#007bff]">
                          {item.name}
                        </h1>
                        <p className="flex gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              fill="#eab308"
                              className="w-4 h-4 text-yellow-500"
                            />
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
            <motion.div className="w-full h-full flex gap-4 animate-slide" style={{ animationDelay: '15s' }}>
              {testimonials.map((item, _index) => (
                <Card
                  key={item.id}
                  className="min-w-[300px] shadow-none max-h-80 p-4"
                >
                  <div className="w-full h-full flex gap-2 flex-col text-center items-center">
                    <p className="text-gray-500 text-xs">{item.compliment}</p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-[50%] object-fit"
                      />
                      <div>
                        <h1 className="text-base text-[#007bff]">
                          {item.name}
                        </h1>
                        <p className="flex gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              fill="#eab308"
                              className="w-4 h-4 text-yellow-500"
                            />
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
            <motion.div className="w-full h-full flex gap-4 animate-slide" style={{ animationDelay: '25s' }}>
              {testimonials.map((item, _index) => (
                <Card
                  key={item.id}
                  className="min-w-[300px] shadow-none max-h-80 p-4"
                >
                  <div className="w-full h-full flex gap-2 flex-col text-center items-center">
                    <p className="text-gray-500 text-xs">{item.compliment}</p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-[50%] object-fit"
                      />
                      <div>
                        <h1 className="text-base text-[#007bff]">
                          {item.name}
                        </h1>
                        <p className="flex gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              fill="#eab308"
                              className="w-4 h-4 text-yellow-500"
                            />
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
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

const testimonials = [
  {
    id: 1,
    name: "Sophia Daniels",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    compliment: "The platform made my internship journey smooth and rewarding!",
  },
  {
    id: 2,
    name: "Ethan Brooks",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 4,
    compliment: "Easy to use and great for tracking my learning progress.",
  },
  {
    id: 3,
    name: "Liam Carter",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    compliment:
      "Real projects helped me gain confidence and practical skills fast.",
  },
  {
    id: 4,
    name: "Amelia Nguyen",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    compliment: "Loved the mentorship and structured growth process here!",
  },
  {
    id: 5,
    name: "Noah Reed",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 4,
    compliment:
      "It connected me with real companies and real-world experience.",
  },
  {
    id: 6,
    name: "Grace Morgan",
    image:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    compliment:
      "Amazing platform — clear stages and transparent reward system!",
  },
];
