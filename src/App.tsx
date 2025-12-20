import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

const Home = lazy(() => import("./pages/Home"));
const Podcast = lazy(() => import("./pages/Podcast"));
const Episode = lazy(() => import("./pages/Episode"));
const LagrangeMap = lazy(() => import("./pages/LagrangeMap"));
const Chapters = lazy(() => import("./pages/Chapters"));
const ChapterDetail = lazy(() => import("./pages/ChapterDetail"));
const Laboratory = lazy(() => import("./pages/Laboratory"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL;

const LoadingFallback = () => <div aria-busy="true">Cargando…</div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/podcast/:slug" element={<Episode />} />
              <Route path="/mapa-lagrange" element={<LagrangeMap />} />
              <Route path="/capitulos" element={<Chapters />} />
              <Route path="/capitulos/:slug" element={<ChapterDetail />} />
              <Route path="/laboratorio" element={<Laboratory />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
