import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./api/auth/PrivateRoute";
import FinancialDashboard from "./pages/FinancialDashboard";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/callback"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Temporary route for development - bypasses authentication */}
      <Route path="/dev-dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/financial-dashboard" element={<FinancialDashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

  );
}

export default App;
