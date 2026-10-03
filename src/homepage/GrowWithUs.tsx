import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Swal from "sweetalert2";
import { SEOHead } from '../utility/components/SEOHead';
import { Box } from "@mui/material";
import { GrowthFlywheel } from "./GrowthFlywheel";
import wpQrCode from "../assets/wp_qr_code.svg";
import {
  ClipboardList, FileText, ShieldCheck, Lock,
  Target, Building2, BarChart2,
  Radio, Palette, Rocket,
  Search, FlaskConical, BrainCircuit, PenLine, TrendingUp,
  Footprints, Map, CalendarDays, ImageIcon, CheckCircle2,
  MessageCircle, FileEdit,
  Mail, Phone, MapPin,
  Eye, ShoppingBag, KeyRound,
} from "lucide-react";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
  { id: "overview", label: "Platform" },
  { id: "crm", label: "CRM Portal" },
  { id: "recommend", label: "Recommendation" },
  { id: "ai-marketing", label: "AI Marketing" },
  { id: "self-learning", label: "Performance Learning" },
  { id: "contact", label: "Try Demo" },
];

const STYLES = `
:root {
  --bg-base: #020617;
  --bg-1: #0F172A;
  --bg-2: #1E293B;
  --bg-3: #334155;
  --accent: #6366F1;
  --accent-hover: #818CF8;
  --accent-tint: rgba(99, 102, 241, 0.12);
  --accent-tint-strong: rgba(99, 102, 241, 0.20);
  --accent-2: #06B6D4;
  --accent-2-tint: rgba(6, 182, 212, 0.10);
  --text-heading: #FFFFFF;
  --text-body: #D1D5DB;
  --text-secondary: #A1A8B8;
  --text-muted: #6B7280;
  --success: #10B981;
  --success-tint: rgba(16, 185, 129, 0.10);
  --warning: #F59E0B;
  --danger: #EF4444;
  --danger-tint: rgba(239, 68, 68, 0.10);
  --border: rgba(148, 163, 184, 0.06);
  --border-hover: rgba(148, 163, 184, 0.14);
  --border-focus: rgba(99, 102, 241, 0.4);
  --glass-bg: rgba(10, 15, 30, 0.55);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-highlight: rgba(255, 255, 255, 0.04);
  --glass-blur: 20px;
}

.gwu-root,
.gwu-root *,
.gwu-root *::before,
.gwu-root *::after {
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.gwu-root {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #030712;
  color: var(--text-body);
  overflow: hidden;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Layer 1 — Mesh gradient base (fixed, covers entire root) */
.gwu-bg-mesh {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 100% 60% at 50% -5%, rgba(99, 102, 241, 0.20), transparent 65%),
    radial-gradient(ellipse 80% 80% at -10% 55%, rgba(6, 182, 212, 0.10), transparent 65%),
    radial-gradient(ellipse 80% 80% at 110% 50%, rgba(139, 92, 246, 0.10), transparent 65%),
    radial-gradient(ellipse 90% 60% at 50% 110%, rgba(99, 102, 241, 0.08), transparent 65%),
    radial-gradient(circle 900px at 30% 30%, rgba(56, 189, 248, 0.05), transparent),
    radial-gradient(circle 700px at 70% 80%, rgba(168, 85, 247, 0.05), transparent),
    #030712;
}

/* Layer 2 — Aurora orbs, slow drift */
.gwu-bg-aurora {
  position: fixed;
  inset: -20%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(400px circle at 20% 25%, rgba(99, 102, 241, 0.25), transparent 65%),
    radial-gradient(480px circle at 80% 18%, rgba(6, 182, 212, 0.16), transparent 65%),
    radial-gradient(450px circle at 72% 82%, rgba(139, 92, 246, 0.20), transparent 65%),
    radial-gradient(380px circle at 15% 85%, rgba(56, 189, 248, 0.12), transparent 65%),
    radial-gradient(300px circle at 50% 50%, rgba(99, 102, 241, 0.10), transparent 60%);
  filter: blur(60px) saturate(130%);
  animation: gwuAurora 32s ease-in-out infinite alternate;
}

/* Layer 3 — Fine line grid with vignette mask */
.gwu-bg-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 80%);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 80%);
}

/* Layer 4 — Depth atmosphere: soft center luminance + edge vignette */
.gwu-bg-beam {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 45% at 50% 35%, rgba(99, 102, 241, 0.06), transparent 70%),
    radial-gradient(ellipse 50% 40% at 50% 35%, rgba(255, 255, 255, 0.015), transparent 60%),
    radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.35) 100%);
}

/* Layer 5 — Film grain noise (SVG-based, GPU-friendly) */
.gwu-bg-noise {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.028;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

@keyframes gwuAurora {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  33%  { transform: translate3d(1.5%, -1%, 0) rotate(2deg) scale(1.03); }
  66%  { transform: translate3d(-1%, 1.5%, 0) rotate(-1.5deg) scale(1.01); }
  100% { transform: translate3d(-1.5%, 2%, 0) rotate(-3deg) scale(1.04); }
}

@media (prefers-reduced-motion: reduce) {
  .gwu-bg-aurora { animation: none; }
}

.gwu-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  z-index: 1000;
  background: rgba(3, 7, 18, 0.55);
  backdrop-filter: blur(32px) saturate(150%);
  -webkit-backdrop-filter: blur(32px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.40);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}

.gwu-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.gwu-brand img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.gwu-brand span {
  font-size: 17px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.01em;
}

.gwu-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.gwu-nav::-webkit-scrollbar { display: none; }

.gwu-nav button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  padding: 8px 14px;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.gwu-nav button::after {
  content: "";
  position: absolute;
  left: 14px; right: 14px; bottom: 4px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.gwu-nav button:hover { color: #E2E8F0; }
.gwu-nav button.active { color: #FFFFFF; }
.gwu-nav button.active::after { transform: scaleX(1); }

.gwu-scroll {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.gwu-scroll::-webkit-scrollbar { display: none; }

.gwu-section {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding: 72px 64px 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
}

.gwu-section.alt {
  background:
    linear-gradient(180deg, rgba(10, 15, 28, 0.40) 0%, rgba(10, 15, 28, 0.20) 100%);
}

.gwu-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.gwu-overview-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 540px);
  gap: 48px;
  align-items: center;
}

.gwu-overview-split > .gwu-overview-left {
  min-width: 0;
}

.gwu-overview-split .gwu-grid.cols-3 {
  grid-template-columns: 1fr;
  justify-items: start;
  gap: 10px;
}

@media (max-width: 1024px) {
  .gwu-overview-split { gap: 32px; grid-template-columns: minmax(0, 1fr) minmax(340px, 460px); }
}

@media (max-width: 768px) {
  .gwu-overview-split { grid-template-columns: 1fr; gap: 24px; }
}

.gwu-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: 8px;
  letter-spacing: 0.005em;
}

.gwu-badge.problem {
  background: rgba(239, 68, 68, 0.10);
  color: #FCA5A5;
  border: 1px solid rgba(239, 68, 68, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gwu-badge.solution {
  background: rgba(16, 185, 129, 0.10);
  color: #6EE7B7;
  border: 1px solid rgba(16, 185, 129, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gwu-badge.neutral {
  background: rgba(99, 102, 241, 0.10);
  color: #A5B4FC;
  border: 1px solid rgba(99, 102, 241, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gwu-h1 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: #FFFFFF;
  margin: 6px 0 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.gwu-h2 {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  margin: 6px 0 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.20);
}

.gwu-sub {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 0 14px;
  max-width: 760px;
}

.gwu-caption {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-secondary);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  margin: 0;
}

.gwu-body { font-size: 13px; line-height: 1.6; color: var(--text-body); margin: 0; }

.gwu-card-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-heading);
  margin: 0 0 8px;
}

.gwu-card {
  position: relative;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.70) 0%, rgba(8, 12, 28, 0.55) 100%);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.05) inset,
    0 0 0 0 rgba(99, 102, 241, 0),
    0 4px 16px -4px rgba(0, 0, 0, 0.25);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}

.gwu-card:hover {
  border-color: rgba(99, 102, 241, 0.20);
  transform: translateY(-3px);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
    0 0 20px -4px rgba(99, 102, 241, 0.15),
    0 16px 48px -8px rgba(0, 0, 0, 0.45);
}

.gwu-grid {
  display: grid;
  gap: 12px;
}

.gwu-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.gwu-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.gwu-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }

.gwu-stat {
  text-align: center;
  padding: 16px 14px;
}

.gwu-stat-num {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  line-height: 1;
  margin: 0 0 6px;
}

.gwu-stat-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.35;
}

.gwu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 26px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.gwu-btn.primary {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25), 0 0 0 0 rgba(99, 102, 241, 0);
}
.gwu-btn.primary:hover {
  background: linear-gradient(135deg, #818CF8 0%, #A78BFA 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.40), 0 0 40px -8px rgba(139, 92, 246, 0.25);
}
.gwu-btn.primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.30);
}

.gwu-btn.ghost {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-color: rgba(255, 255, 255, 0.10);
  color: var(--text-body);
}
.gwu-btn.ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(99, 102, 241, 0.30);
  color: #FFFFFF;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.10);
}

.gwu-input, .gwu-textarea {
  width: 100%;
  background: rgba(3, 7, 18, 0.50);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 10px 14px;
  color: #FFFFFF;
  font-size: 13px;
  font-family: inherit;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.gwu-textarea { resize: vertical; min-height: 48px; }
.gwu-input:focus, .gwu-textarea:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.45);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.10), 0 0 16px rgba(99, 102, 241, 0.08);
}
.gwu-input::placeholder, .gwu-textarea::placeholder { color: #475569; }

.gwu-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  padding: 12px 18px;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.60) 0%, rgba(8, 12, 28, 0.45) 100%);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset, 0 4px 16px -4px rgba(0, 0, 0, 0.20);
  border-radius: 16px;
  flex-wrap: wrap;
}

.gwu-flow-step {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-body);
}
.gwu-flow-dot {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%);
  border: 1px solid rgba(99, 102, 241, 0.40);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C7D2FE;
  font-weight: 700;
  font-size: 12px;
  box-shadow: 0 0 12px rgba(99,102,241,0.15);
}
.gwu-flow-arrow { color: var(--text-muted); font-size: 16px; }

.gwu-pipeline {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  padding: 14px 12px;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.60) 0%, rgba(8, 12, 28, 0.45) 100%);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset;
  border-radius: 16px;
  margin-bottom: 12px;
}

.gwu-pipeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 4px;
}

.gwu-pipeline-icon {
  width: 32px; height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 100%);
  border: 1px solid rgba(99,102,241,0.30);
  color: var(--accent-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  margin-bottom: 4px;
  box-shadow: 0 0 20px rgba(99,102,241,0.18), 0 0 0 1px rgba(99,102,241,0.05);
}

.gwu-pipeline-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-body);
  letter-spacing: 0.01em;
}

.gwu-pipeline-arrow {
  position: absolute;
  right: -10px; top: 12px;
  color: rgba(148, 163, 184, 0.4);
  font-size: 13px;
  pointer-events: none;
}
.gwu-pipeline-node:last-child .gwu-pipeline-arrow { display: none; }

.gwu-callout {
  margin-top: 10px;
  padding: 12px 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.06) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset, 0 0 20px rgba(99, 102, 241, 0.08);
  border-radius: 16px;
  color: #C7D2FE;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.005em;
}

.gwu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.03);
  margin: 14px 0;
}

.gwu-chatbot-strip {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.3fr;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.60) 0%, rgba(8, 12, 28, 0.45) 100%);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset;
  border-radius: 16px;
}

.gwu-mini-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.gwu-mini-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 100px;
  background: linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.08) 100%);
  color: #C7D2FE;
  border: 1px solid rgba(99,102,241,0.20);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gwu-bubble {
  font-size: 11px;
  line-height: 1.45;
  background: rgba(3, 7, 18, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 7px 10px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
}
.gwu-bubble strong { color: var(--accent-hover); font-weight: 600; }

.gwu-tech-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px 14px;
}
.gwu-tech-row span {
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}
.gwu-tech-row em {
  width: 3px; height: 3px; border-radius: 50%;
  background: var(--text-muted);
  display: inline-block;
  opacity: 0.6;
}

.gwu-flags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 22px;
  margin-top: 10px;
  padding: 12px 18px;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.55) 0%, rgba(8, 12, 28, 0.40) 100%);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset;
  border-radius: 16px;
}
.gwu-flag {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 500; color: var(--text-body);
}
.gwu-flag .em { font-size: 20px; line-height: 1; }

.gwu-cue {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  z-index: 2;
}

.gwu-quote {
  margin: 10px 0 12px;
  padding: 16px 22px;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.65) 0%, rgba(8, 12, 28, 0.50) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04) inset;
  border-radius: 16px;
  font-size: 14px;
  font-style: italic;
  line-height: 1.55;
  color: #D1D5DB;
}

.gwu-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.gwu-cta-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.gwu-wp-mobile-btn { display: none; }

.gwu-footer {
  padding-top: 12px;
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}

.gwu-fade {
  opacity: 0;
  transform: translateY(24px);
}

@media (prefers-reduced-motion: no-preference) {
  .gwu-fade {
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .is-visible .gwu-fade {
    opacity: 1;
    transform: translateY(0);
  }
  .is-visible .gwu-fade:nth-child(1) { transition-delay: 0ms; }
  .is-visible .gwu-fade:nth-child(2) { transition-delay: 70ms; }
  .is-visible .gwu-fade:nth-child(3) { transition-delay: 140ms; }
  .is-visible .gwu-fade:nth-child(4) { transition-delay: 210ms; }
  .is-visible .gwu-fade:nth-child(5) { transition-delay: 280ms; }
  .is-visible .gwu-fade:nth-child(6) { transition-delay: 350ms; }
  .is-visible .gwu-fade:nth-child(7) { transition-delay: 420ms; }
  .is-visible .gwu-fade:nth-child(8) { transition-delay: 490ms; }
  .gwu-cue svg { animation: gwuBounce 1.8s ease-in-out infinite; }
}

@media (prefers-reduced-motion: reduce) {
  .gwu-fade { opacity: 1; transform: none; }
}

@keyframes gwuBounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(6px); opacity: 1; }
}

@keyframes gwuFunnelPulse {
  0%   { transform: translateX(0) translateY(-50%); opacity: 1; }
  80%  { transform: translateX(152px) translateY(-50%); opacity: 1; }
  100% { transform: translateX(168px) translateY(-50%); opacity: 0; }
}

@media (max-width: 1024px) {
  .gwu-section { padding: 72px 40px 28px; }
  .gwu-h1 { font-size: 34px; }
  .gwu-h2 { font-size: 28px; }
  .gwu-sub { font-size: 15px; margin-bottom: 22px; }
  .gwu-grid.cols-3 { grid-template-columns: repeat(2, 1fr); }
  .gwu-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
  .gwu-pipeline { grid-template-columns: repeat(8, 1fr); gap: 3px; padding: 14px 8px; }
  .gwu-pipeline-icon { width: 34px; height: 34px; font-size: 14px; margin-bottom: 5px; }
  .gwu-pipeline-label { font-size: 9px; }
  .gwu-contact-grid { grid-template-columns: 1fr 1fr; }
  .gwu-contact-grid .gwu-card:first-child { grid-column: 1 / -1; }
  .gwu-chatbot-strip { grid-template-columns: 1fr 1fr; }
  .gwu-stat-num { font-size: 34px; }
}

@media (max-width: 768px) {
  .gwu-header { height: 52px; padding: 0 16px; }
  .gwu-brand img { width: 24px; height: 24px; }
  .gwu-brand span { font-size: 15px; }
  .gwu-nav button { font-size: 12px; padding: 6px 10px; }
  .gwu-section { padding: 60px 18px 24px; }
  .gwu-content { padding: 0; }
  .gwu-h1 { font-size: 24px; text-align: center; }
  .gwu-h2 { font-size: 19px; text-align: center; }
  .gwu-sub { font-size: 13px; margin-bottom: 18px; text-align: center; }
  .gwu-card { padding: 16px; border-radius: 14px; }
  .gwu-card-title { font-size: 13px !important; }
  .gwu-body { font-size: 13px; }
  .gwu-stat-num { font-size: 28px; }
  .gwu-grid { gap: 12px; }
  .gwu-overview-grid { padding-top: 10px; margin-top: 10px !important; }
  .gwu-grid.cols-2, .gwu-grid.cols-3, .gwu-grid.cols-4 { grid-template-columns: 1fr; }
  .gwu-pipeline {
    grid-template-columns: repeat(7, minmax(72px, 1fr));
    overflow-x: auto;
    scrollbar-width: none;
  }
  .gwu-pipeline::-webkit-scrollbar { display: none; }
  .gwu-chatbot-strip { grid-template-columns: 1fr; padding: 12px; gap: 10px; }
  .gwu-flow { padding: 12px; gap: 6px; }
  .gwu-flow-step { font-size: 11px; gap: 6px; }
  .gwu-flow-dot { width: 22px; height: 22px; font-size: 10px; }
  .gwu-quote { font-size: 13px; padding: 14px 16px; }
  .gwu-callout { font-size: 12px; padding: 10px 16px; }

  .gwu-scroll { scroll-snap-type: none; }
  .gwu-section {
    max-height: none;
    min-height: 0;
    overflow: visible;
    scroll-snap-align: unset;
    scroll-snap-stop: unset;
  }
  .gwu-content {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .gwu-fade {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: none !important;
  }
  .gwu-cue { display: none; }

  /* Header mobile */
  .gwu-nav { display: none; }
  .gwu-header { justify-content: center; }

  /* Section 6 mobile */
  .gwu-demo-row { display: none; }
  .gwu-qr-caption-wrap { display: none; }
  .gwu-qr-link { display: none !important; }
  .gwu-wp-card { display: none !important; }
  .gwu-wp-mobile-btn { display: flex !important; }
  .gwu-contact-grid { grid-template-columns: 1fr; gap: 14px; }
  .gwu-contact-grid .gwu-card:first-child { grid-column: unset; padding: 16px !important; }
  .gwu-form-row { grid-template-columns: 1fr !important; }

  /* General mobile polish */
  .gwu-badge { white-space: normal; line-height: 1.5; }
  .gwu-hero-h3 { font-size: 17px !important; }
  .gwu-feature-list span { font-size: 13px !important; }
  .gwu-btn { font-size: 13px; padding: 10px 20px; border-radius: 10px; }
  .gwu-chatbot-bar { border-radius: 14px !important; }
  .gwu-feature-list { margin-bottom: 20px !important; }
  .gwu-flags { gap: 6px 12px; padding: 8px 12px; }
  .gwu-tech-row { gap: 4px 10px; margin-top: 6px; }
  .gwu-section { padding-bottom: 36px; }
  .gwu-funnel-row { justify-content: center; width: 100%; }
  .gwu-funnel-connector { margin: 0 10px !important; }
  .gwu-funnel-connector-line { width: 140px !important; }
}

/* Safety net: viewports too short for hard 100vh cap get internal scroll instead of clipping */
@media (max-height: 700px) {
  .gwu-section {
    max-height: none;
    overflow-y: auto;
  }
}
`;

