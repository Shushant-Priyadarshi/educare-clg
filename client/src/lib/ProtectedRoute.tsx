import { Navigate } from "react-router-dom";
import { useAuth } from "../store/userStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, fetchProfile } = useAuth();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
