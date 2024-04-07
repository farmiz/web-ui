import { initialRequestState } from "@/defaults";
import { RequestStateProps } from "@/interfaces";

export interface TransactionFetchProps extends RequestStateProps {
  transaction: Record<string, any>;
  transactions: Record<string, any>[];
  paginator: {
    page: number;
    perPage: number;
    totalPages: number;
    totalDocuments: number;
  };
}
export const initialState: TransactionFetchProps = {
  transactions: [],
  transaction: {},
  ...initialRequestState,
  paginator: { page: 1, perPage: 30, totalPages: 0, totalDocuments: 0 },
};
