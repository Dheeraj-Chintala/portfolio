import GlowingButton from "./GlowingButton";
import ProjectCard from "./ProjectCard";
import { FaGithub} from "react-icons/fa";

export default function Projects() {
  return (
    <div className="w-full md:w-[80%] mx-auto px-4 py-10 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold">Featured Projects</h1>
      <h2 className="text-gray-400 text-base md:text-lg mb-8 text-center">
        Showcasing innovative solutions that push the boundaries of technology
      </h2>

      {/* Wrapper */}
      <div
        className="
          flex flex-col gap-6 w-full
          md:flex-row md:overflow-x-scroll md:gap-8 md:pb-4  no-scrollbar 
        "
      > 
        <ProjectCard
          imageSrc="pr1.png"
          title="Quick 3D"
          description="Powerful React-based web application that enables users to effortlessly convert 2D images into 3D STL models. With its intuitive interface and real-time processing, Quick 3D bridges the gap between simple 2D artwork and fully functional 3D objects"
          pills={["ReactJS", "Python", "3D Modeling","Website"]}
          buttons={[
            {
              label: "Live Demo",
              type: "primary",
              icon: "",
              onClick: () => window.open("https://quick3d.vercel.app/", "_blank"),
            },
            {
              label: "Code",
              type: "secondary",
              icon: <FaGithub  />,
              onClick: () => window.open("https://github.com/Dheeraj-Chintala/Quick-3D", "_blank"),
            },
          ]}
        />
        <ProjectCard
          imageSrc="pr2.png"
          title="Flutter_text_utils"
          description="An efficient and powerful toolkit for string manipulation, text analysis and form validation."
          pills={["flutter-package", "dart", "toolkit","text-analysis","text-validation"]}
          buttons={[
            {
              label: "Explore Package",
              type: "primary",
              icon: "",
              onClick: () => window.open("https://pub.dev/packages/flutter_text_utils", "_blank"),
            },
            {
              label: "Code",
              type: "secondary",
              icon: <FaGithub  />,
              onClick: () => window.open("https://github.com/Dheeraj-Chintala/flutter-text-utils", "_blank"),
            },
          ]}
        />
        <ProjectCard
          imageSrc="pr3.png"
          title="Savour-AI"
          description="A cross-platform Flutter food discovery app with personalized AI, reels-style swipe UI, dynamic colors, and YouTube recipe tutorials."
          pills={["Flutter", "Dart", "AI","Food-Discovery","Mobile-App"]}
          buttons={[
            {
              label: "Download App",
              type: "primary",
              icon: "",
              onClick: () => window.open("https://github.com/Dheeraj-Chintala/Savour-AI/releases/tag/v1.0.0", "_blank"),
            },
            {
              label: "Code",
              type: "secondary",
              icon: <FaGithub  />,
              onClick: () => window.open("https://github.com/Dheeraj-Chintala/Savour-AI", "_blank"),
            },
          ]}
        />
         <div className="h-20 md:h-auto flex-shrink-0 flex items-center justify-center">
        <GlowingButton
          label="View More"
          onClick={() => window.open("https://github.com/Dheeraj-Chintala", "_blank")}
        />
      </div>
       
      </div>
    </div>
  );
}
