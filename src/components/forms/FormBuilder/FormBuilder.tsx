import {
  FormBuilderProps,
  FormFieldComponentChangeEvent,
} from "@/interfaces/form";
import CustomFieldBuilder from "./CustomFieldBuilder";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import { useValidateForm } from "@/hooks/useValidateForm";
function FormBuilder({
  schema,
  formValues,
  onFieldBlurHandler,
  onFieldChangeHandler,
  validationSchema,
  onValidationChangeHandler,
  customOptions,
}: FormBuilderProps) {
  const data = { formValues};

  
  const { errors, formIsValid } = useValidateForm(data, validationSchema);
  const handleChange = ({ target }: FormFieldComponentChangeEvent) => {
    const { name, value } = target;
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

  useEffect(() => {
    if (onValidationChangeHandler) {
      onValidationChangeHandler({ errors, formIsValid });
    }
  }, [formValues]);

  return (
    <form className="flex-1 flex-grow flex flex-col justify-between" noValidate>
      {schema && schema.length ? (
        schema.map((section, index) => (
          <div key={index}>
            <h2 className="text-md font-bold">{section.section.title}</h2>
            <p>{section.section.description}</p>
            <div
              className={`grid sm:grid-cols-1 lg:grid-${section.section.col} md:grid-cols-1 gap-x-4 ${section.section.className}`}
            >
              {section.section.form &&
                section.section.form.length > 0 &&
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
                        state={formValues}
                        customOptions={customOptions}
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
        ))
      ) : (
        <h1>Provide a form schema</h1>
      )}
    </form>
  );
}

export default FormBuilder;
