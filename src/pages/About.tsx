import React, { useEffect, useRef, useState } from "react";
import SubHero from "../components/common/SubHero";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import Title from "../components/ui/Title";
import CTA from "../components/common/CTA";
import { Building2, Lightbulb, GraduationCap } from "lucide-react";

export interface CompanyArm {
  title: string;
  description: string;
  icon: React.ElementType;
  background: string;
}

const stats = [
  {
    start: 450,
    end: 500,
    title: "intern trained",
    description: "Empowering talents across diverse tech roles.",
  },
  {
    start: 0,
    end: 50,
    title: "client project",
    description: "Delivering real-world experience through client partnerships",
  },
  {
    start: 35,
    end: 80,
    title: "Job placement rate",
    description: "Turning internships into lasting career opportunities",
  },
];

const About = () => {
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
      <SubHero
        title="Empowering the Next Generation of Innovators."
        description="At Internship Platform, we believe in your potential to create,
              lead, and make an impact"
      />

      <section className="max-w-5xl relative py-20  px-4 md:px-0  mx-auto">
        <motion.div className="flex flex-col gap-20 justify-center px-4 py-8 bg-white shadow-md border rounded-md items-center">
          <div className="w-full flex justify-between items-start  text-gray-700 text-lg">
            <h1 className="max-w-xl w-11/12 text-dark_blue text-xl mb-2">Who We Are</h1>
            <p className="max-w-xl w-11/12">
              We’re building Africa’s most trusted ecosystem for experiential
              learning — connecting passionate interns to real projects, guided
              mentorship, and growth opportunities in tech. Our mission is to
              empower the next generation of innovators by providing hands-on
              experience that bridges the gap between education and career.
            </p>
          </div>
          <div className="w-full text-gray-700 text-lg flex flex-col gap-20">
            <div className="flex justify-between items-start">
              <h1 className="max-w-xl w-11/12 text-dark_blue text-xl mb-2">Mission</h1>
              <p className="max-w-xl w-11/12">
                We’re building Africa’s most trusted ecosystem for experiential
                learning — connecting passionate interns to real projects,
                guided mentorship, and growth opportunities in tech. Our mission
                is to empower the next generation of innovators by providing
                hands-on experience that bridges the gap between education and
                career.
              </p>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="max-w-xl w-11/12 text-dark_blue text-xl mb-2">Vision</h1>
              <p className="max-w-xl w-11/12">
                We’re building Africa’s most trusted ecosystem for experiential
                learning — connecting passionate interns to real projects,
                guided mentorship, and growth opportunities in tech. Our mission
                is to empower the next generation of innovators by providing
                hands-on experience that bridges the gap between education and
                career.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        ref={ref}
        className="max-w-5xl mx-auto py-10 px-4 md:px-0 grid md:grid-cols-3 gap-6"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-lg text-center flex flex-col items-center justify-center"
          >
            <h3 className="text-4xl font-bold mb-2">
              {rate[index]}
              {index == 2 ? "%" : "+"}
            </h3>
            <p className="font-bold text-2xl capitalize">{item.title}</p>
            <p className="font-normal lowercase">{item.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="md:max-w-5xl mx-auto px-4 md:px-0 py-10 pb-16 bg-[#FAFAFA]">
        <Title
          title="Our Structure"
          description="The Internship Platform is powered by three interconnected arms
            driving growth, innovation, and learning."
        />

        <div className="grid md:grid-cols-3 mt-6 gap-6">
          {companyArms.map((arm) => (
            <div
              key={arm.title}
              className="relative rounded-2xl overflow-hidden group shadow-md"
            >
              <img
                src={arm.background}
                alt={arm.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition"
              />
              <div className="relative p-8 bg-black/40 text-white backdrop-blur-sm h-full flex flex-col justify-center">
                <arm.icon className="w-10 h-10 mb-4 text-light_blue" />
                <h3 className="text-xl font-semibold mb-2">{arm.title}</h3>
                <p className="text-sm text-gray-200">{arm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;

const companyArms: CompanyArm[] = [
  {
    title: "Business Arm",
    description:
      "Handles client projects that generate revenue and provide real-world experience for our interns.",
    icon: Building2,
    background:
      "data:image/jpeg;base64,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",
  },
  {
    title: "NT Lab",
    description:
      "Focuses on research and innovation — developing digital products that can be patented and scaled.",
    icon: Lightbulb,
    background: "../src/assets/office.jpg",
  },
  {
    title: "NT Learn",
    description:
      "The learning and training division offering guided internship programs, certifications, and mentorship.",
    icon: GraduationCap,
    background:
      "data:image/jpeg;base64,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",
  },
];
