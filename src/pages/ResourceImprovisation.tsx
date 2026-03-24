import { useState } from "react";
import { Wrench, ArrowRight } from "lucide-react";

const resources = [
  { id: "cloth",  label: "CLOTH",  icon: "🧣" },
  { id: "stick",  label: "STICK",  icon: "🪵" },
  { id: "rope",   label: "ROPE",   icon: "🪢" },
  { id: "water",  label: "WATER",  icon: "💧" },
  { id: "tape",   label: "TAPE",   icon: "📎" },
  { id: "knife",  label: "KNIFE",  icon: "🔪" },
];

type Suggestion = { title: string; steps: string[]; severity: "danger" | "warning" | "ok" };

const improvMap: Record<string, Suggestion> = {
  "cloth":         { title: "PRESSURE DRESSING", steps: ["Fold cloth to thickness of 4+ layers", "Apply firm pressure directly over wound", "Maintain constant pressure for 10+ minutes", "Secure with improvised wrap if available"], severity: "warning" },
  "cloth+stick":   { title: "IMPROVISED TOURNIQUET", steps: ["Place cloth 5-7cm above wound site", "Twist stick to tighten until bleeding stops", "Lock stick against limb — do NOT release", "Mark time of application on forehead: 'T 14:32'"], severity: "danger" },
  "cloth+rope":    { title: "TOURNIQUET + SLING", steps: ["Use rope as windlass, cloth as padding", "Apply tourniquet above wound", "Create sling for upper-limb immobilisation", "Verify distal pulse AFTER application"], severity: "danger" },
  "stick+rope":    { title: "SPLINT SYSTEM", steps: ["Position stick along fractured limb", "Tie rope above and below fracture site", "Ensure immobilisation without circulation loss", "Elevate limb if possible"], severity: "warning" },
  "water":         { title: "WOUND IRRIGATION", steps: ["Use clean water — avoid stagnant sources", "Irrigate wound with high-pressure flow", "Remove visible debris gently", "Cover wound after cleaning"], severity: "ok" },
  "cloth+water":   { title: "WET COMPRESSION DRESSING", steps: ["Dampen cloth with clean water", "Apply over burn or wound as cooling compress", "Replace every 10–15 minutes", "Monitor for hypothermia in cold environments"], severity: "ok" },
  "tape":          { title: "WOUND CLOSURE", steps: ["Clean wound margins thoroughly", "Apply tape strips perpendicular to wound", "Approximate wound edges firmly", "Cover with additional cloth layer"], severity: "warning" },
  "cloth+tape":    { title: "SEALED CHEST DRESSING", steps: ["Cut cloth larger than wound by 5cm each side", "Tape 3 sides only — leave 1 side open (flutter valve)", "Monitor for tension pneumothorax", "Re-seal if air entry stops"], severity: "danger" },
};

function getKey(sel: Set<string>): string {
  const sorted = [...sel].sort().join("+");
  if (improvMap[sorted]) return sorted;
  for (const key of Object.keys(improvMap)) {
    const parts = key.split("+");
    if (parts.every(p => sel.has(p))) return key;
  }
  if (sel.size > 0) return [...sel][0];
  return "";
}

export default function ResourceImprovisation() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
    setShowResult(false);
  };

  const key = getKey(selected);
  const suggestion = improvMap[key] || null;

  const severityColor = {
    danger:  { border: "border-danger/40", bg: "bg-danger/8", label: "text-danger", badge: "CRITICAL PROTOCOL" },
    warning: { border: "border-warning/40", bg: "bg-warning/8", label: "text-warning", badge: "FIELD IMPROVISATION" },
    ok:      { border: "border-primary/40", bg: "bg-primary/8", label: "text-primary", badge: "STANDARD PROCEDURE" },
  };

  return (
    <div className="animate-slide-page space-y-6 max-w-4xl">
      <div>
        <div className="label-caps text-muted-foreground mb-1">MODULE 03</div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          RESOURCE IMPROVISATION
        </h1>
        <div className="mt-2 h-px w-64 bg-gradient-to-r from-warning/60 to-transparent" />
        <p className="mt-2 text-sm text-muted-foreground">
          No equipment? Select available field resources for improvised solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — Resource selector */}
        <div className="space-y-4">
          <div className="panel p-5">
            <div className="label-caps text-muted-foreground mb-4">AVAILABLE RESOURCES</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {resources.map(r => {
                const isActive = selected.has(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggle(r.id)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-sm border transition-all duration-300
                      hover:scale-[1.04]
                      ${isActive
                        ? "bg-primary/15 border-primary/60 glow-green"
                        : "bg-background border-border hover:border-primary/30 hover:bg-primary/5"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                    )}
                    <span className="text-2xl">{r.icon}</span>
                    <span className={`label-caps ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected.size > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[...selected].map(id => (
                    <span key={id} className="px-2 py-0.5 bg-primary/20 border border-primary/30 rounded-sm label-caps text-primary text-[10px]">
                      {id.toUpperCase()}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowResult(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-primary-glow glow-green transition-all"
                >
                  GENERATE <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Connecting lines visual */}
          {selected.size > 0 && (
            <div className="panel p-4 bg-primary/5 border-primary/20">
              <div className="label-caps text-primary/60 mb-2">NEURAL MAPPING</div>
              <div className="flex flex-wrap gap-2 items-center">
                {[...selected].map((id, i) => (
                  <span key={id} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-sm font-data text-xs text-primary">
                      {id.toUpperCase()}
                    </span>
                    {i < selected.size - 1 && (
                      <ArrowRight className="w-3 h-3 text-primary/40" />
                    )}
                  </span>
                ))}
                {selected.size > 1 && (
                  <>
                    <ArrowRight className="w-3 h-3 text-primary/40" />
                    <span className="px-3 py-1 bg-primary/30 border border-primary/60 rounded-sm font-data text-xs text-primary animate-pulse-ring">
                      SOLUTION
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Output panel */}
        <div>
          {!showResult || !suggestion ? (
            <div className="panel p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] border-dashed">
              <Wrench className="w-12 h-12 text-muted-foreground/20 mb-4" />
              <p className="label-caps text-muted-foreground/40 text-center">
                {selected.size === 0
                  ? "SELECT RESOURCES TO BEGIN"
                  : "CLICK GENERATE FOR PROTOCOL"
                }
              </p>
            </div>
          ) : (
            <div className={`panel p-6 space-y-5 animate-fade-in-up ${severityColor[suggestion.severity].border} ${severityColor[suggestion.severity].bg}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`label-caps ${severityColor[suggestion.severity].label}`}>
                    {severityColor[suggestion.severity].badge}
                  </span>
                  <h2 className="font-heading font-bold text-2xl tracking-widest uppercase text-foreground mt-1">
                    {suggestion.title}
                  </h2>
                </div>
                <span className={`px-2 py-1 border rounded-sm font-data text-[10px] ${severityColor[suggestion.severity].label} ${severityColor[suggestion.severity].border}`}>
                  {[...selected].map(s => s.toUpperCase()).join(" + ")}
                </span>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3">
                {suggestion.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span className={`font-data font-bold text-sm shrink-0 ${severityColor[suggestion.severity].label}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <p className="label-caps text-muted-foreground/40 text-[10px]">
                  ⚠ FIELD IMPROVISATION — REPLACE WITH CERTIFIED EQUIPMENT AT FIRST OPPORTUNITY
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
