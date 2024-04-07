import TransactionsListScreen from "@/pages/transactions/TransactionsListScreen";
import { RoutesProps } from "./interface";

export const TRANSACTIONS_ROUTES: RoutesProps[] = [
  {
    url: "/transactions",
    requireAuth: true,
    component: TransactionsListScreen,
    permission: ["users", "read"],
    meta: {
      breadcrumbs: [{ title: "Home", url: "/" }],
    },
  },
];
