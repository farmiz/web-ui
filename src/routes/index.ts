import React from "react";
import { UserRole } from "../store/userSlice/types";
import VerifyAccount from "../pages/auth/VerifyAccount";
import {
  LayoutDashboard,
  LucideCompass,
  User,
  UserCircleIcon,
  WalletIcon,
  ShieldQuestionIcon,
  SettingsIcon,
  ArrowLeftRight,
  HeartHandshake,
} from "lucide-react";
import Login from "@/pages/auth/LoginScreen";
import Dashboard from "@/pages/dashboard";
import CreateUser from "@/pages/users/CreateUserScreen";
import CreateDiscovery from "@/pages/discoveries/CreateDiscoveryScreen";
import Discovery from "@/pages/discoveries/DiscoveryListScreen";
import UsersListScreen from "@/pages/users/UsersListScreen";
import { PermissionOperation, PermissionString } from "@/utils/permissions";
import NotAuthorized from "@/pages/error/NotAuthorizedScreen";
import UpdateUserScreen from "@/pages/users/UpdateUserScreen";

export interface RoutesProps {
  url: string;
  permission?: [PermissionString, PermissionOperation];
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  meta?: Record<string, string>;
  component: React.FC;
}
export const routes: RoutesProps[] = [
  {
    url: "/users",
    requireAuth: true,
    component: UsersListScreen,
    permission: ["users", "read"]
  },
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
  {
    url: "/users/create",
    requireAuth: true,
    component: CreateUser,
    permission: ["users", "create"]

  },
  {
    url: "/users/:id",
    requireAuth: true,
    component: UpdateUserScreen,
    permission: ["users", "update"]

  },
  {
    url: "/discoveries/create",
    requireAuth: true,
    component: CreateDiscovery,
    permission: ["discovery", "create"]
  },
  {
    url: "/discoveries",
    requireAuth: true,
    component: Discovery,
    permission: ["discovery", "read"]
  },

  {
    url :"/unauthorized",
    requireAuth: false,
    component: NotAuthorized
  }
];

export const menuSidebarRoutes = {
  title: "Menu",
  routeLinks: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/users",
      icon: User,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: UserCircleIcon,
    },
    {
      title: "Discoveries",
      url: "/discoveries",
      icon: LucideCompass,
    },
    {
      title: "Wallets",
      url: "/wallets",
      icon: WalletIcon,
    },

    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Sponsorships",
      url: "/sponsorships",
      icon: HeartHandshake,
    },
  ],
};
export const generalSidebarRoutes = {
  title: "General",
  routeLinks: [
    {
      title: "Support",
      url: "/support",
      icon: ShieldQuestionIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ],
};
