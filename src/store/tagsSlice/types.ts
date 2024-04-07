import { RequestStateProps } from "@/interfaces";

export interface TagsProps {
  name: string;
  id?: string;
}
export interface TagPayloadProps extends RequestStateProps {
  editingTag: { [key: string]: string };
  editing: TagsProps;
  tags: TagsProps[];
  paginator: {
    page: number;
    perPage: number;
    totalPages: number;
    totalDocuments: number;
  };
}
