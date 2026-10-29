import { useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import {
  Brain, Megaphone, MousePointerClick, UserCheck, BrainCircuit, Rocket,
} from "lucide-react";

type Stage = {
  id: string;
  label: string;
  title: string;
  icon: ReactNode;
  short: string;
  desc: string;
};

const STAGES: Stage[] = [
  {
    id: "attract",
    label: "Attract Leads",
    title: "Attract Leads",
    icon: <Megaphone size={20} />,
    short: "A student sees your ad on Facebook or Instagram and taps through.",
    desc: "A student scrolling Facebook or Instagram sees an Xploreto-generated post, stops, and taps the link through to your platform.",
  },
  {
    id: "engage",
    label: "Engage Visitors",
    title: "Engage Visitors",
    icon: <MousePointerClick size={20} />,
    short: "They browse programs and get a personalized recommendation shortlist.",
    desc: "They land on the consultancy's own branded platform, browse programs, universities, and destination countries, and receive a scored shortlist matched to their GPA, budget, English score, and target country — each result carrying an admission-probability score.",
  },
  {
    id: "convert",
    label: "Convert Customers",
    title: "Convert Customers",
    icon: <UserCheck size={20} />,
    short: "They sign up, visit the office and apply. Every action becomes journey data.",
    desc: "They sign up, visit the office and apply to programs, and move through the visa journey: Inquiry → Explore → Documents → Apply → Visa → Enrolled. Every visit, click, save, and application is captured as immutable journey data. A completed journey marks a prospect likely to enroll and visit the office in person — the richest signal of all.",
  },
  {
    id: "create",
    label: "Create Content",
    title: "Create Content",
    icon: <BrainCircuit size={20} />,
    short: "AI doubles down on what works and writes the next post.",
    desc: "The platform reads the captured behavior through five intelligence lenses — trending, high-intent, high-interest, confusion, and drop-off — and weighs the measured performance of its own past posts (which topics, hooks, and formats earned the most reach, clicks, and completed journeys). It selects the highest-potential topic and generates a fresh, on-brand post from it.",
  },
  {
    id: "publish",
    label: "Publish & Daily Ads",
    title: "Publish & Daily Ads",
    icon: <Rocket size={20} />,
    short: "It ships to social and runs daily ads at the best time; results feed back into Create.",
    desc: "The post ships to Facebook and Instagram at the algorithm's best-timed moment with a link back to the platform. Its real-world performance — impressions, engagement, click-through, and the journeys and enrollments it drove — is captured and fed back into Create. The next prospect sees it, restarting the loop, wider and sharper each time.",
  },
];

const HUB_TITLE = "Growth Wheel Marketing";
const HUB_TAGLINE = "More journeys → richer data → sharper content → wider reach.";

const STYLES = `
.gfw-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

/* ---------- Ring (desktop) ---------- */
.gfw-ring {
  position: relative;
  width: 100%;
  max-width: 550px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}

.gfw-ring-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.gfw-node {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  cursor: pointer;
  background: linear-gradient(160deg, rgba(15, 20, 40, 0.72) 0%, rgba(8, 12, 28, 0.55) 100%);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  color: var(--text-body, #D1D5DB);
  font-family: inherit;
  box-shadow: 0 4px 16px -6px rgba(0, 0, 0, 0.35);
}

.gfw-node-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99,102,241,0.20) 0%, rgba(139,92,246,0.12) 100%);
  border: 1px solid rgba(99,102,241,0.30);
  color: var(--accent-hover, #818CF8);
  box-shadow: 0 0 14px rgba(99,102,241,0.14);
}

.gfw-node-label {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.005em;
  color: #E2E8F0;
}

.gfw-node-step {
  position: absolute;
  top: -7px;
  left: -7px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(99,102,241,0.4);
}

.gfw-node-step--right { left: auto; right: -7px; }

.gfw-node.is-active {
  border-color: rgba(129, 140, 248, 0.55);
  box-shadow: 0 0 0 1px rgba(99,102,241,0.30), 0 0 22px -2px rgba(99,102,241,0.40), 0 8px 28px -8px rgba(0,0,0,0.5);
}
.gfw-node.is-active .gfw-node-icon {
  background: linear-gradient(135deg, rgba(99,102,241,0.40) 0%, rgba(139,92,246,0.26) 100%);
  border-color: rgba(129,140,248,0.65);
  color: #C7D2FE;
}

/* ---------- Center hub ---------- */
.gfw-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 47%;
  height: 47%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  padding: 12px;
  cursor: pointer;
  font-family: inherit;
  color: var(--text-body, #D1D5DB);
  background: radial-gradient(circle at 50% 38%, rgba(6,182,212,0.22) 0%, rgba(8,12,28,0.85) 70%);
  border: 1px solid rgba(6, 182, 212, 0.40);
  box-shadow: 0 0 0 1px rgba(6,182,212,0.10), 0 0 38px -6px rgba(6,182,212,0.35), inset 0 0 28px -10px rgba(6,182,212,0.30);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.gfw-hub-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(6,182,212,0.30) 0%, rgba(16,185,129,0.18) 100%);
  border: 1px solid rgba(6,182,212,0.50);
  color: #67E8F9;
  box-shadow: 0 0 18px rgba(6,182,212,0.30);
  flex-shrink: 0;
}

.gfw-hub-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  line-height: 1.2;
}

.gfw-hub-sub {
  font-size: 10.5px;
  font-weight: 400;
  line-height: 1.35;
  color: var(--text-secondary, #A1A8B8);
  max-width: 92%;
  padding: 0 12px;
}

.gfw-hub-stage .gfw-hub-icon {
  background: linear-gradient(135deg, rgba(99,102,241,0.34) 0%, rgba(139,92,246,0.20) 100%);
  border-color: rgba(129,140,248,0.6);
  color: #C7D2FE;
}
.gfw-hub-stage {
  background: radial-gradient(circle at 50% 38%, rgba(99,102,241,0.22) 0%, rgba(8,12,28,0.88) 70%);
  border-color: rgba(99,102,241,0.45);
  box-shadow: 0 0 0 1px rgba(99,102,241,0.12), 0 0 38px -6px rgba(99,102,241,0.38), inset 0 0 28px -10px rgba(99,102,241,0.30);
}

@media (prefers-reduced-motion: no-preference) {
  .gfw-node, .gfw-hub {
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  .gfw-node:hover { transform: translate(-50%, -50%) scale(1.04); border-color: rgba(99,102,241,0.35); }
  .gfw-hub:hover { transform: translate(-50%, -50%) scale(1.02); }
  .gfw-arrow-track { animation: gfwDash 28s linear infinite; }
}
.gfw-node:focus-visible, .gfw-hub:focus-visible {
  outline: none;
  border-color: rgba(99,102,241,0.7);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
}

@keyframes gfwDash { to { stroke-dashoffset: -1000; } }

/* ---------- Mobile: shrink the ring instead of hiding it ---------- */
@media (max-width: 520px) {
  .gfw-node { width: 64px; padding: 7px 4px; gap: 3px; border-radius: 11px; }
  .gfw-node-icon { width: 28px; height: 28px; border-radius: 8px; }
  .gfw-node-label { font-size: 9px; letter-spacing: 0; }
  .gfw-node-step { width: 16px; height: 16px; font-size: 9px; top: -5px; left: -5px; }
  .gfw-node-step--right { left: auto; right: -5px; }
  .gfw-hub-icon { width: 32px; height: 32px; border-radius: 9px; }
  .gfw-hub-title { font-size: 11px; }
  .gfw-hub-sub {
    font-size: 8.5px;
    padding: 0 6px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}

@media (max-width: 380px) {
  .gfw-node { width: 52px; padding: 5px 3px; gap: 2px; }
  .gfw-node-icon { width: 22px; height: 22px; border-radius: 7px; }
  .gfw-node-label { font-size: 8px; line-height: 1.1; }
  .gfw-node-step { width: 14px; height: 14px; font-size: 8px; top: -4px; left: -4px; }
  .gfw-node-step--right { left: auto; right: -4px; }
  .gfw-hub-icon { width: 26px; height: 26px; }
  .gfw-hub-title { font-size: 10px; }
  .gfw-hub-sub { font-size: 7.5px; padding: 0 4px; -webkit-line-clamp: 2; }
}
`;

type GrowthFlywheelProps = { className?: string };

export const GrowthFlywheel = ({ className }: GrowthFlywheelProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = STAGES.find((s) => s.id === activeId) ?? null;

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id));
  const reset = () => setActiveId(null);

  // Ring geometry: nodes placed clockwise from 12 o'clock.
  const R = 39; // % radius from center to node centers
  const nodePos = STAGES.map((_, i) => {
    const angle = (-90 + i * 72) * (Math.PI / 180);
    return {
      left: 50 + R * Math.cos(angle),
      top: 50 + R * Math.sin(angle),
    };
  });

  return (
    <Box className={`gfw-root${className ? ` ${className}` : ""}`}>
      <style>{STYLES}</style>

      {/* Desktop ring */}
      <div className="gfw-ring" role="group" aria-label="Xploreto growth flywheel">
        {/* Decorative track + clockwise arrows + expanding rings */}
        <svg className="gfw-ring-svg" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <marker
              id="gfwArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M1 1 L9 5 L1 9" fill="none" stroke="rgba(129,140,248,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {/* faint expanding rings — "each turn gets wider" */}
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(99,102,241,0.10)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="0.4" />
          {/* main clockwise track */}
          <circle
            className="gfw-arrow-track"
            cx="50"
            cy="50"
            r="39"
            fill="none"
            stroke="rgba(99,102,241,0.28)"
            strokeWidth="0.7"
            strokeDasharray="4 4"
          />
          {/* clockwise arrowheads between nodes (midpoints of each 72deg arc) */}
          {STAGES.map((_, i) => {
            const mid = (-90 + i * 72 + 36) * (Math.PI / 180);
            const r = 39;
            const cx = 50 + r * Math.cos(mid);
            const cy = 50 + r * Math.sin(mid);
            // tangent direction (clockwise)
            const tx = -Math.sin(mid);
            const ty = Math.cos(mid);
            return (
              <line
                key={i}
                x1={cx - tx * 0.1}
                y1={cy - ty * 0.1}
                x2={cx + tx * 0.1}
                y2={cy + ty * 0.1}
                stroke="rgba(129,140,248,0.6)"
                strokeWidth="0.7"
                markerEnd="url(#gfwArrow)"
              />
            );
          })}
        </svg>

        {STAGES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`gfw-node${activeId === s.id ? " is-active" : ""}`}
            style={{ left: `${nodePos[i].left}%`, top: `${nodePos[i].top}%` }}
            onClick={() => toggle(s.id)}
            aria-pressed={activeId === s.id}
            aria-label={`Stage ${i + 1}: ${s.label}`}
          >
            <span className={`gfw-node-step${i === 1 || i === 2 ? " gfw-node-step--right" : ""}`} aria-hidden="true">{i + 1}</span>
            <span className="gfw-node-icon" aria-hidden="true">{s.icon}</span>
            <span className="gfw-node-label">{s.label}</span>
          </button>
        ))}

        {/* Center hub */}
        <button
          type="button"
          className={`gfw-hub${active ? " gfw-hub-stage" : ""}`}
          onClick={reset}
          aria-label={active ? `${active.title} click to return to overview` : HUB_TITLE}
        >
          <span className="gfw-hub-icon" aria-hidden="true">
            {active ? active.icon : <Brain size={24} />}
          </span>
          <span className="gfw-hub-title">{active ? active.title : HUB_TITLE}</span>
          <span className="gfw-hub-sub">{active ? active.short : HUB_TAGLINE}</span>
        </button>
      </div>
    </Box>
  );
};
