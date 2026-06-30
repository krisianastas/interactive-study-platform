import { Book, CheckCircle2, Bookmark, Award } from "lucide-react";
import { TextbookReference } from "../types";
import { motion } from "motion/react";

interface FocusCardsProps {
  focusText: string;
  detailsList: string[];
  textbookRef: TextbookReference;
}

export default function FocusCards({
  focusText,
  detailsList,
  textbookRef,
}: FocusCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      
      {/* CARD 1: MAIN STUDY FOCUS */}
      <motion.div
        key={focusText} // Triggers slide-in transition on chapter change
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#111113] border border-white/5 rounded-xl p-4 md:p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
      >
        {/* Soft layout framing */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600 opacity-75" />
        
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase flex items-center gap-1.5 mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Main ISP Focus
          </h3>
          <p className="text-xs leading-relaxed text-[#E0E0E0] font-serif italic mb-3">
            {focusText}
          </p>
          
          <ul className="space-y-1.5 mt-2">
            {detailsList.map((detail, idx) => (
              <li key={idx} className="flex gap-2 items-start text-xs text-white/60">
                <span className="font-bold text-indigo-400 text-xs mt-0.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 font-mono">
          <span>📚 Grade 9 Standard Module</span>
          <span className="text-xs text-indigo-400 font-bold">★ Active Unit</span>
        </div>
      </motion.div>

      {/* CARD 2: TEXTBOOK REFERENCES */}
      <motion.div
        key={textbookRef.chapterTitle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[#111113] border border-white/5 rounded-xl p-4 md:p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500 opacity-75" />

        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase flex items-center gap-1.5 mb-2.5">
            <Bookmark className="w-4 h-4 text-indigo-400" /> Textbook Chapter / Title
          </h3>
          <div className="bg-white/5 rounded-lg p-3 border border-white/5 mt-2 mb-3">
            <p className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wide">Course Chapter Title</p>
            <h4 className="text-[13px] font-serif font-bold text-[#E0E0E0] leading-snug mt-1">
              {textbookRef.chapterTitle}
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-white/45 font-medium">Textbook Readings:</span>
              <span className="font-mono font-bold text-[#E0E0E0] bg-white/5 px-1.5 py-0.5 rounded text-[11px]">
                {textbookRef.pages}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white/45 font-medium">Practice Workbook Assignments:</span>
              <span className="font-serif italic text-[#E0E0E0]">{textbookRef.practiceBook}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 font-mono">
          <span>🖨 Syllabus Cross References</span>
          <span className="text-[10px] bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded font-semibold">
            Exam Prep Ready
          </span>
        </div>
      </motion.div>
      
    </div>
  );
}
