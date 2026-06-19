import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  Play, Pause, Rewind, FastForward, Upload, Cloud, Scissors, Layers,
  Wand2, Sparkles, Mic, Sliders, Heart, Star, Music2, Headphones,
  Menu, X, Crown, Wand,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sound Sweet by SYNC — sweet little audio studio" },
      { name: "description", content: "Sound Sweet by SYNC is a playful, pastel audio editor with AI-powered magic tools, glassy panels and arcade-button charm." },
      { property: "og:title", content: "Sound Sweet by SYNC" },
      { property: "og:description", content: "A playful, pastel audio editor with AI magic tools." },
    ],
  }),
  component: Index,
});

type Screen = "landing" | "transition" | "studio";

function Index() {
  const [screen, setScreen] = useState<Screen>("landing");

  const start = () => {
    setScreen("transition");
    setTimeout(() => setScreen("studio"), 2000);
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.9)",
            border: "2px solid #2a1140",
            borderRadius: "9999px",
            color: "#2a1140",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            boxShadow: "0 6px 0 0 #2a1140",
          },
        }}
      />
      <FloatingDecor />
      {screen === "landing" && <Landing onStart={start} />}
      {screen === "transition" && <CleansingOverlay />}
      {screen === "studio" && <Studio onExit={() => setScreen("landing")} />}
    </>
  );
}

/* ---------------- Floating background decor ---------------- */

function FloatingDecor() {
  const items = useMemo(() => {
    const icons = ["star", "heart", "note", "spark"] as const;
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      kind: icons[i % icons.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 14 + Math.random() * 26,
      delay: Math.random() * 6,
      dur: 7 + Math.random() * 6,
      hue: ["#ff5fa2", "#c8b6ff", "#7cc7ff", "#ffb3d1"][i % 4],
    }));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => {
        const Icon =
          it.kind === "star" ? Star : it.kind === "heart" ? Heart : it.kind === "note" ? Music2 : Sparkles;
        return (
          <Icon
            key={it.id}
            className="absolute ss-float"
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: it.size,
              height: it.size,
              color: it.hue,
              opacity: 0.55,
              animationDelay: `${it.delay}s`,
              animationDuration: `${it.dur}s`,
              filter: "drop-shadow(0 2px 0 rgba(42,17,64,0.15))",
            }}
            fill="currentColor"
          />
        );
      })}
    </div>
  );
}

/* ---------------- Landing ---------------- */

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="ss-fade-in flex items-center gap-2 rounded-full border-2 border-[var(--ss-ink)] bg-white/70 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
        <Headphones className="h-4 w-4" /> by SYNC
      </div>

      <h1 className="ss-fade-in mt-6 text-[clamp(3rem,11vw,8rem)] leading-[0.95] font-bold">
        <span className="text-[var(--ss-ink)]">★ </span>
        <span
          style={{
            backgroundImage:
              "linear-gradient(135deg,#ff5fa2 0%,#c8b6ff 50%,#7cc7ff 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "2px #2a1140",
          }}
        >
          SOUND&nbsp;SWEET
        </span>
        <span className="text-[var(--ss-ink)]"> ★</span>
      </h1>

      <p className="ss-fade-in mt-3 text-lg sm:text-xl font-semibold text-[var(--ss-ink-soft)]">
        — by SYNC —
      </p>
      <p className="ss-fade-in mt-2 max-w-xl text-sm sm:text-base text-[var(--ss-ink-soft)]">
        Your sparkly little audio studio. Polish your voice, sprinkle some magic, and ship it cute. ✨
      </p>

      <button
        onClick={onStart}
        className="arcade-btn arcade-btn-hover ss-pulse-glow mt-12 px-10 py-6 text-2xl sm:text-3xl"
        style={{
          background:
            "linear-gradient(135deg,#ff8ec0 0%,#c8b6ff 60%,#a8e0ff 100%)",
        }}
      >
        🎵 LET'S START! 💖
      </button>

      <div className="ss-fade-in mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[var(--ss-ink-soft)]">
        <Pill>✦ AI Magic Tools</Pill>
        <Pill>✦ Cloud Import</Pill>
        <Pill>✦ One-Click Polish</Pill>
      </div>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-panel rounded-full px-3 py-1 text-[11px] tracking-wider uppercase">
      {children}
    </span>
  );
}

/* ---------------- Cleansing transition ---------------- */

function CleansingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xl"
         style={{ background: "rgba(255, 230, 240, 0.65)" }}>
      <div className="relative h-32 w-32">
        <div
          className="absolute inset-0 rounded-full border-[6px] border-[var(--ss-pink)] border-t-transparent"
          style={{ animation: "ss-spin-slow 1.1s linear infinite" }}
        />
        <Sparkles className="absolute inset-0 m-auto h-14 w-14 text-[var(--ss-pink)] ss-pulse-glow"
                  style={{ animation: "ss-float 1.8s ease-in-out infinite" }} fill="currentColor" />
      </div>
      <h2 className="mt-8 text-3xl sm:text-4xl font-bold tracking-widest text-[var(--ss-ink)]">
        CLEANSING YOUR AURA…
      </h2>
      <p className="mt-2 text-sm font-semibold text-[var(--ss-ink-soft)]">tuning the sparkles ✦ aligning the vibes</p>
    </div>
  );
}

/* ---------------- Studio ---------------- */

const MOCK_PROJECTS = [
  { id: "p1", name: "Pillow Talk Demo", dur: "2:14", edited: "2 min ago" },
  { id: "p2", name: "Bedroom Pop Vox", dur: "3:42", edited: "Yesterday" },
  { id: "p3", name: "Podcast Ep. 12", dur: "27:08", edited: "3 days ago" },
  { id: "p4", name: "Voice Memo ♡", dur: "0:48", edited: "Last week" },
  { id: "p5", name: "Lo-Fi Sketch", dur: "1:30", edited: "Last week" },
];

const AI_TOOLS = [
  { id: "vocal", name: "Vocal Aesthetic", desc: "Glossy, dreamy vocal sheen", icon: Sparkles, grad: "from-pink-300 to-fuchsia-300" },
  { id: "mic", name: "Crystal Mic", desc: "Clear out room and hiss", icon: Mic, grad: "from-sky-300 to-violet-300" },
  { id: "aura", name: "Aura Master", desc: "Auto-master to streaming loud", icon: Wand2, grad: "from-rose-300 to-purple-300" },
  { id: "morph", name: "Voice Morph", desc: "Reshape tone & character", icon: Wand, grad: "from-amber-200 to-pink-300" },
];

const QUICK_TOOLS = [
  { id: "crop", name: "Crop", icon: Scissors, done: "Cropped ✓" },
  { id: "mix", name: "Mix", icon: Layers, done: "Mixed ✓" },
  { id: "denoise", name: "Denoise", icon: Sparkles, done: "Denoised ✓" },
  { id: "levels", name: "Levels", icon: Sliders, done: "Leveled ✓" },
];

