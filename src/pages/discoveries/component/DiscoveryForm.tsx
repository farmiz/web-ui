import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import SubmitButton from "@/components/forms/SubmitButton";
import {
  discoveryForm,
  discoveryValidationSchema,
} from "@/formValidations/discovery";
import { FormButtonProps, HandlerProps } from "@/interfaces/form";
import { updateEditingDiscovery } from "@/store/discoverySlice";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

interface DiscoveryFormProps {
  defaultFormValues: Record<string, any>;
  handleSubmit: () => Promise<void>;
  disableButton?: boolean;
  loading?: boolean;
}

const DiscoveryForm: FC<DiscoveryFormProps> = ({
  defaultFormValues,
  handleSubmit,
  disableButton,
  loading,
}) => {
  const dispatch = useDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };
  const formButton: FormButtonProps = {
    label: "Save",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: disableButton || !formIsValid,
    onClick: () => handleSubmit(),
    loading,
  };
  const handleFormFieldChanged = ({ key, value }: HandlerProps) => {
    dispatch(updateEditingDiscovery({ key, value }));
  };
  return (
    <>
      <SubmitButton formButton={formButton} />
      <FormBuilder
        schema={discoveryForm}
        formButton={formButton}
        formValues={defaultFormValues}
        validationSchema={discoveryValidationSchema}
        onValidationChangeHandler={handleValidationChanged}
        onFieldChangeHandler={handleFormFieldChanged}
      />
    </>
  );
};

export default DiscoveryForm;
