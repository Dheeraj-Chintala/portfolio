import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedProgress({ title, value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      {/* Title and Percentage */}
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <span className="text-sm text-gray-800 dark:text-white">
          {value}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="flex flex-col justify-center rounded-full bg-blue-600 dark:bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${value}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export default function Progress() {
  const skills = [
    { title: "Frontend (React, Tailwind)", value: 80 },
    { title: "Backend (Node.js, Supabase)", value: 70 },
    { title: "Android (Flutter, Firebase)", value: 75 },
    { title: "Data Structures & Algorithms", value: 65 },
  ];

  return (
    <div className="space-y-5">
      {skills.map((skill, idx) => (
        <AnimatedProgress key={idx} title={skill.title} value={skill.value} />
      ))}
    </div>
  );
}
