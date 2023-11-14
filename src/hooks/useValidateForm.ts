import { validator } from "@/utils/Validator";

export const useValidateForm = (
  fields: Record<string, any>,
  validationSchema?: Record<string, any>
) => {
  let errors: Record<string, any> = {};

  for (const field in fields) {
    if (field && validationSchema && validationSchema[field]) {
      const value = fields[field];
      if (validationSchema[field].required && validator.isRequired(value)) {
        errors[field] = "Field is required";
      } else if (
        validationSchema[field].minLength &&
        validator.minLength(value, validationSchema[field].minLength)
      ) {
        errors[
          field
        ] = `${field} length should be at least ${validationSchema[field].minLength} characters`;
      } else if (
        validationSchema[field].isEnum &&
        validator.isEnum(value, validationSchema[field].enumValues)
      ) {
        errors[field] = `${field} must be one of the valid options`;
      } else if (
        validationSchema[field].minValue &&
        validator.minValue(value, validationSchema[field].minValue)
      ) {
        errors[
          field
        ] = `${field} must be greater than or equal to ${validationSchema[field].minValue}`;
      } else if (
        validationSchema[field].maxValue &&
        validator.maxValue(value, validationSchema[field].maxValue)
      ) {
        errors[
          field
        ] = `${field} must be less than or equal to ${validationSchema[field].maxValue}`;
      } else if (
        validationSchema[field].maxLength &&
        validator.maxLength(value, validationSchema[field].maxLength)
      ) {
        errors[
          field
        ] = `${field} length should be less than or equal to ${validationSchema[field].maxLength} characters`;
      } else if (
        validationSchema[field].sameAs &&
        validator.sameAs(value, fields[validationSchema[field].sameAs])
      ) {
        errors[
          field
        ] = `${field} must be the same as ${validationSchema[field].sameAs}`;
      } else if (validationSchema[field].isEmail && validator.isEmail(value)) {
        errors[field] = `${field} must be a valid email address`;
      } else if (
        validationSchema[field].isPassword &&
        validator.isPassword(value)
      ) {
        errors[field] =
          "Password should at least 8 characters long <br />  should contain a special character <br />  should contain a lowercase character <br />  should contain an uppercase character <br /> ";
      } else if (
        validationSchema[field].customValidation &&
        typeof validationSchema[field].customValidation === "function"
      ) {
        const customValidationResult =
          validationSchema[field].customValidation(value);

        if (
          customValidationResult &&
          typeof customValidationResult === "object"
        ) {
          const { isValid, errorMessage } = customValidationResult;

          if (!isValid) {
            errors[field] = errorMessage || "Custom validation failed";
          }
        } else if (!customValidationResult) {
          errors[field] = "Custom validation failed";
        }
      } else if (validationSchema[field].isPhone && !validator.isPhone(value)) {
        errors[field] = "Invalid phone number";
      }
    } else {
      continue;
    }
  }

  return { errors, formIsValid: Object.keys(errors).length === 0 };
};
