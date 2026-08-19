"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yyagowwloohvtmrjqduj.supabase.co",
  "sb_publishable_4HdL2YSJhtdf5z1-7afGbw_wCqsjR87",
);

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/samir-portfolio" : "";

/* ── Data ── */
const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Supabase",
  "GraphQL",
  "Redis",
  "Python",
  "Next.js",
  "Tailwind",
];

const WORK = [
  {
    num: "01",
    title: "WildLens",
    tags: ["AI/ML", "Computer Vision"],
    desc: "A real-time bear species detection system built with YOLO11, deployed on a Raspberry Pi 4 with motion-triggered capture and cloud upload pipeline.",
    url: "https://wildlens-e1f6q7mww-samirkarki-1234567890s-projects.vercel.app/",
    featured: true,
  },
  {
    num: "02",
    title: "Coming Soon",
    tags: ["Let's Collaborate"],
    desc: "Got an idea worth building? I'm always open to new projects and collaborations — let's make something together.",
    comingSoon: true,
  },
];

const CASES = [
  {
    idx: "01",
    tag: "Full-Stack · SaaS",
    title: "Real-Time Analytics Platform",
    stack: "React · Node · Redis · Postgres",
    problem: "Fragmented data, no live visibility",
    outcome: "Single pane of glass dashboard",
    stat: "40%",
    statLabel: "Faster Decisions",
  },
  {
    idx: "02",
    tag: "Backend · Infrastructure",
    title: "API Scalability Overhaul",
    stack: "Node · Docker · AWS ECS",
    problem: "P99 latency at 2.4s under load",
    outcome: "Horizontal autoscaling + caching layer",
    stat: "3×",
    statLabel: "Throughput Gain",
  },
  {
    idx: "03",
    tag: "Mobile · Offline-First",
    title: "Field Workforce App",
    stack: "React Native · SQLite · Supabase",
    problem: "GPS tracking failed without connectivity",
    outcome: "Offline queue + background sync",
    stat: "99%",
    statLabel: "Uptime Reported",
  },
];

const BIO_STATS = [
  { num: "3", unit: "+", label: "Years in Industry" },
  { num: "12", unit: "+", label: "Projects Shipped" },
  { num: "5", unit: "+", label: "Tech Stacks" },
  { num: "∞", unit: "", label: "Cups of Coffee" },
];

const NAV_LINKS = ["Work", "Case Studies", "About", "Contact"];
const TICKER_ITEMS = [
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "REST APIs",
  "Docker",
  "AWS",
  "Git",
  "CI/CD",
];

