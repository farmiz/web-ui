import { loginForm } from "@/formValidations/auth";
import FormBuilder from "./FormBuilder/FormBuilder";
import { FormButtonProps } from "@/interfaces/form";

const LoginForm = () => {
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
