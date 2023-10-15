import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputProps } from "@/interfaces/form";
import { UseFormRegister } from "react-hook-form";
import { TypeOf, ZodType } from "zod";

interface CustomFieldBuilderProps<T extends ZodType<any, any, any>> {
  input: InputProps;
  register: UseFormRegister<TypeOf<T>>;
  className?: string;
}
function CustomFieldBuilder<T extends ZodType<any, any, any>>({
  input,
  register,
  className,
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
  }
}

export default CustomFieldBuilder;
