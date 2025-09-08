
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PremiumPreloader } from "@/components/ui/premium-preloader";
import { Navigation } from "@/components/ui/navigation";
import Index from "./pages/Index";
import HealthScanner from "./pages/HealthScanner";
import DiagnosisChat from "./pages/DiagnosisChat";
import TalkToAI from "./pages/TalkToAI";
import MedicalReports from "./pages/MedicalReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PremiumPreloader />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/health-scanner" element={<HealthScanner />} />
          <Route path="/diagnosis-chat" element={<DiagnosisChat />} />
          <Route path="/talk-to-ai" element={<TalkToAI />} />
          <Route path="/medical-reports" element={<MedicalReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
