import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// ─── Palette & shared styles ────────────────────────────────────────────────
const C = {
  bg: "#F7F6F2",
  paper: "#FFFFFF",
  ink: "#1A1A1A",
  mid: "#555555",
  faint: "#E8E6DF",
  accent: "#2B4EFF",
  accentSoft: "#EEF1FF",
  green: "#1A7A4A",
  greenSoft: "#E8F5EE",
  red: "#B83232",
  redSoft: "#FAEAEA",
  amber: "#C47B00",
  amberSoft: "#FDF3DC",
  border: "#D4D0C8",
};

const font = {
  head: "'Georgia', 'Times New Roman', serif",
  mono: "'Courier New', Courier, monospace",
  body: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// ─── TAB NAV ────────────────────────────────────────────────────────────────
const tabs = [
  { id: "arch",    label: "1. System Architecture" },
  { id: "flow",    label: "2. Token Flow" },
  { id: "curve",   label: "3. Incentive Curve" },
  { id: "payoff",  label: "4. Payoff Matrix" },
];

// ─── 1. SYSTEM ARCHITECTURE ─────────────────────────────────────────────────
function ArchDiagram() {
  // SVG-based box-and-arrow diagram
  const nodes = [
    { id: "users",      x: 60,  y: 140, w: 110, h: 44, label: "Users",            sub: "Participants" },
    { id: "terms",      x: 260, y: 60,  w: 110, h: 44, label: "Terms",            sub: "Language Units" },
    { id: "defs",       x: 260, y: 210, w: 110, h: 44, label: "Definitions",      sub: "Submissions" },
    { id: "vote",       x: 470, y: 130, w: 120, h: 44, label: "Voting Market",    sub: "VP Allocation" },
    { id: "reward",     x: 680, y: 60,  w: 120, h: 44, label: "Reward Engine",    sub: "Decay × VP" },
    { id: "rep",        x: 680, y: 210, w: 120, h: 44, label: "Reputation System",sub: "DP Ledger" },
  ];

  const arrows = [
    { from: [170, 162], to: [260, 82],  label: "submit terms" },
    { from: [170, 162], to: [260, 232], label: "submit defs" },
    { from: [170, 162], to: [470, 152], label: "cast votes (VP)", dashed: true },
    { from: [370, 82],  to: [470, 148], label: "" },
    { from: [370, 232], to: [470, 156], label: "" },
    { from: [590, 145], to: [680, 82],  label: "distribute DP" },
    { from: [590, 155], to: [680, 214], label: "log reputation" },
    { from: [800, 210], to: [800, 300], to2: [130, 300], to3: [130, 184], label: "rep → weight", loop: true },
  ];

  const midX = (n) => n.x + n.w / 2;
  const midY = (n) => n.y + n.h / 2;

  return (
    <div style={{ fontFamily: font.body }}>
      <FigureHeader
        num="Figure 1"
        title="Decentralized Semantic Market — System Architecture"
        caption="Components and information flows of the DSM mechanism. Arrows denote directional dependencies; dashed arrows indicate token transfers."
      />
      <div style={{ overflowX: "auto" }}>
        <svg width={860} height={360} style={{ display: "block", margin: "0 auto" }}>
          {/* grid */}
          <defs>
            <pattern id="grid" width={20} height={20} patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.faint} strokeWidth={0.5} />
            </pattern>
            <marker id="arr" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.ink} />
            </marker>
            <marker id="arrd" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.accent} />
            </marker>
          </defs>
          <rect width={860} height={360} fill={C.bg} rx={4} />
          <rect width={860} height={360} fill="url(#grid)" rx={4} />

          {/* reputation feedback loop */}
          <path
            d={`M 800 232 L 800 310 L 115 310 L 115 184`}
            fill="none" stroke={C.green} strokeWidth={1.4}
            strokeDasharray="5,3" markerEnd="url(#arr)"
          />
          <text x={440} y={325} textAnchor="middle" fontSize={10} fill={C.green} fontStyle="italic">
            reputation feedback → voting weight
          </text>

          {/* static arrows */}
          {/* users → terms */}
          <line x1={170} y1={152} x2={255} y2={85} stroke={C.ink} strokeWidth={1.4} markerEnd="url(#arr)" />
          <text x={198} y={108} fontSize={9} fill={C.mid} transform="rotate(-28,198,108)">submit term</text>
          {/* users → defs */}
          <line x1={170} y1={172} x2={255} y2={228} stroke={C.ink} strokeWidth={1.4} markerEnd="url(#arr)" />
          <text x={182} y={213} fontSize={9} fill={C.mid} transform="rotate(22,182,213)">submit def</text>
          {/* users → vote (dashed, accent) */}
          <line x1={170} y1={162} x2={465} y2={152} stroke={C.accent} strokeWidth={1.4}
            strokeDasharray="5,3" markerEnd="url(#arrd)" />
          <text x={315} y={148} textAnchor="middle" fontSize={9} fill={C.accent}>allocate VP</text>
          {/* terms → vote */}
          <line x1={370} y1={85} x2={465} y2={145} stroke={C.ink} strokeWidth={1.2} markerEnd="url(#arr)" />
          {/* defs → vote */}
          <line x1={370} y1={232} x2={465} y2={158} stroke={C.ink} strokeWidth={1.2} markerEnd="url(#arr)" />
          {/* vote → reward */}
          <line x1={590} y1={143} x2={675} y2={85} stroke={C.ink} strokeWidth={1.4} markerEnd="url(#arr)" />
          <text x={630} y={105} fontSize={9} fill={C.mid} transform="rotate(-30,630,105)">resolve</text>
          {/* vote → rep */}
          <line x1={590} y1={158} x2={675} y2={218} stroke={C.ink} strokeWidth={1.4} markerEnd="url(#arr)" />
          <text x={630} y={200} fontSize={9} fill={C.mid} transform="rotate(30,630,200)">log DP</text>
          {/* reward → users (DP payout) dashed */}
          <path d={`M 740 60 L 740 30 L 115 30 L 115 140`}
            fill="none" stroke={C.amber} strokeWidth={1.4} strokeDasharray="5,3" markerEnd="url(#arr)" />
          <text x={420} y={22} textAnchor="middle" fontSize={9} fill={C.amber}>DP payout to authors</text>

          {/* nodes */}
          {nodes.map((n) => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h}
                rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
              <text x={n.x + n.w / 2} y={n.y + 16} textAnchor="middle"
                fontSize={12} fontWeight="700" fontFamily={font.body} fill={C.ink}>
                {n.label}
              </text>
              <text x={n.x + n.w / 2} y={n.y + 30} textAnchor="middle"
                fontSize={9} fill={C.mid} fontFamily={font.body}>
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <Legend items={[
        { color: C.ink,   dash: false, label: "Structural dependency" },
        { color: C.accent, dash: true,  label: "VP token transfer (votes)" },
        { color: C.amber,  dash: true,  label: "DP reward payout" },
        { color: C.green,  dash: true,  label: "Reputation feedback loop" },
      ]} />
    </div>
  );
}

