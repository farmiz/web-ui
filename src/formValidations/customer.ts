import { FormComponent, ValidationSchema } from "@/interfaces/form";
import { genderOptions, statusOptions } from "./users";
import { removeFieldsByLabel } from "@/components/forms/FormBuilder/utils";

const defaultValidation = {
  required: true,
  minLength: 3,
};
export const customerDefaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  password: {},
  permission: "",
  confirmPassword: "",
  gender: "",
  status: "",
  physicalAddress: {},
};
export const customerValidationSchema: ValidationSchema = {
  firstName: defaultValidation,
  lastName: defaultValidation,
  dateOfBirth: {
    required: true,
  },
  password: {
    required: true,
    isPassword: true,
  },
  confirmPassword: {
    required: true,
    isPassword: true,
    sameAs: "password",
  },
  username: {
    required: true,
    minLength: 3,
  },
  email: {
    required: true,
    isEmail: true,
  },
  role: {
    required: true,
    enumValues: ["admin", "support"],
    isEnum: true,
  },
  status: {
    required: true,
    enumValues: ["active", "suspended", "pendingApproval", "inactive"],
    isEnum: true,
  },
  gender: {
    required: true,
    enumValues: ["male", "female"],
    isEnum: true,
  },
  phone: {
    required: true,
    isPhone: true,
  },
};

export const customerForm = (fieldsToOmit?: string[]): FormComponent[] => {
  const form: FormComponent[] = [
    {
      section: {
        col: "cols-3",
        form: [
          {
            label: "First Name",
            fieldKey: "firstName",
            type: "text",
          },
          {
            label: "Last Name",
            fieldKey: "lastName",
            type: "text",
          },
          {
            label: "Username",
            fieldKey: "username",
            type: "text",
          },
        ],
      },
    },
    {
      section: {
        col: "cols-3",
        form: [
          {
            label: "Email",
            fieldKey: "email",
            type: "text",
          },
          {
            label: "Phone prefix",
            fieldKey: "phone",
            type: "phone",
          },
          {
            label: "Status",
            fieldKey: "status",
            type: "select",
            options: statusOptions,
          },
        ],
      },
    },
    {
      section: {
        col: "cols-3",
        form: [
          {
            label: "Date of birth",
            fieldKey: "dateOfBirth",
            type: "date",
            disableDate: (date: any) => date > new Date(),
          },
          {
            label: "Gender",
            fieldKey: "gender",
            type: "select",
            options: genderOptions,
          },
        ],
      },
    },
    {
      section: {
        col: "cols-2",
        form: [
          {
            label: "Password",
            fieldKey: "password",
            type: "password",
          },
          {
            label: "Confirm Password",
            fieldKey: "confirmPassword",
            type: "password",
          },
        ],
      },
    },
  ];
  if (fieldsToOmit && fieldsToOmit.length) {
    return removeFieldsByLabel(form, fieldsToOmit);
  }
  return form;
};
