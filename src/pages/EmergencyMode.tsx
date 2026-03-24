import { useState } from "react";
import { AlertOctagon, Volume2 } from "lucide-react";

const emergencySteps = [
  {
    num: "01",
    action: "CHECK FOR PULSE",
    sub: "Carotid artery — 10 seconds",
    icon: "❤️",
  },
  {
    num: "02",
    action: "CLEAR AIRWAY",
    sub: "Head-tilt chin-lift — look, listen, feel",
    icon: "💨",
  },
  {
    num: "03",
    action: "START COMPRESSIONS",
    sub: "30 compressions : 2 breaths — 100-120/min",
    icon: "🤲",
  },
  {
    num: "04",
    action: "CONTROL BLEEDING",
    sub: "Pack wound — tourniquet if extremity",
    icon: "🩸",
  },
  {
    num: "05",
    action: "CALL MEDEVAC NOW",
    sub: "9-Line report — Grid, casualties, equipment",
    icon: "📡",
  },
];

export default function EmergencyMode() {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="animate-slide-page space-y-6">
      {!active ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
          <div>
            <div className="label-caps text-danger/80 mb-2 tracking-[0.3em]">MODULE 04</div>
            <h1 className="font-heading font-bold text-4xl tracking-widest uppercase text-foreground mb-4">
              EMERGENCY MODE
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Activates full-screen emergency protocol. Minimal UI. Maximum clarity. Designed for extreme stress scenarios.
            </p>
          </div>

          <button
            onClick={() => { setActive(true); setCurrentStep(0); }}
            className="relative px-10 py-5 bg-danger/20 border-2 border-danger text-danger
              font-heading font-bold text-xl tracking-[0.3em] uppercase rounded-sm
              hover:bg-danger hover:text-danger-foreground transition-all duration-300
              animate-pulse-ring [box-shadow:0_0_30px_hsl(353_70%_50%_/_0.4)]"
          >
            <span className="flex items-center gap-3">
              <AlertOctagon className="w-6 h-6" />
              ACTIVATE EMERGENCY
            </span>
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 bg-background flex flex-col emergency-border border-4 border-danger overflow-hidden">
          {/* Red overlay tint */}
          <div className="absolute inset-0 bg-danger/5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b-2 border-danger/40 shrink-0">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-8 h-8 text-danger" />
              <span className="font-heading font-bold text-3xl tracking-[0.3em] uppercase text-danger glow-text-red">
                EMERGENCY ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-muted-foreground hover:text-foreground text-sm font-heading tracking-widest uppercase">
                <Volume2 className="w-4 h-4" />
                VOICE READOUT
              </button>
              <button
                onClick={() => setActive(false)}
                className="px-4 py-2 border border-danger/40 text-danger font-heading font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-danger/20 transition-colors"
              >
                ✕ DEACTIVATE
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 space-y-6 overflow-y-auto tactical-scroll">
            {emergencySteps.map((step, i) => {
              const isActive  = i === currentStep;
              const isDone    = i < currentStep;
              const isPending = i > currentStep;

              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(i)}
                  className={`group w-full text-left flex items-center gap-6 p-6 rounded-sm border-2 transition-all duration-300
                    ${isActive
                      ? "border-danger bg-danger/10 scale-[1.01] [box-shadow:0_0_40px_hsl(353_70%_50%_/_0.2)]"
                      : isDone
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/40 opacity-40"
                    }`}
                >
                  {/* Step number */}
                  <div className={`w-16 h-16 rounded-sm border-2 flex items-center justify-center shrink-0
                    ${isActive ? "border-danger bg-danger/20" : isDone ? "border-primary bg-primary/20" : "border-border"}`}
                  >
                    {isDone
                      ? <span className="text-2xl">✓</span>
                      : <span className={`font-data font-bold text-2xl ${isActive ? "text-danger" : "text-muted-foreground"}`}>{step.num}</span>
                    }
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl">{step.icon}</span>
                      <h2 className={`font-heading font-bold text-3xl md:text-4xl tracking-wider uppercase
                        ${isActive ? "text-foreground" : isDone ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {step.action}
                      </h2>
                    </div>
                    <p className={`font-body text-lg ml-11 ${isActive ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                      {step.sub}
                    </p>
                  </div>

                  {isActive && (
                    <div className="shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); if (currentStep < emergencySteps.length - 1) setCurrentStep(s => s + 1); }}
                        className="px-6 py-3 bg-danger text-danger-foreground font-heading font-bold text-base tracking-widest uppercase rounded-sm hover:brightness-110 transition-all"
                      >
                        {currentStep < emergencySteps.length - 1 ? "NEXT →" : "COMPLETE ✓"}
                      </button>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-danger/20 flex items-center justify-between shrink-0">
            <span className="font-data text-xs text-muted-foreground/40">
              STEP {currentStep + 1} OF {emergencySteps.length}
            </span>
            <div className="flex gap-1">
              {emergencySteps.map((_, i) => (
                <div key={i} className={`w-8 h-1.5 rounded-full transition-all duration-300
                  ${i < currentStep ? "bg-primary" : i === currentStep ? "bg-danger" : "bg-border"}`} />
              ))}
            </div>
            <span className="font-data text-xs text-danger/60 uppercase tracking-widest">
              SAHAYAK EMERGENCY
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
