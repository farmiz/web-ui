import { FormComponent, ValidationSchema } from "@/interfaces/form";

const defaultValidation = {
  required: true,
  minLength: 3,
};
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
  // confirmPassword: {
  //   required: true,
  //   isPassword: true,
  //   sameAs: "password",
  // },
  username: {
    required: true,
    minLength: 3,
  },
  email: {
    required: true,
    isEmail: true,
  },
  "phone.country": {
    required: true,
    minLength: 2,
  },
  "phone.prefix": {
    required: true,
    minLength: 3,
  },
  "phone.number": {
    required: true,
    minLength: 9,
    maxLength: 9,
  },
};

export const userDefaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: {
    number: "",
    prefix: "",
    country: "",
  },
  dateOfBirth: "",
  password: "",
  // confirmPassword: "",
  // permission: '',
};

export const userForm: FormComponent[] = [
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
          label: "Country Prefix",
          fieldKey: "phone.country",
          type: "text",
        },
        {
          label: "Phone prefix",
          fieldKey: "phone.prefix",
          type: "select",
          options: [
            {
              label: "+233",
              value: "233",
            },
          ],
        },
      ],
    },
  },
  {
    section: {
      col: "cols-3",
      form: [
        {
          label: "Phone Number",
          fieldKey: "phone.number",
          type: "text",
        },
        {
          label: "Date of birth",
          fieldKey: "dateOfBirth",
          type: "date",
          disableDate: (date: any) => date > new Date(),
        },
        {
          label: "Password",
          fieldKey: "password",
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
          type: "text",
        },
      ],
    },
  },
];
