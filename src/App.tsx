import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Mail, Bell, Languages, Compass, ChevronDown, CheckCircle, HelpCircle, BookOpen, Clock, AlertTriangle, Sun, Moon } from "lucide-react";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
    { id: 1, title: "Midterm Examination Schedule", description: "Ancient Civilizations midterm is next Tuesday. Review textbook chapters I to III.", urgent: true },
    { id: 2, title: "Essay Assignment Submission", description: "Submit your 'Comparison of direct Athenian and modern democracy' short response by Friday.", urgent: false }
  ];

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return (
    <div data-theme={theme} className="theme-shell paper-texture min-h-[100dvh] text-ink font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-accent-wash">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="bg-panel/90 backdrop-blur-md border-b border-line h-16 px-3 sm:px-4 md:px-8 flex justify-between items-center select-none sticky top-0 z-40">
        
        {/* Left: Vintage checkmark logo */}
        <div className="flex min-w-0 items-center gap-3 cursor-pointer" onClick={() => { setSelectedChapterId("civilization-state"); setSpecialViewType(null); }}>
          <div className="w-9 h-9 rounded-xl bg-fill flex items-center justify-center border border-fill shadow-sm transform hover:-rotate-3 transition-transform">
            <Check className="w-5 h-5 text-paper-soft stroke-[3]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-extrabold text-ink text-[13px] sm:text-[14px] md:text-base tracking-tight flex items-center gap-1.5 leading-none truncate">
              Interactive Study Platform
            </h1>
            <p className="text-[9px] font-mono text-ink-muted uppercase mt-1 tracking-[0.16em] font-bold">Grade 9 History</p>
          </div>
        </div>

        {/* Right: English select, mail, alerts, initials avatar logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-semibold text-ink-soft">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => { setShowLanguagesMenu(!showLanguagesMenu); setShowMessages(false); setShowNotifications(false); }}
              className="study-button flex items-center gap-1 hover:text-ink transition-colors py-1.5 px-2 rounded-lg hover:bg-accent-wash"
            >
              <Languages className="w-4 h-4 text-accent" />
              <span className="hidden sm:inline font-mono text-[10px] uppercase font-bold tracking-wider">{selectedLanguage}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showLanguagesMenu ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showLanguagesMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-36 study-panel rounded-xl shadow-xl py-2 z-50 text-left"
                >
                  {["ENGLISH"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLanguage(lang); setShowLanguagesMenu(false); }}
                      className="w-full text-left py-1.5 px-3 block text-xs text-ink hover:bg-accent-wash font-semibold cursor-pointer"
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
              className="study-button p-2 rounded-full hover:bg-accent-wash hover:text-ink relative transition-colors cursor-pointer"
            >
              <Mail className="w-[18px] h-[18px]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>

            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-[-3.5rem] sm:right-0 mt-2 w-[min(20rem,calc(100vw-1.5rem))] study-panel rounded-xl shadow-2xl p-4 z-50 text-left font-sans"
                >
                  <h4 className="font-bold border-b border-line-soft pb-2 text-ink mb-2.5">
                    History Office Messages
                  </h4>
                  <div className="space-y-3">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="text-xs study-panel-muted p-2.5 rounded-xl leading-relaxed text-ink-soft">
                        <div className="flex justify-between gap-3 font-bold text-ink text-[11px] mb-0.5">
                          <span>{msg.sender}</span>
                          <span className="font-mono text-[9px] text-ink-muted whitespace-nowrap">{msg.time}</span>
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
              className="study-button p-2 rounded-full hover:bg-accent-wash hover:text-ink relative transition-colors cursor-pointer"
            >
              <Bell className="w-[18px] h-[18px]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-[-1.5rem] sm:right-0 mt-2 w-[min(20rem,calc(100vw-1.5rem))] study-panel rounded-xl shadow-2xl p-4 z-50 text-left font-sans"
                >
                  <h4 className="font-bold border-b border-line-soft pb-2 text-ink mb-2.5 flex items-center justify-between">
                    <span>Upcoming Term Deadlines</span>
                    <span className="text-[9px] font-mono text-inverse bg-danger px-1.5 py-0.5 rounded-md">Urgent</span>
                  </h4>
                  <div className="space-y-3">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="text-xs border-l-4 border-accent bg-accent-wash/45 p-2.5 rounded-r-xl">
                        <div className="flex items-center gap-1.5 font-bold text-ink flex-wrap mb-1 text-[11px]">
                          {notif.urgent && <AlertTriangle className="w-3.5 h-3.5 text-danger" />}
                          <span>{notif.title}</span>
                        </div>
                        <p className="text-ink-soft leading-relaxed text-[10px]">{notif.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            className="study-button p-2 rounded-full hover:bg-accent-wash hover:text-ink transition-colors cursor-pointer"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
          </button>

          {/* Student Initial initials circle */}
          <div
            onClick={() => handleSelectSpecial("personal")}
            className="w-[34px] h-[34px] rounded-full bg-accent text-inverse flex items-center justify-center text-[13px] font-bold border border-accent hover:bg-fill hover:text-inverse transition-all cursor-pointer shadow-sm relative overflow-hidden group"
          >
            KA
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative z-10 p-3 sm:p-4 lg:p-6 gap-4 lg:gap-6">
        
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
                <div className="study-panel rounded-2xl px-4 py-3 md:px-5 md:py-4">
                  <p className="text-[10px] font-mono text-accent uppercase tracking-[0.16em] font-bold mb-1">Active chapter</p>
                  <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight leading-tight">
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
                  className="study-panel p-4 rounded-2xl"
                >
                  <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
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
      <footer className="bg-panel/70 border-t border-line py-4 px-4 sm:px-8 text-center select-none mt-8">
        <p className="text-[10px] font-mono tracking-wider text-ink-muted uppercase font-bold flex flex-wrap items-center justify-center gap-2">
          <span>Interactive Companion</span>
          <span>•</span>
          <span>Grade 9 History Curriculums</span>
          <span>•</span>
          <span>Archival Folio</span>
        </p>
      </footer>

    </div>
  );
}
