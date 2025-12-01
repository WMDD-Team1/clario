import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './api/auth/PrivateRoute';
import { Dashboard } from '@pages/dashboard/Dashboard';
import { Landing } from './pages/Landing';
import { IncomeExpenses } from '@pages/IncomeExpenses';
import { Faq } from '@pages/Faq';
import MyWork from '@pages/MyWork';
import Logout from '@pages/Logout';
import Settings from '@pages/Settings';
import ProjectDetails from '@pages/ProjectDetails';
import Contract from '@pages/Contract';
import SignUpForm from '@components/forms/Auth/SignupForm';
import LoginForm from '@components/forms/Auth/LoginForm';
import LoginPage from '@pages/Login';
import OnBoarding from '@pages/OnBoarding';

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Landing />} />
      <Route element={<LoginPage />}>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Route>

      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <OnBoarding />
          </PrivateRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />

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
            <Faq />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
