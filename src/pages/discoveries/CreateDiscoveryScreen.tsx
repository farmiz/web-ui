import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
// import SearchComponent from "@/components/forms/FormBuilder/SearchComponent";
import FormHeader from "@/components/forms/FormHeader";
import {
  discoveryForm,
  discoveryValidationSchema,
} from "@/formValidations/discovery";
import { FormButtonProps } from "@/interfaces/form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
type FormSchemaType = z.infer<typeof discoveryValidationSchema>;

const CreateDiscovery = () => {
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log({ data });
  };
  const formButton: FormButtonProps = {
    label: "Submit",
    position: "bottom-right",
    className: "min-w-[200px]",
  };

  return (
    <DashboardLayout pageTitle="Create Discovery">
      <Container className="border">
        <FormHeader
          description="Basic information about the discovery"
          title="Discovery data"
        />
        {/* <SearchComponent
          isMulti={true}
          isSearchable={true}
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
          ]}
        /> */}
        <FormBuilder
          schema={discoveryForm}
          onSubmit={onSubmit}
          validationSchema={discoveryValidationSchema}
          formButton={formButton}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CreateDiscovery;
