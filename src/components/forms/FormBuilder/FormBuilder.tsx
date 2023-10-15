import InputErrorMessage from "@/components/InputErrorMessage";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FormBuilderProps } from "@/interfaces/form";
import { FieldErrors } from "react-hook-form";
import { TypeOf, z } from "zod";
import { defineButtonPosition } from "./utils";
import CustomFieldBuilder from "./CustomFieldBuilder";
import { useState } from "react";
import CustomSearchableSelect from "./SelectField";

function FormBuilder<T extends z.ZodType<any, any, any>>({
  schema,
  validationSchema,
  onSubmit,
  formButton,
}: FormBuilderProps<T>) {
  const { errors, handleSubmit, register } =
    useFormValidation(validationSchema);

  const hasError = (errors: FieldErrors<TypeOf<T>>, index: string) => {
    return errors && errors[index] && errors[index]?.message;
  };

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    // Add more options as needed
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };
  return (
    <form
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      className="flex-1 flex-grow flex flex-col justify-between"
    >
      {formButton &&
        formButton.position &&
        ["top-right", "top-center", "top-left"].includes(
          formButton.position
        ) && (
          <div
            className={`flex items-center my-4 ${
              defineButtonPosition[formButton.position]
            }`}
          >
            <Button
              disabled={formButton.disabled}
              className={formButton.className}
            >
              {formButton?.label}
            </Button>
          </div>
        )}
      <CustomSearchableSelect
        options={options}
        onSelect={handleOptionSelect}
        placeholder="Select an option..."
      />
      {schema.map((section, index) => (
        <div key={index}>
          <h2>{section.section.title}</h2>
          <p>{section.section.description}</p>
          <div
            className={`grid sm:grid-cols-1 lg:grid-${section.section.col} md:grid-cols-1 gap-x-4`}
          >
            {section.section.form.map((input, inputIndex) => (
              <div key={inputIndex} className="my-2">
                <label
                  htmlFor={input.id && input.id}
                  className="cursor-pointer text-sm"
                >
                  {input.label}
                  {hasError(errors, input.fieldKey) && (
                    <sup className="font-bold text-red-500">*</sup>
                  )}
                </label>
                <CustomFieldBuilder
                  input={input}
                  register={register}
                  className={
                    hasError(errors, input.fieldKey) ? "border-red-500" : ""
                  }
                />
                <InputErrorMessage errors={errors} fieldName={input.fieldKey} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {formButton &&
        formButton.position &&
        ["bottom-right", "bottom-center", "bottom-left"].includes(
          formButton.position
        ) && (
          <div
            className={`flex items-center ${
              defineButtonPosition[formButton.position]
            } my-4`}
          >
            <Button
              disabled={formButton.disabled}
              className={formButton.className}
            >
              {formButton.label}
            </Button>
          </div>
        )}
    </form>
  );
}

export default FormBuilder;
