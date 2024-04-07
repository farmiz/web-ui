import { ReactNode } from "react";
import { TABS } from "../constants";
import Transactions from "@/components/shared/Transactions";
import Sponsorship from "@/components/shared/Sponsorship";
import Wallet from "@/components/shared/Wallet";
import Activities from "@/components/shared/Activities";
import Settings from "@/components/shared/Settings";

const CustomerProfileView = ({ tab }: { tab: TABS }) => {
  let content: ReactNode;

  switch (tab) {
    case "summary":
      content = <h1>Summary page</h1>;
      break;
    case "details":
      content = <h1>Details page</h1>;
      break;
    case "transactions":
      content = <Transactions />;
      break;
    case "sponsorships":
      content = <Sponsorship />;
      break;
    case "wallets":
      content = <Wallet />;
      break;
    case "settings":
      content = <Settings />;
      break;
    case "activities":
      content = <Activities />;
      break;
    default:
      content = null;
      break;
  }
  return <div>{content}</div>;
};

export default CustomerProfileView;