type CardData = { icon: ReactNode; title: string; body: string };

const CRM_CARDS: CardData[] = [
  {
    icon: <ClipboardList size={16} />,
    title: "Track Every Student",
    body: "First inquiry to visa stamp. Every application, document, and status in one live dashboard. No spreadsheets.",
  },
  {
    icon: <FileText size={16} />,
    title: "Documents → One-Click PDF",
    body: "Students upload information, passports, transcripts, bank statements. One click exports a complete, professional case file ready to application.",
  },
  {
    icon: <ShieldCheck size={16} />,
    title: "AI Visa Validation",
    body: "Documents checked against real country policies. Missing items flagged before they cost you a rejection.",
  },
  {
    icon: <Lock size={16} />,
    title: "Your Private Workspace",
    body: "Fully isolated per consultancy. Staff see their cases, students see their journey nothing else.",
  },
];

const RECO_CARDS: CardData[] = [
  {
    icon: <Target size={16} />,
    title: "Ranked Program Matches",
    body: "Top 20 programs ranked by admission probability, budget fit, and scholarship match. Every result is defensible.",
  },
  {
    icon: <Building2 size={16} />,
    title: "Your Partner Network",
    body: "Students only see universities you've activated. Your curated network ranked per student, presented as your own.",
  },
  {
    icon: <BarChart2 size={16} />,
    title: "Always Current Data",
    body: "We scrape each university's official website and use GPT-4 to extract programs, tuition, intake dates, and requirements directly from the source so your data is never stale.",
  },
];

