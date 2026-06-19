import { motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LearningProvider, useLearning } from "./context/LearningContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Learn } from "./pages/Learn";
import { SpeakPractice } from "./pages/SpeakPractice";
import { DailyChallenges } from "./pages/DailyChallenges";
import { Progress } from "./pages/Progress";
import { Certificates } from "./pages/Certificates";
import { BadgesXP } from "./pages/BadgesXP";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

const routes = [
  { id: "home", title: "Home", path: "/" },
  { id: "learn", title: "Learn", path: "/learn" },
  { id: "practice", title: "Practice", path: "/practice" },
  { id: "challenges", title: "Challenges", path: "/challenges" },
  { id: "progress", title: "Progress", path: "/progress" },
  { id: "certificates", title: "Certificates", path: "/certificates" },
  { id: "badges-xp", title: "Badges & XP", path: "/badges-xp" },
  { id: "profile", title: "Profile", path: "/profile" },
  { id: "settings", title: "Settings", path: "/settings" },
];

function AuthPages() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-700 flex items-center justify-center p-4">
      <motion.section
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </motion.section>
    </div>
  );
}

function AppPages() {
  const location = useLocation();
  const currentRoute =
    routes.find((route) => route.path === location.pathname) ?? routes[0];
  const { profile } = useLearning();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <Sidebar routes={routes} />
        <main className="flex-1 bg-white shadow-soft">
          <Header title={currentRoute.title} profile={profile} />
          <motion.section
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-6 lg:p-10"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/practice" element={<SpeakPractice />} />
              <Route path="/challenges" element={<DailyChallenges />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/badges-xp" element={<BadgesXP />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

function PageRouter() {
  const location = useLocation();
  const { token } = useAuth();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (!token && !isAuthPage) {
    return <AuthPages />;
  }

  if (isAuthPage && token) {
    return <AppPages />;
  }

  if (isAuthPage) {
    return <AuthPages />;
  }

  return <AppPages />;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LearningProvider>
          <BrowserRouter>
            <PageRouter />
          </BrowserRouter>
        </LearningProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