// ─── 2. TOKEN FLOW ───────────────────────────────────────────────────────────
function TokenFlow() {
  return (
    <div style={{ fontFamily: font.body }}>
      <FigureHeader
        num="Figure 2"
        title="Token Flow — Voting Points & Definition Points"
        caption="VP flows from users into the voting pool; DP is distributed to winning authors. Reputation accumulates as a feedback signal that amplifies future voting weight."
      />
      <div style={{ overflowX: "auto" }}>
        <svg width={820} height={380} style={{ display: "block", margin: "0 auto" }}>
          <defs>
            <marker id="a1" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.accent} />
            </marker>
            <marker id="a2" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.green} />
            </marker>
            <marker id="a3" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.amber} />
            </marker>
            <marker id="a4" markerWidth={8} markerHeight={8} refX={8} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={C.red} />
            </marker>
            <pattern id="grid2" width={20} height={20} patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.faint} strokeWidth={0.5} />
            </pattern>
          </defs>
          <rect width={820} height={380} fill={C.bg} rx={4} />
          <rect width={820} height={380} fill="url(#grid2)" rx={4} />

          {/* ── Nodes ── */}
          {/* Users */}
          <TokenNode x={40} y={155} w={110} h={50} label="Users" sub="Voters / Authors" color={C.ink} />
          {/* VP Pool */}
          <TokenNode x={230} y={80} w={120} h={50} label="VP Pool" sub="Voting Points" color={C.accent} textColor={C.accent} />
          {/* Definitions */}
          <TokenNode x={420} y={155} w={130} h={50} label="Definitions" sub="Competing Entries" color={C.ink} />
          {/* Winning Def */}
          <TokenNode x={620} y={80} w={130} h={50} label="Winning Def" sub="Market Consensus" color={C.green} textColor={C.green} />
          {/* Losing Def */}
          <TokenNode x={620} y={240} w={130} h={50} label="Losing Defs" sub="Eliminated" color={C.red} textColor={C.red} />
          {/* DP Ledger */}
          <TokenNode x={420} y={300} w={130} h={50} label="DP Ledger" sub="Author Reputation" color={C.amber} textColor={C.amber} />
          {/* Reputation */}
          <TokenNode x={40} y={300} w={110} h={50} label="Reputation" sub="Historical Accuracy" color={C.mid} />

          {/* ── Arrows ── */}
          {/* Users → VP Pool */}
          <Arrow x1={150} y1={170} x2={225} y2={110} color={C.accent} marker="a1" label="stake VP" lx={165} ly={128} rotate={-28} />
          {/* VP Pool → Definitions */}
          <Arrow x1={350} y1={108} x2={415} y2={168} color={C.accent} marker="a1" label="allocate votes" lx={362} ly={128} rotate={28} />
          {/* Definitions → Winning */}
          <Arrow x1={550} y1={168} x2={615} y2={110} color={C.green} marker="a2" label="wins" lx={565} ly={128} rotate={-28} />
          {/* Definitions → Losing */}
          <Arrow x1={550} y1={182} x2={615} y2={248} color={C.red} marker="a4" label="loses" lx={565} ly={222} rotate={28} />
          {/* Winning → DP Ledger */}
          <path d="M 685 130 L 685 340 L 555 340" fill="none" stroke={C.amber} strokeWidth={1.6} strokeDasharray="5,3" markerEnd="url(#a3)" />
          <text x={700} y={240} fontSize={9} fill={C.amber} fontFamily={font.body}>award DP</text>
          {/* DP Ledger → Users */}
          <Arrow x1={415} y1={328} x2={155} y2={328} color={C.amber} marker="a3" label="DP → author balance" lx={270} ly={320} />
          {/* Users → Reputation (feedback) */}
          <path d="M 95 305 L 95 275 L 40 275" fill="none" stroke={C.mid} strokeWidth={1.4} strokeDasharray="4,3" markerEnd="url(#a1)" />
          {/* Reputation → Users (loop) */}
          <text x={47} y={270} fontSize={9} fill={C.mid} fontFamily={font.body}>rep score</text>
          {/* VP Pool cost curve note */}
          <rect x={215} y={148} width={150} height={28} rx={2} fill={C.accentSoft} stroke={C.accent} strokeWidth={0.8} />
          <text x={290} y={160} textAnchor="middle" fontSize={9} fill={C.accent} fontFamily={font.mono}>cost(VP) ↑ with concentration</text>
          <text x={290} y={171} textAnchor="middle" fontSize={8} fill={C.accent} fontFamily={font.mono}>anti-manipulation curve</text>
        </svg>
      </div>
      <Legend items={[
        { color: C.accent, dash: false, label: "VP flow (voting power)" },
        { color: C.green,  dash: false, label: "Winning definition path" },
        { color: C.red,    dash: false, label: "Losing definition path" },
        { color: C.amber,  dash: true,  label: "DP award & reputation accumulation" },
      ]} />
    </div>
  );
}

