import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props { onBack: () => void; }

export default function CivilianLogin({ onBack }: Props) {
  const navigate = useNavigate();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(36 100% 56% / 1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(36 100% 56% / 1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-warning transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="label-caps">Back to Role Selection</span>
        </button>

        <div className="mb-8">
          <div className="label-caps text-warning mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" />
            CIVILIAN PREPAREDNESS INTERFACE
          </div>
          <h1 className="font-heading font-bold text-3xl tracking-widest uppercase text-foreground">
            ENTER SYSTEM
          </h1>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-warning/50 via-warning/20 to-transparent" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="label-caps block">Email / Phone</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="operator@domain.com"
              className="w-full bg-panel border border-border font-body text-sm text-foreground placeholder-muted-foreground/40
                px-4 py-3 rounded-sm outline-none transition-all duration-200
                focus:border-warning/60 focus:ring-1 focus:ring-warning/20"
            />
          </div>

          <div className="space-y-2">
            <label className="label-caps block">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="• • • • • • • •"
                className="w-full bg-panel border border-border font-body text-sm text-foreground placeholder-muted-foreground/40
                  px-4 py-3 pr-12 rounded-sm outline-none transition-all duration-200
                  focus:border-warning/60 focus:ring-1 focus:ring-warning/20"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-heading font-bold text-base tracking-[0.2em] uppercase
              py-4 rounded-sm transition-all duration-300
              ${loading
                ? "bg-warning/30 text-warning/50 cursor-not-allowed"
                : "bg-warning text-warning-foreground hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-4 h-4 border-2 border-warning-foreground/30 border-t-warning-foreground rounded-full animate-spin" />
                AUTHENTICATING...
              </span>
            ) : "ENTER SYSTEM"}
          </button>
        </form>

        <p className="mt-8 text-center label-caps text-muted-foreground/30 tracking-widest">
          SAHAYAK — FIRST AID PREPAREDNESS PLATFORM
        </p>
        <p className="mt-2 text-center font-data text-xs text-muted-foreground/20">
          Demo: click Enter System to proceed
        </p>
      </div>
    </div>
  );
}
