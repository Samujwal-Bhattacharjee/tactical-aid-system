import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import InjuryClassification from "./pages/InjuryClassification";
import TreatmentProtocol from "./pages/TreatmentProtocol";
import ResourceImprovisation from "./pages/ResourceImprovisation";
import EmergencyMode from "./pages/EmergencyMode";
import CasualtyLog from "./pages/CasualtyLog";
import SyncStatus from "./pages/SyncStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="injury"    element={<InjuryClassification />} />
            <Route path="treatment" element={<TreatmentProtocol />} />
            <Route path="resources" element={<ResourceImprovisation />} />
            <Route path="emergency" element={<EmergencyMode />} />
            <Route path="log"       element={<CasualtyLog />} />
            <Route path="sync"      element={<SyncStatus />} />
            <Route path="settings"  element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
