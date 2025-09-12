import {
  FaJs,
  FaReact,
  FaHtml5,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { FaFlutter } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import { SiPostgresql } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import SkillCard from "./SkillCard";
import { SequentialFadeIn } from "./SequentialFadeIn";

export default function Skills() {
  return (
    <div className="rounded-xl w-full md:w-5/6 lg:w-3/4 mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      {/* Left Column */}
      <div className="flex flex-col gap-10 text-center md:text-left">
        {/* Main Heading */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Tech Stack</h1>
          <h2 className="text-gray-400 text-base md:text-lg">
            Mastering the latest technologies to build tomorrow&apos;s digital
            solutions
          </h2>
        </div>

        {/* Frontend */}
        <div>
          <h2
            className="text-lg md:text-xl font-semibold mb-4 relative inline-block 
               after:content-[''] after:block after:w-12 after:h-[3px] after:mt-1 
               after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-600"
          >
            Frontend
          </h2>

          <SequentialFadeIn className="flex flex-wrap justify-center md:justify-start gap-5">
            <SkillCard
              icon={<FaReact className="text-sky-400" />}
              label="React JS"
            />
            <SkillCard
              icon={<RiTailwindCssFill className="text-cyan-400" />}
              label="Tailwind"
            />
            <SkillCard
              icon={<FaHtml5 className="text-orange-500" />}
              label="HTML5"
            />
            <SkillCard
              icon={<FaJs className="text-yellow-400" />}
              label="JavaScript"
            />
          </SequentialFadeIn>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-10 text-center md:text-left">
        {/* Android Development */}
        <div>
          <h2
            className="text-lg md:text-xl font-semibold mb-4 relative inline-block 
               after:content-[''] after:block after:w-12 after:h-[3px] after:mt-1 
               after:bg-gradient-to-r after:from-sky-400 after:to-blue-600"
          >
            Android App development
          </h2>

          <SequentialFadeIn className="flex flex-wrap justify-center md:justify-start gap-5">
            <SkillCard
              icon={<FaFlutter className="text-sky-500" />}
              label="Flutter"
            />
            <SkillCard
              icon={<img src="riverpod.png" cla alt="Riverpod" className="h-10 " />}
              label="Riverpod"
            />
            <SkillCard
              icon={<SiPostgresql className="text-indigo-400" />}
              label="PostgresSQL"
            />
          </SequentialFadeIn>
        </div>

        {/* Backend */}
        <div>
          <h2
            className="text-lg md:text-xl font-semibold mb-4 relative inline-block 
               after:content-[''] after:block after:w-12 after:h-[3px] after:mt-1 
               after:bg-gradient-to-r after:from-green-400 after:to-green-600"
          >
            Backend
          </h2>

          <SequentialFadeIn className="flex flex-wrap justify-center md:justify-start gap-5">
            <SkillCard
              icon={<IoLogoFirebase className="text-yellow-500" />}
              label="Firebase"
            />
            <SkillCard
              icon={<RiSupabaseFill className="text-green-500" />}
              label="Supabase"
            />
            <SkillCard
              icon={<FaPython className="text-blue-500" />}
              label="Python"
            />
          </SequentialFadeIn>
        </div>

        {/* Tools */}
        <div>
          <h2
            className="text-lg md:text-xl font-semibold mb-4 relative inline-block 
               after:content-[''] after:block after:w-12 after:h-[3px] after:mt-1 
               after:bg-gradient-to-r after:from-red-400 after:to-red-600"
          >
            Tools & Platforms
          </h2>

          <SequentialFadeIn className="flex flex-wrap justify-center md:justify-start gap-5">
            <SkillCard
              icon={<VscVscode className="text-blue-400" />}
              label="VS Code"
            />
            <SkillCard
              icon={<FaGitAlt className="text-red-500" />}
              label="Git"
            />
            <SkillCard
              icon={<FaGithub className="text-gray-300" />}
              label="GitHub"
            />
          </SequentialFadeIn>
        </div>
      </div>
    </div>
  );
}