/* ── Page ── */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = useState<"neon" | "blend">("neon");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleFormChange = (
    field: "name" | "email" | "subject" | "message",
    value: string,
  ) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
    ]);
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:    #09090b;
          --smoke:  #111113;
          --steel:  #1a1a1e;
          --mist:   #28282f;
          --silver: #8e8e9e;
          --cloud:  #c8c8d8;
          --white:  #efeff5;
          --accent: #e8f04a;
          --accent2:#4af0b8;
          --fd: 'Bebas Neue', sans-serif;
          --fb: 'DM Sans', sans-serif;
          --fm: 'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--ink);
          color: var(--white);
          font-family: var(--fb);
          overflow-x: hidden;
          cursor: none;
        }

        /* ── Cursor ── */
        .cursor-canvas {
          position: fixed; inset: 0; z-index: 9999; pointer-events: none;
          width: 100vw; height: 100vh;
        }
        .cursor-dot {
          position: fixed; z-index: 10000; pointer-events: none;
          width: 7px; height: 7px;
          background: #fff; border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px 2px rgba(180,120,255,1), 0 0 20px 6px rgba(100,60,255,0.7);
        }

        /* ── Nav ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 26px 48px;
          transition: background .4s, backdrop-filter .4s;
        }
        nav.scrolled {
          background: rgba(9,9,11,.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .nav-logo {
          font-family: var(--fd); font-size: 22px; letter-spacing: 4px;
          color: var(--white); text-decoration: none;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-family: var(--fm); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--silver); text-decoration: none;
          transition: color .2s;
        }
        .nav-links a:hover { color: var(--white); }
        .nav-hire {
          font-family: var(--fm); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; background: var(--accent); color: var(--ink);
          border: none; padding: 11px 22px; cursor: none;
          transition: background .2s, transform .2s;
        }
        .nav-hire:hover { background: var(--accent2); transform: translateY(-2px); }
        .cursor-toggle {
          font-family: var(--fm); font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; background: transparent; color: var(--silver);
          border: 1px solid var(--mist); padding: 9px 16px; cursor: none;
          display: flex; align-items: center; gap: 8px;
          transition: border-color .2s, color .2s, transform .2s;
        }
        .cursor-toggle:hover { border-color: var(--silver); color: var(--white); transform: translateY(-2px); }
        .cursor-toggle-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
          transition: background .3s, box-shadow .3s;
        }
        .cursor-toggle-dot.neon {
          background: rgba(220,180,255,1);
          box-shadow: 0 0 6px 2px rgba(160,100,255,0.8);
        }
        .cursor-toggle-dot.blend {
          background: #fff;
          box-shadow: none;
        }
        body.cursor-hover .cursor-dot { opacity: 0; }
        body.cursor-hover .blend-circle { width: 80px !important; height: 80px !important; opacity: 0.9 !important; }
        body.cursor-clicking .blend-circle { width: 60px !important; height: 60px !important; }

        /* ── Hero ── */
        .hero {
          height: 100vh; min-height: 680px;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: linear-gradient(130deg, var(--ink) 0%, var(--smoke) 50%, #1c1c24 100%);
        }
        .hero-bg::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 55% at 65% 50%, rgba(232,240,74,.06) 0%, transparent 70%);
        }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 64px,
            rgba(255,255,255,.015) 64px, rgba(255,255,255,.015) 65px
          );
        }
        .hero-slash {
          position: absolute; top: -10%; bottom: -10%; left: 48%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--accent), transparent);
          transform: rotate(-12deg); opacity: .3;
        }
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none;
        }
        .orb-1 { width: 480px; height: 480px; background: rgba(232,240,74,.07); top: -80px; right: 8%; }
        .orb-2 { width: 280px; height: 280px; background: rgba(74,240,184,.05); bottom: 40px; left: 18%; }
        .hero-ghost {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--fd);
          font-size: clamp(130px, 20vw, 280px);
          letter-spacing: -4px; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.03);
          pointer-events: none; white-space: nowrap; z-index: 0;
        }

        .hero-content {
          position: relative; z-index: 10;
          max-width: 1280px; width: 100%; margin: 0 auto;
          padding: 0 48px;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: 48px;
        }

        .hero-eyebrow {
          font-family: var(--fm); font-size: 11px; letter-spacing: 4px;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 22px; display: flex; align-items: center; gap: 10px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .7s .15s, transform .7s .15s;
        }
        .hero-eyebrow.in { opacity: 1; transform: none; }
        .hero-eyebrow::before {
          content: ''; display: block; width: 28px; height: 1px;
          background: var(--accent);
        }

        .hero-title {
          font-family: var(--fd);
          font-size: clamp(68px, 9vw, 138px);
          line-height: .9; letter-spacing: 2px; color: var(--white);
          margin-bottom: 8px;
          opacity: 0; transform: translateY(36px);
          transition: opacity .8s .3s, transform .8s .3s;
        }
        .hero-title.in { opacity: 1; transform: none; }
        .hero-title .accent { color: var(--accent); }
        .hero-title .outline {
          -webkit-text-stroke: 1.5px var(--mist); color: transparent;
        }

        .hero-subtitle {
          font-size: 15px; line-height: 1.75; color: var(--silver);
          max-width: 400px; margin-bottom: 44px; font-weight: 300;
          opacity: 0; transform: translateY(18px);
          transition: opacity .7s .5s, transform .7s .5s;
        }
        .hero-subtitle.in { opacity: 1; transform: none; }
        .hero-subtitle strong { color: var(--white); font-weight: 400; }

        .hero-actions {
          display: flex; gap: 14px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .7s .65s, transform .7s .65s;
        }
        .hero-actions.in { opacity: 1; transform: none; }

        .btn-primary {
          background: var(--accent); color: var(--ink);
          font-family: var(--fm); font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 15px 34px; border: none; cursor: none;
          transition: background .2s, transform .2s, box-shadow .2s;
        }
        .btn-primary:hover {
          background: var(--accent2); transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(232,240,74,.22);
        }
        .btn-ghost {
          background: transparent; color: var(--cloud);
          font-family: var(--fm); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; padding: 15px 34px;
          border: 1px solid var(--mist); cursor: none;
          transition: border-color .2s, color .2s, transform .2s;
        }
        .btn-ghost:hover { border-color: var(--silver); color: var(--white); transform: translateY(-3px); }

        /* hero right */
        .hero-right {
          display: flex; flex-direction: column; align-items: flex-end; gap: 20px;
          opacity: 0; transform: translateX(36px);
          transition: opacity 1s .45s, transform 1s .45s;
        }
        .hero-right.in { opacity: 1; transform: none; }

        .stat-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          backdrop-filter: blur(8px);
          padding: 26px 32px; width: 250px;
          position: relative; overflow: hidden;
          transition: transform .3s, border-color .3s;
        }
        .stat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform: scaleX(0); transform-origin: left; transition: transform .4s;
        }
        .stat-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,.14); }
        .stat-card:hover::before { transform: scaleX(1); }
        .stat-num {
          font-family: var(--fd); font-size: 48px; letter-spacing: 1px;
          color: var(--white); line-height: 1; margin-bottom: 4px;
        }
        .stat-num span { color: var(--accent); }
        .stat-label {
          font-family: var(--fm); font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--silver);
        }
        .stat-desc { font-size: 12px; color: rgba(255,255,255,.2); margin-top: 3px; }

        /* scroll hint */
        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--fm); font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--silver);
          opacity: 0; animation: fadeUp 1s 1.6s forwards;
        }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%,100% { transform: scaleY(1); opacity: 1; } 50% { transform: scaleY(.5); opacity: .4; } }
        @keyframes fadeUp { to { opacity: 1; } }

        /* ── Ticker ── */
        .ticker-wrap {
          overflow: hidden; background: var(--steel);
          border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist);
          padding: 13px 0;
        }
        .ticker-track {
          display: flex; width: max-content;
          animation: ticker 28s linear infinite;
        }
        .ticker-item {
          font-family: var(--fm); font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--silver);
          padding: 0 44px; white-space: nowrap;
        }
        .ticker-item span { color: var(--accent); margin-right: 10px; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── Sections shared ── */
        .section {
          padding: 110px 48px; position: relative;
        }
        .section::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--mist), transparent);
        }
        .sec-label {
          font-family: var(--fm); font-size: 10px; letter-spacing: 4px;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
        }
        .sec-label::before {
          content: ''; display: block; width: 22px; height: 1px; background: var(--accent);
        }
        .sec-h2 {
          font-family: var(--fd); font-size: clamp(44px, 5.5vw, 82px);
          letter-spacing: 2px; line-height: .93;
          margin-bottom: 56px; max-width: 580px;
        }
        .sec-h2 .dim { color: var(--mist); }

        /* ── Work grid ── */
        .work-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 2px; max-width: 1280px; margin: 0 auto;
        }
        .work-card {
          background: var(--steel); position: relative; overflow: hidden;
          aspect-ratio: 16/9; display: flex; flex-direction: column;
          justify-content: flex-end; padding: 36px;
          transition: background .3s; cursor: none;
          text-decoration: none; color: inherit;
        }
        .work-card:hover { background: var(--mist); }
        .work-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform: scaleX(0); transform-origin: left; transition: transform .5s;
        }
        .work-card:hover::after { transform: scaleX(1); }
        .work-num {
          font-family: var(--fd); font-size: 100px;
          color: rgba(255,255,255,.04); line-height: 1;
          position: absolute; top: 16px; right: 24px;
          transition: color .3s;
        }
        .work-card:hover .work-num { color: rgba(232,240,74,.07); }
        .work-arrow {
          position: absolute; top: 28px; right: 28px;
          width: 40px; height: 40px;
          border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: var(--silver);
          transition: background .3s, color .3s, border-color .3s;
        }
        .work-card:hover .work-arrow { background: var(--accent); color: var(--ink); border-color: var(--accent); }
        .work-tags { display: flex; gap: 8px; margin-bottom: 10px; }
        .work-tag {
          background: rgba(255,255,255,.07); padding: 4px 10px;
          font-family: var(--fm); font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--silver);
        }
        .work-title {
          font-family: var(--fd); font-size: clamp(28px, 3vw, 42px);
          letter-spacing: 1px; margin-bottom: 10px;
        }
        .work-desc { font-size: 13px; line-height: 1.65; color: var(--silver); font-weight: 300; max-width: 380px; }

        .work-card.featured {
          grid-column: 1 / -1;
          aspect-ratio: 32/9;
          border: 1px solid rgba(232,240,74,.35);
          animation: featuredGlow 2.6s ease-in-out 3;
          background-size: cover;
          background-position: center;
        }
        @keyframes featuredGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,240,74,0); }
          50% { box-shadow: 0 0 46px 6px rgba(232,240,74,.28); }
        }
        .featured-badge {
          position: absolute; top: 28px; left: 36px;
          font-family: var(--fm); font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--ink); background: var(--accent);
          padding: 6px 12px;
          display: flex; align-items: center; gap: 6px;
        }
        .featured-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--ink); animation: dotPulse 1.4s ease-in-out infinite; }
        @keyframes dotPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

        .work-card.coming-soon {
          background: transparent;
          border: 1px dashed var(--mist);
          justify-content: center; align-items: center; text-align: center;
          cursor: default;
        }
        .work-card.coming-soon:hover { background: rgba(255,255,255,.02); }
        .work-card.coming-soon .work-title { color: var(--silver); }
        .work-card.coming-soon .work-desc { max-width: 300px; margin: 0 auto; }

        /* ── Case studies ── */
        .cases-list { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 2px; }
        .case-item {
          background: var(--steel); padding: 48px;
          display: grid; grid-template-columns: 80px 1fr 1fr auto;
          align-items: center; gap: 40px;
          position: relative; overflow: hidden;
          transition: background .3s; cursor: none;
        }
        .case-item:hover { background: var(--mist); }
        .case-item::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: var(--accent); transform: scaleY(0); transform-origin: top;
          transition: transform .4s;
        }
        .case-item:hover::before { transform: scaleY(1); }
        .case-idx { font-family: var(--fd); font-size: 56px; color: rgba(255,255,255,.07); line-height: 1; }
        .case-tag {
          font-family: var(--fm); font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
        }
        .case-title { font-family: var(--fd); font-size: 32px; letter-spacing: 1px; }
        .case-meta { display: flex; flex-direction: column; gap: 8px; }
        .case-meta-row {
          font-family: var(--fm); font-size: 11px; letter-spacing: 1px; color: var(--silver);
        }
        .case-meta-row strong { color: var(--white); font-weight: 400; }
        .case-stat { font-family: var(--fd); font-size: 42px; letter-spacing: 1px; color: var(--accent); text-align: right; white-space: nowrap; }
        .case-stat span {
          display: block; font-family: var(--fm); font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; color: var(--silver);
        }

        /* ── About ── */
        .about-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .portrait-box {
  position: relative; 
  max-width: 340px;
  width: 100%;
  aspect-ratio: 3/4;
}

