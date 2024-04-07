import { RoutesProps } from "./interface";
import ProductListScreen from "@/pages/products/ProductListScreen";

export const PRODUCTS_ROUTES: RoutesProps[] = [
  {
    url: "/products",
    requireAuth: true,
    component: ProductListScreen,
    permission: ["products", "read"],

  },
];
