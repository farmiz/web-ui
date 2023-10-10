import { useAppSelector } from "@/hooks/useStoreActions";
import { UserRole } from "@/interfaces/users";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  allowedRole: UserRole;
}
const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRole }) => {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { userDetails } = auth;
  return userDetails?.role === allowedRole ? (
    <Outlet />
  ) : auth && userDetails?.role !== allowedRole ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