function Studio({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState(MOCK_PROJECTS[0]);
  const [playing, setPlaying] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [aiWorking, setAiWorking] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<"library" | "ai" | null>(null);

  const addStatus = (s: string) =>
    setStatuses((prev) => (prev.includes(s) ? prev : [...prev, s]));

  const runUpload = (label: string) => {
    const id = toast.loading(`${label}…`);
    setTimeout(() => {
      toast.success(`${label} — Success! ✨`, { id });
    }, 1400);
  };

  const runQuick = (t: typeof QUICK_TOOLS[number]) => {
    const id = toast.loading(`${t.name}ing audio…`);
    setTimeout(() => {
      addStatus(t.done);
      toast.success(`${t.done}`, { id });
    }, 900);
  };

  const runAi = (id: string, name: string) => {
    setAiWorking(name);
    setTimeout(() => {
      setAiWorking(null);
      toast.success(`${name} — Finished! 💖`);
    }, 2000);
  };

  return (
    <div className="relative z-10 min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-4 sm:px-6">
        <button
          onClick={() => setMobilePanel("library")}
          className="arcade-btn arcade-btn-hover h-11 w-11 !p-0 lg:hidden"
          style={{ background: "var(--ss-pink-soft)" }}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button onClick={onExit} className="flex items-center gap-2 text-left">
          <span className="text-2xl sm:text-3xl font-bold"
                style={{
                  backgroundImage: "linear-gradient(135deg,#ff5fa2,#c8b6ff,#7cc7ff)",
                  WebkitBackgroundClip: "text", backgroundClip: "text",
                  color: "transparent", WebkitTextStroke: "1.5px #2a1140",
                }}>
            ★ Sound Sweet
          </span>
          <span className="hidden sm:inline text-xs font-bold text-[var(--ss-ink-soft)]">by SYNC</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setMobilePanel("ai")}
            className="arcade-btn arcade-btn-hover h-11 px-4 lg:hidden"
            style={{ background: "var(--ss-lavender)" }}
          >
            <Wand2 className="h-4 w-4" /> AI
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        {/* Left column — desktop */}
        <aside className="hidden lg:block">
          <LibraryPanel
            active={active}
            onSelect={setActive}
            onUpload={runUpload}
          />
        </aside>

        {/* Center */}
        <section className="ss-fade-in glass-panel p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--ss-ink-soft)]">Now editing</p>
              <h2 className="truncate text-2xl sm:text-3xl font-bold">{active.name}</h2>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              {statuses.length === 0 ? (
                <span className="rounded-full border-2 border-[var(--ss-ink)] bg-white/70 px-3 py-1 text-xs font-bold">
                  Untouched ♡
                </span>
              ) : (
                statuses.map((s) => (
                  <span key={s}
                        className="rounded-full border-2 border-[var(--ss-ink)] px-3 py-1 text-xs font-bold"
                        style={{ background: "var(--ss-pink-soft)" }}>
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>

          <Visualizer playing={playing} />

          {/* Transport */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => toast("⏮ Rewound")}
              className="arcade-btn arcade-btn-hover h-14 w-14 !p-0"
              style={{ background: "var(--ss-blue)" }}
              aria-label="Rewind"
            >
              <Rewind className="h-6 w-6" />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="arcade-btn arcade-btn-hover ss-pulse-glow h-20 w-20 !p-0"
              style={{
                background: "linear-gradient(135deg,#ff5fa2,#c8b6ff)",
              }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-9 w-9" fill="currentColor" /> : <Play className="h-9 w-9 translate-x-0.5" fill="currentColor" />}
            </button>
            <button
              onClick={() => toast("⏭ Forward")}
              className="arcade-btn arcade-btn-hover h-14 w-14 !p-0"
              style={{ background: "var(--ss-blue)" }}
              aria-label="Fast forward"
            >
              <FastForward className="h-6 w-6" />
            </button>
          </div>

          {/* Quick tools */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => runQuick(t)}
                className="arcade-btn arcade-btn-hover flex-col gap-1 px-3 py-4 hover:!ring-4 hover:!ring-[var(--ss-pink)]/50 hover:!outline-none"
                style={{ background: "rgba(255,255,255,0.85)" }}
              >
                <t.icon className="h-6 w-6 text-[var(--ss-pink)]" />
                <span className="text-sm">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Right column — desktop */}
        <aside className="hidden lg:block">
          <AiPanel onRun={runAi} />
        </aside>
      </div>

      {/* Mobile slide-out */}
      {mobilePanel && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[rgba(42,17,64,0.35)] backdrop-blur-sm"
            onClick={() => setMobilePanel(null)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto p-4"
               style={{ animation: "ss-fade-in 0.25s ease-out both" }}>
            <div className="glass-panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  {mobilePanel === "library" ? "Library" : "AI Tools"}
                </h3>
                <button onClick={() => setMobilePanel(null)}
                        className="arcade-btn arcade-btn-hover h-10 w-10 !p-0"
                        style={{ background: "var(--ss-pink-soft)" }}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              {mobilePanel === "library" ? (
                <LibraryPanel embedded active={active} onSelect={(p) => { setActive(p); setMobilePanel(null); }} onUpload={runUpload} />
              ) : (
                <AiPanel embedded onRun={(id, n) => { runAi(id, n); setMobilePanel(null); }} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI working overlay */}
      {aiWorking && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xl"
             style={{ background: "rgba(200,182,255,0.45)" }}>
          <div className="glass-panel flex flex-col items-center gap-4 px-10 py-8">
            <Wand2 className="h-16 w-16 text-[var(--ss-pink)]"
                   style={{ animation: "ss-spin-slow 1.2s linear infinite" }} />
            <p className="text-xl font-bold">{aiWorking}…</p>
            <p className="text-xs font-semibold text-[var(--ss-ink-soft)]">sprinkling fairy dust ✦</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Library panel ---------------- */

function LibraryPanel({
  active, onSelect, onUpload, embedded,
}: {
  active: typeof MOCK_PROJECTS[number];
  onSelect: (p: typeof MOCK_PROJECTS[number]) => void;
  onUpload: (label: string) => void;
  embedded?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className={embedded ? "" : "glass-panel p-5 ss-fade-in"}>
      <h3 className="mb-3 text-lg font-bold flex items-center gap-2">
        <Music2 className="h-5 w-5 text-[var(--ss-pink)]" /> Saved Projects
      </h3>
      <ul className="space-y-2">
        {MOCK_PROJECTS.map((p) => {
          const isActive = p.id === active.id;
          return (
            <li key={p.id}>
              <button
                onClick={() => onSelect(p)}
                className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border-2 px-3 py-2.5 text-left transition"
                style={{
                  background: isActive ? "var(--ss-pink-soft)" : "rgba(255,255,255,0.7)",
                  borderColor: isActive ? "var(--ss-ink)" : "rgba(42,17,64,0.15)",
                  boxShadow: isActive ? "var(--ss-shadow-sm)" : "none",
                }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{p.name}</p>
                  <p className="truncate text-[11px] text-[var(--ss-ink-soft)]">{p.edited}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-bold">{p.dur}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-2">
        <input ref={fileRef} type="file" className="hidden"
               onChange={() => onUpload("Direct upload")} />
        <button
          onClick={() => fileRef.current?.click()}
          className="arcade-btn arcade-btn-hover w-full justify-center"
          style={{ background: "var(--ss-blue)" }}
        >
          <Upload className="h-4 w-4" /> Direct Upload
        </button>
        <button
          onClick={() => onUpload("Cloud import")}
          className="arcade-btn arcade-btn-hover w-full justify-center"
          style={{ background: "var(--ss-lavender)" }}
        >
          <Cloud className="h-4 w-4" /> Cloud Import
        </button>
        <p className="pt-1 text-center text-[11px] font-semibold text-[var(--ss-ink-soft)]">
          ⌘ Drive · Dropbox · iCloud
        </p>
      </div>
    </div>
  );
}

/* ---------------- AI panel ---------------- */

function AiPanel({ onRun, embedded }: { onRun: (id: string, name: string) => void; embedded?: boolean }) {
  return (
    <div className={embedded ? "space-y-3" : "ss-fade-in space-y-3"}>
      <div className={embedded ? "" : "glass-panel p-5"}>
        <h3 className="mb-3 text-lg font-bold flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-[var(--ss-pink)]" /> Magic Tools
        </h3>
        <div className="space-y-2.5">
          {AI_TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => onRun(t.id, t.name)}
              className={`group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border-2 border-[var(--ss-ink)] bg-gradient-to-br ${t.grad} px-3 py-3 text-left transition`}
              style={{ boxShadow: "var(--ss-shadow-sm)" }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[var(--ss-ink)] bg-white/80">
                <t.icon className="h-5 w-5 text-[var(--ss-ink)]" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">{t.name}</span>
                <span className="block truncate text-[11px] text-[var(--ss-ink-soft)]">{t.desc}</span>
              </span>
              <Sparkles className="h-4 w-4 text-[var(--ss-ink)] opacity-60 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-3xl border-2 border-[var(--ss-ink)] p-5 ${embedded ? "" : ""}`}
        style={{
          background:
            "linear-gradient(135deg,#ff5fa2 0%,#c8b6ff 50%,#7cc7ff 100%)",
          boxShadow: "var(--ss-shadow)",
        }}
      >
        <Sparkles className="absolute -right-3 -top-3 h-20 w-20 text-white/40" fill="currentColor" />
        <Crown className="h-7 w-7" />
        <h4 className="mt-2 text-xl font-bold leading-tight">AI Voice Clone</h4>
        <p className="mt-1 text-xs font-semibold text-[var(--ss-ink)]/80">
          Clone your voice in 30 seconds. Spooky-good.
        </p>
        <button
          onClick={() => toast("✨ Premium coming soon")}
          className="arcade-btn arcade-btn-hover mt-4"
          style={{ background: "#fff" }}
        >
          <Crown className="h-4 w-4" /> Go Premium
        </button>
      </div>
    </div>
  );
}

/* ---------------- Visualizer ---------------- */

function Visualizer({ playing }: { playing: boolean }) {
  // Responsive dot count using CSS — render many, hide via CSS at narrow widths
  const dots = 48;
  return (
    <div className="mt-5 rounded-3xl border-2 border-[var(--ss-ink)]/15 bg-white/40 p-4">
      <div className="flex h-40 items-center justify-center gap-1 sm:gap-1.5">
        {Array.from({ length: dots }).map((_, i) => {
          const colors = ["#ff5fa2", "#ff8ec0", "#c8b6ff", "#a8e0ff", "#d4a8ff"];
          const color = colors[i % colors.length];
          // Sine envelope for height baseline
          const env = Math.sin((i / dots) * Math.PI);
          const base = 16 + env * 80; // px
          // hide some bars on smaller screens via CSS classes
          const hideSm = i % 2 === 1;
          const hideMd = i % 4 === 3;
          return (
            <span
              key={i}
              className={`block w-2 sm:w-2.5 rounded-full ${hideSm ? "hidden sm:block" : ""} ${hideMd ? "md:hidden lg:block" : ""}`}
              style={{
                height: `${base}px`,
                background: color,
                transformOrigin: "center",
                animation: playing
                  ? `ss-bounce-bar ${600 + (i % 7) * 90}ms ease-in-out ${i * 35}ms infinite`
                  : "none",
                transform: playing ? undefined : "scaleY(0.5)",
                boxShadow: `0 0 12px ${color}66`,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[var(--ss-ink-soft)]">
        <span>00:00</span>
        <span className={playing ? "text-[var(--ss-pink)]" : ""}>
          {playing ? "● PLAYING" : "❚❚ PAUSED"}
        </span>
        <span>02:14</span>
      </div>
    </div>
  );
}
