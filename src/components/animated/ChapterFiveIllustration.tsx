import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ArrowStreak {
  id: number;
  startX: number;
  startY: number;
}

export default function ChapterFiveIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const birdX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const birdY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const steppeX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const steppeY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  // Click handler to shoot Nomadic Cavalry Arrows
  const [arrows, setArrows] = useState<ArrowStreak[]>([]);
  
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

  const handleSteppeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newArrow = {
      id: Date.now() + Math.random(),
      startX: clickX,
      startY: clickY,
    };

    setArrows((prev) => [...prev.slice(-3), newArrow]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleSteppeClick}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-crosshair border border-[#bdd0a5] bg-[#ebd8ba] shadow-inner select-none"
    >
      {/* 1. Steppe Sunset with Crown Silhouette */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <rect width="800" height="500" fill="url(#hungarian-sunset)" />

          {/* Steppe Sun */}
          <circle cx="400" cy="220" r="140" fill="url(#gold-radial-sun)" />

          {/* Majestic Holy Crown of Hungary (Saint Stephen's Crown) Silhouette in Sunset Backdrop */}
          {/* Detailed crown path */}
          <g transform="translate(325, 120)" opacity="0.12" className="text-amber-accent">
            <path
              d="M 15,60 C 15,35 135,35 135,60 C 135,75 145,80 145,95 C 145,115 5,115 5,95 C 5,80 15,75 15,60 Z"
              fill="currentColor"
              stroke="#000"
              strokeWidth="1.5"
            />
            {/* The bent cross at the top of the crown */}
            <line x1="75" y1="35" x2="75" y2="10" stroke="#000" strokeWidth="3" />
            <line x1="65" y1="20" x2="85" y2="25" stroke="#000" strokeWidth="3" />
            <circle cx="75" cy="8" r="3.5" fill="currentColor" stroke="#000" />
            
            {/* Crown pearls and arches */}
            <circle cx="20" cy="50" r="4" fill="#fff" />
            <circle cx="130" cy="50" r="4" fill="#fff" />
            <circle cx="75" cy="42" r="6" fill="#fff" />
          </g>

          <defs>
            <linearGradient id="hungarian-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bf3512" />
              <stop offset="50%" stopColor="#e38d31" />
              <stop offset="100%" stopColor="#eed2a0" />
            </linearGradient>
            <radialGradient id="gold-radial-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffad4" />
              <stop offset="40%" stopColor="#ffb03a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#bf3512" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Soaring/Flapping Turul Falcon */}
      <motion.div
        style={{ x: birdX, y: birdY }}
        className="absolute inset-x-0 h-1/2 top-10 flex justify-center pointer-events-none"
      >
        <svg className="w-80 h-full" viewBox="0 0 320 200" fill="none">
          {/* Floating breathing Turul Falcon */}
          {/* Wings flapping dynamically */}
          <g transform="translate(60, 20)">
            <motion.path
              d="M 100,60 C 50,45 20,20 0,35 C 15,55 45,70 65,75 C 50,85 75,90 95,85 L 100,105 L 105,85 C 125,90 150,85 135,75 C 155,70 185,55 200,35 C 180,20 150,45 100,60 Z"
              fill="#2e251b"
              stroke="#0a0502"
              strokeWidth="2.5"
              animate={{
                d: [
                  "M 100,60 C 50,45 20,20 0,35 C 15,55 45,70 65,75 C 50,85 75,90 95,85 L 100,105 L 105,85 C 125,90 150,85 135,75 C 155,70 185,55 200,35 C 180,20 150,45 100,60 Z",
                  "M 100,60 C 50,15 20,-10 0,0 C 15,35 45,60 65,70 C 45,65 72,82 95,81 L 100,105 L 105,81 C 128,82 155,65 135,70 C 155,60 185,35 200,0 C 180,-10 150,15 100,60 Z",
                  "M 100,60 C 50,45 20,20 0,35 C 15,55 45,70 65,75 C 50,85 75,90 95,85 L 100,105 L 105,85 C 125,90 150,85 135,75 C 155,70 185,55 200,35 C 180,20 150,45 100,60 Z"
                ]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Head/Beak facing left */}
            <path d="M 92,60 C 92,50 108,50 108,60 L 100,50 Z" fill="#201a13" stroke="#0a0502" strokeWidth="1.5" />
            <polygon points="90,56 84,54 90,51" fill="#dfa343" stroke="#0a0502" strokeWidth="1" />
            {/* Scepter held in talons (Royal detail) */}
            <line x1="88" y1="92" x2="112" y2="82" stroke="#dfa343" strokeWidth="2.5" />
            <circle cx="112" cy="82" r="3" fill="#dfa343" />
          </g>
        </svg>
      </motion.div>

      {/* 3. Rolling Carpathian Grassland Steppe Foreground */}
      <motion.div style={{ x: steppeX, y: steppeY }} className="absolute inset-x-0 bottom-0 pointer-events-none h-44">
        <svg className="w-full h-full" viewBox="0 0 800 220" preserveAspectRatio="none" fill="none">
          {/* Back hills */}
          <path d="M -50,140 Q 300,70 850,130 L 850,230 L -50,230 Z" fill="#9eae71" stroke="#71864b" strokeWidth="2" opacity="0.8" />
          
          {/* Front grassy terrain */}
          <path d="M -50,170 Q 450,120 850,180 L 850,230 L -50,230 Z" fill="#7d9151" stroke="#50612c" strokeWidth="3" />
          
          {/* Wind-blown swaying feather grass blades */}
          <path d="M 80,185 Q 90,165 110,160" stroke="#aabf7e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 120,195 Q 128,175 145,170" stroke="#aabf7e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 400,190 Q 405,175 422,172" stroke="#aabf7e" strokeWidth="2" strokeLinecap="round" />
          <path d="M 650,180 Q 662,160 678,155" stroke="#aabf7e" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 4. Click-triggered cavalry arrow streak animations */}
      {arrows.map((arr) => (
        <motion.div
          key={arr.id}
          className="absolute pointer-events-none w-24 h-1.5"
          style={{ left: arr.startX - 48, top: arr.startY }}
          initial={{ x: -200, y: 150, opacity: 1, scaleX: 1.5 }}
          animate={{ x: 600, y: -450, opacity: 0, scaleX: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Arrow streak SVG */}
          <svg viewBox="0 0 100 6" className="w-full h-full text-white">
            {/* Glowing streak */}
            <line x1="0" y1="3" x2="90" y2="3" stroke="#fffdec" strokeWidth="1.5" />
            <line x1="8" y1="3" x2="70" y2="3" stroke="#ffcb4a" strokeWidth="3.5" opacity="0.4" />
            
            {/* Arrow feather fletching */}
            <polygon points="5,1 15,3 5,5" fill="#dfa343" />
          </svg>
        </motion.div>
      ))}

      {/* Floating click tip */}
      <p className="absolute bottom-2 right-3 pointer-events-none block text-[10px] font-mono select-none px-2 py-0.5 rounded-lg backdrop-blur-sm bg-[#fff7e8]/85 text-green-950/90">
        Honfoglalas Nomadic Steppe - Click anywhere to fire Magyar cavalry archer horse arrows
      </p>
    </div>
  );
}
