import { UserRole } from "@/store/userSlice/types";
import { PermissionOperation, PermissionString } from "@/utils/permissions";

export interface Meta {
  breadcrumbs: {
    title: string;
    url?: string;
  }[];
}
export interface RoutesProps {
  url: string;
  permission?: [PermissionString, PermissionOperation];
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  meta?: Meta;
  component: React.FC;
}
