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
      className="max-w-2xl w-[95%] flex justify-start items-start flex-col"
    >
      <div className="mb-2">
        <h2 className="text-4xl tracking-tighter text-dark_blue">{title}</h2>
      </div>
      <p className="text-lg text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};

export default Title;
