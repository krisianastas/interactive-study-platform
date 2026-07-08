import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface Seedling {
  id: number;
  x: number;
  y: number;
}

export default function ChapterThreeIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 105 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const treeX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const treeY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  const groundX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const groundY = useTransform(smoothY, [-0.5, 0.5], [-2, 2]);

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

  // Click-to-sprout interactive seedlings
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);
  
  const handleGroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Only allow sprouting on the grass/hill area (bottom half)
    if (clickY > 230) {
      const newSeed = {
        id: Date.now(),
        x: clickX,
        y: clickY,
      };
      setSeedlings((prev) => [...prev.slice(-3), newSeed]); // Keep max 4 to remain clean
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleGroundClick}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-crosshair border border-[#c1d2b8] bg-[#f0f5eb] shadow-inner select-none"
    >
      {/* 1. Background Sky and Sun Beam Shafts */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <rect width="800" height="500" fill="url(#sage-sky)" />

          {/* Golden Philosophical Sun Disc */}
          <circle cx="250" cy="180" r="130" fill="rgba(247, 237, 215, 0.4)" />
          <circle cx="250" cy="180" r="70" fill="#fffef5" />

          {/* Moving Solar Light Shafts (Dynamic opacity pulsing) */}
          <motion.polygon
            points="250,180 800,280 800,450"
            fill="url(#light-beam)"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.polygon
            points="250,180 600,500 400,500"
            fill="url(#light-beam)"
            animate={{ opacity: [0.25, 0.1, 0.25] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <defs>
            <linearGradient id="sage-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e5eccf" />
              <stop offset="60%" stopColor="#f3eae1" />
              <stop offset="100%" stopColor="#ebdec6" />
            </linearGradient>
            <linearGradient id="light-beam" x1="250" y1="180" x2="800" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e5eccf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Swaying Ancient Olive Tree of Wisdom */}
      <motion.div
        style={{ x: treeX, y: treeY }}
        className="absolute inset-x-0 top-1/4 h-2/3 flex justify-center pointer-events-none"
      >
        <svg className="w-[500px] h-full" viewBox="0 0 500 300" fill="none">
          {/* Detailed Gnarled Tree Trunk */}
          <path
            d="M 230,290 C 230,220 180,210 200,160 C 210,140 230,130 220,90 C 220,90 190,70 170,105 C 160,110 145,100 135,115 M 270,290 C 265,240 290,200 270,150 C 260,120 280,100 295,85 C 315,65 330,85 340,95 M 245,210 C 270,170 250,130 240,115"
            stroke="#473a21"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Bark texture creases */}
          <path d="M 245,285 C 242,240 225,210 230,170" stroke="#2a2110" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 255,285 C 258,245 272,215 264,175" stroke="#2a2110" strokeWidth="2" fill="none" opacity="0.4" />

          {/* Left Large Leafy Canopy (Swaying) */}
          <motion.g
            animate={{
              rotate: [-1.5, 1.5, -1.5],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "200px 160px" }}
          >
            {/* Clumps of detailed sage-green foliage */}
            <circle cx="150" cy="110" r="48" fill="#4d5f47" stroke="#212a1d" strokeWidth="2" />
            <circle cx="120" cy="130" r="32" fill="#5c7155" stroke="#212a1d" strokeWidth="2" />
            <circle cx="180" cy="90" r="38" fill="#5c7155" stroke="#212a1d" strokeWidth="2" />
            
            {/* Soft highlight leaves */}
            <ellipse cx="140" cy="95" rx="14" ry="8" fill="#809877" opacity="0.6" transform="rotate(-15 140 95)" />
            <ellipse cx="165" cy="115" rx="18" ry="9" fill="#809877" opacity="0.6" transform="rotate(20 165 115)" />
          </motion.g>

          {/* Right Large Leafy Canopy */}
          <motion.g
            animate={{
              rotate: [2, -2, 2],
              x: [0, 1.5, 0],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ transformOrigin: "270px 150px" }}
          >
            <circle cx="320" cy="100" r="46" fill="#4d5f47" stroke="#212a1d" strokeWidth="2" />
            <circle cx="350" cy="120" r="34" fill="#5c7155" stroke="#212a1d" strokeWidth="2" />
            <circle cx="290" cy="80" r="42" fill="#698161" stroke="#212a1d" strokeWidth="2" />
            
            <ellipse cx="325" cy="85" rx="15" ry="8" fill="#8ca882" opacity="0.6" transform="rotate(30 325 85)" />
            <ellipse cx="290" cy="95" rx="16" ry="10" fill="#8ca882" opacity="0.6" transform="rotate(-25 290 95)" />
          </motion.g>

          {/* Central Wisdom Canopy */}
          <motion.g
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "245px 120px" }}
          >
            <circle cx="230" cy="70" r="50" fill="#44553e" stroke="#212a1d" strokeWidth="2" />
            <circle cx="260" cy="80" r="44" fill="#5c7155" stroke="#212a1d" strokeWidth="2" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 3. Rolling Grassy Hill Foreground with clicking zone */}
      <motion.div style={{ x: groundX, y: groundY }} className="absolute inset-x-0 bottom-0 pointer-events-none">
        <svg className="w-full h-80" viewBox="0 0 800 320" preserveAspectRatio="none" fill="none">
          {/* Back hill */}
          <path d="M -50,180 Q 300,120 850,210 L 850,320 L -50,320 Z" fill="#cfdeca" stroke="#90af84" strokeWidth="2" />
          
          {/* Front hill */}
          <path d="M -50,230 Q 400,190 850,250 L 850,320 L -50,320 Z" fill="#b1cca8" stroke="#719064" strokeWidth="3" />
          
          {/* Scattered little grass vector tufts */}
          <path d="M 100,280 L 102,270 M 102,270 L 105,280 M 102,270 L 98,272" stroke="#5d7851" strokeWidth="2" strokeLinecap="round" />
          <path d="M 680,265 L 682,255 M 682,255 L 685,265 L 678,258" stroke="#5d7851" strokeWidth="2" strokeLinecap="round" />
          <path d="M 350,295 L 352,285 M 352,285 L 355,295" stroke="#5d7851" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 4. Click-Sprouted Seedlings blooming dynamically */}
      {seedlings.map((seed) => (
        <motion.div
          key={seed.id}
          className="absolute pointer-events-none"
          style={{ left: seed.x - 16, top: seed.y - 32, width: 32, height: 32 }}
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 140 }}
        >
          {/* blooming SVG flower */}
          <svg viewBox="0 0 32 32" className="w-full h-full">
            {/* Stem */}
            <path d="M 16,32 C 16,24 18,20 16,14" stroke="#558043" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 16,22 Q 10,18 8,20" stroke="#558043" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Sprouting Petals */}
            <motion.path
              d="M 16,14 C 12,8 10,12 16,4 C 22,12 20,8 16,14"
              fill="#ffffff"
              stroke="#dfa343"
              strokeWidth="1.5"
              initial={{ scaleY: 0.1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            {/* Glowing gold center of flower */}
            <motion.circle
              cx="16" cy="11" r="3.5"
              fill="#dfa343"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </svg>
        </motion.div>
      ))}

      {/* 5. Philosophical wind breeze dust looping */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-t border-dashed border-[#b3cca8]/50"
            style={{
              top: 50 + i * 70 + "px",
              width: "140px",
              height: "2px",
              left: "-150px",
            }}
            animate={{
              x: ["-10px", "980px"],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 9 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Floating click tip */}
      <p className="absolute bottom-2 right-3 pointer-events-none block text-[10px] font-mono select-none px-2 py-0.5 rounded-lg backdrop-blur-sm bg-[#fff7e8]/85 text-emerald-950/90">
        Axial Age Wisdom - Touch Ground to Sprout Seedlings of Ethics
      </p>
    </div>
  );
}