const MARKETING_CARDS: CardData[] = [
  {
    icon: <Radio size={16} />,
    title: "Signal Intelligence",
    body: "Reads every click, inquiry, and journey stage. Picks the topic that converts today.",
  },
  {
    icon: <Palette size={16} />,
    title: "Full Content Generation",
    body: "AI writes the caption and designs the poster. 3 posts ready daily in your brand voice.",
  },
  {
    icon: <Rocket size={16} />,
    title: "One-Click Publish",
    body: "One approve. Facebook, Instagram, LinkedIn, and WhatsApp Status together, on schedule.",
  },
];

const SELF_LEARN_CARDS: CardData[] = [
  {
    icon: <BarChart2 size={16} />,
    title: "Content Performance Analysis",
    body: "ML analyses every post's engagement. Likes, shares, reach, impressions and maps it to content patterns. Winning formulas feed directly into the next AI-generated post. Every piece of content gets statistically better.",
  },
  {
    icon: <Search size={16} />,
    title: "Competitor Intelligence Engine",
    body: "Monitors competitor social pages, captures what's trending for them. Formats, themes, engagement spikes and injects those patterns into your content pipeline. You stay ahead without lifting a finger.",
  },
  {
    icon: <TrendingUp size={16} />,
    title: "Data-Driven Content Boost",
    body: "Data science scores your 3 daily posts on engagement signals to pick the winning content, then finds the optimal time to boost it on Meta and Google Ads all within your monthly budget. No manual ad setup.",
  },
];

