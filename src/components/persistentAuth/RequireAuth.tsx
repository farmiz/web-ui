import { useAppSelector } from "@/hooks/useStoreActions";
import { UserRole } from "@/store/userSlice/types";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  allowedRole: UserRole;
}
const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRole }) => {
  const auth = useAppSelector("auth");
  const location = useLocation();
  if (auth.userDetails?.role === allowedRole) {
    return <Outlet />;
  } else if (auth.userDetails?.role && auth.userDetails.role !== allowedRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

// https://echarts.apache.org/en/index.html