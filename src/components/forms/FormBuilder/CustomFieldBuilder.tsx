import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputProps } from "@/interfaces/form";
import { Controller, UseFormRegister } from "react-hook-form";
import { TypeOf, ZodType } from "zod";
import SelectField from "../SelectField";
interface CustomFieldBuilderProps<T extends ZodType<any, any, any>> {
  input: InputProps;
  register: UseFormRegister<TypeOf<T>>;
  className?: string;
  control: any;
}
function CustomFieldBuilder<T extends ZodType<any, any, any>>({
  input,
  register,
  className,
  control,
}: CustomFieldBuilderProps<T>) {

  switch (input.type) {
    case "text":
    case "password":
    case "email":
    case "color":
    case "number":
    case "date":
      return (
        <Input
          {...register(input.fieldKey as TypeOf<T>)}
          type={input.type}
          id={input.id}
          className={className}
        />
      );
    case "textarea":
      return (
        <Textarea
          className={`${className}`}
          {...register(input.fieldKey as TypeOf<T>)}
        />
      );
    case "search-select":
      return (
        <Controller
          control={control}
          name={input.fieldKey}
          render={({ field: { onChange, onBlur, value } }) => (
            <SelectField
              isSearchable={true}
              options={input.options}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />
      );
    case "select":
      return (
        <Controller
          control={control}
          name={input.fieldKey}
          render={({ field: { onChange, onBlur, value } }) => (
            <SelectField
              isSearchable={false}
              options={input.options}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />
      );
    case "multi-select":
      return (
        <Controller
          control={control}
          name={input.fieldKey}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <SelectField
                isSearchable={false}
                options={input.options}
                isMulti
                closeMenuOnSelect={false}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            );
          }}
        />
      );
  }
}

export default CustomFieldBuilder;
