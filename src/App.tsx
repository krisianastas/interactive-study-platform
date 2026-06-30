import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Mail, Bell, Languages, Compass, ChevronDown, CheckCircle, HelpCircle, BookOpen, Clock, AlertTriangle } from "lucide-react";

// Components
import Sidebar from "./components/Sidebar";
import SyllabusPanel from "./components/SyllabusPanel";
import FocusCards from "./components/FocusCards";
import SpecialViews from "./components/SpecialViews";

// Animated Illustrations
import ChapterOneIllustration from "./components/animated/ChapterOneIllustration";
import ChapterTwoIllustration from "./components/animated/ChapterTwoIllustration";
import ChapterThreeIllustration from "./components/animated/ChapterThreeIllustration";
import ChapterFourIllustration from "./components/animated/ChapterFourIllustration";
import ChapterFiveIllustration from "./components/animated/ChapterFiveIllustration";

// Data
import { historyChapters } from "./data";
import { SyllabusLesson } from "./types";

export default function App() {
  // Current selecting coordinates
  const [selectedChapterId, setSelectedChapterId] = useState<string>("civilization-state");
  const [specialViewType, setSpecialViewType] = useState<"what-is" | "personal" | null>(null);

  // States for interactive Quiz completion tracking
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  
  const [correctQuizCount, setCorrectQuizCount] = useState<number>(0);

  // UI Micro-interaction states
  const [showLanguagesMenu, setShowLanguagesMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Submit quiz handler
  const handleQuizSubmit = (lessonId: string, gotCorrect: boolean) => {
    if (completedLessonIds.includes(lessonId)) return; // No duplication

    const updated = [...completedLessonIds, lessonId];
    setCompletedLessonIds(updated);

    if (gotCorrect) {
      setCorrectQuizCount((prev) => prev + 1);
    }
  };

  const activeChapter = historyChapters.find((ch) => ch.id === selectedChapterId) || historyChapters[0];

  // Quick select reset
  const handleSelectChapter = (id: string) => {
    setSelectedChapterId(id);
    setSpecialViewType(null); // Return to standard chapter view
  };

  const handleSelectSpecial = (type: "what-is" | "personal") => {
    setSpecialViewType(type);
  };

  // Messages log
  const mockMessages = [
    { id: 1, sender: "Prof. Albert Gellért", text: "Welcome to Grade 9 History, Krisian! Let me know if you run into any questions about the Hammurabi Code assignments.", time: "9:05 AM" },
    { id: 2, sender: "Interactive Study Platform", text: "Welcome! Your visual portfolio for the Arpad Conquest has been synchronized.", time: "Yesterday" }
  ];

  // Announcements notifications log
  const mockNotifications = [
    { id: 1, title: "📅 Midterm Examination Schedule", description: "Ancient Civilizations midterm is next Tuesday. Review textbook chapters I to III.", urgent: true },
    { id: 2, title: "📝 Essay Assignment Submission", description: "Submit your 'Comparison of direct Athenian and modern democracy' short response by Friday.", urgent: false }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-indigo-950">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="bg-[#111113]/95 backdrop-blur-md border-b border-white/5 h-16 px-4 md:px-8 flex justify-between items-center select-none sticky top-0 z-40">
        
        {/* Left: Vintage checkmark logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedChapterId("civilization-state"); setSpecialViewType(null); }}>
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center border border-white/10 shadow-sm transform hover:rotate-6 transition-transform">
            <Check className="w-5 h-5 text-white stroke-[3]" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-[#E0E0E0] text-[14px] md:text-md tracking-wider flex items-center gap-1.5 uppercase leading-none">
              Interactive Study Platform
            </h1>
            <p className="text-[9px] font-mono text-white/40 uppercase mt-0.5 tracking-widest font-bold">Grade 9 Companion</p>
          </div>
        </div>

        {/* Right: English select, mail, alerts, initials avatar logo */}
        <div className="flex items-center gap-4 text-xs font-semibold text-white/60">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => { setShowLanguagesMenu(!showLanguagesMenu); setShowMessages(false); setShowNotifications(false); }}
              className="flex items-center gap-1 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/5"
            >
              <Languages className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">{selectedLanguage}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showLanguagesMenu ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showLanguagesMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-36 bg-[#111113] border border-white/5 rounded-lg shadow-xl py-2 z-50 text-left font-serif"
                >
                  {["ENGLISH"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLanguage(lang); setShowLanguagesMenu(false); }}
                      className="w-full text-left py-1.5 px-3 block text-xs text-[#E0E0E0] hover:bg-white/5 font-semibold"
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scriptorium Mail drawer button */}
          <div className="relative">
            <button
              onClick={() => { setShowMessages(!showMessages); setShowLanguagesMenu(false); setShowNotifications(false); }}
              className="p-1.5 rounded-full hover:bg-white/5 hover:text-white relative transition-colors"
            >
              <Mail className="w-4.5 h-4.5" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            </button>

            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-[#111113] border border-white/5 rounded-xl shadow-2xl p-4 z-50 text-left font-sans"
                >
                  <h4 className="font-serif font-bold border-b border-white/5 pb-2 text-[#E0E0E0] mb-2.5">
                    History Office Messages
                  </h4>
                  <div className="space-y-3">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="text-xs bg-[#17171A] p-2.5 rounded border border-white/5 leading-relaxed text-white/70">
                        <div className="flex justify-between font-bold text-white/90 text-[11px] mb-0.5 font-serif">
                          <span>{msg.sender}</span>
                          <span className="font-mono text-[9px] text-white/40">{msg.time}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* School Announcements bell notification panel */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowLanguagesMenu(false); setShowMessages(false); }}
              className="p-1.5 rounded-full hover:bg-white/5 hover:text-white relative transition-colors"
            >
              <Bell className="w-4.5 h-4.5" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-[#111113] border border-white/5 rounded-xl shadow-2xl p-4 z-50 text-left font-sans"
                >
                  <h4 className="font-serif font-bold border-b border-white/5 pb-2 text-[#E0E0E0] mb-2.5 flex items-center justify-between">
                    <span>Upcoming Term Deadlines</span>
                    <span className="text-[9px] font-mono text-white bg-indigo-600 px-1.5 py-0.5 rounded">Urgent</span>
                  </h4>
                  <div className="space-y-3">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="text-xs border-l-3 border-indigo-500 bg-[#17171A] p-2.5 rounded-r">
                        <div className="flex items-center gap-1.5 font-bold text-white/90 flex-wrap mb-1 text-[11px] font-serif">
                          {notif.urgent && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                          <span>{notif.title}</span>
                        </div>
                        <p className="text-white/45 leading-relaxed text-[10px]">{notif.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Student Initial initials circle */}
          <div
            onClick={() => handleSelectSpecial("personal")}
            className="w-8.5 h-8.5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-serif text-[13px] font-bold border border-white/10 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer shadow-sm relative overflow-hidden group"
          >
            KA
            <div className="absolute inset-x-0 bottom-0 bg-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative z-10 p-4 lg:p-6 gap-6">
        
        {/* Left Sidebar tracking option coordinates */}
        <Sidebar
          chapters={historyChapters}
          selectedId={selectedChapterId}
          onSelect={handleSelectChapter}
          onSelectSpecial={handleSelectSpecial}
          activeSpecialType={specialViewType}
        />

        {/* Center Canvas Workspace */}
        <main className="flex-1 flex flex-col justify-start">
          
          <AnimatePresence mode="wait">
            {!specialViewType ? (
              <motion.div
                key={selectedChapterId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Visual Header context: Number and Title of active lesson */}
                <div className="py-2 border-b border-white/5 mb-1">
                  <h1 className="text-xl md:text-2xl font-serif font-black text-[#E0E0E0] tracking-tight leading-tight">
                    {activeChapter.romanId}. {activeChapter.title}
                  </h1>
                </div>

                {/* Main animated photo viewport depending on selected chapter */}
                <div className="relative">
                  {selectedChapterId === "civilization-state" && <ChapterOneIllustration />}
                  {selectedChapterId === "religions-ancient-1" && <ChapterTwoIllustration />}
                  {selectedChapterId === "religions-ancient-2" && <ChapterThreeIllustration />}
                  {selectedChapterId === "medieval-europe" && <ChapterFourIllustration />}
                  {selectedChapterId === "hungarian-origins" && <ChapterFiveIllustration />}
                </div>

                {/* Subtitle brief textbook outline quote under central frame */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#111113] p-4 rounded-xl border border-white/5"
                >
                  <p className="text-xs md:text-sm font-serif italic text-white/70 leading-relaxed">
                    {activeChapter.tagline}
                  </p>
                </motion.div>

                {/* bottom expandable double guidelines references cards */}
                <FocusCards
                  focusText={activeChapter.focusText}
                  detailsList={activeChapter.detailsList}
                  textbookRef={activeChapter.textbookRef}
                />

              </motion.div>
            ) : (
              <motion.div
                key={specialViewType}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <SpecialViews
                  type={specialViewType}
                  completedLessonCount={completedLessonIds.length}
                  totalLessonCount={11} // total available micro quiz keys
                  correctQuizCount={correctQuizCount}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* Right sub-lessons checklist/trivia timeline tracker */}
        {!specialViewType && (
          <SyllabusPanel
            lessons={activeChapter.syllabusLessons}
            completedLessonIds={completedLessonIds}
            onQuizSubmit={handleQuizSubmit}
            totalLessonCount={11}
            accentColor={activeChapter.colorTheme.primary}
          />
        )}

      </div>

      {/* 3. VISUAL FOOTER FOOTNOTE */}
      <footer className="bg-[#111113] border-t border-white/5 py-4 px-8 text-center select-none mt-10">
        <p className="text-[10px] font-mono tracking-wider text-white/40 uppercase font-bold flex items-center justify-center gap-2">
          <span>🛡 Interactive Companion</span>
          <span>•</span>
          <span>Grade 9 History Curriculums</span>
          <span>•</span>
          <span>Archival Folio 2026</span>
        </p>
      </footer>

    </div>
  );
}
