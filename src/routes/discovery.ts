import CreateDiscoveryScreen from "@/pages/discoveries/CreateDiscoveryScreen";
import { RoutesProps } from "./interface";
import DiscoveryListScreen from "@/pages/discoveries/DiscoveryListScreen";
import UpdateDiscoveryScreen from "@/pages/discoveries/UpdateDiscoveryScreen";

export const DISCOVERY_ROUTES: RoutesProps[] = [
  {
    url: "/discoveries",
    requireAuth: true,
    component: DiscoveryListScreen,
    permission: ["discovery", "read"],
  },
  {
    url: "/discoveries/create",
    requireAuth: true,
    component: CreateDiscoveryScreen,
    permission: ["discovery", "create"],
  },
  {
    url: "/discoveries/:id/update",
    requireAuth: true,
    component: UpdateDiscoveryScreen,
    permission: ["discovery", "update"],
  },
];
