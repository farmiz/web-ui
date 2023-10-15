import { z } from "zod";
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
  | "search-select";
type FormBuilderInputType = HTMLInputTypeAttribute;
export interface InputProps {
  label: string;
  fieldKey: string;
  type: FormBuilderInputType;
  ref?: any;
  validation?: any;
  id?: string;
  required?: boolean;
}

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
