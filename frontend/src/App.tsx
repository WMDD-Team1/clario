import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './api/auth/PrivateRoute';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { IncomeExpenses } from './pages/IncomeExpenses';
import Clients from '@pages/Clients';

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
    </Routes>
  );
}

export default App;
