import { useState } from "react";
import { Activity, Bone, Brain, Flame, Heart, Wind, Eye, ChevronDown } from "lucide-react";

const injuries = [
  { id: "bleeding",  label: "BLEEDING",       subtext: "Hemorrhage control protocol", icon: Activity, color: "text-danger",    bg: "bg-danger/10",  border: "border-danger/30" },
  { id: "fracture",  label: "FRACTURE",        subtext: "Skeletal trauma assessment",  icon: Bone,     color: "text-warning",  bg: "bg-warning/10", border: "border-warning/30" },
  { id: "tbi",       label: "HEAD TRAUMA",     subtext: "TBI / Concussion protocol",   icon: Brain,    color: "text-danger",   bg: "bg-danger/10",  border: "border-danger/30" },
  { id: "burns",     label: "BURNS",           subtext: "Thermal / Chemical injury",   icon: Flame,    color: "text-warning",  bg: "bg-warning/10", border: "border-warning/30" },
  { id: "cardiac",   label: "CARDIAC ARREST",  subtext: "CPR & AED protocol",          icon: Heart,    color: "text-danger",   bg: "bg-danger/10",  border: "border-danger/30" },
  { id: "airway",    label: "AIRWAY BLOCKED",  subtext: "Airway management",           icon: Wind,     color: "text-primary",  bg: "bg-primary/10", border: "border-primary/30" },
  { id: "eye",       label: "EYE INJURY",      subtext: "Ocular trauma response",      icon: Eye,      color: "text-primary",  bg: "bg-primary/10", border: "border-primary/30" },
];

const severities = [
  { level: "MILD",     desc: "Stable — manage in field",          color: "bg-primary/20 border-primary/40 text-primary" },
  { level: "MODERATE", desc: "Requires immediate attention",      color: "bg-warning/20 border-warning/40 text-warning" },
  { level: "SEVERE",   desc: "Life-threatening — MEDEVAC urgent", color: "bg-danger/20 border-danger/40 text-danger" },
];

export default function InjuryClassification() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ id: string; severity: string } | null>(null);

  return (
    <div className="animate-slide-page space-y-6">
      {/* Header */}
      <div>
        <div className="label-caps text-muted-foreground mb-1">MODULE 01</div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          INJURY CLASSIFICATION
        </h1>
        <div className="mt-2 h-px w-64 bg-gradient-to-r from-danger/60 to-transparent" />
      </div>

      {selected && (
        <div className="panel bg-primary/10 border-primary/40 px-5 py-4 flex items-center justify-between animate-fade-in-up">
          <div>
            <span className="label-caps text-primary">SELECTED FOR PROTOCOL</span>
            <p className="font-heading font-bold text-lg mt-1">
              {selected.id.toUpperCase()} — <span className={selected.severity === "SEVERE" ? "text-danger" : selected.severity === "MODERATE" ? "text-warning" : "text-primary"}>{selected.severity}</span>
            </p>
          </div>
          <button
            onClick={() => window.location.assign("/dashboard/treatment")}
            className="px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-primary-glow glow-green transition-all"
          >
            → PROTOCOL
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {injuries.map((inj, i) => {
          const isOpen = expanded === inj.id;
          return (
            <div
              key={inj.id}
              style={{ animationDelay: `${i * 0.07}s` }}
              className={`panel border transition-all duration-300 animate-fade-in-up
                ${inj.border}
                hover:scale-[1.02] cursor-pointer`}
            >
              {/* Card header */}
              <button
                className="w-full p-5 flex items-start gap-4 text-left"
                onClick={() => setExpanded(isOpen ? null : inj.id)}
              >
                <div className={`w-12 h-12 rounded-sm ${inj.bg} border ${inj.border} flex items-center justify-center shrink-0`}>
                  <inj.icon className={`w-6 h-6 ${inj.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`label-caps ${inj.color} mb-1`}>{inj.label}</div>
                  <p className="text-xs text-muted-foreground">{inj.subtext}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Expanded severity selection */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-2 animate-fade-in-up border-t border-border pt-4">
                  <div className="label-caps text-muted-foreground mb-3">SELECT SEVERITY</div>
                  {severities.map(s => (
                    <button
                      key={s.level}
                      onClick={() => setSelected({ id: inj.id, severity: s.level })}
                      className={`w-full px-4 py-3 rounded-sm border ${s.color}
                        text-left transition-all duration-200 hover:scale-[1.01]
                        font-heading font-bold text-sm tracking-widest uppercase
                        ${selected?.id === inj.id && selected?.severity === s.level ? "ring-1 ring-current" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{s.level}</span>
                        <span className="font-body font-normal text-xs normal-case tracking-normal opacity-70">{s.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
