import UsersListScreen from "@/pages/users/UsersListScreen";
import { RoutesProps } from "./interface";
import CreateUserScreen from "@/pages/users/CreateUserScreen";
import UpdateUserScreen from "@/pages/users/UpdateUserScreen";

export const USER_ROUTES: RoutesProps[] = [
  {
    url: "/users",
    requireAuth: true,
    component: UsersListScreen,
    permission: ["users", "read"],
  },
  {
    url: "/users/create",
    requireAuth: true,
    component: CreateUserScreen,
    permission: ["users", "create"],
  },
  {
    url: "/users/:id/update",
    requireAuth: true,
    component: UpdateUserScreen,
    permission: ["users", "update"],
    meta: {
      breadcrumbs: [{ title: "Users List", url: "/users" }],
    },
  },
];
