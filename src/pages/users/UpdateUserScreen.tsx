import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import { userForm, userValidationSchema } from "@/formValidations/users";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { FormButtonProps } from "@/interfaces/form";
import { createUser, getSingleUser } from "@/store/userSlice/actions";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUserScreen = () => {
  const { id = "" } = useParams();
  const userStore = useAppSelector("users");
  const [formIsValid, setFormIsValid] = useState(false);
  const userDispatch = useAppDispatch();
  useEffect(() => {
    console.log(id);
    userDispatch(getSingleUser(id));
  }, [id]);

  const handleValidationChanged = (validation: Record<string, any>) => {
    setFormIsValid(validation.formIsValid);
  };
  const handleSubmit = async (data: Record<string, any>) => {
    userDispatch(createUser(omit(data, ["confirmPassword"])));
  };
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
    disabled: !formIsValid || userStore.isLoading,
  };
  return (
    <div>
      <DashboardLayout pageTitle="Create User">
        <Container className="border">
          <FormHeader
            description="Basic information about the user"
            title="User data"
          />
          <FormBuilder
          schema={userForm}
          formButton={formButton}
          formValues={userStore.editingUser}
          onSubmit={handleSubmit}
          validationSchema={userValidationSchema}
          onValidationChangeHandler={handleValidationChanged}
        />
        </Container>
      </DashboardLayout>
    </div>
  );
};

export default UpdateUserScreen;
