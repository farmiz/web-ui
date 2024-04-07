import CustomersListScreen from "@/pages/customers/CustomersListScreen";
import { RoutesProps } from "./interface";
import CreateCustomerScreen from "@/pages/customers/CreateCustomerScreen";
import CustomerProfileScreen from "@/pages/customers/CustomerProfileScreen";

export const CUSTOMERS_ROUTES: RoutesProps[] = [
  {
    component: CustomersListScreen,
    requireAuth: true,
    url: "/customers",
    allowedRoles: ["admin"],
    permission: ["users", "read"],
  },
  {
    component: CreateCustomerScreen,
    requireAuth: true,
    url: "/customers/create",
    allowedRoles: ["admin"],
    permission: ["users", "create"],
  },
  {
    component: CustomerProfileScreen,
    requireAuth: true,
    url: "/customers/:id",
    allowedRoles: ["admin"],
    permission: ["users", "update"],
    meta: {
      breadcrumbs: [
        { title: "Customers", url: "/customers" },
        { title: "Customer Profile" },
      ],
    },
  },
];
