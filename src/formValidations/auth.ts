import { FormComponent } from "@/interfaces/form";
import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

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