const PERF_PIPELINE_STEPS: { icon: ReactNode; label: string }[] = [
  { icon: <Radio size={14} />, label: "Collect Data" },
  { icon: <FlaskConical size={14} />, label: "Analyse Patterns" },
  { icon: <BrainCircuit size={14} />, label: "Train Models" },
  { icon: <PenLine size={14} />, label: "Generate Content" },
  { icon: <TrendingUp size={14} />, label: "Measure & Repeat" },
];


const PIPELINE_STEPS: { icon: ReactNode; label: string }[] = [
  { icon: <Footprints size={14} />, label: "Behavior Tracking" },
  { icon: <Map size={14} />, label: "Journey Analysis" },
  { icon: <Target size={14} />, label: "Topic Selection" },
  { icon: <CalendarDays size={14} />, label: "Smart Scheduling" },
  { icon: <PenLine size={14} />, label: "AI Copywriting" },
  { icon: <ImageIcon size={14} />, label: "Poster Design" },
  { icon: <CheckCircle2 size={14} />, label: "Auto Approval" },
  { icon: <Rocket size={14} />, label: "Multi-Channel Publish" },
];


const DEMO_BASE_URL = import.meta.env.VITE_DEMO_BASE_URL || "http://localhost:5000";
const DEMO_ROUTE = "/f47ac10b-58cc-4372-a567-0e02b2c3d479";
const DEMO_KEY = "9c2d7e31-4f8a-4b7b-9f1c-6d8a2c5e71ab";
const LAB_BASE_URL = import.meta.env.VITE_LAB_URL || "http://127.0.0.1:8000";

const DEMO_ROLE_MAP: Record<"Viewer" | "Customer" | "Owner / Admin", string> = {
  "Viewer": "viewer",
  "Customer": "customer",
  "Owner / Admin": "admin",
};

