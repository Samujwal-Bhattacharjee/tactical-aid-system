import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const syncItems = [
  { label: "CASUALTY RECORDS",   pending: 3,  status: "pending",  size: "2.4 KB" },
  { label: "TREATMENT LOGS",     pending: 0,  status: "synced",   size: "8.1 KB" },
  { label: "RESOURCE INVENTORY", pending: 1,  status: "pending",  size: "0.8 KB" },
  { label: "PROTOCOL UPDATES",   pending: 0,  status: "synced",   size: "44.2 KB" },
  { label: "LOCATION DATA",      pending: 0,  status: "conflict", size: "1.2 KB" },
];

export default function SyncStatus() {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastSync] = useState("2025-03-24T09:47:12Z");

  const handleSync = () => {
    if (syncing) return;
    setSyncing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setSyncing(false); return 100; }
        return p + Math.random() * 8 + 4;
      });
    }, 120);
  };

  const statusCfg = {
    synced:   { icon: CheckCircle2, color: "text-primary",   border: "border-primary/30",  bg: "bg-primary/10",  label: "SYNCED" },
    pending:  { icon: Clock,        color: "text-warning",   border: "border-warning/30",  bg: "bg-warning/10",  label: "PENDING" },
    conflict: { icon: AlertCircle,  color: "text-danger",    border: "border-danger/30",   bg: "bg-danger/10",   label: "CONFLICT" },
  };

  const totalPending = syncItems.reduce((a, b) => a + b.pending, 0);

  return (
    <div className="animate-slide-page space-y-6 max-w-2xl">
      <div>
        <div className="label-caps text-muted-foreground mb-1">MODULE 06</div>
        <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
          SYNC STATUS
        </h1>
        <div className="mt-2 h-px w-64 bg-gradient-to-r from-muted-foreground/40 to-transparent" />
      </div>

      {/* Status overview */}
      <div className="panel p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="label-caps text-muted-foreground mb-1">LAST SYNCHRONISATION</div>
            <div className="font-data text-foreground">
              {new Date(lastSync).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium" }).toUpperCase()}
            </div>
          </div>
          <div className="text-right">
            <div className="label-caps text-muted-foreground mb-1">PENDING ITEMS</div>
            <div className={`font-data font-bold text-2xl ${totalPending > 0 ? "text-warning" : "text-primary"}`}>
              {totalPending}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="label-caps text-muted-foreground">
              {syncing ? "SYNCHRONISING..." : progress >= 100 ? "SYNC COMPLETE" : "DATA INTEGRITY"}
            </span>
            <span className="font-data text-sm text-primary">{Math.round(Math.min(progress, 100))}%</span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${syncing ? "bg-warning" : "bg-primary"}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Sync button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-sm
            font-heading font-bold text-base tracking-[0.2em] uppercase transition-all duration-300
            ${syncing
              ? "bg-warning/20 border border-warning/40 text-warning cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary-glow glow-green hover:scale-[1.01] active:scale-[0.99]"
            }`}
        >
          <RefreshCw className={`w-5 h-5 ${syncing ? "animate-spin-slow" : ""}`} />
          {syncing ? "SYNCHRONISING DATA..." : "INITIATE SYNC"}
        </button>
      </div>

      {/* Data items */}
      <div className="space-y-3">
        <div className="label-caps text-muted-foreground mb-4">DATA MODULES</div>
        {syncItems.map((item, i) => {
          const cfg = statusCfg[item.status as keyof typeof statusCfg];
          return (
            <div
              key={item.label}
              style={{ animationDelay: `${i * 0.07}s` }}
              className={`panel border ${cfg.border} p-4 flex items-center justify-between animate-fade-in-up`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-sm ${cfg.bg} border ${cfg.border} flex items-center justify-center`}>
                  <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm tracking-widest uppercase text-foreground">
                    {item.label}
                  </div>
                  <div className="label-caps text-muted-foreground mt-0.5">{item.size}</div>
                </div>
              </div>

              <div className="text-right">
                <div className={`label-caps ${cfg.color}`}>{cfg.label}</div>
                {item.pending > 0 && (
                  <div className="font-data text-xs text-warning mt-0.5">
                    {item.pending} pending
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel p-4 border-dashed border-border">
        <p className="label-caps text-muted-foreground/40 text-center text-[10px] tracking-[0.2em]">
          OFFLINE DATA STORED LOCALLY — WILL SYNC WHEN CONNECTIVITY RESTORED
        </p>
      </div>
    </div>
  );
}
