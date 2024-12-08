import { useAuth } from "../store/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
