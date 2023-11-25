import Login from "@/pages/auth/LoginScreen";
import VerifyAccount from "@/pages/auth/VerifyAccount";
import Dashboard from "@/pages/dashboard";
import { RoutesProps } from "./interface";

export const AUTH_ROUTES: RoutesProps[] = [
  {
    url: "/verify/email",
    requireAuth: false,
    component: VerifyAccount,
  },
  {
    url: "/",
    requireAuth: true,
    component: Dashboard,
  },
  {
    url: "/auth/login",
    requireAuth: false,
    component: Login,
  },
];
