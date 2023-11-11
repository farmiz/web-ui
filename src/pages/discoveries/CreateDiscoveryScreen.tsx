import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import {
  discoveryDefaultValues,
  discoveryForm,
} from "@/formValidations/discovery";
import { useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps } from "@/interfaces/form";
import { successToast } from "@/lib/toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDiscovery = () => {
  const discovery = useAppSelector("discovery");
  const navigate = useNavigate();
  const [formValidation, setFormValidation] = useState <Record<string, any>>();
  const handleSubmit = (data: Record<string, any>) => {
    console.log(data);
  };

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormValidation(validation)
    console.log(validation)
  };

  useEffect(() => {
    if (discovery.isSuccess) {
      successToast(discovery.message);
      navigate("/discoveries");
    }
  }, [discovery]);
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: formValidation && formValidation.formIsValid
  };

  return (
    <DashboardLayout pageTitle="Create Discovery">
      <Container className="border">
        <FormHeader
          description="Basic information about the discovery"
          title="Discovery data"
        />
        <FormBuilder
          schema={discoveryForm}
          formButton={formButton}
          formValues={discoveryDefaultValues}
          onSubmit={handleSubmit}
          onValidationChangeHandler={handleValidationChanged}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateDiscovery;
