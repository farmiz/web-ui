import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFormValidation = <T extends z.ZodType<any, any, any>>(
  validation: T
) => {
  type FormSchemaType = z.infer<typeof validation>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(validation),
  });



  return { errors, isSubmitting, register, handleSubmit};
};
