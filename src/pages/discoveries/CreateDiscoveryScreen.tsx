import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FileDropzone from "@/components/forms/FileDropzone";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import SubmitButton from "@/components/forms/SubmitButton";
import {
  discoveryForm,
  discoveryValidationSchema,
} from "@/formValidations/discovery";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { UploadedFileProps } from "@/interfaces";
import { FormButtonProps, HandlerProps } from "@/interfaces/form";
import { errorToast, successToast } from "@/lib/toast";
import { resetDiscovery, updateEditingDiscovery } from "@/store/discoverySlice";
import { createDiscovery } from "@/store/discoverySlice/actions";
import { validateFile } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDiscovery = () => {
  const [selectedFiles, setSelectedFiles] = useState<UploadedFileProps>({});
  const discoveryStore = useAppSelector("discovery");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFiles.uploadedFile as Blob);
    Object.keys(discoveryStore.editingDiscovery).forEach((key) => {
      if (key === "duration") {
        formData.append(
          key,
          JSON.stringify(discoveryStore.editingDiscovery[key])
        );
      } else formData.append(key, discoveryStore.editingDiscovery[key]);
    });
    dispatch(createDiscovery(formData));
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
    disabled:
      !formIsValid || !validateFile(selectedFiles) || discoveryStore.isLoading,
    onClick: () => handleSubmit(),
    loading: discoveryStore.isLoading,
  };
  const handleFileChange = ({ fileURL, uploadedFile }: UploadedFileProps) => {
    setSelectedFiles({ fileURL, uploadedFile });
  };
  const handleFormFieldChanged = ({ key, value }: HandlerProps) => {
    dispatch(updateEditingDiscovery({ key, value }));
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
          formValues={discoveryStore.editingDiscovery}
          onValidationChangeHandler={handleValidationChanged}
          onFieldChangeHandler={handleFormFieldChanged}
          validationSchema={discoveryValidationSchema}
        />
        <FileDropzone onChange={handleFileChange} showPreview={false} />
        <SubmitButton formButton={formButton} />
      </Container>
    </DashboardLayout>
  );
};

export default CreateDiscovery;
