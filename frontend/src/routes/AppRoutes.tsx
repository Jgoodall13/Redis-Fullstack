import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../store/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* If user is logged in, redirect from /login and /register to /dashboard */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all route for bad paths */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
