import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const ProgressBar = ({ title, value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); 

  return (
    <div className="mb-5" ref={ref}>
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <span className="text-sm text-gray-800 dark:text-white">
          {value}%
        </span>
      </div>
      <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
        <motion.div
          className="flex flex-col justify-center rounded-full bg-blue-600 dark:bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${value}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
