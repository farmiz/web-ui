import { DiscoveryProps } from "@/store/discoverySlice/types";
import {
  AddressProps,
  IDefaultPlugin,
  PhoneProps,
  RequestStateProps,
} from "../interfaces";
import { UserProps } from "../store/userSlice/types";

const defaultPlugin: IDefaultPlugin = {
  _id: "",
  createdAt: new Date(),
  updatedBy: "",
  updatedAt: new Date(),
  deleted: false,
  deletedAt: new Date(),
  deletedBy: "",
  createdBy: "",
};

const address: AddressProps = {
  houseNumber: "",
  zipCode: "",
  country: "",
  city: "",
  street: "",
  state: "",
};

const phone: PhoneProps = {
  prefix: "",
  number: "",
  country: "",
};

export const initialRequestState: RequestStateProps = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const userDefault = (): UserProps => ({
  id: "",
  email: "",
  phone: phone,
  username: "",
  password: "",
  role: "customer",
  firstName: "",
  lastName: "",
  gender: "other",
  physicalAddress: address,
  mailingAddress: address,
  status: "inactive",
  deleted: false,
  isLoggedIn: false,
  dateOfBirth: new Date(),
  lastLoggedInDate: new Date(),
  permission: {
    access: "",
    userId: "",
  },
  ...defaultPlugin,
});

export const discoveryDefaults = (): DiscoveryProps => ({
  amount: 0,
  closingDate: new Date(),
  description: "",
  duration: {
    type: "day",
    value: 23,
  },
  endDate: new Date(),
  name: "",
  riskLevel: "low",
  profitPercentage: 0,
  startDate: new Date(),
  tags: [],
  id: "",
});
