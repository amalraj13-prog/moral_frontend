import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/user/Dashboard";
import Leaderboard from "./pages/user/Leaderboard";
import StoryUpload from "./pages/admin/StoryUpload";
import StoryManage from "./pages/admin/StoryManage";
import StoryList from "./pages/user/StoryList";
import StoryView from "./pages/user/StoryView";
import QuizCreate from "./pages/admin/QuizCreate";
import QuizManage from "./pages/admin/QuizManage";
import Quiz from "./pages/user/Quiz";
import Profile from "./pages/user/Profile";
import BadgeCreate from "./pages/admin/BadgeCreate";
import BadgeManage from "./pages/admin/BadgeManage";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/story-upload" element={<StoryUpload />} />
        <Route path="/admin/story-manage" element={<StoryManage />} />
        <Route path="/stories" element={<StoryList />} />
        <Route path="/story/:id" element={<StoryView />} />
        <Route path="/admin/quiz-create" element={<QuizCreate />} />
        <Route path="/admin/quiz-manage" element={<QuizManage />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/badge-create" element={<BadgeCreate />} />
        <Route path="/admin/badge-manage" element={<BadgeManage />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

