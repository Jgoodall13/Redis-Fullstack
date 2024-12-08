import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
