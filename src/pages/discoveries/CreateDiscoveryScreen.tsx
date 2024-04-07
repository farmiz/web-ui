import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import SubmitButton from "@/components/forms/SubmitButton";
import {
  discoveryForm,
  discoveryValidationSchema,
} from "@/formValidations/discovery";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps, HandlerProps } from "@/interfaces/form";
import { errorToast, successToast } from "@/lib/toast";
import { resetDiscovery, updateEditingDiscovery } from "@/store/discoverySlice";
import { discoveryActions } from "@/store/discoverySlice/actions";
import { tagActions } from "@/store/tagsSlice/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDiscovery = () => {
  const discoveryStore = useAppSelector("discovery");
  const tagStore = useAppSelector("tags");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [customOptions, setCustomOptions] = useState<Record<string, any>>({});
  const handleSubmit = async () => {
    dispatch(discoveryActions.createDiscovery(discoveryStore.editingDiscovery));
  };

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };

  useEffect(() => {
    if (discoveryStore.isSuccess) {
      successToast(discoveryStore.message);
      dispatch(resetDiscovery());
      navigate("/discoveries");
    }
    if (discoveryStore.isError) {
      errorToast(discoveryStore.message);
    }
  }, [discoveryStore]);
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || discoveryStore.isLoading,
    onClick: () => handleSubmit(),
    loading: discoveryStore.isLoading,
  };
  const handleFormFieldChanged = ({ key, value }: HandlerProps) => {
    dispatch(updateEditingDiscovery({ key, value }));
  };
  useEffect(() => {
    dispatch(tagActions.fetchTags({ deleted_in: false }));
  }, []);
  useEffect(() => {
    const tags = tagStore.tags;
    const options = tags.map((tag) => ({ label: tag.name, value: tag.id }));
    setCustomOptions((prev) => ({ ...prev, tags: options }));
  }, [tagStore.tags]);
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
          formValues={discoveryStore.editingDiscovery}
          onValidationChangeHandler={handleValidationChanged}
          onFieldChangeHandler={handleFormFieldChanged}
          validationSchema={discoveryValidationSchema}
          customOptions={customOptions}
        />
        <SubmitButton formButton={formButton} />
      </Container>
    </DashboardLayout>
  );
};

export default CreateDiscovery;
