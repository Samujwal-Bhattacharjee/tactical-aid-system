import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  BookOpen,
  Wrench,
  AlertOctagon,
  FileText,
  RefreshCw,
  Settings,
  ChevronRight,
  ChevronLeft,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "INJURY DETECT",    icon: Activity,      path: "/dashboard/injury",     color: "text-danger" },
  { label: "TREATMENT",        icon: BookOpen,       path: "/dashboard/treatment",  color: "text-primary" },
  { label: "IMPROVISE",        icon: Wrench,         path: "/dashboard/resources",  color: "text-warning" },
  { label: "EMERGENCY",        icon: AlertOctagon,   path: "/dashboard/emergency",  color: "text-danger" },
  { label: "CASUALTY LOG",     icon: FileText,       path: "/dashboard/log",        color: "text-muted-foreground" },
  { label: "SYNC STATUS",      icon: RefreshCw,      path: "/dashboard/sync",       color: "text-muted-foreground" },
  { label: "SETTINGS",         icon: Settings,       path: "/dashboard/settings",   color: "text-muted-foreground" },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-full bg-sidebar border-r border-sidebar-border
        transition-all duration-300 ease-in-out shrink-0
        ${collapsed ? "w-[72px]" : "w-[240px]"}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border
        ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center glow-green shrink-0">
          <Shield className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <span className="font-heading font-bold text-lg tracking-widest text-foreground uppercase animate-fade-in-right">
            SAHAYAK
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto tactical-scroll">
        <div className="px-2 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-3 rounded-sm transition-all duration-200
                hover:bg-sidebar-accent
                ${isActive
                  ? "bg-sidebar-accent text-foreground"
                  : "text-sidebar-foreground hover:text-foreground"
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="sidebar-active-bar" />}
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? item.color : "text-sidebar-foreground group-hover:text-foreground"}`} />
                  {!collapsed && (
                    <span className="font-heading font-semibold text-sm tracking-widest uppercase animate-fade-in-right">
                      {item.label}
                    </span>
                  )}
                  {/* Tooltip on collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-popover border border-border rounded-sm
                      whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                      <span className="label-caps text-foreground">{item.label}</span>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(v => !v)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm
            bg-sidebar-accent/50 hover:bg-sidebar-accent text-sidebar-foreground hover:text-foreground
            transition-all duration-200 ${collapsed ? "" : "px-3"}`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="label-caps text-xs">COLLAPSE</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
