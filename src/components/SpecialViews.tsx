import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HelpCircle, Award, AwardIcon, CheckCircle, Notebook, Save, Trash2, GraduationCap, Clock, Flame, Calendar } from "lucide-react";

interface SpecialViewsProps {
  type: "what-is" | "personal";
  completedLessonCount: number;
  totalLessonCount: number;
  correctQuizCount: number;
  userEmail?: string;
}

export default function SpecialViews({
  type,
  completedLessonCount,
  totalLessonCount,
  correctQuizCount,
  userEmail = "krisianastas@gmail.com",
}: SpecialViewsProps) {
  
  // Storage for study notes
  const [personalNotes, setPersonalNotes] = useState<string>(() => {
    return localStorage.getItem("skh_study_notes") || "";
  });
  const [saveStatus, setSaveStatus] = useState<boolean>(false);

  // Auto-derived variables
  const studentName = userEmail.split("@")[0].replace(/[0-9]/g, "");
  const formattedStudentName = studentName.charAt(0).toUpperCase() + studentName.slice(1);
  
  // Timer for active study state
  const [studySeconds, setStudySeconds] = useState<number>(1420); // starts at 23 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setStudySeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const handleSaveNotes = () => {
    localStorage.setItem("skh_study_notes", personalNotes);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleClearNotes = () => {
    setPersonalNotes("");
    localStorage.removeItem("skh_study_notes");
  };

  // Calculating grades
  const scorePercent = totalLessonCount > 0 ? (correctQuizCount / totalLessonCount) * 100 : 0;
  let letterGrade = "F";
  let gradeColor = "text-danger";

  if (scorePercent >= 85) {
    letterGrade = "A";
    gradeColor = "text-success";
  } else if (scorePercent >= 70) {
    letterGrade = "B";
    gradeColor = "text-accent";
  } else if (scorePercent >= 50) {
    letterGrade = "C";
    gradeColor = "text-accent-soft";
  } else if (scorePercent >= 30) {
    letterGrade = "D";
    gradeColor = "text-accent";
  }

  if (type === "what-is") {
    return (
      <div className="space-y-6">
        {/* INTER STUDY FAQ GUIDELINES */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="study-panel rounded-2xl p-5 md:p-6 font-sans"
        >
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-extrabold text-ink">What is Interactive Study Platform - ISP?</h2>
          </div>

          <p className="text-xs text-ink-soft leading-relaxed mb-4">
            Welcome to the <strong className="font-semibold text-ink">Interactive Study Platform - ISP Digital Appendix</strong>, an immersive, high-fidelity animated learning platform built specifically for Grade 9 History students. This platform is designed to take static academic textbook frames and spark them to life through interactive components and dynamic vector modeling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="study-panel-muted rounded-xl p-3 text-xs">
              <h4 className="font-bold text-ink flex items-center gap-1.5 mb-1.5">
                <Notebook className="w-4 h-4 text-accent" /> Interactive Portals
              </h4>
              <p className="text-ink-soft leading-relaxed text-[11px]">
                Each chapter has a unique 3D-parallax vector scene! Moving your cursor across the illustrations shifts foreground silhouettes and background solar layers at differing rates, producing volumetric depth.
              </p>
            </div>

            <div className="study-panel-muted rounded-xl p-3 text-xs">
              <h4 className="font-bold text-ink flex items-center gap-1.5 mb-1.5">
                <CheckCircle className="w-4 h-4 text-accent" /> Active Micro-Quizzes
              </h4>
              <p className="text-ink-soft leading-relaxed text-[11px]">
                Review sub-lessons by opening their tabs on the right bar. Take instantly evaluated multiple-choice checks rooted in historical law codes and constitutional acts.
              </p>
            </div>
          </div>

          <p className="text-xs text-ink-soft leading-relaxed mt-4">
            Use the left sidebar navigation list to jump between archaeological blocks, and watch study metrics pile up in your <strong className="font-semibold text-ink">Personal Dashboard</strong> to unlock scholarly badges.
          </p>
        </motion.div>
      </div>
    );
  }

  // MY PERSONAL HUB
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      {/* COLUMN 1: STUDENT METRICS CARD */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="study-panel rounded-2xl p-4 md:p-5 lg:col-span-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 border-b border-line-soft pb-3 mb-4">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-extrabold text-ink">Academic Identity</h3>
          </div>

          <div className="text-center py-4 bg-paper-soft rounded-2xl border border-line-soft mb-4">
            <div className="w-14 h-14 bg-fill rounded-full mx-auto flex items-center justify-center text-inverse text-lg font-bold border-2 border-panel">
              KA
            </div>
            <h1 className="text-base font-bold text-ink mt-2.5 leading-tight">
              Krisi Anastas
            </h1>
            <p className="text-[9px] font-mono tracking-[0.16em] text-ink-muted uppercase font-bold mt-0.5">
              ID: ISP-2026-905
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center gap-3 bg-paper-soft p-2 rounded-xl border border-line-soft">
              <span className="text-ink-soft font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" /> Session Timer
              </span>
              <span className="font-mono font-bold text-ink whitespace-nowrap">{formatTime(studySeconds)}</span>
            </div>

            <div className="flex justify-between items-center gap-3 bg-paper-soft p-2 rounded-xl border border-line-soft">
              <span className="text-ink-soft font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-accent" /> Lesson Streaks
              </span>
              <span className="font-mono font-bold text-accent whitespace-nowrap">3 Days Active</span>
            </div>

            <div className="flex justify-between items-center gap-3 bg-paper-soft p-2 rounded-xl border border-line-soft">
              <span className="text-ink-soft font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-success" /> Current Date
              </span>
              <span className="font-mono font-semibold text-success text-[10px] whitespace-nowrap">2026-05-29</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-center font-mono text-ink-muted mt-4 leading-relaxed">
          Logged in as: {userEmail}
        </p>
      </motion.div>

      {/* COLUMN 2: SCOREBOARD & MILESTONES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="study-panel rounded-2xl p-4 md:p-5 lg:col-span-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 border-b border-line-soft pb-3 mb-4">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-extrabold text-ink">Report Scoreboard</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-paper-soft border border-line-soft rounded-xl p-3 text-center">
              <p className="text-[8px] font-mono text-ink-muted uppercase font-bold">Quizzes Passed</p>
              <h2 className="text-xl font-bold text-ink mt-1">
                {completedLessonCount}
              </h2>
            </div>
            <div className="bg-accent-wash border border-accent/25 rounded-xl p-3 text-center">
              <p className="text-[8px] font-mono text-accent uppercase font-bold">Accuracy Index</p>
              <h2 className="text-xl font-bold text-accent mt-1">
                {completedLessonCount ? `${Math.round((correctQuizCount / completedLessonCount) * 100)}%` : "0%"}
              </h2>
            </div>
          </div>

          <div className="text-center py-3 bg-paper-soft rounded-xl border border-line-soft flex items-center justify-around mb-4">
            <div>
              <p className="text-[8px] font-mono text-ink-muted uppercase font-bold">Derived Grade</p>
              <h1 className={`text-4xl font-display font-black leading-none mt-1 ${gradeColor}`}>
                {letterGrade}
              </h1>
            </div>
            <div className="h-10 w-px bg-line-soft" />
            <div className="text-left">
              <p className="text-[10px] font-semibold text-ink">
                {correctQuizCount} Core Answers Correct
              </p>
              <p className="text-[9px] text-ink-muted leading-relaxed">
                Target: 14 lessons total
              </p>
            </div>
          </div>

          {/* BADGE ALBUM RACK */}
          <div>
            <p className="text-[9px] font-mono uppercase text-ink-muted font-bold tracking-wide mb-2">Unlocked Badges ({completedLessonCount >= 3 ? 3 : completedLessonCount})</p>
            <div className="flex gap-2">
              <div className={`text-sm leading-none size-8 p-2 rounded-lg bg-paper-soft border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 1 ? "border-accent/40 text-accent" : "border-line-soft text-ink-muted opacity-70"}`}>
                <AwardIcon className="w-4 h-4" />
                <span className="hidden group-hover:block absolute bg-fill text-inverse text-[8px] p-1 rounded-md -top-8 w-24 text-center">First Code (Passed 1 Quiz)</span>
              </div>
              <div className={`text-sm leading-none size-8 p-2 rounded-lg bg-paper-soft border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 3 ? "border-accent/40 text-accent" : "border-line-soft text-ink-muted opacity-70"}`}>
                <Flame className="w-4 h-4" />
                <span className="hidden group-hover:block absolute bg-fill text-inverse text-[8px] p-1 rounded-md -top-8 w-24 text-center">Zeus Oracle (Passed 3 Quizzes)</span>
              </div>
              <div className={`text-sm leading-none size-8 p-2 rounded-lg bg-paper-soft border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 5 ? "border-accent/40 text-accent" : "border-line-soft text-ink-muted opacity-70"}`}>
                <GraduationCap className="w-4 h-4" />
                <span className="hidden group-hover:block absolute bg-fill text-inverse text-[8px] p-1 rounded-md -top-8 w-24 text-center">Steppe Arch (Passed 5 Quizzes)</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[9px] font-mono text-ink-muted leading-relaxed mt-4">
          Badges update instantly as you complete review checks in active chapters.
        </p>
      </motion.div>

      {/* COLUMN 3: PERSISTENT RESEARCH DIARY / STUDY NOTEPAD */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="study-panel rounded-2xl p-4 md:p-5 lg:col-span-1 flex flex-col justify-between"
      >
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 border-b border-line-soft pb-3 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <Notebook className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-extrabold text-ink">My Scriptorium Notepad</h3>
            </div>
            {saveStatus && (
              <span className="text-[9px] font-mono bg-success/10 border border-success/30 text-success px-1.5 py-0.5 rounded-md animate-pulse">
                Saved to Folio
              </span>
            )}
          </div>

          <p className="text-[10px] text-ink-muted leading-relaxed mb-3 font-sans italic">
            Draft your historical annotations, exam summaries, or key essay arguments here. Your notes persist automatically in modern local state.
          </p>

          <textarea
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            placeholder="Type your study insights here (e.g., Code of Hammurabi ensures civic law but keeps hierarchical order, Athenian democracy was limited to free adult males...)"
            className="w-full flex-1 min-h-[160px] p-3 rounded-xl border border-line bg-paper-soft text-xs leading-relaxed text-ink placeholder-ink-muted/70 focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-line-soft">
          <button
            onClick={handleClearNotes}
            className="study-button flex items-center gap-1.5 border border-line hover:bg-danger/10 text-ink-soft text-xs font-semibold py-1.5 px-3 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-danger" /> Reset
          </button>
          <button
            onClick={handleSaveNotes}
            className="study-button flex-1 flex items-center justify-center gap-1.5 bg-fill hover:bg-accent text-inverse text-xs font-semibold py-1.5 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Folio entry
          </button>
        </div>
      </motion.div>

    </div>
  );
}
