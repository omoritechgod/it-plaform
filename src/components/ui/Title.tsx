import React from "react";
import { motion } from "framer-motion";
type HeaderProps ={
    title: string,
    description?: string
}
const Title = ({title, description}: HeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-2xl w-[95%] flex justify-center items-center mx-auto text-center flex-col"
    >
      <div className="w-fit rounded-full px-4 py-2 mb-2 bg-black/5">
        <h2 className="title animate-gradient">{title}</h2>
      </div>
      <p className="text-xl text-blue mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default Title;
