import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import SubmitButton from "@/components/forms/SubmitButton";
import { userForm, userValidationSchema } from "@/formValidations/users";
import { useAppDispatch } from "@/hooks/useStoreActions";
import { FormButtonProps, HandlerProps } from "@/interfaces/form";
import { updateEditingUser } from "@/store/userSlice";
import { FC, useState } from "react";

interface UserFormProps {
  type: "create" | "update";
  defaultFormValues: Record<string, any>;
  handleSubmit: () => Promise<void>;
  disableButton?: boolean;
  loading?: boolean;
  fieldsToOmit?: string[];
}
const UserForm: FC<UserFormProps> = ({
  type,
  disableButton,
  handleSubmit,
  defaultFormValues,
  loading,
  fieldsToOmit,
}) => {
  const userDispatch = useAppDispatch();
  const [formIsValid, setFormIsValid] = useState(false);

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };

  const formButton: FormButtonProps = {
    label: "Save",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || disableButton,
    onClick: () => handleSubmit(),
    loading,
  };

  const formToUse =
    type === "create"
      ? userForm()
      : type === "update"
      ? userForm(fieldsToOmit || ["password", "confirmPassword"])
      : null;
  const handleFormFieldChanged = ({ key, value }: HandlerProps) => {
    userDispatch(updateEditingUser({ key, value }));
  };
  return (
    <>
      <SubmitButton formButton={formButton} />
      <FormBuilder
        schema={formToUse}
        formButton={formButton}
        formValues={defaultFormValues}
        validationSchema={userValidationSchema}
        onValidationChangeHandler={handleValidationChanged}
        onFieldChangeHandler={handleFormFieldChanged}
      />
    </>
  );
};

export default UserForm;
