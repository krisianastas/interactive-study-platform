import { CheckCircle2, Bookmark, BookOpen, FileText } from "lucide-react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-5">
      
      {/* CARD 1: MAIN STUDY FOCUS */}
      <motion.div
        key={focusText} // Triggers slide-in transition on chapter change
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="study-panel rounded-2xl p-4 md:p-5 relative overflow-hidden flex flex-col justify-between"
      >
        {/* Soft layout framing */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent opacity-80" />
        
        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-[0.16em] text-accent uppercase flex items-center gap-1.5 mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Main ISP Focus
          </h3>
          <p className="text-sm leading-relaxed text-ink mb-3 font-semibold">
            {focusText}
          </p>
          
          <ul className="space-y-1.5 mt-2">
            {detailsList.map((detail, idx) => (
              <li key={idx} className="flex gap-2 items-start text-xs text-ink-soft">
                <span className="font-bold text-accent text-xs mt-0.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-3 border-t border-line-soft flex justify-between gap-3 items-center text-[10px] text-ink-muted font-mono">
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Grade 9 Standard Module</span>
          <span className="text-accent font-bold">Active Unit</span>
        </div>
      </motion.div>

      {/* CARD 2: TEXTBOOK REFERENCES */}
      <motion.div
        key={textbookRef.chapterTitle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="study-panel rounded-2xl p-4 md:p-5 relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-accent-soft opacity-80" />

        <div>
          <h3 className="text-[10px] font-mono font-bold tracking-[0.16em] text-accent uppercase flex items-center gap-1.5 mb-2.5">
            <Bookmark className="w-4 h-4 text-accent" /> Textbook Chapter / Title
          </h3>
          <div className="study-panel-muted rounded-xl p-3 mt-2 mb-3">
            <p className="text-[10px] font-mono text-accent font-bold uppercase tracking-[0.14em]">Course Chapter Title</p>
            <h4 className="text-[13px] font-bold text-ink leading-snug mt-1">
              {textbookRef.chapterTitle}
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center gap-3 py-1 border-b border-line-soft">
              <span className="text-ink-soft font-medium">Textbook Readings:</span>
              <span className="font-mono font-bold text-ink bg-paper-soft px-1.5 py-0.5 rounded-md text-[11px] whitespace-nowrap">
                {textbookRef.pages}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3 py-1">
              <span className="text-ink-soft font-medium">Practice Workbook Assignments:</span>
              <span className="font-semibold text-ink text-right">{textbookRef.practiceBook}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line-soft flex justify-between gap-3 items-center text-[10px] text-ink-muted font-mono">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Syllabus Cross References</span>
          <span className="text-[10px] bg-accent-wash border border-accent/25 text-accent px-1.5 py-0.5 rounded-md font-semibold">
            Exam Prep Ready
          </span>
        </div>
      </motion.div>
      
    </div>
  );
}
