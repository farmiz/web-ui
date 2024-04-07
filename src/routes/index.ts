import NotAuthorized from "@/pages/error/NotAuthorizedScreen";
import { RoutesProps } from "./interface";
import { AUTH_ROUTES } from "./auth";
import { DISCOVERY_ROUTES } from "./discovery";
import { USER_ROUTES } from "./users";
import { CUSTOMERS_ROUTES } from "./customers";
import { SETTINGS_ROUTES } from "./settings";
import { SPONSORSHIP_ROUTES } from "./sponsorship";
import { WALLET_ROUTES } from "./wallets";
import { SUPPORT_ROUTES } from "./support";
import { TRANSACTIONS_ROUTES } from "./transactions";
import { PRODUCTS_ROUTES } from "./products";
import { TAGS_ROUTES } from "./tags";

export const routes: RoutesProps[] = [
  ...AUTH_ROUTES,
  ...DISCOVERY_ROUTES,
  ...USER_ROUTES,
  ...CUSTOMERS_ROUTES,
  ...SPONSORSHIP_ROUTES,
  ...WALLET_ROUTES,
  ...SUPPORT_ROUTES,
  ...TRANSACTIONS_ROUTES,
  ...SETTINGS_ROUTES,
  ...PRODUCTS_ROUTES,
  ...TAGS_ROUTES,
  {
    url: "/unauthorized",
    requireAuth: false,
    component: NotAuthorized,
  },
];
