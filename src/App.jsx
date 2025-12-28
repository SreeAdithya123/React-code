import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Compare from "./pages/Compare";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Evaluation from "./pages/Evaluation";
import FAQ from "./pages/FAQ";
import History from "./pages/History";
import InterviewPlayer from "./pages/InterviewPlayer";
import InterviewRoom from "./pages/InterviewRoom";
import Landing from "./pages/Landing";
import LiveInterview from "./pages/LiveInterview";
import Login from "./pages/Login";
import NewMock from "./pages/NewMock";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import TranscriptProcessing from "./pages/TranscriptProcessing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/React-code">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-mock" element={<NewMock />} />
          <Route path="/interview/:id/room" element={<InterviewRoom />} />
          <Route path="/interview/:id/live" element={<LiveInterview />} />
          <Route path="/interview/:id/device-test" element={<InterviewRoom />} />
          <Route path="/interview/:id/processing" element={<TranscriptProcessing />} />
          <Route path="/interview/:id/player" element={<InterviewPlayer />} />
          <Route path="/interview/:id/evaluation" element={<Evaluation />} />
          <Route path="/history" element={<History />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/error/mic" element={<ErrorPage type="mic" />} />
          <Route path="/error/recording" element={<ErrorPage type="recording" />} />
          <Route path="/error/network" element={<ErrorPage type="network" />} />
          <Route path="*" element={<ErrorPage type="404" />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
