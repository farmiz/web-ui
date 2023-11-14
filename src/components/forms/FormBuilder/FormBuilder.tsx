import { Button } from "@/components/ui/button";
import {
  FormBuilderProps,
  FormFieldComponentChangeEvent,
} from "@/interfaces/form";
import { defineButtonPosition } from "./utils";
import CustomFieldBuilder from "./CustomFieldBuilder";
import { useFormFlowReducer } from "@/hooks/useFormReducer";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import { useValidateForm } from "@/hooks/useValidateForm";
function FormBuilder({
  schema,
  formButton,
  formValues,
  onFieldBlurHandler,
  onFieldChangeHandler,
  onSubmit,
  validationSchema,
  onValidationChangeHandler,
}: FormBuilderProps) {
  const { state, dispatch } = useFormFlowReducer(formValues);
  const { errors, formIsValid } = useValidateForm(state, validationSchema);

  const handleChange = ({ target }: FormFieldComponentChangeEvent) => {
    const { name, value } = target;
    dispatch({ type: "CHANGE_INPUT", field: name, value });
    if (onFieldChangeHandler) {
      onFieldChangeHandler({ key: name, value });
    }
  };

  const handleBlur = (e: FormFieldComponentChangeEvent) => {
    const { name, value } = e.target;
    if (onFieldBlurHandler) {
      onFieldBlurHandler({ key: name, value });
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(state);
  };

  useEffect(() => {
    if (onValidationChangeHandler) {
      onValidationChangeHandler({ errors, formIsValid });
    }
  }, [state]);
  return (
    <form
      className="flex-1 flex-grow flex flex-col justify-between"
      onSubmit={handleFormSubmit}
      noValidate
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

      {schema &&
        schema.length &&
        schema.map((section, index) => (
          <div key={index}>
            <h2 className="text-md font-bold">{section.section.title}</h2>
            <p>{section.section.description}</p>
            <div
              className={`grid sm:grid-cols-1 lg:grid-${section.section.col} md:grid-cols-1 gap-x-4`}
            >
              {section.section.form &&
                section.section.form.length &&
                section.section.form.map((input, inputIndex) => {
                  return (
                    <div key={inputIndex} className="my-2 flex flex-col gap-1">
                      {input.label && (
                        <InputLabel
                          id={input.id || `form__${input.fieldKey}`}
                          label={input.label}
                          required={
                            validationSchema?.[input.fieldKey] &&
                            validationSchema?.[input.fieldKey].required
                          }
                        />
                      )}
                      <CustomFieldBuilder
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        state={state}
                        props={input}
                      />
                      <div
                        className="text-[12px] text-red-600"
                        dangerouslySetInnerHTML={{
                          __html: errors[input.fieldKey],
                        }}
                      />
                    </div>
                  );
                })}
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
