import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function ChapterFourIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 110 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [5, -5]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  const castleX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const castleY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const mistX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);

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

  // Light toggle for stained glass
  const [windowsGlowing, setWindowsGlowing] = useState(true);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setWindowsGlowing(!windowsGlowing)}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-crosshair border border-[#e4b3a1] bg-[#231512] shadow-2xl select-none"
    >
      {/* 1. Burgundy-Charcoal Stormy Mountains Silhouette */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <rect width="800" height="500" fill="url(#twilight-storm)" />
          
          {/* Jagged medieval mountain range silhouette */}
          <path d="M -50,300 L 120,220 L 250,260 L 400,165 L 580,240 L 850,110 L 850,500 L -50,500 Z" fill="#291a16" opacity="0.8" />
          <path d="M -50,380 L 190,300 L 380,340 L 510,240 L 680,320 L 850,280 L 850,505 L -50,505 Z" fill="#1b0f0b" />
          
          <defs>
            <linearGradient id="twilight-storm" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#432219" />
              <stop offset="60%" stopColor="#2c1712" />
              <stop offset="100%" stopColor="#1a0c0a" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Castle Spire and Scriptorium Core */}
      <motion.div style={{ x: castleX, y: castleY }} className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <g transform="translate(180, 0)">
            {/* Scriptorium roof angle */}
            <path d="M 50,420 H 300 L 300,340 L 260,290 H 90 L 50,340 Z" fill="#2c1914" stroke="#130806" strokeWidth="3" />
            
            {/* Majestic Central Tower Base */}
            <rect x="110" y="140" width="130" height="280" fill="#3c2620" stroke="#130806" strokeWidth="4.5" />
            {/* Tower highlight strip */}
            <rect x="110" y="140" width="15" height="280" fill="#4f332c" />

            {/* Battlements protruding elements style */}
            <rect x="95" y="125" width="160" height="20" fill="#1e100d" stroke="#130806" strokeWidth="3.5" />
            <rect x="105" y="105" width="22" height="20" fill="#2c1914" stroke="#130806" strokeWidth="3" />
            <rect x="135" y="105" width="22" height="20" fill="#2c1914" stroke="#130806" strokeWidth="3" />
            <rect x="165" y="105" width="22" height="20" fill="#2c1914" stroke="#130806" strokeWidth="3" />
            <rect x="195" y="105" width="22" height="20" fill="#2c1914" stroke="#130806" strokeWidth="3" />
            <rect x="225" y="105" width="22" height="20" fill="#2c1914" stroke="#130806" strokeWidth="3" />

            {/* Gothic Roof Spire Triangle */}
            <polygon points="120,105 230,105 175,-15" fill="#1f100d" stroke="#130806" strokeWidth="4" />
            <polygon points="135,105 215,105 175,5" fill="#2c1814" />

            {/* Interactive Scriptorium Wavy Flag banner */}
            <g transform="translate(175, -15)">
              <line x1="0" y1="0" x2="0" y2="-45" stroke="#130806" strokeWidth="3.5" strokeLinecap="round" />
              {/* Waving cloth flag banner vector */}
              <motion.path
                d="M 0,-45 C 15,-48 30,-38 45,-43 L 45,-25 C 30,-20 15,-30 0,-27 Z"
                fill="#b83c18"
                stroke="#130806"
                strokeWidth="2.5"
                animate={{
                  d: [
                    "M 0,-45 C 15,-48 30,-38 45,-43 L 45,-25 C 30,-20 15,-30 0,-27 Z",
                    "M 0,-45 C 10,-38 25,-48 45,-41 L 45,-23 C 25,-30 10,-20 0,-27 Z",
                    "M 0,-45 C 15,-48 30,-38 45,-43 L 45,-25 C 30,-20 15,-30 0,-27 Z"
                  ]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>

            {/* Glowing Rose Stained-Glass Mandala Window */}
            {/* Turns off/on when clicking illustration */}
            <motion.circle
              cx="175"
              cy="185"
              r="24"
              fill={windowsGlowing ? "#eb8948" : "#1f100d"}
              stroke="#130806"
              strokeWidth="4"
              animate={windowsGlowing ? {
                fill: ["#fb9c55", "#db7935", "#fb9c55"],
                filter: ["drop-shadow(0 0 4px rgba(251,156,85, 0.45))", "drop-shadow(0 0 10px rgba(251,156,85, 0.7))", "drop-shadow(0 0 4px rgba(251,156,85, 0.45))"]
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Medieval Window tracery lines */}
            <circle cx="175" cy="185" r="10" fill="none" stroke="#130806" strokeWidth="2.5" />
            <line x1="175" y1="161" x2="175" y2="209" stroke="#130806" strokeWidth="2.5" />
            <line x1="151" y1="185" x2="199" y2="185" stroke="#130806" strokeWidth="2.5" />

            {/* Scriptorium Pointy Gothic Windows (Double) */}
            <rect x="144" y="250" width="22" height="42" rx="11" fill={windowsGlowing ? "#f0a574" : "#1f100d"} stroke="#130806" strokeWidth="3" />
            <rect x="184" y="250" width="22" height="42" rx="11" fill={windowsGlowing ? "#f0a574" : "#1f100d"} stroke="#130806" strokeWidth="3" />
            
            {/* Pointy arch top window covers helper */}
            <polygon points="144,261 166,261 155,244" fill={windowsGlowing ? "#f0a574" : "#1f100d"} stroke="#130806" strokeWidth="3" />
            <polygon points="184,261 206,261 195,244" fill={windowsGlowing ? "#f0a574" : "#1f100d"} stroke="#130806" strokeWidth="3" />
          </g>
          
          {/* Ground stone steps */}
          <rect x="-20" y="420" width="840" height="15" fill="#1e110d" />
          <rect x="-20" y="435" width="840" height="70" fill="#130907" />
        </svg>
      </motion.div>

      {/* 3. Infinite Soaring Falcon/Bird Silhouette (Circling) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 80, height: 40 }}
        animate={{
          x: ["-100px", "900px"],
          y: [120, 40, 150, 90],
          scale: [0.3, 0.9, 1.2, 0.5]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 50" className="w-full h-full text-[#110604]">
          {/* Beautiful flapping wing path silhouette */}
          <motion.path
            d="M 5,20 C 25,10 45,5 50,25 C 55,5 75,10 95,20 C 75,25 60,30 50,28 C 40,30 25,25 5,20 Z"
            fill="currentColor"
            animate={{
              d: [
                "M 5,20 C 25,10 45,5 50,25 C 55,5 75,10 95,20 C 75,25 60,30 50,28 C 40,30 25,25 5,20 Z",
                "M 5,5 C 25,12 45,18 50,25 C 55,18 75,12 95,5 C 75,18 60,25 50,26 C 40,25 25,18 5,5 Z",
                "M 5,20 C 25,10 45,5 50,25 C 55,5 75,10 95,20 C 75,25 60,30 50,28 C 40,30 25,25 5,20 Z"
              ]
            }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* 4. Sliding Misty Mountain Fog Layers */}
      <motion.div style={{ x: mistX }} className="absolute inset-x-0 bottom-4 pointer-events-none h-40">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          {/* Left flowing mist trail */}
          <motion.path
            d="M -100,100 C 100,60 250,150 450,90 C 650,40 750,120 900,100 L 900,200 L -100,200 Z"
            fill="url(#mist-grad)"
            opacity="0.4"
            animate={{ x: [-100, 100, -100] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right flowing mist trail counter-sliding */}
          <motion.path
            d="M -100,130 C 120,160 300,70 500,140 C 700,180 750,90 900,130 L 900,200 L -100,200 Z"
            fill="url(#mist-grad-dark)"
            opacity="0.25"
            animate={{ x: [50, -50, 50] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          <defs>
            <linearGradient id="mist-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8d5644" stopOpacity="0" />
              <stop offset="60%" stopColor="#41241d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#29110b" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="mist-grad-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e0f0d" stopOpacity="0" />
              <stop offset="100%" stopColor="#130807" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating feedback label */}
      <p className="absolute bottom-2 right-3 pointer-events-none block text-[10px] font-mono select-none px-2 py-0.5 rounded backdrop-blur-sm bg-[#5c2419]/30 text-rose-200/95">
        🏰 Feudal Fortress — Click anywhere to extinguish/ignite Scriptorium Windows
      </p>
    </div>
  );
}
