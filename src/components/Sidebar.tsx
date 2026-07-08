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
    <aside className="w-full lg:w-72 study-panel rounded-2xl flex flex-col p-4 font-sans select-none relative z-10 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100dvh-6rem)]">
      
      {/* Mini Title bar context */}
      <div className="mb-5 flex flex-col border-b border-line-soft pb-4">
        <h2 className="text-[10px] font-mono tracking-[0.16em] text-accent uppercase flex items-center gap-1.5 font-bold">
          <Compass className="w-3.5 h-3.5 text-accent" /> Course Navigation
        </h2>
        <h1 className="text-lg text-ink mt-1 font-extrabold leading-snug">
          History 9
          <span className="block text-sm font-semibold text-ink-soft">Rivers, realms, and kingdoms</span>
        </h1>
      </div>

      {/* Main Chapter Track Subtitle block */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-ink-soft">
        <BookOpen className="w-3.5 h-3.5 text-accent" />
        <span>History 9 - Rivers, Realms, and Kingdoms</span>
      </div>

      {/* Navigation Buttons List */}
      <div className="space-y-1.5 flex-1 lg:overflow-y-auto lg:pr-1">
        {chapters.map((ch) => {
          const isSelected = selectedId === ch.id && !activeSpecialType;
          return (
            <button
              key={ch.id}
              onClick={() => onSelect(ch.id)}
              className={`study-button w-full text-left py-2.5 px-3 rounded-xl text-xs leading-5 cursor-pointer font-semibold transition-all relative ${
                isSelected
                  ? "text-ink z-10"
                  : "text-ink-soft hover:bg-accent-wash/60 hover:text-ink"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-sidebar"
                  className="absolute inset-0 bg-accent-wash border border-accent/30 rounded-xl"
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
        <div className="h-px bg-line-soft my-4" />

        {/* Special Sections: FAQ & Personal Gradebook */}
        <button
          onClick={() => onSelectSpecial("what-is")}
          className={`study-button w-full text-left py-2 px-3 cursor-pointer rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all relative ${
            activeSpecialType === "what-is"
              ? "text-ink"
              : "text-ink-soft hover:bg-accent-wash/60 font-medium"
          }`}
        >
          {activeSpecialType === "what-is" && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute inset-0 bg-accent-wash border border-accent/30 rounded-xl"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <HelpCircle className="w-4 h-4 text-accent relative z-10" />
          <span className="relative z-10">What is Interactive Study Platform - ISP?</span>
        </button>

        <button
          onClick={() => onSelectSpecial("personal")}
          className={`study-button w-full text-left py-2 px-3 cursor-pointer rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all relative ${
            activeSpecialType === "personal"
              ? "text-ink"
              : "text-ink-soft hover:bg-accent-wash/60 font-medium"
          }`}
        >
          {activeSpecialType === "personal" && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute inset-0 bg-accent-wash border border-accent/30 rounded-xl"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <Award className="w-4 h-4 text-accent relative z-10" />
          <span className="relative z-10 font-bold">My Personal Dashboard</span>
        </button>
      </div>

      {/* Bottom info foot note */}
      <div className="mt-6 border-t border-line-soft pt-3 text-[10px] font-mono text-ink-muted flex justify-between items-center bg-paper-soft rounded-xl p-2">
        <span>Grade 9 Manual</span>
        <span className="text-accent">Live course</span>
      </div>
    </aside>
  );
}