export const GrowWithUs = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("overview");
  const [visible, setVisible] = useState<Record<string, boolean>>({ overview: true });
  const [demoView, setDemoView] = useState<"Viewer" | "Customer" | "Owner / Admin" | null>(null);
  const [funnelActive, setFunnelActive] = useState(false);
  const [step1Hovered, setStep1Hovered] = useState(false);
  const [step2Hovered, setStep2Hovered] = useState(false);

  // Signup Request form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSignupRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError("");
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      setSignupError("Please fill in your organization name, email, and phone.");
      return;
    }
    setSignupSubmitting(true);
    try {
      const res = await fetch(`${LAB_BASE_URL}/lab/swift/signup-requests/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization_name: signupName.trim(),
          organization_email: signupEmail.trim(),
          organization_phone: signupPhone.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          data.error ||
          data.organization_email?.[0] ||
          data.organization_phone?.[0] ||
          data.organization_name?.[0] ||
          "Something went wrong. Please try again.";
        setSignupError(msg);
        return; // keep entered data
      }
      setSignupName("");
      setSignupEmail("");
      setSignupPhone("");
      await Swal.fire({
        icon: "success",
        title: "Request received",
        text: "Thanks! We'll review your signup request and reach out shortly.",
        confirmButtonColor: "#6366F1",
      });
    } catch {
      setSignupError("Network error. Please check your connection and try again.");
    } finally {
      setSignupSubmitting(false);
    }
  };

  const triggerFunnel = () => {
    setFunnelActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFunnelActive(true));
    });
    setTimeout(() => setFunnelActive(false), 1200);
  };

  const handleDemoClick = (v: "Viewer" | "Customer" | "Owner / Admin") => {
    setDemoView(v);
    const role = DEMO_ROLE_MAP[v];
    const url = `${DEMO_BASE_URL}${DEMO_ROUTE}?demo_user_role=${role}&key=${DEMO_KEY}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const FONT_ID = "gwu-inter-font";
    if (!document.getElementById(FONT_ID)) {
      const link = document.createElement("link");
      link.id = FONT_ID;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    const prevTitle = document.title;
    document.title = "Grow With Xploreto";

    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.title = prevTitle;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("section[data-id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.id;
          if (!id) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActive(id);
            setVisible((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          }
        });
      },
      { root, threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const scrollToSection = (idx: number) => {
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section[data-id]"));
      const clamped = Math.max(0, Math.min(sections.length - 1, idx));
      sections[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section[data-id]"));
      const currentIdx = sections.findIndex((s) => s.dataset.id === active);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(currentIdx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(currentIdx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSection(sections.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const goTo = (id: string) => {
    const root = scrollRef.current;
    if (!root) return;
    root.querySelector<HTMLElement>(`section[data-id="${id}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box className="gwu-root">
      <SEOHead
        title="Grow With Xploreto | Automate Student Recruitment"
        description="See how Xploreto helps education consultancies enroll more students with AI-powered CRM, university recommendation, 24/7 chatbot, and performance-learning social media — all in one platform."
      />
      <style>{STYLES}</style>

      {/* Background layers — stacked behind all content */}
      <div className="gwu-bg-mesh" aria-hidden="true" />
      <div className="gwu-bg-aurora" aria-hidden="true" />
      <div className="gwu-bg-grid" aria-hidden="true" />
      <div className="gwu-bg-beam" aria-hidden="true" />
      <div className="gwu-bg-noise" aria-hidden="true" />

      <header className="gwu-header">
        <div className="gwu-brand" onClick={() => goTo("overview")} style={{ cursor: "pointer" }}>
          <img src="/xploreto.svg" alt="Xploreto" />
          <span>Xploreto.com</span>
        </div>
        <nav className="gwu-nav" aria-label="Section navigation">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              className={active === n.id ? "active" : ""}
              onClick={() => goTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <div ref={scrollRef} className="gwu-scroll">
        {/* SECTION 1 — Overview */}
        <section
          className={`gwu-section ${visible.overview ? "is-visible" : ""}`}
          data-id="overview"
          id="overview"
        >
          <div
            className="gwu-content"
            style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
          >
            <div className="gwu-overview-split">
              <div className="gwu-overview-left">
                <div className="gwu-fade" style={{ marginBottom: 24 }}>
                  <span className="gwu-badge problem">
                    ● Your competitors are already automating. Are you?
                  </span>
                </div>
                <h1 className="gwu-h1 gwu-fade" style={{ margin: "0 0 20px" }}>
                  Enroll More Students. Automate the Rest.
                </h1>
                <p className="gwu-sub gwu-fade" style={{ margin: "0 0 32px" }}>
                  The all-in-one platform for education consultancies from first inquiry to
                  visa approval.
                </p>

                <div className="gwu-grid cols-3 gwu-fade gwu-overview-grid" style={{ marginBottom: 28, marginTop: 10 }}>
                  <TransformCard icon={<BarChart2 size={18} />} from="Google Sheets" to="Smart CRM" />
                  <TransformCard icon={<MessageCircle size={18} />} from="WhatsApp Chaos" to="AI Chatbot Engine" />
                  <TransformCard icon={<FileEdit size={18} />} from="Freelance Content" to="AI Content Marketing" />
                </div>

                <div className="gwu-fade gwu-funnel-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0 }}>
                  {/* Step 1 */}
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                    onClick={triggerFunnel}
                    onMouseEnter={() => setStep1Hovered(true)}
                    onMouseLeave={() => setStep1Hovered(false)}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#FCA5A5", letterSpacing: "0.02em" }}>Publish posts</span>
                    <div style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: step1Hovered
                        ? "linear-gradient(135deg, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.22) 100%)"
                        : "linear-gradient(135deg, rgba(239,68,68,0.20) 0%, rgba(220,38,38,0.12) 100%)",
                      border: step1Hovered ? "1.5px solid rgba(239,68,68,0.70)" : "1px solid rgba(239,68,68,0.35)",
                      boxShadow: step1Hovered
                        ? "0 0 0 6px rgba(239,68,68,0.10), 0 0 28px rgba(239,68,68,0.45)"
                        : "0 0 20px rgba(239,68,68,0.18)",
                      transform: step1Hovered ? "scale(1.14)" : "scale(1)",
                      transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Radio size={16} style={{ color: step1Hovered ? "#FF8080" : "#FCA5A5", transition: "color 0.2s" }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#FCA5A5", letterSpacing: "0.02em" }}>Attract Leads</span>
                  </div>

                  {/* Connector */}
                  <div className="gwu-funnel-connector" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, margin: "0 20px" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.10em", color: "#FCA5A5", whiteSpace: "nowrap" }}>
                      Linear Marketing
                    </span>
                    <div className="gwu-funnel-connector-line" style={{ position: "relative", width: 160, height: 16, display: "flex", alignItems: "center" }}>
                      <div style={{
                        flex: 1, height: 2, borderRadius: 2,
                        background: "linear-gradient(90deg, rgba(239,68,68,0.25) 0%, #EF4444 50%, rgba(239,68,68,0.25) 100%)",
                        boxShadow: "0 0 8px rgba(239,68,68,0.40)",
                      }} />
                      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden style={{ flexShrink: 0, marginLeft: -1 }}>
                        <path d="M0 0L10 8L0 16" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                      {funnelActive && (
                        <div style={{
                          position: "absolute", left: 0, top: "50%",
                          width: 8, height: 8, borderRadius: "50%",
                          background: "#FF6B6B",
                          boxShadow: "0 0 14px rgba(239,68,68,0.90)",
                          animation: "gwuFunnelPulse 1s ease-in-out forwards",
                          pointerEvents: "none",
                        }} />
                      )}
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                    onClick={triggerFunnel}
                    onMouseEnter={() => setStep2Hovered(true)}
                    onMouseLeave={() => setStep2Hovered(false)}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#FCA5A5", letterSpacing: "0.02em" }}>Leads visit Office</span>
                    <div style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: step2Hovered
                        ? "linear-gradient(135deg, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.22) 100%)"
                        : "linear-gradient(135deg, rgba(239,68,68,0.20) 0%, rgba(220,38,38,0.12) 100%)",
                      border: step2Hovered ? "1.5px solid rgba(239,68,68,0.70)" : "1px solid rgba(239,68,68,0.35)",
                      boxShadow: step2Hovered
                        ? "0 0 0 6px rgba(239,68,68,0.10), 0 0 28px rgba(239,68,68,0.45)"
                        : "0 0 20px rgba(239,68,68,0.18)",
                      transform: step2Hovered ? "scale(1.14)" : "scale(1)",
                      transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <ShoppingBag size={16} style={{ color: step2Hovered ? "#FF8080" : "#FCA5A5", transition: "color 0.2s" }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#FCA5A5", letterSpacing: "0.02em" }}>Become customers</span>
                  </div>
                </div>
              </div>

              <div className="gwu-fade gwu-overview-right">
                <GrowthFlywheel />
              </div>
            </div>
          </div>

          <div className="gwu-cue" onClick={() => goTo("crm")} style={{ cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* SECTION 2 — CRM */}
        <section
          className={`gwu-section alt ${visible.crm ? "is-visible" : ""}`}
          data-id="crm"
          id="crm"
        >
          <div
            className="gwu-content"
            style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
          >
            <div className="gwu-fade" style={{ marginBottom: 20 }}>
              <span className="gwu-badge problem">
                ● After the first inquiry, students vanish browsing programs and universities on their own, then converting with your competitor
              </span>
            </div>
            <h2 className="gwu-h2 gwu-fade" style={{ margin: "0 0 16px" }}>
              One Platform. Every Student Journey. Zero Dropped Applications.
            </h2>
            <p className="gwu-sub gwu-fade" style={{ margin: "0 0 32px" }}>
              End-to-end lifecycle management from first WhatsApp message to visa stamp.
            </p>

            <div className="gwu-grid cols-4 gwu-fade" style={{ marginBottom: 24 }}>
              {CRM_CARDS.map((c) => (
                <FeatureCard key={c.title} {...c} />
              ))}
            </div>

            <div
              className="gwu-flow gwu-fade"
              aria-label="Student journey flow"
              style={{ marginTop: 0, justifyContent: "flex-start" }}
            >
              {["Inquiry", "Explore", "Documents", "Apply", "Visa", "Enrolled"].map((step, i, arr) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="gwu-flow-step">
                    <span className="gwu-flow-dot">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                  {i < arr.length - 1 && <span className="gwu-flow-arrow">→</span>}
                </div>
              ))}
            </div>

            <div className="gwu-fade" style={{ marginTop: 24 }}>
              <span className="gwu-badge solution">
                ✓ Students discover programs, explore universities, and track their visa journey all inside your platform. Every visit brings them closer to enrolling with you.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Recommendation */}
        <section
          className={`gwu-section ${visible.recommend ? "is-visible" : ""}`}
          data-id="recommend"
          id="recommend"
        >
          <div
            className="gwu-content"
            style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
          >
            <div className="gwu-fade" style={{ marginBottom: 20 }}>
              <span className="gwu-badge problem">
                ● A wrong recommendation doesn't just lose a student. It costs them a visa rejection, a wasted year, and your reputation
              </span>
            </div>
            <h2 className="gwu-h2 gwu-fade" style={{ margin: "0 0 26px" }}>
              Score Every University. Score Every Program. Recommend With Certainty.
            </h2>
            {/* <p className="gwu-sub gwu-fade" style={{ margin: "0 0 32px" }}>
              A student enters their GPA, test score, budget, and destination two separate engines return a ranked shortlist with admission probability and estimated cost for every match.
            </p> */}

            <div
              className="gwu-card gwu-fade"
              style={{
                background:
                  "linear-gradient(160deg, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.06) 100%)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 32px -8px rgba(0,0,0,0.30)",
                marginBottom: 24,
                padding: 20,
                borderRadius: 16,
              }}
            >
              <span className="gwu-caption" style={{ color: "#A5B4FC" }}>
                University &amp; Program Intelligence
              </span>
              <h3
                className="gwu-hero-h3"
                style={{
                  fontSize: 20,
                  margin: "4px 0 6px",
                  color: "var(--text-heading)",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                Every Recommendation, Fully Scored
              </h3>
              <p className="gwu-body">
                A student shares their GPA, English score, budget, and country preference.
                Both engines university and program score every option in your network across
                7 dimensions simultaneously. Your counselor gets a ranked shortlist with an
                admission probability score and estimated total cost for every result, so every
                recommendation is explainable and defensible.
              </p>
            </div>

            <div className="gwu-grid cols-3 gwu-fade" style={{ marginBottom: 24 }}>
              {RECO_CARDS.map((c) => (
                <FeatureCard key={c.title} {...c} />
              ))}
            </div>

            <div className="gwu-flags gwu-fade" style={{ justifyContent: "flex-start" }}>
              {[
                { code: "gb", l: "United Kingdom" },
                { code: "ca", l: "Canada" },
                { code: "au", l: "Australia" },
                { code: "us", l: "United States" },
                { code: "de", l: "Germany" },
                { code: "ie", l: "Ireland" },
              ].map((f) => (
                <span key={f.l} className="gwu-flag">
                  <img
                    src={`https://flagcdn.com/24x18/${f.code}.png`}
                    srcSet={`https://flagcdn.com/48x36/${f.code}.png 2x`}
                    width={24}
                    height={18}
                    alt={f.l}
                    style={{ borderRadius: 2, display: "block", flexShrink: 0 }}
                  />
                  {f.l}
                </span>
              ))}
            </div>

            <div className="gwu-fade" style={{ marginTop: 24 }}>
              <span className="gwu-badge solution">
                ✓ Result: Every recommendation backed by a probability score. Your counselors stop guessing and your students stop getting rejected.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4 — AI Chatbot & Marketing */}
        <section
          className={`gwu-section alt ${visible["ai-marketing"] ? "is-visible" : ""}`}
          data-id="ai-marketing"
          id="ai-marketing"
        >
          <div
            className="gwu-content"
            style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
          >
            <div className="gwu-fade" style={{ marginBottom: 20 }}>
              <span className="gwu-badge problem">
                ● You're invisible online while competitors post daily and capture leads you never even knew existed
              </span>
            </div>
            <h2 className="gwu-h2 gwu-fade" style={{ margin: "0 0 16px" }}>
              3 Posts a Day. Every Lead Closed at 2am. Zero Manual Work.
            </h2>
            <p className="gwu-sub gwu-fade" style={{ margin: "0 0 32px" }}>
              AI publishes 3 posts a day. The chatbot closes every lead 24/7.
            </p>

            <div className="gwu-grid cols-3 gwu-fade" style={{ marginBottom: 24 }}>
              {MARKETING_CARDS.map((c) => (
                <FeatureCard key={c.title} {...c} />
              ))}
            </div>

            <div
              className="gwu-pipeline gwu-fade"
              aria-label="Content pipeline"
              style={{ marginBottom: 24 }}
            >
              {PIPELINE_STEPS.map((s) => (
                <div key={s.label} className="gwu-pipeline-node">
                  <div className="gwu-pipeline-icon">{s.icon}</div>
                  <div className="gwu-pipeline-label">{s.label}</div>
                  <span className="gwu-pipeline-arrow">›</span>
                </div>
              ))}
            </div>

            <div
              className="gwu-card gwu-fade"
              style={{
                background:
                  "linear-gradient(160deg, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.06) 100%)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 32px -8px rgba(0,0,0,0.30)",
                padding: "20px 24px",
                marginBottom: 24,
                borderRadius: 16,
              }}
            >
              <span className="gwu-caption" style={{ color: "#A5B4FC" }}>
                AI Sales Agent WhatsApp · Messenger · Web Chat
              </span>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  margin: "4px 0 10px",
                  letterSpacing: "-0.01em",
                }}
              >
                The Chatbot That Closes
              </h3>
              <p className="gwu-body">
                A student asks at 2am. The AI qualifies them, ranks programs from your live database, and hands a scored lead to your counselor before competitors reply.
              </p>
              <div className="gwu-mini-chips" style={{ marginTop: 12 }}>
                <span className="gwu-mini-chip">WhatsApp + Messenger</span>
                <span className="gwu-mini-chip">Dual AI (Claude + GPT-4)</span>
                <span className="gwu-mini-chip">9-Step Orchestration</span>
                <span className="gwu-mini-chip">Lead Scoring</span>
                <span className="gwu-mini-chip">24/7 No Dropout</span>
              </div>
            </div>

            <div className="gwu-fade" style={{ marginTop: 24 }}>
              <span className="gwu-badge solution">
                ✓ Result: 3 targeted posts published every day. Every lead qualified, scored, and followed up automatically. Your counselors close; the AI does everything else.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Performance Learning */}
        <section
          className={`gwu-section ${visible["self-learning"] ? "is-visible" : ""}`}
          data-id="self-learning"
          id="self-learning"
        >
          <div
            className="gwu-content"
            style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
          >
            <div className="gwu-fade" style={{ marginBottom: 28 }}>
              <span className="gwu-badge problem">
                ● You're posting every day with no idea what's working. While data-driven competitors run campaigns that get sharper with every click and leave you behind
              </span>
            </div>
            <h2 className="gwu-h2 gwu-fade" style={{ margin: "0 0 14px" }}>
              Content That Learns, Competes &amp; Publishes at the Perfect Moment
            </h2>
            <p className="gwu-sub gwu-fade" style={{ margin: "0 0 28px", fontSize: 16 }}>
              Performance Learning uses Data Science &amp; Machine Learning to analyse what works, study your competitors, and find the perfect publish time then automatically improves every future post.
            </p>

            <div className="gwu-grid cols-3 gwu-fade" style={{ marginBottom: 22 }}>
              {SELF_LEARN_CARDS.map((c) => (
                <FeatureCard key={c.title} {...c} />
              ))}
            </div>

            <div
              className="gwu-pipeline gwu-fade"
              aria-label="Performance learning pipeline"
              style={{ gridTemplateColumns: "repeat(5, 1fr)", marginBottom: 18 }}
            >
              {PERF_PIPELINE_STEPS.map((s) => (
                <div key={s.label} className="gwu-pipeline-node">
                  <div className="gwu-pipeline-icon">{s.icon}</div>
                  <div className="gwu-pipeline-label">{s.label}</div>
                  <span className="gwu-pipeline-arrow">›</span>
                </div>
              ))}
            </div>

            <div className="gwu-callout gwu-fade" style={{ marginBottom: 20 }}>
              Every cycle makes your content sharper. The AI learns from your results and your competitors. The longer you use it, the bigger your advantage.
            </div>

            <div className="gwu-fade">
              <span className="gwu-badge solution">
                ✓ Result: AI-generated content that gets measurably better every week optimised for what works, timed for maximum reach, informed by competitor intelligence.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6 — Contact */}
        <section
          className={`gwu-section alt ${visible.contact ? "is-visible" : ""}`}
          data-id="contact"
          id="contact"
        >
          <div className="gwu-content" style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}>
            <div>
              <h2 className="gwu-h2 gwu-fade" style={{ margin: "0 0 16px" }}>
                Ready to Modernize Your Consultancy?
              </h2>
              <p className="gwu-sub gwu-fade" style={{ margin: "0 0 32px" }}>
                Join the platform that turns spreadsheet agencies into tech-powered businesses.
              </p>
            </div>

            {/* Demo row — left label + right buttons */}
            <div className="gwu-fade gwu-demo-row" style={{
              display: "flex", alignItems: "center", justifyContent: "flex-start",
              gap: 24, marginBottom: 40, flexWrap: "wrap",
            }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-heading)", margin: "0 0 4px" }}>
                  Try a Live Demo
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                  Choose your role to explore the platform ↗
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(["Viewer", "Customer", "Owner / Admin"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`gwu-btn ${demoView === v ? "primary" : "ghost"}`}
                    onClick={() => handleDemoClick(v)}
                  >
                    {v === "Viewer" ? <><Eye size={14} /> Viewer Demo</> : v === "Customer" ? <><ShoppingBag size={14} /> Customer Demo</> : <><KeyRound size={14} /> Owner / Admin Demo</>}
                  </button>
                ))}
              </div>
            </div>

            <div className="gwu-quote gwu-fade" style={{ margin: "0 0 28px" }}>
              "We're building the operating system for 6 million student enrollments per year.
              Every consultancy that joins makes the platform smarter. The earlier you join,
              the bigger your advantage."
            </div>

            <div className="gwu-contact-grid gwu-fade" style={{ marginBottom: 16 }}>
              {/* Left — WhatsApp QR Code */}
              <div className="gwu-card gwu-wp-card" style={{ padding: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div className="gwu-qr-caption-wrap" style={{ textAlign: "center" }}>
                  <p className="gwu-caption" style={{ marginBottom: 6 }}>Scan to chat on WhatsApp</p>
                </div>
                <a className="gwu-qr-link" href="https://wa.me/message/L26ONCSYW7ORJ1" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  <img
                    src={wpQrCode}
                    alt="WhatsApp QR Code"
                    style={{ width: 160, height: 160, borderRadius: 10, display: "block" }}
                  />
                </a>
                <a
                  href="https://wa.me/message/L26ONCSYW7ORJ1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gwu-btn ghost"
                  style={{
                    display: "flex", width: "100%", marginTop: "auto", textDecoration: "none", alignSelf: "stretch",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(16px) saturate(130%)",
                    WebkitBackdropFilter: "blur(16px) saturate(130%)",
                    border: "1px solid rgba(255, 255, 255, 0.11)",
                    color: "#E2E8F0",
                    boxShadow: "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 4px 16px rgba(0,0,0,0.18)",
                  }}
                >
                  <MessageCircle size={15} /> Open WhatsApp
                </a>
              </div>

              {/* Middle — Contact Info */}
              <div className="gwu-card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 className="gwu-card-title" style={{ fontSize: 15, marginBottom: 8 }}>Contact Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    {
                      icon: <Mail size={22} />,
                      label: "Email",
                      value: <a href="mailto:contact@xploreto.com" style={{ color: "var(--text-body)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>contact@xploreto.com</a>,
                    },
                    {
                      icon: <Phone size={22} />,
                      label: "Phone",
                      value: <a href="tel:+8801814297793" style={{ color: "var(--text-body)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>+880 1814-297-793</a>,
                    },
                    {
                      icon: <MapPin size={22} />,
                      label: "Address",
                      value: <span style={{ color: "var(--text-body)", fontSize: 14, fontWeight: 500 }}>Sylhet, Bangladesh</span>,
                    },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{
                        width: 44, height: 44, flexShrink: 0,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 100%)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--accent-hover)",
                        boxShadow: "0 0 16px rgba(99,102,241,0.12)",
                      }}>
                        {icon}
                      </div>
                      <div>
                        <p className="gwu-caption" style={{ marginBottom: 3 }}>{label}</p>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Signup Request form */}
              <form
                className="gwu-card"
                onSubmit={handleSignupRequest}
                style={{ padding: 22, display: "flex", flexDirection: "column", gap: 10 }}
              >
                <h3 className="gwu-card-title" style={{ fontSize: 15, marginBottom: 4 }}>Signup for Xploreto</h3>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>Organization Name</span>
                  <input
                    className="gwu-input"
                    type="text"
                    placeholder="Your consultancy's name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>Organization Email</span>
                  <input
                    className="gwu-input"
                    type="email"
                    placeholder="you@agency.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>Organization Phone</span>
                  <input
                    className="gwu-input"
                    type="tel"
                    placeholder="+880 1716 000 000"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                  />
                </label>
                {signupError && (
                  <span style={{ color: "#F87171", fontSize: 12 }}>{signupError}</span>
                )}
                <button
                  type="submit"
                  className="gwu-btn ghost"
                  disabled={signupSubmitting}
                  style={{
                    width: "100%", marginTop: "auto",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(16px) saturate(130%)",
                    WebkitBackdropFilter: "blur(16px) saturate(130%)",
                    border: "1px solid rgba(255, 255, 255, 0.11)",
                    color: "#E2E8F0",
                    boxShadow: "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 4px 16px rgba(0,0,0,0.18)",
                    opacity: signupSubmitting ? 0.6 : 1,
                    cursor: signupSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {signupSubmitting ? "Sending…" : "Signup"}
                </button>
              </form>
            </div>

            {/* Mobile-only Open WhatsApp button */}
            <a
              className="gwu-wp-mobile-btn gwu-btn ghost"
              href="https://wa.me/message/L26ONCSYW7ORJ1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%", marginBottom: 16, textDecoration: "none",
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px) saturate(130%)",
                WebkitBackdropFilter: "blur(16px) saturate(130%)",
                border: "1px solid rgba(255, 255, 255, 0.11)",
                color: "#E2E8F0",
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 4px 16px rgba(0,0,0,0.18)",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={15} /> Open WhatsApp
            </a>
          </div>

          <div className="gwu-footer">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://xploreto.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-hover)", textDecoration: "none" }}
            >
              Xploreto Labs
            </a>. All rights reserved |{" "}
            <a
              href="/pitch-deck"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-hover)", textDecoration: "none" }}
            >
              Pitch Deck
            </a>{" "}
            |{" "}
            <a
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-hover)", textDecoration: "none" }}
            >
              Docs
            </a>
          </div>
        </section>
      </div>
    </Box>
  );
};

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const labelTextStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.025em",
  color: "#A1A8B8",
};

