import { AddressProps, IDefaultPlugin, PhoneProps } from "@/interfaces";

export type UserRole = "admin" | "support" | "customer";

export const userRoles: UserRole[] = ["admin", "support", "customer"];
export type Gender = "male" | "female" | "non-binary" | "other";
export const genders: Gender[] = ["female", "male", "non-binary", "other"];
export type UserStatus =
  | "active"
  | "suspended"
  | "pendingApproval"
  | "inactive";
export const userStatuses: UserStatus[] = [
  "active",
  "suspended",
  "pendingApproval",
  "inactive",
];
export interface UserProps extends IDefaultPlugin {
  id?: string;
  email?: string;
  phone?: PhoneProps;
  username?: string;
  password?: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  physicalAddress?: AddressProps;
  mailingAddress?: AddressProps;
  status: UserStatus | null;
  deleted?: boolean;
  isLoggedIn?: boolean;
  dateOfBirth?: Date | null;
  lastLoggedInDate?: Date;
  permission?: {
    access: string;
    userId: string;
  } | null;
  userPermission: {
    [key in string]: string;
  };
}
