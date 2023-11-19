import { loginForm } from "@/formValidations/auth";
import FormBuilder from "./FormBuilder/FormBuilder";
import { FormButtonProps } from "@/interfaces/form";
import { z } from "zod";

interface LoginFormProps<T extends z.ZodType<any, any, any> = any> {
  onSubmit: (values: z.infer<T>) => void;
}
const LoginForm: React.FC<LoginFormProps> = () => {
  const formButton: FormButtonProps = {
    label: "Login",
    position: "bottom-center",
  };
  return (
    <div>
      <FormBuilder
        schema={loginForm}
        formButton={formButton}
        formValues={{ email: "", password: "" }}
      />
    </div>
  );
};

export default LoginForm;
