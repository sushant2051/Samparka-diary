import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";
import NotePage from "./pages/NotePage";
import ReminderPage from "./pages/ReminderPage";
import EmergencyPage from "./pages/EmergencyPage";
import SettingPage from "./pages/SettingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogsPage from "./pages/LogsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/reminder" element={<ReminderPage />} />
          <Route path="/notes" element={<NotePage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
