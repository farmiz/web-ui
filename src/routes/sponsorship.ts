
import SponsorshipListScreen from "@/pages/sponsorship/SponsorshipListScreen";
import { RoutesProps } from "./interface";

export const SPONSORSHIP_ROUTES: RoutesProps[] = [
  {
    url: "/sponsorships",
    requireAuth: true,
    component: SponsorshipListScreen,
    permission: ["users", "read"],

  },
];
