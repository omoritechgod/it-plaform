import React, { useEffect, useRef, useState } from "react";
import SubHero from "../components/common/SubHero";
import { motion } from "framer-motion";
import CTA from "../components/common/CTA";
import { Building2, Lightbulb, GraduationCap } from "lucide-react";
import Title from "../components/ui/Title"; // Ensure this path is correct

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

<h3 className="text-4xl font-bold mb-2">
  {rate[index]}
  {index == 2 ? "%" : "+"}
</h3>
// Add any additional components, logic, or data you want to include in the About page here.
// For example, you could add another section, a new feature, or additional styling.