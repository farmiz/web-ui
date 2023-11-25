import { FormComponent } from "@/interfaces/form";

export const loginForm: FormComponent[] = [
  {
    section: {
      col: "cols-1",
      form: [
        {
          fieldKey: "email",
          label: "Email",
          type: "text",
        },
        {
          fieldKey: "password",
          label: "Password",
          type: "password",
        },
      ],
    },
  },
];
