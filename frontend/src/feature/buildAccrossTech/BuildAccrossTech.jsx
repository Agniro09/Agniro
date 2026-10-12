import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const CAPABILITY_NODES = [
  {
    id: 1,
    number: "01",
    title: "FRONTEND",
    tag: "INTERFACE",
    dotColor: "#FF6B00",
    description: "High-performance client interfaces and cross-platform applications.",
    skills: ["React", "Next.js", "Flutter", "HTML / CSS", "JavaScript"],
    desktopPos: "top-[16%] left-[2%] sm:left-[4%] lg:left-[3%]",
    cardWidth: "w-[280px] sm:w-[310px]",
    side: "left",
  },
  {
    id: 2,
    number: "02",
    title: "BACKEND",
    tag: "SERVICES",
    dotColor: "#FFAD33",
    description: "Robust server architectures, enterprise APIs, and scalable databases.",
    skills: ["Node.js", "Python", "Java", "REST APIs", "Database Systems"],
    desktopPos: "top-[16%] right-[2%] sm:right-[4%] lg:right-[3%]",
    cardWidth: "w-[280px] sm:w-[310px]",
    side: "right",
  },
  {
    id: 3,
    number: "03",
    title: "AI & AUTOMATION",
    tag: "ZENITH",
    dotColor: "#ED1F00",
    tagColor: "#FF6B00",
    description: "Autonomous agentic workflows, LLM orchestration, and machine learning models.",
    skills: [
      "Generative AI",
      "Machine Learning",
      "AI Agents",
      "Automation",
      "Intelligent Workflows",
    ],
    desktopPos: "top-[2%] left-1/2 -translate-x-1/2",
    cardWidth: "w-[290px] sm:w-[370px]",
    side: "top",
  },
  {
    id: 4,
    number: "04",
    title: "CLOUD & DEVOPS",
    tag: "NADIR",
    dotColor: "#FFAD33",
    description: "Cloud-native infrastructure, automated CI/CD pipelines, and high availability.",
    skills: [
      "Cloud Architecture",
      "Docker",
      "CI/CD",
      "Deployment",
      "Scalable Infrastructure",
    ],
    desktopPos: "bottom-[2%] left-1/2 -translate-x-1/2",
    cardWidth: "w-[290px] sm:w-[370px]",
    side: "bottom",
  },
  {
    id: 5,
    number: "05",
    title: "DATA",
    tag: "ANALYTICS",
    dotColor: "#FF6B00",
    description: "Modern data pipelines, warehousing, real-time analytics, and extraction.",
    skills: ["SQL", "MySQL", "PostgreSQL", "Data Analytics", "Data Processing"],
    desktopPos: "bottom-[16%] right-[2%] sm:right-[4%] lg:right-[3%]",
    cardWidth: "w-[280px] sm:w-[310px]",
    side: "right",
  },
  {
    id: 6,
    number: "06",
    title: "PRODUCT & DESIGN",
    tag: "EXPERIENCE",
    dotColor: "#FFEBC7",
    description: "Human-centered UI/UX design, interactive systems, and rapid prototyping.",
    skills: [
      "UI/UX",
      "Design Systems",
      "Prototyping",
      "Product Architecture",
      "User Experience",
    ],
    desktopPos: "bottom-[16%] left-[2%] sm:left-[4%] lg:left-[3%]",
    cardWidth: "w-[280px] sm:w-[310px]",
    side: "left",
  },
];

