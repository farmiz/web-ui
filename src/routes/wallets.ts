import WalletListScreen from "@/pages/wallet/WalletListScreen";
import { RoutesProps } from "./interface";

export const WALLET_ROUTES: RoutesProps[] = [
  {
    url: "/wallets",
    requireAuth: true,
    component: WalletListScreen,
    permission: ["users", "read"],
  },
];
