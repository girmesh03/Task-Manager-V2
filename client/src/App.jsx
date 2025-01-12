import { BrowserRouter, Routes, Route } from "react-router";

import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";

import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import VerifyEmailPage from "./pages/VerifyEmail";
import LoginPage from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/Tasks";
import TaskDetailPage from "./pages/TaskDetails";
import TeamPage from "./pages/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="signup" element={<SignupPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="reset-password/:resetToken"
              element={<ResetPasswordPage />}
            />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/:id" element={<TaskDetailPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
