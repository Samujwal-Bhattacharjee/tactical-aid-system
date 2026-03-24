import { useState, useEffect } from "react";
import { Bell, Battery, Wifi, WifiOff, Shield } from "lucide-react";

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      clearInterval(timer);
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  }).toUpperCase();

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-panel border-b border-border shrink-0">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="font-heading font-bold text-base tracking-[0.2em] uppercase text-foreground">
            SAHAYAK
          </span>
        </div>
        <div className="h-4 w-px bg-border mx-1" />
        <span className="label-caps text-muted-foreground">Tactical Medical Assistant</span>
      </div>

      {/* Center: Connectivity status */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-background/60 border border-border rounded-sm">
        {isOnline ? (
          <>
            <span className="status-dot-online" />
            <Wifi className="w-3.5 h-3.5 text-status-online" />
            <span className="label-caps text-status-online tracking-widest">ONLINE</span>
          </>
        ) : (
          <>
            <span className="status-dot-offline" />
            <WifiOff className="w-3.5 h-3.5 text-status-offline" />
            <span className="label-caps text-status-offline tracking-widest">OFFLINE</span>
          </>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-5">
        {/* Date */}
        <span className="font-data text-xs text-muted-foreground hidden md:block">
          {formattedDate}
        </span>

        {/* Time */}
        <span className="font-data text-sm text-foreground tracking-widest">
          {formattedTime}
        </span>

        {/* Battery indicator */}
        <div className="hidden sm:flex items-center gap-1.5">
          <Battery className="w-4 h-4 text-primary" />
          <span className="font-data text-xs text-primary">87%</span>
        </div>

        {/* Alert */}
        <button className="relative p-1.5 hover:text-warning text-muted-foreground transition-colors rounded-sm hover:bg-warning/10">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-danger border border-background" />
        </button>
      </div>
    </header>
  );
}
