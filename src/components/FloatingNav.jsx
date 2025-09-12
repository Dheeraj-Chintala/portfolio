
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";

export default function FloatingNav() {
  return (
    <>
      {/* Desktop Nav: Top Center */}
      <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50
                      justify-between items-center
                      backdrop-blur-xl shadow-lg rounded-full px-6 py-3 gap-6
                      border border-blue-200 text-white">
        <a href="#home" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <Home size={20} className="transition-transform duration-150 hover:scale-125" />
          <span className="text-white" >Home</span>
        </a>
        <a href="#about" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <User size={20} className="transition-transform duration-150 hover:scale-125" />
          <span className="text-white">About</span>
        </a>
        <a href="#skills" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <Briefcase size={20} className="transition-transform duration-150 hover:scale-125" />
          <span className="text-white">Skills</span>
        </a>
        <a href="#projects" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <FileText size={20} className="transition-transform duration-150 hover:scale-125" />
          <span className="text-white">Projects</span>
        </a>
        <a href="#contact" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <Mail size={20} className="transition-transform duration-150 hover:scale-125" />
          <span className="text-white">Contact</span>
        </a>
      </div>

      {/* Mobile Nav: Bottom Center */}
      <div className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]
                      justify-between items-center
                       backdrop-blur-md shadow-lg rounded-full px-6 py-3 gap-6
                      border border-blue-200">
        <a href="#home" className="text-gray-500 hover:text-blue-500">
          <Home size={24} className="transition-transform duration-150 hover:scale-125" />
        </a>
        <a href="#about" className="text-gray-600 hover:text-blue-500">
          <User size={24} className="transition-transform duration-150 hover:scale-125" />
        </a>
        <a href="#skills" className="text-gray-600 hover:text-blue-500">
          <Briefcase size={24} className="transition-transform duration-150 hover:scale-125" />
        </a>
        <a href="#projects" className="text-gray-600 hover:text-blue-500">
          <FileText size={24} className="transition-transform duration-150 hover:scale-125" />
        </a>
        <a href="#contact" className="text-gray-600 hover:text-blue-500">
          <Mail size={24} className="transition-transform duration-150 hover:scale-125" />
        </a>
      </div>
    </>
  );
}
