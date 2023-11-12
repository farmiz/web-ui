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
  | "select";
type FormBuilderInputType = HTMLInputTypeAttribute;

// interface SelectFieldProps extends Props {
//   options:  { label: string; value: string }[]
// }

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
    form: SpecificFormFieldProps[];
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
export interface HandlerProps {
  key: string;
  value: string;
}
export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    isEnum?: boolean;
    enumValues?: any[]; // Replace 'any' with the actual type of your enum values
    minValue?: number;
    maxValue?: number;
    maxLength?: number;
    sameAs?: string;
    isEmail?: boolean;
    isPassword?: boolean;
    customValidation?: (
      value: any
    ) => boolean | { isValid: boolean; errorMessage?: string };
  };
}
export interface FormBuilderProps {
  schema: FormComponent[];
  formButton?: FormButtonProps;
  formValues: Record<string, any>;
  onFieldChangeHandler?: (data?: HandlerProps) => void;
  onFieldBlurHandler?: (data?: HandlerProps) => void;
  onValidationChangeHandler?: (validation: Record<string, any>) => void;
  resetForm?: boolean;
  onSubmit: (data: Record<string, any>) => void;
  validationSchema?: ValidationSchema;
}

export interface FormIconProps {
  name: string;
  position: string;
  className?: string;
  size?: string;
}

export interface FormFieldProps {
  type: FormBuilderInputType;
  fieldKey: string;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  icon?: FormIconProps;
  id?: string;
  placeholder?: string;
  attrs?: Record<string, any>;
  className?: string;
  disabled?: boolean;
  defaultValue?: any;
}

interface SelectFieldProps extends Omit<FormFieldProps, "type"> {
  type: "select";
  options: { label: string; value: string }[];
  isClearable?: boolean;
  isSearchable?: boolean;
  isMultiSelect?: boolean;
}
interface DatePickerProps extends Omit<FormFieldProps, "type"> {
  type: "date";
  formatDate?: (date: any) => string;
  disableDate: (date: any) => boolean;
}
type SpecificFormFieldProps =
  | ({
      type: Exclude<FormBuilderInputType, "select" | "date">;
    } & FormFieldProps)
  | SelectFieldProps
  | DatePickerProps;
export type FormBuilderState = Record<string, any>;
export type FormBuilderAction =
  | { type: "CHANGE_INPUT"; field: string; value: string }
  | { type: "RESET_FORM" }
  | { type: string };

export interface FormFieldComponentChangeEvent {
  target: {
    name: string;
    value: any;
  };
}
export interface FormFieldComponentProps {
  props: SpecificFormFieldProps;
  handleChange: ({ target }: FormFieldComponentChangeEvent) => void;
  handleBlur: (e: FormFieldComponentChangeEvent) => void;
  state: FormBuilderState;
}
