import NotAuthorized from "@/pages/error/NotAuthorizedScreen";
import { RoutesProps } from "./interface";
import { AUTH_ROUTES } from "./auth";
import { DISCOVERY_ROUTES } from "./discovery";
import { USER_ROUTES } from "./users";

export const routes: RoutesProps[] = [
  ...AUTH_ROUTES,
  ...DISCOVERY_ROUTES,
  ...USER_ROUTES,
  {
    url: "/unauthorized",
    requireAuth: false,
    component: NotAuthorized,
  },
];
