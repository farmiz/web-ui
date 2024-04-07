import { initialRequestState } from "@/defaults";
import { InitPayloadProps } from "./types";
export const initialState: InitPayloadProps = {
    customerOverview: {
      totalActiveUsers: 0,
      totalInactiveUsers: 0,
      customers: [],
    },
    ...initialRequestState
  };
  