import { Activity, Users, FileText, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "ACTIVE CASUALTIES",   value: "6",   sub: "2 critical",      color: "text-danger",  border: "border-danger/30",  bg: "bg-danger/8" },
  { label: "PROTOCOLS RUN",       value: "14",  sub: "Today",            color: "text-primary", border: "border-primary/30", bg: "bg-primary/8" },
  { label: "RESOURCES TRACKED",   value: "23",  sub: "3 critically low", color: "text-warning", border: "border-warning/30", bg: "bg-warning/8" },
  { label: "PENDING SYNC ITEMS",  value: "4",   sub: "Last sync 1h ago", color: "text-warning", border: "border-warning/30", bg: "bg-warning/8" },
];

const quickActions = [
  { label: "CLASSIFY INJURY",   path: "/dashboard/injury",    icon: Activity,    color: "text-danger",   hoverBg: "hover:bg-danger/10",   border: "border-danger/20" },
  { label: "VIEW PROTOCOL",     path: "/dashboard/treatment", icon: FileText,    color: "text-primary",  hoverBg: "hover:bg-primary/10",  border: "border-primary/20" },
  { label: "IMPROVISE GEAR",    path: "/dashboard/resources", icon: Users,       color: "text-warning",  hoverBg: "hover:bg-warning/10",  border: "border-warning/20" },
  { label: "SYNC DATA",         path: "/dashboard/sync",      icon: RefreshCw,   color: "text-primary",  hoverBg: "hover:bg-primary/10",  border: "border-primary/20" },
];

const alerts = [
  { type: "CRITICAL", msg: "Casualty C-004 awaiting MEDEVAC — 48 minutes elapsed",       color: "text-danger",  bg: "bg-danger/10",  border: "border-danger/30" },
  { type: "WARNING",  msg: "Tourniquet supply at 20% — request resupply from Bravo CCP", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  { type: "INFO",     msg: "Protocol database updated — v2.4.1 available for sync",       color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
];

export default function Dashboard() {
  return (
    <div className="animate-slide-page space-y-8">
      {/* Header */}
      <div>
        <div className="label-caps text-muted-foreground mb-1 tracking-[0.2em]">
          OPERATOR DASHBOARD — MARCH 24, 2025
        </div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          MISSION OVERVIEW
        </h1>
        <div className="mt-2 h-px w-80 bg-gradient-to-r from-primary/60 to-transparent" />
      </div>

      {/* Alert bar */}
      {alerts.slice(0, 1).map((a, i) => (
        <div key={i} className={`${a.bg} border ${a.border} rounded-sm px-5 py-4 flex items-center gap-3`}>
          <AlertTriangle className={`w-4 h-4 ${a.color} shrink-0`} />
          <span className={`label-caps ${a.color} mr-2`}>{a.type}</span>
          <span className="text-sm text-foreground/90">{a.msg}</span>
        </div>
      ))}

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ animationDelay: `${i * 0.07}s` }}
            className={`panel border ${s.border} ${s.bg} p-5 animate-fade-in-up`}
          >
            <div className={`font-data font-bold text-4xl ${s.color} mb-1`}>{s.value}</div>
            <div className="label-caps text-muted-foreground text-[10px]">{s.label}</div>
            <div className="font-body text-xs text-muted-foreground/50 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="panel p-5 space-y-3">
          <div className="label-caps text-muted-foreground mb-4">QUICK ACTIONS</div>
          {quickActions.map((a, i) => (
            <Link
              key={a.path}
              to={a.path}
              style={{ animationDelay: `${i * 0.08}s` }}
              className={`flex items-center justify-between px-4 py-3.5 rounded-sm border ${a.border}
                ${a.hoverBg} transition-all duration-200 hover:scale-[1.01] group animate-fade-in-up`}
            >
              <div className="flex items-center gap-3">
                <a.icon className={`w-5 h-5 ${a.color}`} />
                <span className={`font-heading font-semibold text-sm tracking-widest uppercase ${a.color}`}>
                  {a.label}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          {/* Emergency CTA */}
          <Link
            to="/dashboard/emergency"
            className="flex items-center justify-center gap-3 px-4 py-4 mt-2 rounded-sm border-2 border-danger/50
              bg-danger/10 text-danger font-heading font-bold text-sm tracking-[0.2em] uppercase
              hover:bg-danger/20 transition-all duration-200 hover:scale-[1.01]
              [box-shadow:0_0_20px_hsl(353_70%_50%_/_0.15)]"
          >
            ⚡ EMERGENCY MODE
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Alerts */}
        <div className="panel p-5 space-y-3">
          <div className="label-caps text-muted-foreground mb-4">ACTIVE ALERTS</div>
          {alerts.map((a, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.08}s` }}
              className={`${a.bg} border ${a.border} rounded-sm px-4 py-3 flex gap-3 animate-fade-in-up`}
            >
              <AlertTriangle className={`w-4 h-4 ${a.color} shrink-0 mt-0.5`} />
              <div>
                <div className={`label-caps ${a.color} mb-1`}>{a.type}</div>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{a.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer tagline */}
      <div className="pt-4 border-t border-border">
        <p className="label-caps text-muted-foreground/20 text-center tracking-[0.3em]">
          SAHAYAK — WHEN EVERY SECOND DECIDES SURVIVAL
        </p>
      </div>
    </div>
  );
}
