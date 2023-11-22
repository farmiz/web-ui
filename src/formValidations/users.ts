import { removeFieldsByLabel } from "@/components/forms/FormBuilder/utils";
import { FormComponent, ValidationSchema } from "@/interfaces/form";
import { camelCaseToSentence } from "@/utils";
import { camelCase } from "lodash";

const defaultValidation = {
  required: true,
  minLength: 3,
};

const userRole = ["admin", "support"];
const gender = ["male", "female"];
const status = ["active", "suspended", "pendingApproval", "inactive"];

export const statusOptions = status.map((stat) => ({
  label: camelCaseToSentence(stat),
  value: stat,
}));
export const genderOptions = gender.map((gen) => ({
  label: camelCase(gen),
  value: gen,
}));
export const roleOptions = userRole.map((role) => ({
  label: camelCase(role),
  value: role,
}));
export const userValidationSchema: ValidationSchema = {
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

export const userDefaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  password: "",
  permission: "",
  confirmPassword: "",
  role: "",
  gender: "",
  status: "",
};

export const userForm = (fieldsToOmit?: string[]): FormComponent[] => {
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
            label: "Role",
            fieldKey: "role",
            type: "select",
            options: roleOptions,
          },
        ],
      },
    },
    {
      section: {
        col: "cols-3",
        form: [
          {
            label: "Status",
            fieldKey: "status",
            type: "select",
            options: statusOptions,
          },
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
    {
      section: {
        title: "User Permission",
        col: "cols-1",
        form: [
          {
            fieldKey: "permission",
            type: "permission",
            resources: [
              "discovery",
              "users",
              "settings",
              "sponsor",
              "transaction",
              "wallet",
            ],
            actions: ["create", "read", "update", "delete"],
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
