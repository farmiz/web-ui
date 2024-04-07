import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormHeader from "@/components/forms/FormHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { discoveryActions } from "@/store/discoverySlice/actions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiscoveryForm from "./component/DiscoveryForm";
import { objectDifference } from "@/utils";
import { resetDiscovery } from "@/store/discoverySlice";
import { errorToast, successToast } from "@/lib/toast";
const UpdateDiscoveryScreen = () => {
  const { id = "" } = useParams();
  const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const discoveryStore = useAppSelector("discovery");
  useEffect(() => {
    dispatch(discoveryActions.getSingleDiscovery(id));
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
    dispatch(discoveryActions.updateDiscovery({ updatedFields, id }));
  };

  useEffect(() => {
    if (discoveryStore.isError) {
      errorToast(discoveryStore.message);
    } else if (discoveryStore.isSuccess) {
      successToast(discoveryStore.message);
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
        <DiscoveryForm
          defaultFormValues={discoveryStore.editingDiscovery}
          handleSubmit={handleSubmit}
          disableButton={
            !Boolean(Object.keys(updatedFields).length) ||
            discoveryStore.isLoading
          }
          loading={discoveryStore.isLoading}
        />
      </Container>
    </DashboardLayout>
  );
};

export default UpdateDiscoveryScreen;
