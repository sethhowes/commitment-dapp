import { motion } from "framer-motion";

export const TickAnimation = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width="90"
      height="90"
    >
      <motion.path
        fill="none"
        strokeWidth="3"
        stroke="green"
        d="M14 27l7.8 7.8L38 18"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
};
