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
  let gradeColor = "text-rose-400";

  if (scorePercent >= 85) {
    letterGrade = "A";
    gradeColor = "text-emerald-400";
  } else if (scorePercent >= 70) {
    letterGrade = "B";
    gradeColor = "text-indigo-400";
  } else if (scorePercent >= 50) {
    letterGrade = "C";
    gradeColor = "text-amber-400";
  } else if (scorePercent >= 30) {
    letterGrade = "D";
    gradeColor = "text-orange-400";
  }

  if (type === "what-is") {
    return (
      <div className="space-y-6">
        {/* INTER STUDY FAQ GUIDELINES */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111113] border border-white/5 rounded-xl p-5 md:p-6 shadow-sm font-sans"
        >
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-serif font-bold text-[#E0E0E0]">What is Interactive Study Platform - ISP?</h2>
          </div>

          <p className="text-xs text-white/60 leading-relaxed mb-4">
            Welcome to the **Interactive Study Platform - ISP Digital Appendix**, an immersive, high-fidelity animated learning platform built specifically for Grade 9 History students. This platform is designed to take static academic textbook frames and spark them to life through interactive components and dynamic vector modeling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-xs">
              <h4 className="font-serif font-bold text-[#E0E0E0] flex items-center gap-1.5 mb-1.5">
                🎨 Interactive Portals
              </h4>
              <p className="text-white/50 leading-relaxed text-[11px]">
                Each chapter has a unique 3D-parallax vector scene! Moving your cursor across the illustrations shifts foreground silhouettes and background solar layers at differing rates, producing volumetric depth.
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-xs">
              <h4 className="font-serif font-bold text-[#E0E0E0] flex items-center gap-1.5 mb-1.5">
                ⚡ Active Micro-Quizzes
              </h4>
              <p className="text-white/50 leading-relaxed text-[11px]">
                Review sub-lessons by opening their tabs on the right bar. Take instantly evaluated multiple-choice checks rooted in historical law codes and constitutional acts.
              </p>
            </div>
          </div>

          <p className="text-xs text-white/60 leading-relaxed mt-4">
            Use the left sidebar navigation list to jump between archaeological blocks, and watch study metrics pile up in your **Personal Dashboard** to unlock scholarly badges!
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
        className="bg-[#111113] border border-white/5 rounded-xl p-4 md:p-5 shadow-sm lg:col-span-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-serif font-bold text-[#E0E0E0]">Academic Identity</h3>
          </div>

          <div className="text-center py-4 bg-white/5 rounded-xl border border-white/5 mb-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-lg font-serif font-bold border-2 border-[#0A0A0B]">
              KA
            </div>
            <h1 className="text-md font-serif font-bold text-[#E0E0E0] mt-2.5 leading-tight">
              {"Krisi Anastas" || "Grade 9 Student"}
            </h1>
            <p className="text-[9px] font-mono tracking-widest text-white/40 uppercase font-bold mt-0.5">
              ID: ISP-2026-905
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center bg-[#17171A] p-2 rounded border border-white/5">
              <span className="text-white/60 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Session Timer
              </span>
              <span className="font-mono font-bold text-[#E0E0E0]">{formatTime(studySeconds)}</span>
            </div>

            <div className="flex justify-between items-center bg-[#17171A] p-2 rounded border border-white/5">
              <span className="text-white/60 font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> Lesson Streaks
              </span>
              <span className="font-mono font-bold text-orange-400">3 Days Active</span>
            </div>

            <div className="flex justify-between items-center bg-[#17171A] p-2 rounded border border-white/5">
              <span className="text-white/60 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Current Date
              </span>
              <span className="font-mono font-semibold text-emerald-400 text-[10px]">2026-05-29</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-center font-mono text-white/40 mt-4 leading-relaxed">
          Logged in as: {userEmail}
        </p>
      </motion.div>

      {/* COLUMN 2: SCOREBOARD & MILESTONES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111113] border border-white/5 rounded-xl p-4 md:p-5 shadow-sm lg:col-span-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
            <Award className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-serif font-bold text-[#E0E0E0]">Report Scoreboard</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#17171A] border border-white/5 rounded-lg p-3 text-center">
              <p className="text-[8px] font-mono text-white/40 uppercase font-bold">Quizzes Passed</p>
              <h2 className="text-xl font-serif font-bold text-[#E0E0E0] mt-1">
                {completedLessonCount}
              </h2>
            </div>
            <div className="bg-[#17171A] border border-white/5 rounded-lg p-3 text-center">
              <p className="text-[8px] font-mono text-indigo-400 uppercase font-bold">Accuracy Index</p>
              <h2 className="text-xl font-serif font-bold text-indigo-400 mt-1">
                {completedLessonCount ? `${Math.round((correctQuizCount / completedLessonCount) * 100)}%` : "0%"}
              </h2>
            </div>
          </div>

          <div className="text-center py-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-around mb-4">
            <div>
              <p className="text-[8px] font-mono text-white/40 uppercase font-bold">Derived Grade</p>
              <h1 className={`text-4xl font-display font-black leading-none mt-1 ${gradeColor}`}>
                {letterGrade}
              </h1>
            </div>
            <div className="h-10 w-px bg-white/5" />
            <div className="text-left">
              <p className="text-[10px] font-semibold text-[#E0E0E0]">
                {correctQuizCount} Core Answers Correct
              </p>
              <p className="text-[9px] text-white/40 leading-relaxed">
                Target: 14 lessons total
              </p>
            </div>
          </div>

          {/* BADGE ALBUM RACK */}
          <div>
            <p className="text-[9px] font-mono uppercase text-white/40 font-bold tracking-wide mb-2">Unlocked Badges ({completedLessonCount >= 3 ? 3 : completedLessonCount})</p>
            <div className="flex gap-2">
              <div className={`text-sm leading-none size-8 p-2 rounded bg-[#17171A] border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 1 ? "border-indigo-400/30 text-indigo-300" : "border-white/5 text-white/20 opacity-80"}`}>
                ⚖
                <span className="hidden group-hover:block absolute bg-[#0A0A0B] text-white text-[8px] p-1 rounded -top-8 w-24 text-center">First Code (Passed 1 Quiz)</span>
              </div>
              <div className={`text-sm leading-none size-8 p-2 rounded bg-[#17171A] border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 3 ? "border-indigo-400/30 text-indigo-300" : "border-white/5 text-white/20 opacity-80"}`}>
                ⚡
                <span className="hidden group-hover:block absolute bg-[#0A0A0B] text-white text-[8px] p-1 rounded -top-8 w-24 text-center">Zeus Oracle (Passed 3 Quizzes)</span>
              </div>
              <div className={`text-sm leading-none size-8 p-2 rounded bg-[#17171A] border flex items-center justify-center relative group cursor-help ${completedLessonCount >= 5 ? "border-indigo-400/30 text-indigo-300" : "border-white/5 text-white/20 opacity-80"}`}>
                🏹
                <span className="hidden group-hover:block absolute bg-[#0A0A0B] text-white text-[8px] p-1 rounded -top-8 w-24 text-center">Steppe Arch (Passed 5 Quizzes)</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[9px] font-mono text-white/40 leading-relaxed mt-4">
          ★ Badges update instantly as you complete review checks in active chapters.
        </p>
      </motion.div>

      {/* COLUMN 3: PERSISTENT RESEARCH DIARY / STUDY NOTEPAD */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#111113] border border-white/5 rounded-xl p-4 md:p-5 shadow-sm lg:col-span-1 flex flex-col justify-between"
      >
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <Notebook className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-serif font-bold text-[#E0E0E0]">My Scriptorium Notepad</h3>
            </div>
            {saveStatus && (
              <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded animate-pulse">
                Saved to Folio
              </span>
            )}
          </div>

          <p className="text-[10px] text-white/40 leading-relaxed mb-3 font-sans italic">
            Draft your historical annotations, exam summaries, or key essay arguments here. Your notes persist automatically in modern local state.
          </p>

          <textarea
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            placeholder="Type your study insights here (e.g., Code of Hammurabi ensures civic law but keeps hierarchical order, Athenian democracy was limited to free adult males...)"
            className="w-full flex-1 min-h-[160px] p-3 rounded-lg border border-white/5 bg-[#17171A] text-xs font-serif leading-relaxed text-[#E0E0E0] placeholder-white/20 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
          <button
            onClick={handleClearNotes}
            className="flex items-center gap-1.5 border border-white/5 hover:bg-white/5 text-white/40 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-400" /> Reset
          </button>
          <button
            onClick={handleSaveNotes}
            className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-1.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Folio entry
          </button>
        </div>
      </motion.div>

    </div>
  );
}
