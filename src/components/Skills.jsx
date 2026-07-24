import Physics from "./Physics";

export default function Skills() {
  return (
    <div className="w-full h-full flex items-center justify-center py-12 px-4 min-h-[70vh]">
      {/* Physics Gravity Gallery Box */}
      <div className="w-full md:w-4/5 lg:w-3/4 h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.1),inset_0_2px_20px_rgba(15,23,42,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_2px_20px_rgba(255,255,255,0.02)] relative z-20 pointer-events-auto bg-transparent backdrop-blur-xl">
        
        {/* Absolute Text overlay inside the box */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-0 pointer-events-none p-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 transition-colors duration-300 uppercase tracking-wider" style={{ color: "var(--color-text-primary)" }}>
            Tech Stack
          </h1>
          <h2 className="text-lg md:text-xl transition-colors duration-300 max-w-2xl mx-auto" style={{ color: "var(--color-text-body)" }}>
            Mastering the latest technologies to build tomorrow&apos;s digital solutions.
          </h2>
          <p className="mt-4 text-sm opacity-60 transition-colors duration-300 font-mono" style={{ color: "var(--color-text-body)" }}>
            (Drag and throw to interact)
          </p>
        </div>

        {/* Physics engine */}
        <div className="absolute inset-0 z-10">
          <Physics 
            size={120} 
            shape="circle" 
            friction={2}
            color="#1e293b"
          />
        </div>
      </div>
    </div>
  );
}
