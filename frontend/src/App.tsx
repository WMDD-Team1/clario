import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './api/auth/PrivateRoute';
import { Dashboard } from '@pages/dashboard/Dashboard';
import { Landing } from './pages/Landing';
import { IncomeExpenses } from '@pages/IncomeExpenses';
import { Faq } from '@pages/Faq';
import MyWork from '@pages/MyWork';
import Logout from '@pages/Logout';
import FinancialDashboard from '@pages/FinancialDashboard';
import Settings from '@pages/Settings';
import ProjectDetails from '@pages/ProjectDetails';
import Contract from '@pages/Contract';

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
        path="/transactions"
        element={
          <PrivateRoute>
            <IncomeExpenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <MyWork />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <PrivateRoute>
            <ProjectDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/projects/:projectId/contract/"
        element={
          <PrivateRoute>
            <Contract />
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
        path="/faq"
        element={
          <PrivateRoute>
            <Faq/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
