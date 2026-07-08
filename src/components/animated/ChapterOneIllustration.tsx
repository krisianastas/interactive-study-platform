import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function ChapterOneIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high fidelity interactive parallax
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layers transform at different intensities for 3D parallax effect
  const bgX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const midX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const midY = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  const archX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const archY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  const studentX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const studentY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized values between -0.5 and 0.5
    const valX = (e.clientX - rect.left) / width - 0.5;
    const valY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(valX);
    mouseY.set(valY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // State to toggle interactive element glow
  const [activeCarving, setActiveCarving] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-crosshair border border-sepia-border-light bg-[#e6ce9e] shadow-inner select-none"
    >
      {/* 1. Warm ambient sky with glowing sun and sunbeams */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Radial gold background */}
          <rect width="800" height="500" fill="url(#sky-grad)" />
          
          {/* Sun Orbs */}
          <motion.circle
            cx="400"
            cy="180"
            r="70"
            fill="url(#sun-grad)"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Sun Rays */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "400px 180px" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="400"
                y1="180"
                x2={400 + Math.cos((i * 30 * Math.PI) / 180) * 800}
                y2={180 + Math.sin((i * 30 * Math.PI) / 180) * 800}
                stroke="#fef5dd"
                strokeWidth="1.5"
                strokeOpacity="0.08"
              />
            ))}
          </motion.g>

          {/* Drifting Clouds */}
          <g opacity="0.4">
            <motion.path
              d="M 50,150 Q 120,130 180,160 T 300,150"
              stroke="#ebdaaf"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ x: [-50, 850] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 450,120 Q 520,100 590,130 T 700,120"
              stroke="#ebdaaf"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ x: [850, -150] }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            />
          </g>

          <defs>
            <radialGradient id="sky-grad" cx="50%" cy="36%" r="60%">
              <stop offset="0%" stopColor="#fdf3cb" />
              <stop offset="50%" stopColor="#eed8b0" />
              <stop offset="100%" stopColor="#d3a763" />
            </radialGradient>
            <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fffcd1" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffda85" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Middleground Winding Pathway & Hills */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Subtle rolling hill outlines */}
          <path d="M -50,420 Q 200,380 400,340 T 850,305" stroke="#b08b53" strokeWidth="2" opacity="0.3" />
          <path d="M -50,310 Q 150,280 400,260 T 850,230" stroke="#b08b53" strokeWidth="1.5" opacity="0.25" />
          
          {/* Winding road/pathway from high-resolution curve */}
          {/* Centered winding pathway narrowing as it reaches the sun/horizon */}
          <motion.path
            d="M 400,500 C 400,450 450,420 460,370 C 470,320 430,290 420,240 C 415,210 398,198 400,180"
            stroke="#a07d4b"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* Inner pathway highlight */}
          <motion.path
            d="M 400,500 C 400,450 450,420 460,370 C 470,320 430,290 420,240 C 415,210 398,198 400,180"
            stroke="#faeed1"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            animate={{
              strokeDasharray: ["6, 70", "70, 6"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      {/* 3. Foreground Carved Archway (The Portal) */}
      <motion.div style={{ x: archX, y: archY }} className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Column shadow base to set scene depth */}
          <rect x="0" y="470" width="800" height="30" fill="#1b1207" opacity="0.2" />

          {/* Left Column Structure */}
          <g className="cursor-pointer" onClick={() => setActiveCarving(activeCarving === "pyramid" ? null : "pyramid")}>
            {/* Main Outer Pillars */}
            <rect x="180" y="0" width="70" height="500" fill="#cc9d53" stroke="#2c1f10" strokeWidth="3" />
            <rect x="190" y="0" width="10" height="500" fill="#ebbe77" opacity="0.4" />
            
            {/* Pyramid Symbol */}
            <motion.polygon
              points="200,90 230,90 215,65"
              stroke="#2c1f10"
              strokeWidth="2.5"
              fill={activeCarving === "pyramid" ? "#fbf0cb" : "#b3823c"}
              animate={{ scale: activeCarving === "pyramid" ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            
            {/* Writing Cuneiform Tablet */}
            <g transform="translate(195, 230)">
              <motion.rect
                width="40"
                height="50"
                rx="3"
                stroke="#2c1f10"
                strokeWidth="2.5"
                fill={activeCarving === "tablet" ? "#faeed0" : "#b3823c"}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCarving(activeCarving === "tablet" ? null : "tablet");
                }}
              />
              <line x1="8" y1="12" x2="32" y2="12" stroke="#2c1f10" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="22" x2="26" y2="22" stroke="#2c1f10" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="32" x2="30" y2="32" stroke="#2c1f10" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="40" x2="18" y2="40" stroke="#2c1f10" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Wheat/Farming Symbol */}
            <g transform="translate(198, 380)" onClick={(e) => {
              e.stopPropagation();
              setActiveCarving(activeCarving === "wheat" ? null : "wheat");
            }}>
              <motion.path
                d="M 15,50 C 15,35 15,20 15,5 C 20,15 25,10 25,5 C 25,18 20,23 15,28 C 10,23 5,18 5,5 C 5,10 10,15 15,28"
                stroke="#2c1f10"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  rotate: activeCarving === "wheat" ? [0, -10, 10, 0] : 0,
                }}
              />
            </g>
          </g>

          {/* Right Column Structure */}
          <g className="cursor-pointer" onClick={() => setActiveCarving(activeCarving === "temple" ? null : "temple")}>
            <rect x="550" y="0" width="70" height="500" fill="#cc9d53" stroke="#2c1f10" strokeWidth="3" />
            <rect x="560" y="0" width="10" height="500" fill="#ebbe77" opacity="0.4" />

            {/* Temple Pediment / Sun Wheel Column Header */}
            <motion.polygon
              points="565,90 605,90 585,68"
              stroke="#2c1f10"
              strokeWidth="2.5"
              fill={activeCarving === "temple" ? "#faeed0" : "#b3823c"}
              animate={{ scale: activeCarving === "temple" ? 1.1 : 1 }}
            />
            <rect x="565" y="90" width="40" height="6" fill="#2c1f10" />

            {/* Classical Greek Pillars */}
            <g transform="translate(565, 230)" onClick={(e) => {
              e.stopPropagation();
              setActiveCarving(activeCarving === "pillars" ? null : "pillars");
            }}>
              {/* Three clean Columns */}
              <motion.rect
                x="2" y="5" width="6" height="40"
                stroke="#2c1f10" strokeWidth="2"
                fill={activeCarving === "pillars" ? "#faeed0" : "#b3823c"}
              />
              <motion.rect
                x="16" y="5" width="6" height="40"
                stroke="#2c1f10" strokeWidth="2"
                fill={activeCarving === "pillars" ? "#faeed0" : "#b3823c"}
              />
              <motion.rect
                x="30" y="5" width="6" height="40"
                stroke="#2c1f10" strokeWidth="2"
                fill={activeCarving === "pillars" ? "#faeed0" : "#b3823c"}
              />
              <line x1="0" y1="45" x2="38" y2="45" stroke="#2c1f10" strokeWidth="2.5" />
              <line x1="0" y1="5" x2="38" y2="5" stroke="#2c1f10" strokeWidth="2.5" />
            </g>

            {/* Tall Tower / Amphora Icon */}
            <g transform="translate(568, 380)" onClick={(e) => {
              e.stopPropagation();
              setActiveCarving(activeCarving === "vase" ? null : "vase");
            }}>
              <ellipse cx="17" cy="25" rx="10" ry="14" stroke="#2c1f10" strokeWidth="2.5" fill="#b3823c" />
              <path d="M 7,16 H 27 Q 17,6 17,2" stroke="#2c1f10" strokeWidth="2.5" fill="none" />
              {/* Handles */}
              <path d="M 7,20 C 2,15 2,30 7,28" stroke="#2c1f10" strokeWidth="2" fill="none" />
              <path d="M 27,20 C 32,15 32,30 27,28" stroke="#2c1f10" strokeWidth="2" fill="none" />
            </g>
          </g>

          {/* Huge Sweeping Arch Top */}
          {/* Framed top of the doorway */}
          <path
            d="M 180,105 C 180,105 320,-8 400,-8 C 480,-8 620,105 620,105"
            stroke="#2c1f10"
            strokeWidth="32"
            fill="none"
          />
          <path
            d="M 180,105 C 180,105 320,-8 400,-8 C 480,-8 620,105 620,105"
            stroke="#cc9d53"
            strokeWidth="24"
            fill="none"
          />
          
          {/* Inner arch border to trace archway stones */}
          <path
            d="M 180,105 C 180,105 320,-8 400,-8 C 480,-8 620,105 620,105"
            stroke="#2c1f10"
            strokeWidth="2.5"
            strokeDasharray="14, 14"
            fill="none"
            opacity="0.8"
          />
        </svg>

        {/* Floating tooltip/hint when carving clicked */}
        {activeCarving && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#fff7e8]/95 text-[#3d2b16] px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide shadow-md border border-[#b88743]/45">
            {activeCarving === "pyramid" && "Giza Pyramid (c. 2560 BCE) - Royal Crypt"}
            {activeCarving === "tablet" && "Cuneiform Tablet - Hammurabi's legal records"}
            {activeCarving === "wheat" && "Fertile Crescent - Birth of Agricultural Surplus"}
            {activeCarving === "temple" && "Pan-Hellenic Temple - Classic Doric Pediment"}
            {activeCarving === "pillars" && "Athenian Direct Ecclesia - Voting Pillars"}
            {activeCarving === "vase" && "Roman Terracotta Amphora - Mediterranean Wine Trade"}
          </div>
        )}
      </motion.div>

      {/* 4. Foreground Grade 9 Student Silhouette standing in doorway */}
      {/* Centered with parallax and absolute smooth breathing */}
      <motion.div
        style={{ x: studentX, y: studentY }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-52 pointer-events-none select-none"
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 260" fill="none">
          {/* Casting soft floor shadow */}
          <ellipse cx="100" cy="245" rx="42" ry="10" fill="#1b1207" opacity="0.45" />

          {/* Student back silhouette vector */}
          {/* Head & wild scholarly hair */}
          <path
            d="M 82,92 C 82,65 118,65 118,92 C 118,97 114,102 110,105 C 114,115 86,115 90,105 C 86,102 82,97 82,92 Z"
            fill="#322214"
            stroke="#120a04"
            strokeWidth="3"
          />
          {/* Ears / Sideburns details */}
          <circle cx="81" cy="95" r="3.5" fill="#322214" stroke="#120a04" strokeWidth="1.5" />
          <circle cx="119" cy="95" r="3.5" fill="#322214" stroke="#120a04" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="94" y="105" width="12" height="15" fill="#322214" stroke="#120a04" strokeWidth="2.5" />

          {/* Backpack Overlay */}
          <motion.path
            d="M 72,130 C 72,115 128,115 128,130 C 128,155 130,195 120,225 C 110,230 90,230 80,225 C 70,195 72,155 72,130"
            fill="#563b22"
            stroke="#120a04"
            strokeWidth="3.5"
            animate={{
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Backpack pocket lines */}
          <path d="M 75,175 Q 100,185 125,175" stroke="#120a04" strokeWidth="2.5" />
          <rect x="85" y="185" width="30" height="28" rx="4" fill="#3c2817" stroke="#120a04" strokeWidth="2" />
          <line x1="100" y1="185" x2="100" y2="195" stroke="#120a04" strokeWidth="2.5" strokeLinecap="round" />

          {/* Torso/Shoulders underneath */}
          <path
            d="M 60,135 Q 73,122 92,120 Q 108,120 140,135 L 142,240 H 58 Z"
            fill="#322214"
            stroke="#120a04"
            strokeWidth="3.5"
            opacity="0.9"
          />

          {/* Left and Right Shoulders details */}
          <path d="M 60,135 L 75,230" stroke="#120a04" strokeWidth="2.5" />
          <path d="M 140,135 L 125,230" stroke="#120a04" strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* 5. Golden shimmering dust mote particles */}
      {/* Absolute overlay of fine floating dust grains that drift randomly */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-40 blur-[1px]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 80 + 10 + "%",
              bottom: Math.random() * 30 + 10 + "%",
            }}
            animate={{
              y: [-10, -180],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 12,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Small interactive tutorial overlay at bottom right */}
      <div className="absolute bottom-2 right-3 pointer-events-none block text-[10px] font-mono select-none px-2 py-0.5 rounded backdrop-blur-sm bg-[#120a04]/25 text-[#fbf0cc]/80">
        🖱 Drag Mouse to Parallax / Click Icons to Explore
      </div>
    </div>
  );
}