function TokenNode({ x, y, w, h, label, sub, color, textColor }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3}
        fill={C.paper} stroke={color || C.ink} strokeWidth={1.8} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle"
        fontSize={12} fontWeight="700" fill={textColor || C.ink} fontFamily={font.body}>
        {label}
      </text>
      <text x={x + w / 2} y={y + 32} textAnchor="middle"
        fontSize={9} fill={C.mid} fontFamily={font.body}>
        {sub}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color, marker, label, lx, ly, rotate }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={1.6} markerEnd={`url(#${marker})`} />
      {label && (
        <text x={lx} y={ly} textAnchor="middle" fontSize={9}
          fill={color} fontFamily={font.body}
          transform={rotate ? `rotate(${rotate},${lx},${ly})` : undefined}>
          {label}
        </text>
      )}
    </>
  );
}

// ─── 3. INCENTIVE CURVE ──────────────────────────────────────────────────────
function IncentiveCurve() {
  const k = 0.18;
  const base = 100;
  const data = Array.from({ length: 61 }, (_, i) => ({
    t: i,
    reward: parseFloat((base * Math.exp(-k * i)).toFixed(2)),
    late: i >= 30 ? parseFloat((base * Math.exp(-k * i) * 0.6).toFixed(2)) : null,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        background: C.paper, border: `1px solid ${C.border}`,
        padding: "8px 12px", fontSize: 11, fontFamily: font.mono,
      }}>
        <div>t = {label}</div>
        <div style={{ color: C.accent }}>R(t) = {payload[0]?.value?.toFixed(2)}</div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: font.body }}>
      <FigureHeader
        num="Figure 3"
        title="Temporal Reward Decay — Incentive Curve"
        caption={<>Reward payout R(t) = BaseReward × e<sup>−kt</sup> where k = 0.18. Early contributors (low t) earn maximum rewards under high uncertainty; late contributors (high t) earn reduced payouts with lower risk.</>}
      />

      {/* Equation box */}
      <div style={{
        display: "flex", justifyContent: "center", marginBottom: 20,
      }}>
        <div style={{
          background: C.accentSoft, border: `1px solid ${C.accent}`,
          borderRadius: 3, padding: "8px 24px", fontFamily: font.mono,
          fontSize: 15, color: C.accent, letterSpacing: 1,
        }}>
          R(t) = BaseReward × e<sup style={{ fontSize: 11 }}>−kt</sup>
          &nbsp;&nbsp;|&nbsp;&nbsp; k = 0.18
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 40, left: 20, bottom: 30 }}>
          <defs>
            <linearGradient id="rewardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.accent} stopOpacity={0.18} />
              <stop offset="95%" stopColor={C.accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={C.faint} strokeDasharray="3 3" />
          <XAxis dataKey="t"
            label={{ value: "Time since term creation (t)", position: "insideBottom", offset: -18, fontSize: 11, fill: C.mid, fontFamily: font.body }}
            tick={{ fontSize: 10, fill: C.mid, fontFamily: font.mono }}
          />
          <YAxis
            label={{ value: "Reward payout R(t)", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: C.mid, fontFamily: font.body }}
            tick={{ fontSize: 10, fill: C.mid, fontFamily: font.mono }}
            domain={[0, 105]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={15} stroke={C.amber} strokeDasharray="4 3"
            label={{ value: "Early window", position: "top", fontSize: 9, fill: C.amber, fontFamily: font.body }} />
          <ReferenceLine x={40} stroke={C.red} strokeDasharray="4 3"
            label={{ value: "Late window", position: "top", fontSize: 9, fill: C.red, fontFamily: font.body }} />
          <Area type="monotone" dataKey="reward"
            stroke={C.accent} strokeWidth={2.2}
            fill="url(#rewardGrad)" dot={false} name="R(t)" />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 8, fontSize: 11, color: C.mid, fontFamily: font.body }}>
        <span><b style={{ color: C.accent }}>Early contributors:</b> high reward, high uncertainty</span>
        <span><b style={{ color: C.red }}>Late contributors:</b> low reward, lower risk</span>
      </div>
    </div>
  );
}

