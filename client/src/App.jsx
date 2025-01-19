import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { Box, CircularProgress } from "@mui/material";

// Lazy-loaded layouts
const RootLayout = lazy(() => import("./layout/RootLayout"));
const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const AppLayout = lazy(() => import("./layout/AppLayout"));

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/Signup"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmail"));
const LoginPage = lazy(() => import("./pages/Login"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TasksPage = lazy(() => import("./pages/Tasks"));
const CreateTaskPage = lazy(() => import("./pages/CreateTask"));
const TaskDetailPage = lazy(() => import("./pages/TaskDetails"));
const TeamPage = lazy(() => import("./pages/Team"));
const UpdateTaskPage = lazy(() => import("./pages/UpdateTask"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            width="100%"
            height="100dvh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={50} />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route element={<AuthLayout />}>
              <Route index element={<HomePage />} />
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
              <Route path="tasks/create" element={<CreateTaskPage />} />
              <Route path="tasks/:id" element={<TaskDetailPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="tasks/:id/update" element={<UpdateTaskPage />} />
              <Route path="categories" element={<div>categories</div>} />
              <Route path="projects" element={<div>projects</div>} />
              <Route path="reports" element={<div>reports</div>} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
