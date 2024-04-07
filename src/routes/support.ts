
import SupportScreen from "@/pages/support/SupportScreen";
import { RoutesProps } from "./interface";

export const SUPPORT_ROUTES: RoutesProps[] = [
  {
    url: "/support",
    requireAuth: true,
    component: SupportScreen,
    permission: ["users", "read"],
    meta: {
      breadcrumbs: [{ title: "Home", url: "/" }],
    },
  },
];
