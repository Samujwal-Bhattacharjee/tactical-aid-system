import { useState } from "react";
import { Shield, Globe } from "lucide-react";
import MilitaryLogin from "./MilitaryLogin";
import CivilianLogin from "./CivilianLogin";

type Role = "military" | "civilian" | null;

export default function RoleSelection() {
  const [selected, setSelected] = useState<Role>(null);

  if (selected === "military") return <MilitaryLogin onBack={() => setSelected(null)} />;
  if (selected === "civilian") return <CivilianLogin onBack={() => setSelected(null)} />;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(150 40% 38% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(150 40% 38% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scan overlay */}
      <div className="scan-overlay" />

      {/* Logo */}
      <div className="animate-fade-in-up mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center glow-green">
            <span className="font-heading font-bold text-lg text-primary">S</span>
          </div>
          <h1 className="font-heading font-bold text-4xl tracking-widest text-foreground uppercase">
            SAHAYAK
          </h1>
        </div>
        <p className="label-caps text-muted-foreground tracking-[0.2em]">
          Autonomous Combat Medic Assistant
        </p>
        <div className="mt-3 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Role cards */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up delay-200">
        {/* Military Card */}
        <button
          onClick={() => setSelected("military")}
          className={`group relative p-8 panel text-left transition-all duration-300
            hover:scale-[1.03] hover:glow-green hover:border-primary/60
            ${selected === "military" ? "border-primary glow-green" : "border-border"}
            focus:outline-none`}
        >
          {selected === "military" && (
            <div className="absolute inset-0 rounded-sm border-2 border-primary animate-pulse-ring" />
          )}
          <div className="mb-5 w-14 h-14 rounded-sm bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-300">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div className="label-caps text-primary mb-1">🪖 Military Access</div>
          <h2 className="font-heading font-bold text-2xl tracking-wide text-foreground uppercase mb-2">
            Tactical Mode
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secure Tactical Access
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-data text-primary/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            RESTRICTED — AUTHORIZED PERSONNEL ONLY
          </div>
        </button>

        {/* Civilian Card */}
        <button
          onClick={() => setSelected("civilian")}
          className={`group relative p-8 panel text-left transition-all duration-300
            hover:scale-[1.03] hover:border-warning/50
            hover:[box-shadow:0_0_20px_hsl(36_100%_56%_/_0.3)]
            ${selected === "civilian" ? "border-warning [box-shadow:0_0_20px_hsl(36_100%_56%_/_0.3)]" : "border-border"}
            focus:outline-none`}
        >
          <div className="mb-5 w-14 h-14 rounded-sm bg-warning/10 border border-warning/30 flex items-center justify-center group-hover:bg-warning/20 transition-colors duration-300">
            <Globe className="w-7 h-7 text-warning" />
          </div>
          <div className="label-caps text-warning mb-1">🌍 Civilian Access</div>
          <h2 className="font-heading font-bold text-2xl tracking-wide text-foreground uppercase mb-2">
            Civilian Mode
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preparedness Interface
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-data text-warning/70">
            <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
            OPEN ACCESS — FIRST AID PROTOCOLS
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-16 animate-fade-in-up delay-400">
        <p className="label-caps text-muted-foreground/40 tracking-[0.3em] text-center">
          When Every Second Decides Survival
        </p>
      </div>
    </div>
  );
}
