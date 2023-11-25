import { UserRole } from "@/store/userSlice/types";
import { PermissionOperation, PermissionString } from "@/utils/permissions";

export interface RoutesProps {
    url: string;
    permission?: [PermissionString, PermissionOperation];
    requireAuth: boolean;
    allowedRoles?: UserRole[];
    meta?: {
      breadcrumbs: {
        title: string;
        url?: string;
      }[];
    };
    component: React.FC;
  }
  