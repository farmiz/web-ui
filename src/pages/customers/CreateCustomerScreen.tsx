import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormHeader from "@/components/forms/FormHeader";
import {
  customerDefaultValues,
  customerForm,
  customerValidationSchema,
} from "@/formValidations/customer";

const CreateCustomerScreen = () => {
  return (
    <DashboardLayout pageTitle="Create Customer">
      <FormHeader
        description="Basic information about the customer"
        title="Customer data"
      />
      <Container className="border">
        <FormBuilder
          formValues={customerDefaultValues}
          schema={customerForm()}
          validationSchema={customerValidationSchema}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateCustomerScreen;
