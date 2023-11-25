import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormHeader from "@/components/forms/FormHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import {
  getSingleDiscovery,
  updateDiscovery,
} from "@/store/discoverySlice/actions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiscoveryForm from "./component/DiscoveryForm";
import { objectDifference, validateFile } from "@/utils";
import { resetDiscovery } from "@/store/discoverySlice";
import FileDropzone from "@/components/forms/FileDropzone";
import { UploadedFileProps } from "@/interfaces";
import { errorToast, successToast } from "@/lib/toast";
const UpdateDiscoveryScreen = () => {
  const { id = "" } = useParams();
  const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<UploadedFileProps>({});
  const navigate = useNavigate();

  const discoveryStore = useAppSelector("discovery");
  useEffect(() => {
    dispatch(getSingleDiscovery(id));
    return () => {
      dispatch(resetDiscovery());
    };
  }, [id]);

  useEffect(() => {
    const difference = objectDifference(
      discoveryStore.discovery,
      discoveryStore.editingDiscovery
    );
    setUpdatedFields(difference);
  }, [discoveryStore.editingDiscovery]);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (validateFile(selectedFiles)) {
      formData.append("file", selectedFiles.uploadedFile as Blob);
    }
    Object.keys(updatedFields).forEach((key) => {
      if (key === "duration") {
        formData.append(
          key,
          JSON.stringify(discoveryStore.editingDiscovery[key])
        );
      } else formData.append(key, discoveryStore.editingDiscovery[key]);
    });

    dispatch(updateDiscovery({ updatedFields: formData, id }));
  };
  const handleFileChange = ({ fileURL, uploadedFile }: UploadedFileProps) => {
    setSelectedFiles({ fileURL, uploadedFile });
  };

  useEffect(() => {
    if (discoveryStore.isError) {
      errorToast(discoveryStore.message);
    } else if (discoveryStore.isSuccess) {
      successToast(discoveryStore.message);
      setSelectedFiles({});
      dispatch(resetDiscovery());
      navigate("/discoveries");
    }
  }, [discoveryStore.isError, discoveryStore.isSuccess]);
  return (
    <DashboardLayout pageTitle="Update Discovery">
      <Container className="border">
        <FormHeader
          description="Basic information about the discovery"
          title="Discovery data"
        />
        <div className="cursor-pointer h-[250px] w-full relative overflow-hidden group">
          <img
            src={
              selectedFiles.fileURL ||
              discoveryStore.discovery?.discoveryFile?.url
            }
            loading={"lazy"}
            alt="DISCOVERY"
            className="h-[200px] w-full aspect-square object-cover"
          />
          <div className="uploader absolute left-[-100%] w-full bg-white top-0 bottom-0 right-0 group-hover:left-0 transition-all">
            <FileDropzone
              onChange={handleFileChange}
              allowedFileExtensions={["jpeg", "jpg", "png"]}
            />
          </div>
        </div>
        <DiscoveryForm
          defaultFormValues={discoveryStore.editingDiscovery}
          handleSubmit={handleSubmit}
          disableButton={
            (!Boolean(Object.keys(updatedFields).length) &&
              !validateFile(selectedFiles)) ||
            discoveryStore.isLoading
          }
          loading={discoveryStore.isLoading}
        />
      </Container>
    </DashboardLayout>
  );
};

export default UpdateDiscoveryScreen;
