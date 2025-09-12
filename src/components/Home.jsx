import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <div className="  w-3/4  flex flex-col items-center justify-center gap-5 text-center  px-4  ">
      {/* Heading */}
      <br></br>
      <br></br>
      <motion.h1
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="myfont text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-400 font-bold"
      >
        Hi, I'm DHEERAJ
      </motion.h1>

      {/* Typing SVG */}
      

        {/* Desktop version */}
    <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut",delay:0.4 }}
        className="hidden md:block"
        src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=40&duration=4000&pause=800&color=F7F7F7&center=true&vCenter=true&width=700&lines=Android+App+Developer;Full+Stack+Developer;UI%2FUX+Designer"
        alt="Typing SVG Desktop"
      />

      {/* Mobile version */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="block md:hidden"
        src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=4000&pause=800&color=F7F7F7&center=true&vCenter=true&width=300&lines=Android+App+Developer;Full+Stack+Developer;UI%2FUX+Designer"
        alt="Typing SVG Mobile"
      />

      {/* Subheading / Description */}
      <div className="max-w-xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="myfont text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto text-center leading-relaxed"
        >
          Crafting next-generation digital experiences with cutting-edge
          technology and innovative design solutions
        </motion.h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <button
          className="cursor-pointer bg-blue-500 text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={() =>
            (window.location.href = "https://www.github.com/Dheeraj-Chintala")
          }
        >
          View My Work
        </button>
        <button className="cursor-pointer border border-blue-500 text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300">
          Download CV
        </button>
      </div>

      {/* Mouse Icon */}
      <Mouse size={50} color="gray" className="mt-12 animate-bounce" />
    </div>
    
  );
}

