import { Meta } from "@/routes/interface";
import { useOutletContext } from "react-router-dom";

export function useMeta() {
  return useOutletContext<{ meta?: Meta }>();
}
