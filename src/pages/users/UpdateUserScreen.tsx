import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormHeader from "@/components/forms/FormHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { getSingleUser, updateUser } from "@/store/userSlice/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./component/UserForm";
import { resetUserStore } from "@/store/userSlice";
import { objectDifference } from "@/utils";
const UpdateUserScreen = () => {
  const { id = "" } = useParams();
  const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
  const userStore = useAppSelector("users");
  const userDispatch = useAppDispatch();

  useEffect(() => {
    userDispatch(getSingleUser(id));
    return () => {
      userDispatch(resetUserStore());
    };
  }, [id]);

  const handleSubmit = async () => {
    userDispatch(updateUser({ updatedFields, userId: id }));
  };
  useEffect(() => {
    const difference = objectDifference(
      userStore.editingUser,
      userStore.editing
    );
    setUpdatedFields(difference);
  }, [userStore.editingUser]);

  return (
    <div>
      <DashboardLayout pageTitle="Create User">
        <Container className="border">
          <FormHeader
            description="Basic information about the user"
            title="User data"
          />
          <UserForm
            type="update"
            defaultFormValues={userStore.editingUser}
            handleSubmit={handleSubmit}
            disableButton={
              !Boolean(Object.keys(updatedFields).length) || userStore.isLoading
            }
            loading={userStore.isLoading}
          />
        </Container>
      </DashboardLayout>
    </div>
  );
};

export default UpdateUserScreen;
