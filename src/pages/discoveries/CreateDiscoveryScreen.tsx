import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import {
  discoveryDefaultValues,
  discoveryForm,
  discoveryValidationSchema,
} from "@/formValidations/discovery";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps } from "@/interfaces/form";
import { successToast } from "@/lib/toast";
import { createDiscovery } from "@/store/discoverySlice/actions";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
type FormSchemaType = z.infer<typeof discoveryValidationSchema>;

const CreateDiscovery = () => {
  const dispatch = useAppDispatch();
  const discovery = useAppSelector("discovery");
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    dispatch(createDiscovery(data));
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
          onSubmit={onSubmit}
          validationSchema={discoveryValidationSchema}
          formButton={formButton}
          formValues={discoveryDefaultValues}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateDiscovery;
