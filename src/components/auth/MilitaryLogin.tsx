import { useState, useRef } from "react";
import { ArrowLeft, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props { onBack: () => void; }

export default function MilitaryLogin({ onBack }: Props) {
  const navigate = useNavigate();
  const [personnelId, setPersonnelId] = useState("");
  const [passcode, setPasscode]       = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [error, setError]             = useState(false);
  const [loading, setLoading]         = useState(false);
  const [glitching, setGlitching]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personnelId || !passcode) return;

    setLoading(true);
    setError(false);

    setTimeout(() => {
      // Demo: any input triggers success
      if (personnelId.length >= 3 && passcode.length >= 4) {
        setGlitching(true);
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Scan line animation */}
      <div className="scan-overlay" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(150 40% 38% / 1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(150 40% 38% / 1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`w-full max-w-md animate-fade-in-up relative z-10 ${glitching ? "animate-glitch" : ""}`}>
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="label-caps">Back to Role Selection</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="label-caps text-primary mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary status-dot-online" />
            MILITARY SECURE TERMINAL
          </div>
          <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
            INITIATE ACCESS
          </h1>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personnel ID */}
          <div className="space-y-2">
            <label className="label-caps block">Personnel ID</label>
            <div className="relative">
              <input
                type="text"
                value={personnelId}
                onChange={e => setPersonnelId(e.target.value.toUpperCase())}
                placeholder="█ █ █-█ █ █ █-█ █"
                className={`w-full bg-panel border font-data text-sm text-foreground placeholder-muted-foreground/30
                  px-4 py-3 rounded-sm outline-none transition-all duration-200
                  focus:border-primary focus:ring-1 focus:ring-primary/30
                  ${error ? "border-danger animate-pulse" : "border-border"}`}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-data text-xs text-muted-foreground/40">
                ID
              </span>
            </div>
          </div>

          {/* Passcode */}
          <div className="space-y-2">
            <label className="label-caps block">Secure Passcode</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="• • • • • • • •"
                className={`w-full bg-panel border font-data text-sm text-foreground placeholder-muted-foreground/30
                  px-4 py-3 pr-12 rounded-sm outline-none transition-all duration-200
                  focus:border-primary focus:ring-1 focus:ring-primary/30
                  ${error ? "border-danger animate-pulse" : "border-border"}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="flex items-center gap-3 bg-danger/10 border border-danger/30 rounded-sm px-4 py-3 animate-fade-in-up">
              <AlertTriangle className="w-4 h-4 text-danger shrink-0" />
              <span className="font-data text-xs text-danger">
                ACCESS DENIED — INVALID CREDENTIALS
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || glitching}
            className={`w-full relative font-heading font-bold text-base tracking-[0.2em] uppercase
              py-4 rounded-sm transition-all duration-300 mt-2
              ${loading || glitching
                ? "bg-primary/50 text-foreground/50 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary-glow glow-green hover:scale-[1.01] active:scale-[0.99]"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                VERIFYING IDENTITY...
              </span>
            ) : glitching ? (
              <span className="text-status-online">ACCESS GRANTED</span>
            ) : (
              "INITIATE ACCESS"
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="mt-8 text-center font-data text-xs text-muted-foreground/30 tracking-widest">
          UNAUTHORIZED ACCESS IS A COURT-MARTIAL OFFENSE
        </p>
        <p className="mt-2 text-center font-data text-xs text-muted-foreground/20">
          Demo: type any ID (3+ chars) and passcode (4+ chars)
        </p>
      </div>
    </div>
  );
}
