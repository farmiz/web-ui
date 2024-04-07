import { RequestStateProps } from "@/interfaces";
import { UserProps } from "../userSlice/types";

export interface InitPayloadProps extends RequestStateProps {
    customerOverview: {
      totalActiveUsers: number;
      totalInactiveUsers: number;
      customers: UserProps[];
    };
  }