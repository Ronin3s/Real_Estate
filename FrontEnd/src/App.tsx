import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";
import Deals from "./pages/Deals";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import { AppLayout } from "./layouts/AppLayout";
import RoiDealsPage from "./pages/Roi";
import ClassifierPage from "./pages/Classifier";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/roi" element={<RoiDealsPage />} />
                    <Route path="/classifier" element={<ClassifierPage />} />
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppLayout>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
