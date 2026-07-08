import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function ChapterTwoIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax vectors
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const wheelX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const wheelY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  const templeX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const templeY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const valX = (e.clientX - rect.left) / rect.width - 0.5;
    const valY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(valX);
    mouseY.set(valY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // State for shooting stars & click interaction
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-crosshair border border-[#d2bc99] bg-[#1d161d] shadow-2xl select-none"
    >
      {/* 1. Starry cosmic background layer */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Deep violet gradient */}
          <rect width="800" height="500" fill="url(#violet-night)" />

          {/* Glowing nebulas */}
          <circle cx="200" cy="150" r="140" fill="rgba(157, 82, 177, 0.12)" filter="blur(60px)" />
          <circle cx="600" cy="200" r="160" fill="rgba(223, 163, 67, 0.08)" filter="blur(70px)" />

          {/* Twinkling Stars */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={80 + i * 45 + (i % 3) * 12}
              cy={30 + (i % 4) * 45 + (i * 7) % 30}
              r={1 + (i % 3) * 0.6}
              fill="#ebd0f5"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + (i % 5) * 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="violet-night" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#120c18" />
              <stop offset="50%" stopColor="#22122c" />
              <stop offset="100%" stopColor="#11071c" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Slowly Rotating Astral Wheel & Constellations */}
      <motion.g
        style={{ x: wheelX, y: wheelY, translatePercentX: "-50%", translatePercentY: "-50%" }}
        className="absolute top-1/4 left-1/2 w-80 h-80 opacity-40 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-dashed border-[#cd9af3]/30 rounded-full flex items-center justify-center relative"
        >
          {/* Constellation connectors and paths */}
          <svg className="w-full h-full absolute inset-0 text-amber-select/25" stroke="currentColor" strokeWidth="1">
            <line x1="160" y1="10" x2="200" y2="60" />
            <line x1="200" y1="60" x2="140" y2="120" />
            <line x1="140" y1="120" x2="110" y2="80" />
            <line x1="110" y1="80" x2="160" y2="10" />

            {/* Inner Ring */}
            <circle cx="160" cy="160" r="100" fill="none" strokeWidth="0.5" strokeDasharray="4,4" />
            <circle cx="160" cy="160" r="150" fill="none" strokeWidth="0.5" strokeDasharray="2,8" />
          </svg>
        </motion.div>
      </motion.g>

      {/* 3. Deep Temple Sanctuary Layer with Columns and Brazier */}
      <motion.div style={{ x: templeX, y: templeY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Temple Pediment and Columns in deep silhouette */}
          {/* Floor steps */}
          <rect x="-20" y="440" width="840" height="20" fill="#170c1d" />
          <rect x="0" y="415" width="800" height="25" fill="#2d1d36" stroke="#483354" strokeWidth="1.5" />
          <rect x="30" y="390" width="740" height="25" fill="#3a2544" stroke="#483354" strokeWidth="1.5" />

          {/* Left Columns */}
          <g className="cursor-pointer" onClick={() => setActiveConstellation("osiris")}>
            <rect x="80" y="80" width="50" height="310" fill="#2f1a3a" stroke="#1d0a25" strokeWidth="3.5" />
            <path d="M 75,80 H 135 L 125,60 H 85 Z" fill="#4d305a" stroke="#1d0a25" strokeWidth="2.5" />
            
            {/* Fluting of columns */}
            <line x1="95" y1="80" x2="95" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
            <line x1="105" y1="80" x2="105" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
            <line x1="115" y1="80" x2="115" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Right Columns */}
          <g className="cursor-pointer" onClick={() => setActiveConstellation("zeus")}>
            <rect x="670" y="80" width="50" height="310" fill="#2f1a3a" stroke="#1d0a25" strokeWidth="3.5" />
            <path d="M 665,80 H 725 L 715,60 H 675 Z" fill="#4d305a" stroke="#1d0a25" strokeWidth="2.5" />
            
            {/* Fluting */}
            <line x1="685" y1="80" x2="685" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
            <line x1="695" y1="80" x2="695" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
            <line x1="705" y1="80" x2="705" y2="390" stroke="#1d0a25" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Temple Pediment Triangle Top */}
          <polygon points="5,60 795,60 400,-15" fill="#22122a" stroke="#1d0a25" strokeWidth="4" />
          <polygon points="40,55 760,55 400,-1" fill="#422950" stroke="#1d0a25" strokeWidth="2.5" />
          
          {/* Ornate bronze triglyphs */}
          <rect x="50" y="55" width="20" height="25" fill="#1d0c24" />
          <rect x="180" y="55" width="20" height="25" fill="#1d0c24" />
          <rect x="390" y="55" width="20" height="25" fill="#1d0c24" />
          <rect x="600" y="55" width="20" height="25" fill="#1d0c24" />
          <rect x="730" y="55" width="20" height="25" fill="#1d0c24" />

          {/* Center: Glowing Oracle Brazier Bowl */}
          <g transform="translate(340, 275)">
            {/* Cast shadow */}
            <ellipse cx="60" cy="115" rx="50" ry="8" fill="#0d0411" opacity="0.8" />

            {/* Bronze legs */}
            <path d="M 35,65 Q 20,95 25,115" stroke="#482d02" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 85,65 Q 100,95 95,115" stroke="#482d02" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="60" y1="65" x2="60" y2="115" stroke="#352101" strokeWidth="4.5" />

            {/* The metal bowl */}
            <ellipse cx="60" cy="65" rx="42" ry="14" fill="#693d0f" stroke="#1e0f01" strokeWidth="3" />
            
            {/* Fire core glowing ring */}
            <motion.ellipse
              cx="60"
              cy="63"
              rx="33"
              ry="9"
              fill="#ffa21e"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        </svg>

        {/* Dynamic Interactive Flame Vectors using CSS and Motion */}
        <div className="absolute top-[280px] left-[370px] w-16 h-20 pointer-events-none flex justify-center items-end">
          {/* Flame layer 1 - Deep Orange */}
          <motion.div
            className="absolute rounded-t-full bg-orange-600 mix-blend-screen"
            style={{ width: 44, height: 50, transformOrigin: "bottom center" }}
            animate={{
              scaleY: [1, 1.3, 0.9, 1.2, 1],
              scaleX: [1, 0.9, 1.1, 0.85, 1],
              skewX: [-4, 4, -2, 3, -4],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Flame layer 2 - Bright Gold */}
          <motion.div
            className="absolute rounded-t-full bg-amber-400 mix-blend-screen"
            style={{ width: 30, height: 40, transformOrigin: "bottom center" }}
            animate={{
              scaleY: [1.1, 0.8, 1.2, 0.95, 1.1],
              scaleX: [0.9, 1.1, 0.8, 1.05, 0.9],
              skewX: [2, -3, 3, -2, 2],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Flame layer 3 - Bright White/Blue Core */}
          <motion.div
            className="absolute rounded-t-full bg-yellow-100 mix-blend-screen"
            style={{ width: 14, height: 25, transformOrigin: "bottom center" }}
            animate={{
              scaleY: [0.8, 1.2, 0.9, 1.1, 0.8],
              scaleX: [1.1, 0.85, 1.12, 0.9, 1.1],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating Sparks rising from brazier */}
        <div className="absolute top-[210px] left-[340px] w-32 h-20 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1.5 rounded-full bg-yellow-300"
              style={{
                left: 35 + Math.random() * 50 + "px",
                bottom: "0px",
              }}
              animate={{
                y: [0, -90],
                x: [0, (Math.random() - 0.5) * 35],
                opacity: [1, 1, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Clicking labels / feedback */}
      {activeConstellation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#fff7e8]/95 border border-[#ab70d1]/45 text-[#2d1136] px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide shadow-2xl animate-fade-in-down">
          {activeConstellation === "osiris" && "Column of Osiris - Egyptian Weighing of the Heart Court"}
          {activeConstellation === "zeus" && "Column of Jupiter - Classical Hellenic civic duties"}
        </div>
      )}

      {/* Floating interactive tip */}
      <div className="absolute bottom-2 right-3 pointer-events-none block text-[10px] font-mono select-none px-2 py-0.5 rounded-lg backdrop-blur-sm bg-[#fff7e8]/85 text-[#2d1136]">
        Stars Alignment Active - Touch Pillars to Align
      </div>
    </div>
  );
}
