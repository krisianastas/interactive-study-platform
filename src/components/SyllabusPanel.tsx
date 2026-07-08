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
    <div className="w-full lg:w-80 study-panel rounded-2xl p-4 font-sans flex flex-col relative lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100dvh-6rem)]" id="syllabus-parent-box">
      <div className="mb-4">
        <h3 className="text-[10px] font-mono tracking-[0.16em] text-accent uppercase font-bold flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-accent" /> Lesson Blueprint
        </h3>
        <h2 className="text-base font-extrabold text-ink leading-tight mt-1">
          Corresponding Syllabus Lessons
        </h2>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] lg:max-h-none pr-1">
        {lessons.map((less, idx) => {
          const isOpen = activeLessonId === less.id;
          const isCompleted = completedLessonIds.includes(less.id);

          return (
            <motion.div
              key={less.id}
              layout
              className="border border-line-soft bg-paper-soft rounded-xl p-3 shadow-sm transition-all cursor-pointer gold-glow-hover decoration-none selection:bg-accent-wash"
              onClick={() => handleLessonClick(less.id)}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-ink tracking-tight leading-snug line-clamp-2">
                    {less.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wide font-mono font-semibold text-accent mt-1 flex items-center gap-1">
                    {less.lessons}
                  </p>
                </div>
                <div>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-success bg-success/10 p-0.5 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-line" />
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
                    className="overflow-hidden text-xs text-ink-soft leading-relaxed border-t border-line-soft pt-2.5 space-y-3 cursor-default"
                  >
                    <p className="text-[11px] font-sans text-ink-soft">{less.summary}</p>

                    {/* Historical Quote Segment */}
                    {less.quote && (
                      <div className="bg-accent-wash/50 border-l-2 border-accent pl-2.5 py-1.5 rounded-r-xl">
                        <p className="italic text-[10px] text-ink flex gap-1 items-start">
                          <Quote className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>"{less.quote}"</span>
                        </p>
                        {less.author && (
                          <p className="text-[9px] font-mono text-right text-accent mt-1 italic font-semibold">
                            - {less.author}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Interactive Quiz Segment */}
                    {less.quizQuestion && (
                      <div className="mt-3 bg-panel border border-line-soft rounded-xl p-2.5">
                        <p className="font-mono text-[9px] font-bold text-accent flex items-center gap-1 uppercase mb-1">
                          <HelpCircle className="w-3 h-3" /> Quick Review Check
                        </p>
                        <p className="font-bold text-[11px] text-ink leading-snug mb-2">
                          {less.quizQuestion.question}
                        </p>

                        {/* Options */}
                        <div className="space-y-1">
                          {less.quizQuestion.options.map((opt, oIdx) => {
                            const isSelected = selectedOptionIdx === oIdx;
                            let btnStyle = "bg-paper-soft hover:bg-accent-wash/70 border-line-soft text-ink-soft";
                            
                            if (isSelected) {
                              btnStyle = "bg-accent-wash border-accent font-semibold text-ink";
                            }
                            if (quizSubmitted) {
                              if (oIdx === less.quizQuestion?.correct) {
                                btnStyle = "bg-success/10 border-success text-success font-bold";
                              } else if (isSelected) {
                                btnStyle = "bg-danger/10 border-danger text-danger line-through";
                              } else {
                                btnStyle = "bg-paper border-line-soft text-ink-muted opacity-60";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleOptionSelect(oIdx)}
                                className={`study-button w-full text-left py-1.5 px-2 rounded-lg border text-[10px] transition-all flex items-start gap-1.5 ${btnStyle}`}
                              >
                                <span className="font-mono bg-panel text-accent rounded px-1 text-[8px] font-bold self-start mt-0.5">
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
                              className={`study-button text-[9px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                                selectedOptionIdx === null
                                  ? "bg-line-soft text-ink-muted cursor-not-allowed"
                                  : "bg-fill hover:bg-accent text-inverse"
                              }`}
                            >
                              Verify Answer
                            </button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-left mt-2 p-2 bg-paper-soft border border-line-soft text-[10px] rounded-lg"
                            >
                              <div className="flex items-center gap-1 font-bold mb-0.5">
                                {isCorrectFeedback ? (
                                  <span className="text-success">Correct Answer!</span>
                                ) : (
                                  <span className="text-danger">Incorrect Choice</span>
                                )}
                              </div>
                              <p className="text-ink-soft leading-relaxed font-sans mt-0.5">
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
      <div className="mt-4 pt-3 border-t border-line-soft bg-paper-soft rounded-xl p-2.5 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-mono font-bold text-ink-muted uppercase">Syllabus Completion</p>
          <div className="w-full bg-line-soft h-1.5 rounded-full mt-1.5 overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessonIds.length / totalLessonCount) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="ml-3 text-right">
          <span className="font-mono text-xs font-bold text-ink">
            {completedLessonIds.length}/{totalLessonCount}
          </span>
          <p className="text-[8px] font-semibold text-ink-muted">Passed</p>
        </div>
      </div>
    </div>
  );
}
