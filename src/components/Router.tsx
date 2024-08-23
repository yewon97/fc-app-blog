import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import LoginPage from "@/pages/login";
import PostListPage from "@/pages/posts";
import PostDetailPage from "@/pages/posts/detail";
import PostEdit from "@/pages/posts/edit";
import PostNew from "@/pages/posts/new";
import ProfilePage from "@/pages/profile";
import SignupPage from "@/pages/signup";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
