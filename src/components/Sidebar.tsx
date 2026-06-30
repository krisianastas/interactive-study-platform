import { motion } from "motion/react";
import { HistoryChapter } from "../types";
import { BookOpen, HelpCircle, Award, Compass } from "lucide-react";

interface SidebarProps {
  chapters: HistoryChapter[];
  selectedId: string;
  onSelect: (id: string) => void;
  onSelectSpecial: (type: "what-is" | "personal") => void;
  activeSpecialType: "what-is" | "personal" | null;
}

export default function Sidebar({
  chapters,
  selectedId,
  onSelect,
  onSelectSpecial,
  activeSpecialType,
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-72 bg-[#111113] border-r border-white/5 flex flex-col p-4 font-sans select-none relative z-10 lg:min-h-screen">
      
      {/* Mini Title bar context */}
      <div className="mb-6 flex flex-col pt-2 border-b border-white/5 pb-4">
        <h2 className="text-xs font-mono tracking-widest text-white/40 uppercase flex items-center gap-1.5 font-semibold">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-indigo-400" /> Course Navigation
        </h2>
        <h1 className="text-lg font-serif italic text-[#E0E0E0] mt-1 font-semibold leading-relaxed">
          History 9 <br/>
          <span className="text-indigo-400">The Adventure Unfolds...</span>
        </h1>
      </div>

      {/* Main Chapter Track Subtitle block */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-white/60">
        <span className="inline-block w-1.5 h-1.5 transform rotate-45 bg-indigo-500" />
        <span>History 9 - Rivers, Realms, and Kingdoms</span>
      </div>

      {/* Navigation Buttons List */}
      <div className="space-y-1.5 flex-1">
        {chapters.map((ch) => {
          const isSelected = selectedId === ch.id && !activeSpecialType;
          return (
            <button
              key={ch.id}
              onClick={() => onSelect(ch.id)}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-xs leading-5 cursor-pointer font-medium transition-all relative ${
                isSelected
                  ? "text-indigo-300 z-10"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-sidebar"
                  className="absolute inset-0 bg-indigo-600/15 border border-indigo-500/30 rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 block line-clamp-2">
                {ch.sidebarTitle}
              </span>
            </button>
          );
        })}

        {/* Separator line */}
        <div className="h-px bg-white/5 my-4" />

        {/* Special Sections: FAQ & Personal Gradebook */}
        <button
          onClick={() => onSelectSpecial("what-is")}
          className={`w-full text-left py-2 px-3 cursor-pointer rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all relative ${
            activeSpecialType === "what-is"
              ? "text-indigo-300"
              : "text-white/60 hover:bg-white/5 font-medium"
          }`}
        >
          {activeSpecialType === "what-is" && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute inset-0 bg-indigo-600/15 border border-indigo-500/30 rounded-lg"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <HelpCircle className="w-4 h-4 text-indigo-400 relative z-10" />
          <span className="relative z-10">What is Interactive Study Platform - ISP?</span>
        </button>

        <button
          onClick={() => onSelectSpecial("personal")}
          className={`w-full text-left py-2 px-3 cursor-pointer rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all relative ${
            activeSpecialType === "personal"
              ? "text-indigo-300"
              : "text-white/60 hover:bg-white/5 font-medium"
          }`}
        >
          {activeSpecialType === "personal" && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute inset-0 bg-indigo-600/15 border border-indigo-500/30 rounded-lg"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <Award className="w-4 h-4 text-indigo-400 relative z-10" />
          <span className="relative z-10 font-bold">My Personal Dashboard</span>
        </button>
      </div>

      {/* Bottom info foot note */}
      <div className="mt-8 border-t border-white/5 pt-3 text-[10px] font-mono text-white/40 flex justify-between items-center bg-white/5 rounded p-2">
        <span>📖 Grade 9 Manual</span>
        <span className="text-indigo-400">v1.2 Live</span>
      </div>
    </aside>
  );
}
