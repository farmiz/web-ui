import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormHeader from "@/components/forms/FormHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { errorToast, successToast } from "@/lib/toast";
import { createUser } from "@/store/userSlice/actions";
import { omit } from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./component/UserForm";
import { resetUserStore } from "@/store/userSlice";

const CreateUserScreen = () => {
  const userDispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStore = useAppSelector("users");
  const handleSubmit = async () => {
    userDispatch(createUser(omit(userStore.editingUser, ["confirmPassword"])));
  };
  useEffect(() => {
    if (userStore.isError) {
      errorToast(userStore.message);
    } else if (
      userStore.isSuccess &&
      Object.keys(userStore.editingUser).length
    ) {
      userDispatch(resetUserStore());
      successToast("User created successfully");
      navigate("/users");
    }
  }, [userStore.isLoading, userStore.isError, userStore.isSuccess]);

  return (
    <DashboardLayout pageTitle="Create User">
      <Container className="border">
        <FormHeader
          description="Basic information about the user"
          title="User data"
        />
        <UserForm
          type="create"
          defaultFormValues={userStore.editingUser}
          handleSubmit={handleSubmit}
          disableButton={userStore.isLoading}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
