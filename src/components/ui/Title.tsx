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
      className="text-center md:text-left "
    >
        <h2 className="text-4xl mb-2 tracking-tighter  text-dark_blue">{title}</h2>
      <p className="text-lg text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};

export default Title;
