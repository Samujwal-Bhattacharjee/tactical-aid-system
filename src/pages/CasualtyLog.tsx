import { useState } from "react";
import { Search, Filter } from "lucide-react";

const casualties = [
  { id: "C-001", time: "2025-03-24 06:14:33", type: "HEMORRHAGE", severity: "SEVERE",   action: "Tourniquet applied — MEDEVAC requested", location: "Grid 47.2N / 13.8E" },
  { id: "C-002", time: "2025-03-24 07:02:11", type: "FRACTURE",   severity: "MODERATE", action: "Improvised splint — IV access established", location: "Grid 47.4N / 13.6E" },
  { id: "C-003", time: "2025-03-24 08:45:58", type: "BURNS",      severity: "MODERATE", action: "Wet dressing applied — morphine administered", location: "CCP Alpha" },
  { id: "C-004", time: "2025-03-24 09:30:02", type: "TBI",        severity: "SEVERE",   action: "Airway secured — 30-degree elevation — urgent evac", location: "Grid 48.1N / 14.2E" },
  { id: "C-005", time: "2025-03-24 10:12:44", type: "AIRWAY",     severity: "MILD",     action: "Manual clearance — monitoring maintained", location: "Grid 47.9N / 13.9E" },
  { id: "C-006", time: "2025-03-24 11:55:17", type: "CARDIAC",    severity: "SEVERE",   action: "CPR initiated — 7 minutes — ROSC achieved", location: "CCP Bravo" },
];

const severityConfig = {
  SEVERE:   { color: "text-danger",  border: "border-danger/30",   bg: "bg-danger/10" },
  MODERATE: { color: "text-warning", border: "border-warning/30",  bg: "bg-warning/10" },
  MILD:     { color: "text-primary", border: "border-primary/30",  bg: "bg-primary/10" },
};

export default function CasualtyLog() {
  const [search, setSearch]     = useState("");
  const [severityFilter, setSev] = useState<string>("ALL");
  const [typeFilter, setType]   = useState<string>("ALL");

  const filtered = casualties.filter(c => {
    const matchSev  = severityFilter === "ALL" || c.severity === severityFilter;
    const matchType = typeFilter === "ALL" || c.type === typeFilter;
    const matchSearch = search === "" ||
      c.id.includes(search.toUpperCase()) ||
      c.type.includes(search.toUpperCase()) ||
      c.action.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchType && matchSearch;
  });

  return (
    <div className="animate-slide-page space-y-6">
      <div>
        <div className="label-caps text-muted-foreground mb-1">MODULE 05</div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          CASUALTY LOG
        </h1>
        <div className="mt-2 h-px w-64 bg-gradient-to-r from-muted-foreground/40 to-transparent" />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "TOTAL CASUALTIES", value: casualties.length, color: "text-foreground" },
          { label: "SEVERE",           value: casualties.filter(c => c.severity === "SEVERE").length,   color: "text-danger" },
          { label: "MODERATE",         value: casualties.filter(c => c.severity === "MODERATE").length, color: "text-warning" },
        ].map(stat => (
          <div key={stat.label} className="panel p-4 text-center">
            <div className={`font-data font-bold text-3xl ${stat.color}`}>{stat.value}</div>
            <div className="label-caps text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="panel p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search casualties..."
            className="w-full bg-background border border-border pl-9 pr-4 py-2 rounded-sm font-body text-sm text-foreground placeholder-muted-foreground/40 outline-none focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="label-caps text-muted-foreground">SEVERITY:</span>
          {["ALL", "SEVERE", "MODERATE", "MILD"].map(s => (
            <button
              key={s}
              onClick={() => setSev(s)}
              className={`px-3 py-1.5 rounded-sm font-heading text-xs tracking-widest uppercase transition-all
                ${severityFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline list */}
      <div className="relative space-y-3">
        <div className="absolute left-[22px] top-4 bottom-4 w-px bg-border" />

        {filtered.map((c, i) => {
          const cfg = severityConfig[c.severity as keyof typeof severityConfig];
          return (
            <div
              key={c.id}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="relative flex gap-4 animate-fade-in-up"
            >
              {/* Dot */}
              <div className={`z-10 w-11 h-11 rounded-sm border flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.border}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.color.replace("text-", "bg-")}`} />
              </div>

              {/* Card */}
              <div className={`flex-1 panel border ${cfg.border} p-4`}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`font-data font-bold text-sm ${cfg.color}`}>{c.id}</span>
                    <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-heading font-bold tracking-widest uppercase ${cfg.color} ${cfg.border} ${cfg.bg}`}>
                      {c.severity}
                    </span>
                    <span className="label-caps text-muted-foreground">{c.type}</span>
                  </div>
                  <span className="font-data text-xs text-muted-foreground/60">{c.time}</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-2">{c.action}</p>
                <div className="flex items-center gap-2">
                  <span className="label-caps text-muted-foreground/40">LOCATION:</span>
                  <span className="font-data text-xs text-muted-foreground/60">{c.location}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="panel p-12 text-center border-dashed">
            <p className="label-caps text-muted-foreground/30">NO CASUALTIES MATCH CURRENT FILTER</p>
          </div>
        )}
      </div>
    </div>
  );
}
