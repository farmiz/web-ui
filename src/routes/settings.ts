
import { RoutesProps } from "./interface";
import SettingsScreen from "@/pages/settings/SettingsScreen";

export const SETTINGS_ROUTES: RoutesProps[] = [
  {
    url: "/settings",
    requireAuth: true,
    component: SettingsScreen,
    permission: ["users", "read"],
  },
];
