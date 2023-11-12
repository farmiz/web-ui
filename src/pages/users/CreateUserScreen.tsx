import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import Permission from "@/components/forms/Permission";
import {
  userDefaultValues,
  userForm,
  userValidationSchema,
} from "@/formValidations/users";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps } from "@/interfaces/form";
import { errorToast, successToast } from "@/lib/toast";
import { createUser } from "@/store/userSlice/actions";
import { useEffect, useState } from "react";

const CreateUserScreen = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const userDispatch = useAppDispatch();
  const userStore = useAppSelector("users");
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || userStore.isLoading,
  };
  const handleSubmit = (data: Record<string, any>) => {
    userDispatch(createUser(data));
  };

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };
  useEffect(() => {
    if (userStore.isError) {
      errorToast(userStore.message);
    }
    if (userStore.isSuccess) {
      successToast("User created successfully");
    }
  }, [userStore.isLoading]);

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
        <Permission />
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
