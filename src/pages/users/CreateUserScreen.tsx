import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import {
  userDefaultValues,
  userForm,
  userValidationSchema,
} from "@/formValidations/users";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps } from "@/interfaces/form";
import { errorToast, successToast } from "@/lib/toast";
import { resetUserStore } from "@/store/userSlice";
import { createUser } from "@/store/userSlice/actions";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserScreen = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const userDispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStore = useAppSelector("users");

  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || userStore.isLoading,
  };
  const handleSubmit = async (data: Record<string, any>) => {
    userDispatch(createUser(omit(data, ["confirmPassword"])));
  };

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };

  useEffect(() => {
    if (userStore.isError) {
      errorToast(userStore.message);
    } else if (userStore.isSuccess && Object.keys(userStore.editingUser).length) {
      successToast("User created successfully");
      userDispatch(resetUserStore());
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
        <FormBuilder
          schema={userForm}
          formButton={formButton}
          formValues={userDefaultValues}
          onSubmit={handleSubmit}
          validationSchema={userValidationSchema}
          onValidationChangeHandler={handleValidationChanged}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
