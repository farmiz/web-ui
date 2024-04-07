import TagsScreen from "@/pages/tags/TagsListScreen";
import { RoutesProps } from "./interface";
import CreateTagScreen from "@/pages/tags/CreateTagScreen";
import UpdateTagScreen from "@/pages/tags/UpdateTagScreen";

export const TAGS_ROUTES: RoutesProps[] = [
  {
    url: "/tags",
    requireAuth: true,
    component: TagsScreen,
    permission: ["tags", "read"],
  },
  {
    url: "/tags/create",
    requireAuth: true,
    component: CreateTagScreen,
    permission: ["tags", "create"],
  },
  {
    url: "/tags/:id",
    requireAuth: true,
    component: UpdateTagScreen,
    permission: ["tags", "update"],
  },
];
