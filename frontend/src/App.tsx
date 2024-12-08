import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./store/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
