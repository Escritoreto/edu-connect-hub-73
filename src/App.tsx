import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Scholarships from "./pages/ScholarshipsNew";
import Courses from "./pages/CoursesNew";
import CVBuilder from "./pages/CVBuilder";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import PublicationDetail from "./pages/PublicationDetail";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Universities from "./pages/Universities";
import MotivationLetter from "./pages/MotivationLetter";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectNew from "./pages/ProjectNew";
import MyProjects from "./pages/MyProjects";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { ChatWidget } from "./components/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cv-builder" element={<CVBuilder />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/publication/:id" element={<PublicationDetail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/motivation-letter" element={<MotivationLetter />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectNew />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/my-projects" element={<MyProjects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
