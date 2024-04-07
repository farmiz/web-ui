import Container from "@/components/Container";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import SubmitButton from "@/components/forms/SubmitButton";
import { tagsForm, tagsValidationSchema } from "@/formValidations/tags";
import { useAppDispatch } from "@/hooks/useStoreActions";
import { FormButtonProps, HandlerProps } from "@/interfaces/form";
import { updateEditingTag } from "@/store/tagsSlice";
import { FC, useState } from "react";

interface UserFormProps {
  defaultFormValues: Record<string, any>;
  handleSubmit: () => Promise<void>;
  disableButton?: boolean;
  loading?: boolean;
}
const TagsForm: FC<UserFormProps> = ({
  disableButton,
  handleSubmit,
  defaultFormValues,
  loading,
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

  const handleFormFieldChanged = ({ key, value }: HandlerProps) => {
    userDispatch(updateEditingTag({ key, value }));
  };
  return (
    <Container>
      <SubmitButton formButton={formButton} />
      <FormBuilder
        formValues={defaultFormValues}
        schema={tagsForm}
        validationSchema={tagsValidationSchema}
        onValidationChangeHandler={handleValidationChanged}
        onFieldChangeHandler={handleFormFieldChanged}
      />
    </Container>
  );
};

export default TagsForm;