const BuildAccrossTech = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const coreHubRef = useRef(null);
  const nodeRefs = useRef({});

  const [activeNodeId, setActiveNodeId] = useState(null);
  const [coreHovered, setCoreHovered] = useState(false);
  const [selectedPills, setSelectedPills] = useState(new Set());
  const [lineCoords, setLineCoords] = useState({});

  // Recalculate line connection coordinates based on actual geometry
  const updateLineCoordinates = useCallback(() => {
    if (!stageRef.current || !coreHubRef.current) return;

    const stageRect = stageRef.current.getBoundingClientRect();
    const coreRect = coreHubRef.current.getBoundingClientRect();

    if (stageRect.width === 0 || stageRect.height === 0) return;

    const coreCenterX = coreRect.left + coreRect.width / 2 - stageRect.left;
    const coreCenterY = coreRect.top + coreRect.height / 2 - stageRect.top;
    const coreRadius = Math.min(coreRect.width, coreRect.height) / 2;

    const newCoords = {};

    CAPABILITY_NODES.forEach((node) => {
      const el = nodeRefs.current[node.id];
      if (!el) return;

      const nodeRect = el.getBoundingClientRect();
      const nodeCenterX = nodeRect.left + nodeRect.width / 2 - stageRect.left;
      const nodeCenterY = nodeRect.top + nodeRect.height / 2 - stageRect.top;

      let targetX = nodeCenterX;
      let targetY = nodeCenterY;

      // Connect to the specific edge facing the core for clean geometry
      if (node.side === "left") {
        targetX = nodeRect.right - stageRect.left;
        targetY = nodeCenterY;
      } else if (node.side === "right") {
        targetX = nodeRect.left - stageRect.left;
        targetY = nodeCenterY;
      } else if (node.side === "top") {
        targetX = nodeCenterX;
        targetY = nodeRect.bottom - stageRect.top;
      } else if (node.side === "bottom") {
        targetX = nodeCenterX;
        targetY = nodeRect.top - stageRect.top;
      }

      // Calculate origin point on the outer perimeter of the central circle
      const angle = Math.atan2(targetY - coreCenterY, targetX - coreCenterX);
      const startX = coreCenterX + Math.cos(angle) * (coreRadius - 2);
      const startY = coreCenterY + Math.sin(angle) * (coreRadius - 2);

      newCoords[node.id] = {
        x1: startX,
        y1: startY,
        x2: targetX,
        y2: targetY,
      };
    });

    setLineCoords(newCoords);
  }, []);

  // Window resize & layout effect binding
  useEffect(() => {
    updateLineCoordinates();

    const handleResize = () => {
      updateLineCoordinates();
    };

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      updateLineCoordinates();
    });

    if (stageRef.current) observer.observe(stageRef.current);
    if (coreHubRef.current) observer.observe(coreHubRef.current);

    const timer = setTimeout(updateLineCoordinates, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [updateLineCoordinates]);

  // Entrance GSAP animation
  useLayoutEffect(() => {
    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;

      const headerElements = sectionRef.current.querySelectorAll("[data-anim-header]");
      const cards = sectionRef.current.querySelectorAll(".pod-satellite");
      const hub = coreHubRef.current;

      gsap.fromTo(
        headerElements,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        }
      );

      if (hub) {
        gsap.fromTo(
          hub,
          { autoAlpha: 0, scale: 0.88 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            delay: 0.2,
            ease: "back.out(1.4)",
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            delay: 0.25,
            ease: "power2.out",
          }
        );
      }
    });

    return () => motion.revert();
  }, []);

  const togglePill = (skillName) => {
    setSelectedPills((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  const activeNode = CAPABILITY_NODES.find((n) => n.id === activeNodeId);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full min-h-screen bg-[#080808] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden selection:bg-[#FF6B00] selection:text-black"
    >
      {/* Background Technical Grid (48px) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none"
      />

      {/* Central Amber / Fire Atmospheric Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[860px] h-[720px] sm:h-[860px] bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,rgba(255,173,51,0.025)_45%,transparent_70%)] blur-3xl pointer-events-none"
      />

      {/* Subtle Vertical Guide Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-[#25252A]/30 to-transparent sm:left-12 lg:left-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-6 w-px bg-gradient-to-b from-transparent via-[#25252A]/30 to-transparent sm:right-12 lg:right-24"
      />

      {/* ========================================================
          Section Top Sub-Header & Telemetry Ribbon
          ======================================================== */}
      <div
        data-anim-header
        className="max-w-7xl w-full mx-auto relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9B9BA3]/60 uppercase border-b border-[#25252A] pb-4 mb-8 sm:mb-10"
      >
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00]" />
          <span className="text-[#F7F0E5]/80 font-medium">SEC.04</span>
          <span>//</span>
          <span>CAPABILITY MATRIX &amp; ARCHITECTURAL STACK</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span>TOPOLOGY : DECENTRALIZED CONSTELLATION</span>
          <span>•</span>
          <span className="text-[#FFEBC7]/70">SYS.CORE // ACTIVE NODES: 06</span>
        </div>
      </div>

      {/* ========================================================
          Section Header Block (Title & Subtitle)
          ======================================================== */}
      <div className="max-w-7xl w-full mx-auto relative z-10 text-center mb-8 sm:mb-12">
        {/* Section Eyebrow */}
        <div
          data-anim-header
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121216]/90 border border-[#25252A] mb-5 shadow-inner backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#FFEBC7] uppercase">
            OUR CAPABILITIES
          </span>
        </div>

        {/* Main Heading */}
        <h2
          data-anim-header
          id="capabilities-heading"
          className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#F7F0E5] tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          Built across the <span className="text-[#FFEBC7]">technology stack.</span>
        </h2>

        {/* Supporting Text */}
        <p
          data-anim-header
          className="mt-4 text-[#9B9BA3] font-normal text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed"
        >
          From interfaces to infrastructure, we combine the right technologies to build
          reliable digital products.
        </p>
      </div>

      {/* ========================================================
          DESKTOP CONSTELLATION STAGE (>= 1024px)
          ======================================================== */}
      <div
        ref={stageRef}
        id="constellation-stage"
        className="hidden lg:flex max-w-[1360px] w-full mx-auto relative min-h-[720px] xl:min-h-[760px] items-center justify-center my-2"
      >
        {/* Dynamic Connecting SVG Network Lines */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <defs>
            {/* Active Vibrant Line Gradient */}
            <linearGradient id="active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEBC7" />
              <stop offset="30%" stopColor="#FFAD33" />
              <stop offset="70%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#ED1F00" />
            </linearGradient>

            {/* Inactive / Dormant Subtle Gradient */}
            <linearGradient id="base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#25252A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFAD33" stopOpacity="0.3" />
            </linearGradient>

            {/* Glowing filter for active lines */}
            <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF6B00" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Render lines from central hub to each of the 6 nodes */}
          <g>
            {CAPABILITY_NODES.map((node) => {
              const coords = lineCoords[node.id];
              const isDirectlyActive = activeNodeId === node.id;
              const isAllActive = coreHovered;
              const isActive = isDirectlyActive || isAllActive;

              if (!coords) {
                // Initial static geometry fallback before layout observer measures
                const fallbacks = {
                  1: { x1: "50%", y1: "50%", x2: "25%", y2: "26%" },
                  2: { x1: "50%", y1: "50%", x2: "75%", y2: "26%" },
                  3: { x1: "50%", y1: "50%", x2: "50%", y2: "14%" },
                  4: { x1: "50%", y1: "50%", x2: "50%", y2: "86%" },
                  5: { x1: "50%", y1: "50%", x2: "75%", y2: "74%" },
                  6: { x1: "50%", y1: "50%", x2: "25%", y2: "74%" },
                };
                const fb = fallbacks[node.id] || { x1: "50%", y1: "50%", x2: "50%", y2: "50%" };
                return (
                  <line
                    key={node.id}
                    x1={fb.x1}
                    y1={fb.y1}
                    x2={fb.x2}
                    y2={fb.y2}
                    stroke="url(#base-grad)"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.45"
                  />
                );
              }

              return (
                <g key={node.id}>
                  {/* Underlay glow path when active */}
                  {isActive && (
                    <line
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      stroke="#FF6B00"
                      strokeWidth="3.5"
                      strokeOpacity="0.3"
                      filter="blur(3px)"
                    />
                  )}

                  {/* Main connecting dashed line */}
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={coords.x2}
                    y2={coords.y2}
                    className={`node-line ${isActive ? "active" : ""}`}
                    stroke={isActive ? "url(#active-grad)" : "url(#base-grad)"}
                    strokeWidth={isActive ? "2" : "1.2"}
                    strokeDasharray={isActive ? "6 3" : "4 4"}
                    opacity={isActive ? "1" : "0.45"}
                    style={{
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      filter: isActive ? "drop-shadow(0 0 6px rgba(255, 107, 0, 0.7))" : "none",
                    }}
                  />

                  {/* Animated energy pulse dot at target end */}
                  <circle
                    cx={coords.x2}
                    cy={coords.y2}
                    r={isActive ? "3.5" : "2"}
                    fill={isActive ? "#FFEBC7" : "#FFAD33"}
                    opacity={isActive ? "1" : "0.6"}
                    style={{
                      transition: "all 0.3s ease",
                      filter: isActive ? "drop-shadow(0 0 6px #FF6B00)" : "none",
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* ========================================================
            CENTRAL AGNIRO CORE HUB
            ======================================================== */}
        <div
          ref={coreHubRef}
          id="core-hub"
          onMouseEnter={() => setCoreHovered(true)}
          onMouseLeave={() => setCoreHovered(false)}
          className="relative z-20 flex flex-col items-center justify-center cursor-pointer group select-none"
        >
          {/* Outer Concentric Atmospheric Radii */}
          <div className="absolute -inset-10 sm:-inset-12 rounded-full border border-[#FF6B00]/15 animate-core-halo pointer-events-none" />
          <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-[#FFAD33]/25 animate-orbit-ring pointer-events-none" />
          <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-[#25252A] pointer-events-none" />

          {/* Orbiting Particle Dots on Outer Perimeter */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-full animate-orbit-ring pointer-events-none">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFAD33] shadow-[0_0_8px_#FFAD33]" />
          </div>
          <div className="absolute -inset-10 sm:-inset-12 rounded-full animate-orbit-ring-rev pointer-events-none">
            <span className="absolute bottom-1 right-1/4 w-1 h-1 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00]" />
          </div>

          {/* Central Circular Core Body (Obsidian Glass) */}
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#0D0D10]/95 backdrop-blur-xl border transition-all duration-500 flex flex-col items-center justify-center p-5 text-center relative overflow-hidden ${
              coreHovered || activeNodeId
                ? "border-[#FF6B00] scale-[1.03] shadow-[0_0_80px_-10px_rgba(255,107,0,0.55)]"
                : "border-[#25252A] shadow-[0_0_60px_-15px_rgba(255,107,0,0.3)] group-hover:border-[#FF6B00] group-hover:shadow-[0_0_80px_-10px_rgba(255,107,0,0.5)]"
            }`}
          >
            {/* Inner Core Subtle Radial Sheen */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,107,0,0.18)_0%,rgba(237,31,0,0.04)_55%,transparent_75%)] pointer-events-none" />

            {/* Concentric Inner Hairline Ring */}
            <div className="absolute inset-3 rounded-full border border-white/[0.04] pointer-events-none" />

            {/* Agniro Wordmark */}
            <img alt="Agniro" className="w-32 object-contain" src="/agniro-logo.svg" />

            {/* Separator Mini Line with Agniro Gradient */}
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#FFAD33] via-[#FF6B00] to-[#ED1F00] my-2.5 rounded-full" />

            {/* Subtext Mandate */}
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FFAD33] font-medium leading-tight max-w-[140px]">
              PRODUCT • ENGINEERING • INNOVATION
            </span>

            {/* Telemetry Status Micro Badge */}
            <div className="mt-3 inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#16161B] border border-[#25252A] text-[8.5px] font-mono text-[#9B9BA3]">
              <span className="w-1 h-1 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>SYS.CORE // ACTIVE</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            THE 6 CAPABILITY SATELLITE NODES (Constellation Layout)
            ======================================================== */}
        {CAPABILITY_NODES.map((node) => {
          const isActive = activeNodeId === node.id;
          const isDimmed = activeNodeId !== null && !isActive;

          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              data-node={node.id}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              className={`pod-satellite absolute z-10 ${node.desktopPos} ${node.cardWidth} p-4 sm:p-5 rounded-2xl bg-[#121216]/90 backdrop-blur-md border cursor-pointer transition-all duration-300 ${
                isActive
                  ? "border-[#FF6B00] -translate-y-1 scale-[1.02] shadow-[0_16px_36px_-12px_rgba(255,107,0,0.32),0_0_0_1px_rgba(255,107,0,0.45)]"
                  : isDimmed
                  ? "border-[#25252A] opacity-40 grayscale-[20%]"
                  : "border-[#25252A] hover:border-[#FF6B00]/70 hover:-translate-y-1 hover:shadow-[0_14px_32px_-10px_rgba(255,107,0,0.2)]"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2 h-2 rounded-full transition-shadow duration-300"
                    style={{
                      backgroundColor: node.dotColor,
                      boxShadow: isActive ? `0 0 8px ${node.dotColor}` : "none",
                    }}
                  />
                  <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#FFEBC7]">
                    {node.number} // {node.title}
                  </span>
                </div>
                <span
                  className="font-mono text-[9px] font-medium tracking-wider"
                  style={{ color: node.tagColor || "rgba(155, 155, 163, 0.6)" }}
                >
                  {node.tag}
                </span>
              </div>

              {/* Skills / Tech Pills */}
              <div
                className={`flex flex-wrap gap-1.5 ${
                  node.side === "top" || node.side === "bottom"
                    ? "justify-center sm:justify-start"
                    : ""
                }`}
              >
                {node.skills.map((skill) => {
                  const isPillSelected = selectedPills.has(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePill(skill);
                      }}
                      className={`tech-pill px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-200 select-none cursor-pointer ${
                        isPillSelected
                          ? "border-[#FFAD33] bg-[#FF6B00]/20 text-[#FFEBC7] shadow-[0_0_14px_-2px_rgba(255,107,0,0.4)]"
                          : "border-[#25252A] bg-[#0D0D10] text-[#F7F0E5]/90 hover:border-[#FFAD33]/60 hover:bg-[#FF6B00]/10 hover:text-[#FFEBC7]"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          MOBILE & TABLET RESPONSIVE NETWORK (< 1024px)
          Graceful responsive grid with featured core hub
          ======================================================== */}
      <div className="lg:hidden w-full max-w-3xl mx-auto my-6 flex flex-col items-center">
        {/* Core Hub Mini Hero */}
        <div className="relative mb-10 flex flex-col items-center justify-center">
          <div className="absolute -inset-4 rounded-full border border-dashed border-[#FFAD33]/25 animate-orbit-ring pointer-events-none" />
          <div className="w-40 h-40 rounded-full bg-[#0D0D10]/95 backdrop-blur-xl border border-[#FF6B00]/60 shadow-[0_0_50px_-10px_rgba(255,107,0,0.4)] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,107,0,0.18)_0%,transparent_70%)] pointer-events-none" />
            <img alt="Agniro" className="w-28 object-contain" src="/agniro-logo.svg" />
            <div className="w-6 h-[2px] bg-gradient-to-r from-[#FFAD33] via-[#FF6B00] to-[#ED1F00] my-2 rounded-full" />
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#FFAD33] font-medium leading-tight max-w-[120px]">
              PRODUCT • ENGINEERING
            </span>
            <div className="mt-2.5 inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#16161B] border border-[#25252A] text-[8px] font-mono text-[#9B9BA3]">
              <span className="w-1 h-1 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>SYS.CORE // ACTIVE</span>
            </div>
          </div>
        </div>

        {/* 6 Capability Nodes in Clean Responsive Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CAPABILITY_NODES.map((node) => {
            const isSelected = activeNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(isSelected ? null : node.id)}
                className={`p-4 sm:p-5 rounded-2xl bg-[#121216]/90 backdrop-blur-md border transition-all duration-300 ${
                  isSelected
                    ? "border-[#FF6B00] shadow-[0_12px_28px_-10px_rgba(255,107,0,0.3)] scale-[1.01]"
                    : "border-[#25252A] hover:border-[#FF6B00]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: node.dotColor }}
                    />
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#FFEBC7]">
                      {node.number} // {node.title}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[9px] font-medium"
                    style={{ color: node.tagColor || "rgba(155, 155, 163, 0.6)" }}
                  >
                    {node.tag}
                  </span>
                </div>

                <p className="text-[12px] text-[#9B9BA3] mb-3 leading-relaxed">
                  {node.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {node.skills.map((skill) => {
                    const isPillSelected = selectedPills.has(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePill(skill);
                        }}
                        className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono border transition-all duration-200 ${
                          isPillSelected
                            ? "border-[#FFAD33] bg-[#FF6B00]/20 text-[#FFEBC7]"
                            : "border-[#25252A] bg-[#0D0D10] text-[#F7F0E5]/90 hover:border-[#FFAD33]/60"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          Section Bottom Telemetry Ribbon
          ======================================================== */}
      <div className="max-w-7xl w-full mx-auto relative z-10 mt-10 sm:mt-14 pt-4 border-t border-[#25252A] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9B9BA3]/60 gap-3">
        <div className="flex items-center space-x-3">
          <span className="text-[#FFEBC7]/80">INTEGRATED STACK</span>
          <span>•</span>
          {activeNode ? (
            <span className="text-[#FFAD33]">
              FOCUSED LAYER: {activeNode.number} {activeNode.title} // {activeNode.tag}
            </span>
          ) : coreHovered ? (
            <span className="text-[#FF6B00]">SYS.CORE ENGAGED // ALL NODES SYNCHRONIZED</span>
          ) : (
            <span>FULL-CYCLE CAPABILITY DELIVERY</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>AGNIRO ARCHITECTURE</span>
          <span className="text-[#FF6B00]">■</span>
          <span className="text-[#FFEBC7]/70">SECTION 04</span>
        </div>
      </div>

      {/* Component Styles & Animations */}
      <style>{`
        .bg-tech-grid {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        @keyframes pulse-halo {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.75; }
        }
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-dash {
          to { stroke-dashoffset: -28; }
        }

        .animate-core-halo {
          animation: pulse-halo 4s ease-in-out infinite;
        }
        .animate-orbit-ring {
          animation: orbit-cw 28s linear infinite;
        }
        .animate-orbit-ring-rev {
          animation: orbit-ccw 22s linear infinite;
        }

        .node-line.active {
          animation: pulse-dash 0.85s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BuildAccrossTech;
