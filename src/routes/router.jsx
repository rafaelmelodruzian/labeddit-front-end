import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage/loginPage";
import SignUpPage from "../pages/signUpPage/signUpPage";
import PostsPage from "../pages/postsPage/postsPage";
import CommentPage from "../pages/commentsPage/commentsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/comments" element={<CommentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
