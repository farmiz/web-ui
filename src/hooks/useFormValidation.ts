import { z } from "zod";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFormValidation = <T extends z.ZodType<any, any, any>>(
  validation: T,
  defaultValues:DefaultValues<z.TypeOf<T>>
) => {
  type FormSchemaType = z.infer<typeof validation>;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue
  } = useForm<FormSchemaType>({
    resolver: zodResolver(validation),
    defaultValues,
    
  });

  return { errors, isSubmitting, register, handleSubmit, control, setValue};
};