// ─── 4. PAYOFF MATRIX ────────────────────────────────────────────────────────
function PayoffMatrix() {
  const strategies = [
    { label: "Early Definition", desc: "Submit before market forms" },
    { label: "Late Definition",  desc: "Submit after signals emerge" },
    { label: "Spam Submission",  desc: "Low-quality / manipulative" },
  ];

  const outcomes = ["Wins Vote", "Loses Vote"];

  const cells = [
    // [value, label, bg, fg]
    ["+++", "High DP + VP amplification",          C.greenSoft,  C.green],
    ["+",   "Moderate DP loss; reputation docked",  C.amberSoft, C.amber],
    ["++",  "Moderate DP; lower VP cost",           C.accentSoft, C.accent],
    ["±",   "Small DP loss; no penalty",            C.faint,     C.mid],
    ["−−",  "DP stripped; stake slashed",           C.redSoft,   C.red],
    ["−−−", "Stake forfeited; rep penalized",       C.redSoft,   C.red],
  ];

  return (
    <div style={{ fontFamily: font.body }}>
      <FigureHeader
        num="Figure 4"
        title="Game-Theoretic Payoff Matrix"
        caption="Relative payoffs for contributor strategies across voting outcomes. +/− magnitudes are ordinal, not cardinal. Dominant strategy: early, high-quality submission."
      />

      <div style={{ overflowX: "auto" }}>
        <table style={{
          borderCollapse: "collapse", width: "100%",
          border: `1.5px solid ${C.ink}`, fontSize: 13,
        }}>
          <thead>
            <tr>
              <th style={thStyle({ width: 220 })}>Strategy</th>
              <th style={thStyle({ width: 180 })}>Description</th>
              {outcomes.map(o => (
                <th key={o} style={thStyle({ textAlign: "center" })}>{o}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {strategies.map((s, i) => (
              <tr key={s.label}>
                <td style={tdStyle({ fontWeight: 700, color: C.ink })}>{s.label}</td>
                <td style={tdStyle({ color: C.mid, fontStyle: "italic", fontSize: 11 })}>{s.desc}</td>
                {[0, 1].map(j => {
                  const [val, lbl, bg, fg] = cells[i * 2 + j];
                  return (
                    <td key={j} style={tdStyle({ background: bg, textAlign: "center" })}>
                      <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: fg }}>{val}</div>
                      <div style={{ fontSize: 9, color: fg, marginTop: 2, lineHeight: 1.3 }}>{lbl}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nash equilibrium note */}
      <div style={{
        marginTop: 16, padding: "10px 16px",
        background: C.accentSoft, border: `1px solid ${C.accent}`,
        borderRadius: 3, fontSize: 11, color: C.accent, fontFamily: font.mono,
      }}>
        <b>Nash Equilibrium:</b> Early, high-quality submission is the dominant strategy.
        Spam is strictly dominated — negative expected value across all voting outcomes.
      </div>

      {/* Payoff scale */}
      <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap", fontSize: 10, color: C.mid, fontFamily: font.body }}>
        {[
          ["+++", C.green, "Very high positive"],
          ["++",  C.accent,"Moderate positive"],
          ["+",   C.accent,"Small positive"],
          ["±",   C.mid,   "Near zero"],
          ["−−",  C.red,   "Moderate negative"],
          ["−−−", C.red,   "Large negative"],
        ].map(([sym, col, desc]) => (
          <span key={sym} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <b style={{ color: col, fontFamily: font.mono }}>{sym}</b> {desc}
          </span>
        ))}
      </div>
    </div>
  );
}

function thStyle(extra = {}) {
  return {
    background: C.ink, color: C.paper,
    padding: "10px 14px", textAlign: "left",
    fontFamily: font.body, fontSize: 12,
    fontWeight: 700, letterSpacing: 0.3,
    borderRight: `1px solid #333`,
    ...extra,
  };
}
function tdStyle(extra = {}) {
  return {
    padding: "12px 14px",
    borderBottom: `1px solid ${C.border}`,
    borderRight: `1px solid ${C.border}`,
    verticalAlign: "top",
    fontFamily: font.body, fontSize: 12,
    ...extra,
  };
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function FigureHeader({ num, title, caption }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, color: C.mid, fontFamily: font.mono, letterSpacing: 1, marginBottom: 2 }}>
        {num}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, fontFamily: font.head, color: C.ink, marginBottom: 6 }}>
        {title}
      </div>
      <div style={{
        fontSize: 11, color: C.mid, fontFamily: font.body,
        borderLeft: `3px solid ${C.border}`, paddingLeft: 10, lineHeight: 1.6,
        maxWidth: 680,
      }}>
        {caption}
      </div>
    </div>
  );
}

function Legend({ items }) {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 14, fontSize: 10, color: C.mid, fontFamily: font.body }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width={28} height={8}>
            <line x1={0} y1={4} x2={28} y2={4}
              stroke={item.color} strokeWidth={1.8}
              strokeDasharray={item.dash ? "4,2" : "none"} />
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("arch");

  const panels = { arch: <ArchDiagram />, flow: <TokenFlow />, curve: <IncentiveCurve />, payoff: <PayoffMatrix /> };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "32px 24px", fontFamily: font.body }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 28px" }}>
        <div style={{ fontSize: 10, fontFamily: font.mono, color: C.mid, letterSpacing: 2, marginBottom: 6 }}>
          APPENDIX B — DIAGRAM GENERATION
        </div>
        <div style={{ fontSize: 26, fontFamily: font.head, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
          Decentralized Semantic Markets
        </div>
        <div style={{ fontSize: 12, color: C.mid }}>
          Mechanism Design Diagrams &nbsp;·&nbsp; Sypher, 2026
        </div>
        <div style={{ marginTop: 16, height: 1, background: C.ink }} />
      </div>

      {/* Tab bar */}
      <div style={{ maxWidth: 900, margin: "0 auto 24px", display: "flex", gap: 0, borderBottom: `1.5px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            style={{
              padding: "8px 18px", fontSize: 11, fontFamily: font.body,
              background: "none", border: "none", cursor: "pointer",
              borderBottom: active === t.id ? `2.5px solid ${C.ink}` : "2.5px solid transparent",
              color: active === t.id ? C.ink : C.mid,
              fontWeight: active === t.id ? 700 : 400,
              letterSpacing: 0.2, marginBottom: -1.5,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        background: C.paper, border: `1px solid ${C.border}`,
        borderRadius: 4, padding: "32px 36px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        {panels[active]}
      </div>

      {/* Footer */}
      <div style={{ maxWidth: 900, margin: "20px auto 0", fontSize: 9, color: C.mid, fontFamily: font.mono, textAlign: "right" }}>
        Decentralized Semantic Markets · Appendix B · 2026
      </div>
    </div>
  );
}