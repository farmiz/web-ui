import { useAppSelector } from "@/hooks/useStoreActions";
import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "@/utils/permissions";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  permission: [PermissionString, PermissionOperation];
}
const RequireAuth: React.FC<RequireAuthProps> = ({ permission }) => {
  const auth = useAppSelector("auth");
  const location = useLocation();
  const permissionVerified = hasPermission(
    String(auth?.userDetails?.permission?.access),
    permission
  );
  if (permissionVerified || auth.userDetails?.role === "admin") {
    return <Outlet />;
  } else if (auth.userDetails?.role && !permissionVerified) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

// https://echarts.apache.org/en/index.html
