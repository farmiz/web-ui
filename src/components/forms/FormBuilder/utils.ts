import { Input } from "@/components/ui/input";
import { FormButtonProps } from "@/interfaces/form";
import React from "react";

export const defineButtonPosition: {
  [k in FormButtonProps["position"]]: string;
} = {
  "top-right": "justify-end",
  "top-center": "justify-center",
  "top-left": "justify-start",
  "bottom-center": "justify-center",
  "bottom-left": "justify-start",
  "bottom-right": "justify-end",
};

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});
type FormBuilderInputType = HTMLInputTypeAttribute;

export function getComponentToRender(type: FormBuilderInputType): React.FC {
  switch (type) {
    case "text":
    case "number":
      return Input;
    default:
      throw new Error("Unknown type");
  }
}
