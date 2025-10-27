import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./api/auth/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { IncomeExpenses } from "@pages/IncomeExpenses";
import MyWork from "@pages/MyWork";
import Logout from "@pages/Logout";
import FinancialDashboard from "@pages/FinancialDashboard";
import Settings from "@pages/Settings";
import Clients from "@pages/Clients";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Landing />} />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />

      {/* Auth routes */}
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

      <Route
        path="/income&expenses"
        element={
          <PrivateRoute>
            <IncomeExpenses />
          </PrivateRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-work"
        element={
          <PrivateRoute>
            <MyWork />
          </PrivateRoute>
        }
      />
      <Route
        path="/financial-dashboard"
        element={
          <PrivateRoute>
            <FinancialDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      {/* Dev-only shortcut */}
      <Route path="/dev-dashboard" element={<Dashboard />} />
      <Route path="/fin-dashboard" element={<FinancialDashboard />} />
      <Route path="/ts-settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
