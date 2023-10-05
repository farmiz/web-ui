import React from "react";
import { UserRole } from "../interfaces/users";
import VerifyAccount from "../pages/auth/VerifyAccount";

export interface RoutesProps {
  url: string;
  permission?: [];
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  meta?: Record<string, string>;
  component: React.FC
}
export const routes: RoutesProps[] = [
  {
    url: "/verify/email",
    requireAuth: false,
    component: VerifyAccount
  },
//   {
//     url: "/auth/login",
//     requireAuth: false,
//   },
//   {
//     url: "/auth/register",
//     requireAuth: false,
//   },
];
