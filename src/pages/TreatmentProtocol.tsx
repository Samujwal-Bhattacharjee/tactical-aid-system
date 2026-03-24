import { useState } from "react";
import { CheckCircle2, Circle, Timer, ChevronDown, ChevronUp } from "lucide-react";

const steps = [
  {
    id: 1,
    action: "SECURE THE SCENE",
    detail: "Ensure tactical safety. No active threat in immediate radius before approach.",
    icon: "🛡️",
    timer: null,
  },
  {
    id: 2,
    action: "ASSESS AIRWAY & BREATHING",
    detail: "Tilt head, lift chin. Check for chest rise. 10-second assessment window.",
    icon: "💨",
    timer: 10,
  },
  {
    id: 3,
    action: "CONTROL HEMORRHAGE",
    detail: "Apply tourniquet 5-7cm above wound. Tighten until bleeding stops. Record time.",
    icon: "🩸",
    timer: 60,
  },
  {
    id: 4,
    action: "ESTABLISH IV ACCESS",
    detail: "Large bore IV 18G or greater. Antecubital preferred. Secure and flush.",
    icon: "💉",
    timer: 120,
  },
  {
    id: 5,
    action: "FLUID RESUSCITATION",
    detail: "500mL normal saline wide open. Reassess vitals every 5 minutes.",
    icon: "🧴",
    timer: 300,
  },
  {
    id: 6,
    action: "MONITOR & DOCUMENT",
    detail: "GCS score, pulse rate, BP, SpO2. Log in casualty record. Prep MEDEVAC.",
    icon: "📊",
    timer: null,
  },
];

function CountdownTimer({ seconds, running }: { seconds: number; running: boolean }) {
  const [remaining, setRemaining] = useState(seconds);
  const [active, setActive] = useState(false);

  const start = () => {
    if (active) return;
    setActive(true);
    const interval = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(interval); return 0; }
        return r - 1;
      });
    }, 1000);
  };

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15" fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray={`${pct * 0.942} 94.2`}
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-data text-[9px] text-foreground">
          {remaining}s
        </span>
      </div>
      {!active ? (
        <button
          onClick={start}
          className="px-3 py-1.5 bg-primary/20 border border-primary/40 rounded-sm text-primary font-heading text-xs tracking-widest uppercase hover:bg-primary/30 transition-colors"
        >
          START TIMER
        </button>
      ) : (
        <span className="label-caps text-primary">
          {remaining > 0 ? `${remaining}s REMAINING` : "COMPLETE ✓"}
        </span>
      )}
    </div>
  );
}

export default function TreatmentProtocol() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(1);

  const current = steps.find(s => !completed.includes(s.id))?.id;

  const toggle = (id: number) => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-slide-page space-y-6 max-w-3xl">
      <div>
        <div className="label-caps text-muted-foreground mb-1">MODULE 02</div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          TREATMENT PROTOCOL
        </h1>
        <div className="mt-2 h-px w-64 bg-gradient-to-r from-primary/60 to-transparent" />
        <p className="mt-2 text-sm text-muted-foreground">
          Hemorrhagic Shock — Tactical Combat Casualty Care (TCCC)
        </p>
      </div>

      {/* Progress bar */}
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="label-caps text-muted-foreground">PROTOCOL PROGRESS</span>
          <span className="font-data text-sm text-primary">{completed.length}/{steps.length} STEPS</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(completed.length / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps timeline */}
      <div className="relative space-y-3">
        {/* Vertical line */}
        <div className="absolute left-7 top-8 bottom-8 w-px bg-border" />

        {steps.map((step, i) => {
          const isDone    = completed.includes(step.id);
          const isCurrent = step.id === current && !isDone;
          const isExp     = expanded === step.id;

          return (
            <div
              key={step.id}
              style={{ animationDelay: `${i * 0.08}s` }}
              className={`relative flex gap-4 animate-step`}
            >
              {/* Step number circle */}
              <div className={`relative z-10 w-14 h-14 rounded-sm border-2 flex flex-col items-center justify-center shrink-0 transition-all duration-300
                ${isDone    ? "bg-primary/20 border-primary glow-green" :
                  isCurrent ? "bg-primary/10 border-primary/60 animate-pulse-ring" :
                              "bg-panel border-border"}`}
              >
                {isDone
                  ? <CheckCircle2 className="w-5 h-5 text-primary" />
                  : <span className="font-data font-bold text-lg text-foreground">{String(step.id).padStart(2, "0")}</span>
                }
                <span className="text-lg leading-none">{step.icon}</span>
              </div>

              {/* Step content */}
              <div className={`flex-1 panel border transition-all duration-300
                ${isDone    ? "border-primary/30 bg-primary/5" :
                  isCurrent ? "border-primary/50 bg-primary/8" :
                              "border-border"}`}
              >
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                  onClick={() => setExpanded(isExp ? null : step.id)}
                >
                  <span className={`font-heading font-bold text-base tracking-widest uppercase
                    ${isDone ? "text-primary" : isCurrent ? "text-foreground glow-text-green" : "text-muted-foreground"}`}>
                    {step.action}
                  </span>
                  <div className="flex items-center gap-3">
                    {step.timer && (
                      <span className="label-caps text-muted-foreground">{step.timer}s</span>
                    )}
                    {isExp ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isExp && (
                  <div className="px-5 pb-5 border-t border-border pt-4 animate-fade-in-up space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                    {step.timer && <CountdownTimer seconds={step.timer} running={isCurrent} />}
                    <button
                      onClick={() => { toggle(step.id); if (!isDone) setExpanded(step.id + 1); }}
                      className={`mt-2 px-4 py-2 rounded-sm font-heading font-bold text-xs tracking-widest uppercase transition-all duration-200
                        ${isDone
                          ? "bg-border text-muted-foreground hover:bg-muted"
                          : "bg-primary text-primary-foreground hover:bg-primary-glow glow-green"
                        }`}
                    >
                      {isDone ? "↺ UNDO" : "✓ MARK DONE"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
