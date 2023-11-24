import { MouseEventHandler } from "react";
import { UserRole } from "@/store/userSlice/types";

export interface IDefaultPlugin {
  _id?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deleted?: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  createdBy?: string;
}

export interface PhoneProps {
  prefix: string;
  number: string;
  country?: string;
}

export interface AddressProps {
  houseNumber?: string;
  zipCode?: string;
  country: string;
  city: string;
  street: string;
  state: string;
}

export interface RequestStateProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

export interface AuthProps {
  email: string;
  password: string;
  role: UserRole;
  username: string;
  firstName: string;
  LastName: string;
  phone: PhoneProps;
  dateOfBirthday: Date;
}

export interface ActionButtonProps {
  createButton?: {
    name: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}

export interface ModalActionButtonProps {
  title: string;
  className?: string;
  action: () => void;
  loading?: boolean;
  type: "cancel" | "action";
}

export interface UploadedFileProps {
  uploadedFile?: File;
  fileURL?: string;
}

export interface OptionsProps {
  label: string;
  value: string;
};
