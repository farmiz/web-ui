import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStoreActions";
import { UserRole } from "@/store/userSlice/types";
import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "@/utils/permissions";
import { Meta } from "@/routes/interface";

interface RequireAuthProps {
  permission: [PermissionString, PermissionOperation];
  allowedRoles?: UserRole[];
  meta?: Meta;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  permission,
  allowedRoles,
  meta,
}) => {
  const auth = useAppSelector("auth");
  const location = useLocation();
  const userRole = auth?.userDetails?.role;
  const permissionVerified = hasPermission(
    String(auth?.userDetails?.permission?.access),
    permission
  );

  if (userRole === "admin" || permissionVerified) {
    if (
      !allowedRoles ||
      !allowedRoles.length ||
      allowedRoles.includes(userRole as UserRole)
    ) {
      return <Outlet context={{ meta } satisfies { meta?: Meta }} />;
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  } else if (userRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

// https://echarts.apache.org/en/index.html