/* New wrapper to contain the image and mask without hiding the accents */
.portrait-image-wrapper {
  position: absolute;
  inset: 0;
  background: var(--steel);
  overflow: hidden; /* Keeps the gradient mask inside the photo frame */
}

.portrait-image-wrapper::before {
  content: ''; 
  position: absolute; 
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(9,9,11,.7));
  z-index: 2; /* Keeps gradient on top of the image */
  pointer-events: none;
}

/* Force your image to fill the layout space properly */
.portrait-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
}

.portrait-accent-box {
  position: absolute; 
  bottom: -12px; 
  right: -12px;
  width: 100px; 
  height: 100px; 
  border: 1px solid var(--accent); 
  pointer-events: none;
  z-index: 3; /* Places it outside and layered nicely */
}

.portrait-accent-box2 {
  position: absolute; 
  top: -12px; 
  left: -12px;
  width: 60px; 
  height: 60px; 
  border: 1px solid rgba(255,255,255,.08); 
  pointer-events: none;
  z-index: 3;
}

        .skills-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
        .chip {
          font-family: var(--fm); font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          padding: 8px 14px; border: 1px solid var(--mist); color: var(--silver);
          transition: border-color .2s, color .2s;
        }
        .chip:hover { border-color: var(--accent); color: var(--accent); }
        .bio-text {
          font-size: 15px; line-height: 1.85; color: var(--silver);
          font-weight: 300; margin-bottom: 24px;
        }
        .bio-text strong { color: var(--white); font-weight: 400; }
        .bio-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin: 36px 0; }
        .bstat { background: var(--steel); padding: 24px 28px; }
        .bstat-num { font-family: var(--fd); font-size: 48px; letter-spacing: 1px; color: var(--white); }
        .bstat-num em { color: var(--accent); font-style: normal; }
        .bstat-label { font-family: var(--fm); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--silver); }

        /* ── Contact ── */
        .contact-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .cf-label {
          font-family: var(--fm); font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--silver);
          display: block; margin-bottom: 8px;
        }
        .cf-field { margin-bottom: 20px; }
        .cf-input {
          width: 100%; background: var(--steel); border: 1px solid var(--mist);
          color: var(--white); font-family: var(--fb); font-size: 14px;
          padding: 14px 18px; outline: none; transition: border-color .2s; cursor: none;
        }
        .cf-input:focus { border-color: var(--accent); }
        textarea.cf-input { resize: vertical; min-height: 120px; }
        .cf-submit {
          background: var(--accent); color: var(--ink);
          font-family: var(--fm); font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 16px 40px; border: none; cursor: none; margin-top: 8px;
          transition: background .2s, transform .2s, box-shadow .2s;
        }
        .cf-submit:hover {
          background: var(--accent2); transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(232,240,74,.2);
        }
        .ci-item {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 28px 0; border-bottom: 1px solid var(--steel);
          transition: border-color .2s;
        }
        .ci-item:hover { border-color: var(--mist); }
        .ci-icon {
          width: 42px; height: 42px; border: 1px solid var(--mist); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: var(--silver);
          transition: background .2s, border-color .2s, color .2s;
        }
        .ci-item:hover .ci-icon { background: var(--accent); border-color: var(--accent); color: var(--ink); }
        .ci-label { font-family: var(--fm); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--silver); margin-bottom: 4px; }
        .ci-val { font-size: 15px; color: var(--white); text-decoration: none; transition: color .2s; }
        .ci-val:hover { color: var(--accent); }
        .social-row { display: flex; gap: 10px; margin-top: 36px; }
        .social-btn {
          width: 44px; height: 44px; border: 1px solid var(--mist);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--fm); font-size: 11px; letter-spacing: 1px;
          color: var(--silver); text-decoration: none; cursor: none;
          transition: background .2s, border-color .2s, color .2s;
        }
        .social-btn:hover { background: var(--accent); border-color: var(--accent); color: var(--ink); }

        /* ── CTA Strip ── */
        .cta-strip {
          background: var(--accent); padding: 72px 48px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
        }
        .cta-text { font-family: var(--fd); font-size: clamp(32px, 4vw, 62px); letter-spacing: 2px; color: var(--ink); line-height: 1; }
        .cta-text span { color: rgba(9,9,11,.35); }
        .btn-dark {
          background: var(--ink); color: var(--accent);
          font-family: var(--fm); font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 18px 44px; border: none; cursor: none; white-space: nowrap; flex-shrink: 0;
          transition: background .2s, transform .2s;
        }
        .btn-dark:hover { background: var(--smoke); transform: translateY(-2px); }

        /* ── Footer ── */
        footer {
          background: var(--smoke); padding: 42px 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--steel);
        }
        .footer-logo { font-family: var(--fd); font-size: 20px; letter-spacing: 3px; color: var(--white); }
        .footer-logo span { color: var(--accent); }
        .footer-copy { font-family: var(--fm); font-size: 11px; letter-spacing: 1px; color: var(--white); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          nav { padding: 18px 24px; }
          .nav-links { display: none; }
          .hero-content { grid-template-columns: 1fr; padding: 0 24px; }
          .hero-right { display: none; }
          .work-grid { grid-template-columns: 1fr; }
          .work-card.featured {
            aspect-ratio: auto;
            min-height: 340px;
            padding-top: 64px;
          }
          .featured-badge {
            top: 20px; left: 20px;
          }
          .work-card.featured .work-arrow {
            top: 20px; right: 20px;
          }
          .case-item { grid-template-columns: 1fr; gap: 12px; padding: 28px; }
          .case-stat { text-align: left; }
          .about-inner, .contact-inner { grid-template-columns: 1fr; gap: 48px; }
          .section, .about-section, .contact-section { padding: 72px 24px; }
          .cta-strip { flex-direction: column; align-items: flex-start; padding: 48px 24px; }
          footer { flex-direction: column; gap: 12px; align-items: flex-start; padding: 32px 24px; }
        }
      `}</style>

      <Cursor mode={cursorMode} />
      <Nav
        onScrollTo={scrollTo}
        cursorMode={cursorMode}
        onToggleCursor={() =>
          setCursorMode((m) => (m === "neon" ? "blend" : "neon"))
        }
      />

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-slash" />
        <div
          className="orb orb-1"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.3}px)`,
          }}
        />
        <div
          className="orb orb-2"
          style={{
            transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.2}px)`,
          }}
        />
        <div className="hero-ghost">CODE</div>

        <div className="hero-content">
          <div>
            <p className={`hero-eyebrow ${loaded ? "in" : ""}`}>
              Software Engineer
            </p>
            <h1 className={`hero-title ${loaded ? "in" : ""}`}>
              BUILD<span className="accent">.</span>
              <br />
              <span className="outline">SHIP.</span>
              <br />
              REPEAT<span className="accent">.</span>
            </h1>
            <p className={`hero-subtitle ${loaded ? "in" : ""}`}>
              Hi, I&apos;m <strong>Samir Karki</strong> — a software engineer
              who turns ideas into fast, scalable, and thoughtfully crafted
              products. From backend APIs to polished UIs.
            </p>
            <div className={`hero-actions ${loaded ? "in" : ""}`}>
              <button className="btn-primary" onClick={() => scrollTo("work")}>
                View My Work
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>
                Get In Touch
              </button>
            </div>
          </div>

          <div className={`hero-right ${loaded ? "in" : ""}`}>
            <HeroStatCard
              num="3"
              unit="+"
              label="Years Experience"
              desc="Building production software"
              accent
            />
            <HeroStatCard
              num="12"
              unit="+"
              label="Projects Shipped"
              desc="Web, mobile, & backend systems"
            />
            <HeroStatCard
              num="Full·Stack"
              label="End-to-End Dev"
              desc="React, Node, Postgres & beyond"
              accent2
            />
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <div key={i} style={{ display: "flex" }}>
              {TICKER_ITEMS.map((t) => (
                <div key={t} className="ticker-item">
                  <span>✦</span>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section
        className="section"
        id="work"
        style={{ background: "var(--smoke)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className="sec-label">Selected Work</p>
          <h2 className="sec-h2">
            PROJECTS
            <br />
            <span className="dim">WORTH</span>
            <br />
            SEEING
          </h2>
          <div className="work-grid">
            {WORK.map((w) =>
              w.url ? (
                <a
                  className={`work-card${w.featured ? " featured" : ""}`}
                  key={w.num}
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  style={
                    w.featured
                      ? {
                          backgroundImage: `linear-gradient(180deg, rgba(9,9,11,.35) 0%, rgba(9,9,11,.55) 55%, rgba(9,9,11,.92) 100%), url('${BASE_PATH}/wildlens-preview.png')`,
                        }
                      : undefined
                  }
                >
                  {w.featured && (
                    <span className="featured-badge">New · Featured</span>
                  )}
                  <div className="work-num">{w.num}</div>
                  <div className="work-arrow">↗</div>
                  <div className="work-tags">
                    {w.tags.map((t) => (
                      <span key={t} className="work-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="work-title">{w.title}</div>
                  <p className="work-desc">{w.desc}</p>
                </a>
              ) : (
                <div
                  className={`work-card${w.comingSoon ? " coming-soon" : ""}`}
                  key={w.num}
                  onClick={w.comingSoon ? () => scrollTo("contact") : undefined}
                >
                  {!w.comingSoon && <div className="work-num">{w.num}</div>}
                  {!w.comingSoon && <div className="work-arrow">↗</div>}
                  <div className="work-tags">
                    {w.tags.map((t) => (
                      <span key={t} className="work-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="work-title">{w.title}</div>
                  <p className="work-desc">{w.desc}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section
        className="section"
        id="cases"
        style={{ background: "var(--ink)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className="sec-label">Deep Dives</p>
          <h2 className="sec-h2">
            CASE
            <br />
            <span className="dim">STUDIES</span>
          </h2>
          <div className="cases-list">
            {CASES.map((c) => (
              <div className="case-item" key={c.idx}>
                <div className="case-idx">{c.idx}</div>
                <div>
                  <div className="case-tag">{c.tag}</div>
                  <div className="case-title">{c.title}</div>
                </div>
                <div className="case-meta">
                  <div className="case-meta-row">
                    Stack: <strong>{c.stack}</strong>
                  </div>
                  <div className="case-meta-row">
                    Problem: <strong>{c.problem}</strong>
                  </div>
                  <div className="case-meta-row">
                    Outcome: <strong>{c.outcome}</strong>
                  </div>
                </div>
                <div className="case-stat">
                  {c.stat}
                  <span>{c.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        className="section about-section"
        id="about"
        style={{ background: "var(--smoke)" }}
      >
        <div className="about-inner">
          <div>
            <div className="portrait-box">
              {/* Accent boxes live safely outside the image overflow crop */}
              <div className="portrait-accent-box" />
              <div className="portrait-accent-box2" />

              {/* Image container handles the background, overflow, and picture loading */}
              <div className="portrait-image-wrapper">
                <img
                  src={`${BASE_PATH}/my-profile-pic.png`}
                  alt="Samir Karki"
                />
              </div>
            </div>

            <div className="skills-chips">
              {SKILLS.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="sec-label">About Me</p>
            <h2 className="sec-h2" style={{ marginBottom: 28 }}>
              WHO IS
              <br />
              <span className="dim">SAMIR?</span>
            </h2>
            <p className="bio-text">
              I&apos;m <strong>Samir Karki</strong>, a software engineer
              passionate about building products that are both technically sound
              and genuinely enjoyable to use. I thrive at the intersection of
              backend architecture and clean frontend experiences.
            </p>
            <p className="bio-text">
              My work spans everything from designing scalable database schemas
              and REST/GraphQL APIs to crafting pixel-precise UIs. I care deeply
              about developer experience, code quality, and shipping things that
              actually work in the real world.
            </p>
            <p className="bio-text">
              When I&apos;m not coding, you&apos;ll find me exploring new
              frameworks, contributing to open source, or hiking the trails
              around <strong>Calgary, AB</strong>.
            </p>
            <div className="bio-stats">
              {BIO_STATS.map((b) => (
                <div className="bstat" key={b.label}>
                  <div className="bstat-num">
                    {b.num}
                    <em style={{ color: "var(--accent)", fontStyle: "normal" }}>
                      {b.unit}
                    </em>
                  </div>
                  <div className="bstat-label">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        className="section contact-section"
        id="contact"
        style={{ background: "var(--ink)" }}
      >
        <div className="contact-inner">
          <div>
            <p className="sec-label">Get In Touch</p>
            <h2 className="sec-h2" style={{ marginBottom: 36 }}>
              LET&apos;S
              <br />
              <span className="dim">TALK</span>
            </h2>
            <div className="cf-field">
              <label className="cf-label">Your Name</label>
              <input
                className="cf-input"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label className="cf-label">Email Address</label>
              <input
                className="cf-input"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label className="cf-label">Subject</label>
              <input
                className="cf-input"
                type="text"
                placeholder="Project inquiry, collaboration..."
                value={form.subject}
                onChange={(e) => handleFormChange("subject", e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label className="cf-label">Message</label>
              <textarea
                className="cf-input"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
              />
            </div>
            <button
              className="cf-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>
            {status === "sent" && (
              <p
                style={{
                  marginTop: 14,
                  fontFamily: "var(--fm)",
                  fontSize: 12,
                  color: "var(--accent2)",
                }}
              >
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p
                style={{
                  marginTop: 14,
                  fontFamily: "var(--fm)",
                  fontSize: 12,
                  color: "#ff6b6b",
                }}
              >
                Please fill in your name, email, and message, then try again.
              </p>
            )}
          </div>

          <div>
            <p className="sec-label" style={{ marginBottom: 32 }}>
              Contact Info
            </p>
            <div className="ci-item">
              <div className="ci-icon">✉</div>
              <div>
                <div className="ci-label">Email</div>
                <a className="ci-val" href="mailto:samirkarki675@gmail.com">
                  samirkarki675@gmail.com
                </a>
              </div>
            </div>
            <div className="ci-item">
              <div className="ci-icon">📍</div>
              <div>
                <div className="ci-label">Location</div>
                <span className="ci-val">Calgary, Alberta, Canada</span>
              </div>
            </div>
            <div className="ci-item">
              <div className="ci-icon">💼</div>
              <div>
                <div className="ci-label">Availability</div>
                <span className="ci-val" style={{ color: "var(--accent2)" }}>
                  Open to opportunities
                </span>
              </div>
            </div>
            <div className="social-row">
              <a
                className="social-btn"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                GH
              </a>
              <a
                className="social-btn"
                href="https://www.linkedin.com/in/samir-karki-0291b433b/"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                LI
              </a>
              <a
                className="social-btn"
                href="https://x.com/SamirKa74779692"
                target="_blank"
                rel="noreferrer"
                title="Twitter/X"
              >
                X
              </a>
              <a
                className="social-btn"
                href={`${BASE_PATH}/resume.pdf`}
                target="_blank"
                rel="noreferrer"
                title="Resume"
              >
                CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <div className="cta-strip">
        <div className="cta-text">
          GOT A<br />
          <span>PROJECT?</span> LET&apos;S BUILD.
        </div>
        <button className="btn-dark" onClick={() => scrollTo("contact")}>
          Start a Conversation
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">
          SAMIR<span>.</span>DEV
        </div>
        <div className="footer-copy">
          © 2025 Samir Karki · Built with passion &amp; a lot of coffee
        </div>
      </footer>
    </>
  );
}

/* ── Sub-components ── */

function Cursor({ mode }: { mode: "neon" | "blend" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // ── Neon trail cursor ──────────────────────────────────
  useEffect(() => {
    if (mode !== "neon") return;
    const canvas = canvasRef.current!;
    const dotEl = dotRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const POINTS = 28;
    const LERP = 0.35;
    type Pt = { x: number; y: number };
    const pts: Pt[] = Array.from({ length: POINTS }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    let mouse = { x: pts[0].x, y: pts[0].y };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dotEl.style.left = e.clientX + "px";
      dotEl.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts[0].x += (mouse.x - pts[0].x) * LERP;
      pts[0].y += (mouse.y - pts[0].y) * LERP;
      for (let i = 1; i < POINTS; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * LERP;
        pts[i].y += (pts[i - 1].y - pts[i].y) * LERP;
      }
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < POINTS - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[POINTS - 1].x, pts[POINTS - 1].y);
      ctx.strokeStyle = "rgba(140, 80, 255, 0.18)";
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.strokeStyle = "rgba(160, 100, 255, 0.45)";
      ctx.lineWidth = 7;
      ctx.stroke();
      ctx.strokeStyle = "rgba(220, 180, 255, 0.95)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  // ── Blend-mode circle cursor ───────────────────────────
  useEffect(() => {
    if (mode !== "blend") return;
    const dotEl = dotRef.current!;
    const circleEl = circleRef.current!;

    let cx = window.innerWidth / 2,
      cy = window.innerHeight / 2;
    let mx = cx,
      my = cy;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dotEl.style.left = mx + "px";
      dotEl.style.top = my + "px";
    };

    let raf: number;
    const loop = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      circleEl.style.left = cx + "px";
      circleEl.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");
    const onDown = () => document.body.classList.add("cursor-clicking");
    const onUp = () => document.body.classList.remove("cursor-clicking");

    const attach = () => {
      document
        .querySelectorAll(
          "a, button, [role='button'], input, textarea, .work-card, .case-item, .stat-card",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-hover", "cursor-clicking");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      obs.disconnect();
    };
  }, [mode]);

  return (
    <>
      {/* Canvas — only visible in neon mode */}
      <canvas
        ref={canvasRef}
        className="cursor-canvas"
        style={{ opacity: mode === "neon" ? 1 : 0, transition: "opacity .4s" }}
      />

      {/* Dot — shown in both modes, styled differently */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={
          mode === "blend"
            ? {
                background: "#fff",
                boxShadow: "none",
                mixBlendMode: "difference",
                width: 8,
                height: 8,
              }
            : {}
        }
      />

      {/* Blend circle — only in blend mode */}
      <div
        ref={circleRef}
        className="blend-circle"
        style={{
          position: "fixed",
          zIndex: 9998,
          pointerEvents: "none",
          width: 40,
          height: 40,
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          opacity: mode === "blend" ? 0.15 : 0,
          transition:
            "opacity .4s, width .4s cubic-bezier(.25,.46,.45,.94), height .4s cubic-bezier(.25,.46,.45,.94)",
        }}
      />
    </>
  );
}

function Nav({
  onScrollTo,
  cursorMode,
  onToggleCursor,
}: {
  onScrollTo: (id: string) => void;
  cursorMode: "neon" | "blend";
  onToggleCursor: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#home" className="nav-logo">
        SAMIR<span>.</span>DEV
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              onClick={(e) => {
                e.preventDefault();
                onScrollTo(l.split(" ")[0].toLowerCase());
              }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          className="cursor-toggle"
          onClick={onToggleCursor}
          title="Switch cursor style"
        >
          <span
            className={`cursor-toggle-dot ${cursorMode === "neon" ? "blend" : "neon"}`}
          />
          {cursorMode === "neon" ? "Blend Cursor" : "Neon Cursor"}
        </button>
        <button className="nav-hire" onClick={() => onScrollTo("contact")}>
          Hire Me
        </button>
      </div>
    </nav>
  );
}

function HeroStatCard({
  num,
  unit = "",
  label,
  desc,
  accent = false,
  accent2 = false,
}: {
  num: string;
  unit?: string;
  label: string;
  desc: string;
  accent?: boolean;
  accent2?: boolean;
}) {
  return (
    <div className="stat-card">
      <div
        className="stat-num"
        style={num.length > 4 ? { fontSize: 36, paddingTop: 6 } : {}}
      >
        {num}
        <span style={{ color: accent2 ? "var(--accent2)" : "var(--accent)" }}>
          {unit}
        </span>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
}
