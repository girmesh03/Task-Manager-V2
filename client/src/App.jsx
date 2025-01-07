import { BrowserRouter, Routes, Route } from "react-router";

import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/Tasks";
import TaskDetailPage from "./pages/TaskDetails";
import TeamPage from "./pages/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
