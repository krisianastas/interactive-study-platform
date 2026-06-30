import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SyllabusLesson } from "../types";
import { HelpCircle, CheckCircle, Award, Volume2, Key, BookOpen, Quote } from "lucide-react";

interface SyllabusPanelProps {
  lessons: SyllabusLesson[];
  completedLessonIds: string[];
  onQuizSubmit: (lessonId: string, gotCorrect: boolean) => void;
  totalLessonCount: number;
  accentColor: string;
}

export default function SyllabusPanel({
  lessons,
  completedLessonIds,
  onQuizSubmit,
  totalLessonCount,
  accentColor,
}: SyllabusPanelProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Quiz states
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean | null>(null);

  const handleLessonClick = (lessonId: string) => {
    if (activeLessonId === lessonId) {
      setActiveLessonId(null);
    } else {
      setActiveLessonId(lessonId);
      // Reset quiz state
      setSelectedOptionIdx(null);
      setQuizSubmitted(false);
      setIsCorrectFeedback(null);
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitQuiz = (lesson: SyllabusLesson) => {
    if (selectedOptionIdx === null || quizSubmitted) return;
    setQuizSubmitted(true);
    
    const gotCorrect = selectedOptionIdx === lesson.quizQuestion?.correct;
    setIsCorrectFeedback(gotCorrect);
    
    onQuizSubmit(lesson.id, gotCorrect);
  };

  return (
    <div className="w-full lg:w-80 bg-[#111113] p-4 border-l border-white/5 font-sans flex flex-col relative" id="syllabus-parent-box">
      <div className="mb-4">
        <h3 className="text-xs font-mono tracking-wider text-white/40 uppercase font-bold flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Lesson Blueprint
        </h3>
        <h2 className="text-md font-serif font-semibold text-[#E0E0E0] leading-tight mt-1">
          Corresponding Syllabus Lessons
        </h2>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[500px] lg:max-h-none pr-1">
        {lessons.map((less, idx) => {
          const isOpen = activeLessonId === less.id;
          const isCompleted = completedLessonIds.includes(less.id);

          return (
            <motion.div
              key={less.id}
              layout
              className="border border-white/5 bg-[#17171A] rounded-lg p-3 shadow-sm hover:border-indigo-500/40 transition-all cursor-pointer gold-glow-hover decoration-none selection:bg-indigo-950"
              onClick={() => handleLessonClick(less.id)}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <h4 className="text-xs font-serif font-bold text-[#E0E0E0] tracking-tight leading-snug line-clamp-2">
                    {less.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wide font-mono font-semibold text-indigo-400 mt-1 flex items-center gap-1">
                    {less.lessons}
                  </p>
                </div>
                <div>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-emerald-400 bg-emerald-500/10 p-0.5 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/10" />
                  )}
                </div>
              </div>

              {/* Expandable Chapter Subsection details */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    onClick={(e) => e.stopPropagation()} // Stop bubbling up
                    className="overflow-hidden text-xs text-white/60 leading-relaxed border-t border-white/5 pt-2.5 space-y-3 cursor-default"
                  >
                    <p className="text-[11px] font-sans text-white/50">{less.summary}</p>

                    {/* Historical Quote Segment */}
                    {less.quote && (
                      <div className="bg-white/5 border-l-2 border-indigo-500 pl-2.5 py-1.5 rounded-r">
                        <p className="italic text-[10px] text-white/80 font-serif flex gap-1 items-start">
                          <Quote className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>"{less.quote}"</span>
                        </p>
                        {less.author && (
                          <p className="text-[9px] font-mono text-right text-indigo-300/80 mt-1 italic font-semibold">
                            — {less.author}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Interactive Quiz Segment */}
                    {less.quizQuestion && (
                      <div className="mt-3 bg-black/20 border border-white/5 rounded p-2.5">
                        <p className="font-mono text-[9px] font-bold text-indigo-400 flex items-center gap-1 uppercase mb-1">
                          <HelpCircle className="w-3 h-3" /> Quick Review Check
                        </p>
                        <p className="font-serif font-bold text-[11px] text-white/90 leading-snug mb-2">
                          {less.quizQuestion.question}
                        </p>

                        {/* Options */}
                        <div className="space-y-1">
                          {less.quizQuestion.options.map((opt, oIdx) => {
                            const isSelected = selectedOptionIdx === oIdx;
                            let btnStyle = "bg-[#1f1f23] hover:bg-white/5 border-white/5 text-white/70";
                            
                            if (isSelected) {
                              btnStyle = "bg-indigo-600/20 border-indigo-500 font-semibold text-indigo-200";
                            }
                            if (quizSubmitted) {
                              if (oIdx === less.quizQuestion?.correct) {
                                btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold";
                              } else if (isSelected) {
                                btnStyle = "bg-rose-550/10 border-rose-500 text-rose-300 line-through";
                              } else {
                                btnStyle = "bg-white/5 border-white/5 text-white/30 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleOptionSelect(oIdx)}
                                className={`w-full text-left py-1.5 px-2 rounded border text-[10px] transition-all flex items-start gap-1.5 ${btnStyle}`}
                              >
                                <span className="font-mono bg-white/5 text-indigo-300 rounded px-1 text-[8px] font-bold self-start mt-0.5">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Submission and Explanations */}
                        <div className="mt-2 text-right">
                          {!quizSubmitted ? (
                            <button
                              disabled={selectedOptionIdx === null}
                              onClick={() => handleSubmitQuiz(less)}
                              className={`text-[9px] font-semibold text-white px-2.5 py-1 rounded transition-colors ${
                                selectedOptionIdx === null
                                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                                  : "bg-indigo-600 hover:bg-indigo-500"
                              }`}
                            >
                              Verify Answer
                            </button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-left mt-2 p-1.5 bg-black/40 border border-white/5 text-[10px]"
                            >
                              <div className="flex items-center gap-1 font-bold mb-0.5">
                                {isCorrectFeedback ? (
                                  <span className="text-emerald-400">✓ Correct Answer!</span>
                                ) : (
                                  <span className="text-rose-400">✗ Incorrect Choice</span>
                                )}
                              </div>
                              <p className="text-white/55 leading-relaxed font-sans mt-0.5">
                                {less.quizQuestion.explanation}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Review Widget progress percentage */}
      <div className="mt-4 pt-3 border-t border-white/5 bg-white/5 rounded p-2.5 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-mono font-bold text-white/40 uppercase">Syllabus Completion</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessonIds.length / totalLessonCount) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="ml-3 text-right">
          <span className="font-mono text-xs font-bold text-white/90">
            {completedLessonIds.length}/{totalLessonCount}
          </span>
          <p className="text-[8px] font-semibold text-white/40">Passed</p>
        </div>
      </div>
    </div>
  );
}
