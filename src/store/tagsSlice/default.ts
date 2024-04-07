import { initialRequestState } from "@/defaults";
import { TagPayloadProps } from "./types";
export const initialState: TagPayloadProps = {
  editing: { name: "" },
  editingTag: { name: "" },
  paginator: {
    page: 1,
    perPage: 30,
    totalDocuments: 0,
    totalPages: 0,
  },
  tags: [],
  ...initialRequestState,
};
