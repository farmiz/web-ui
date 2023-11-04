import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputProps } from "@/interfaces/form";
import { Controller, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TypeOf, ZodType } from "zod";
import SelectField from "../SelectField";
interface CustomFieldBuilderProps<T extends ZodType<any, any, any>> {
  input: InputProps;
  register: UseFormRegister<TypeOf<T>>;
  className?: string;
  control: any;
  setValue: UseFormSetValue<TypeOf<T>>;
}


function CustomFieldBuilder<T extends ZodType<any, any, any>>({
  input,
  register,
  className,
  control,
  setValue,
}: CustomFieldBuilderProps<T>) {
  const handleSetValue = (field: any, value: any) => {
    if (Array.isArray(value)) {
      const r: any = value.map((val) => val.value);
      setValue(field, r);
    } else {
      setValue(field, value.value);
    }
  };
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
    case "multi-select":
    case "select":
      return (
        <Controller
          control={control}
          name={input.fieldKey}
          render={() => (
            <SelectField
              isSearchable={input.type === "search-select" && true}
              options={input.options}
              isMulti={input.type === "multi-select" && true}
              onChange={(val: any) => handleSetValue(input.fieldKey, val)}
              closeMenuOnSelect={input.type === "multi-select" ? false : true}
            />
          )}
        />
      );
  }
}

export default CustomFieldBuilder;