const FeatureCard = ({ icon, title, body, compact }: CardData & { compact?: boolean }) => (
  <div className="gwu-card" style={compact ? { padding: "14px 16px" } : undefined}>
    <div
      style={{
        width: compact ? 30 : 36,
        height: compact ? 30 : 36,
        borderRadius: 10,
        background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 100%)",
        border: "1px solid rgba(99,102,241,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: compact ? 14 : 16,
        marginBottom: compact ? 8 : 14,
        boxShadow: "0 0 16px rgba(99,102,241,0.12)",
      }}
      aria-hidden
    >
      {icon}
    </div>
    <h3 className="gwu-card-title">{title}</h3>
    <p className="gwu-body">{body}</p>
  </div>
);

const TransformCard = ({ icon, from, to }: { icon: ReactNode; from: string; to: string }) => (
  <div
    className="gwu-card"
    style={{ display: "inline-flex", alignItems: "center", gap: 12, textAlign: "left", padding: "0 16px 0 0", border: "none", boxShadow: "none", background: "none", backdropFilter: "none", WebkitBackdropFilter: "none" }}
  >
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 100%)",
        border: "1px solid rgba(99,102,241,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        flexShrink: 0,
        boxShadow: "0 0 16px rgba(99,102,241,0.12)",
      }}
      aria-hidden
    >
      {icon}
    </div>
    <div style={{ fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
      <span style={{ color: "#FCA5A5" }}>{from}</span>
      <span style={{ color: "#4B5563" }}>→</span>
      <span style={{ color: "#6EE7B7" }}>{to}</span>
    </div>
  </div>
);
