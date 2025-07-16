import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
// import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AppKitProvider } from "./lib/web3Provider";
import DemoPortfolio from "./pages/DemoPortfolio";
import Navigation from "./components/Navigation";

const App = () => (
  <AppKitProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/demo" element={<DemoPortfolio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AppKitProvider>
);

export default App;
