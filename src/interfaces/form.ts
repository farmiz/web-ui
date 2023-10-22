import { z } from "zod";
import { Props } from "react-select";
export type IconType = React.ComponentType<{
  className?: string;
  size?: number;
}>;
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
  | "textarea"
  | "select"
  | "search-select"
  | "multi-select";
type FormBuilderInputType = HTMLInputTypeAttribute;

interface SelectFieldProps extends Props {
  options:  { label: string; value: string }[]
}
export type InputProps =
  {
    label: string;
    type: Exclude<FormBuilderInputType, "select" | "search-select" | "multi-select">;
    ref?: any;
    validation?: any;
    id?: string;
    required?: boolean;
    fieldKey: string;
  } | {
    label: string;
    type: "select" | "search-select" | "multi-select";
    ref?: any;
    validation?: any;
    id?: string;
    required?: boolean;
    fieldKey: string;
  } & SelectFieldProps;


export interface FormComponent {
  section: {
    title?: string;
    description?: string;
    className?: string;
    col:
      | "cols-1"
      | "cols-2"
      | "cols-3"
      | "cols-4"
      | "cols-5"
      | "cols-6"
      | "cols-7"
      | "cols-8"
      | "cols-9"
      | "cols-10"
      | "cols-11"
      | "cols-12";
    form: InputProps[];
  };
}
export interface FormButtonProps {
  label: string;
  className?: string;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  //   icon?: IconType;
  //   iconPosition?: "back" | "forward";
  disabled?: boolean;
}

export interface FormBuilderProps<T extends z.ZodType<any, any, any>> {
  schema: FormComponent[];
  validationSchema: T;
  onSubmit: (values: z.infer<T>) => void;
  formButton?: FormButtonProps;
}
