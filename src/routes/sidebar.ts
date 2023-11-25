import {
  ArrowLeftRight,
  HeartHandshake,
  LayoutDashboard,
  LucideCompass,
  SettingsIcon,
  ShieldQuestionIcon,
  User,
  UserCircleIcon,
  WalletIcon,
} from "lucide-react";

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
