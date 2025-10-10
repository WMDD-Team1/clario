import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./api/auth/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";

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
    </Routes>
    
  );
}

export default App;
