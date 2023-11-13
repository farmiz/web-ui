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
import { createUser } from "@/store/userSlice/actions";
import { omit } from "lodash";
import { useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";

const CreateUserScreen = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const userDispatch = useAppDispatch();
  const userStore = useAppSelector("users");
  // const navigate = useNavigate();
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || userStore.isLoading,
  };
  const handleSubmit = async (data: Record<string, any>) => {
    const r = await userDispatch(createUser(omit(data, ["confirmPassword"])));
    console.log(r);
  };

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };

  useEffect(() => {
    if (userStore.isError) {
      errorToast(userStore.message);
    } else if (userStore.isSuccess) {
      successToast("User created successfully");
      // navigate("/users");
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
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
