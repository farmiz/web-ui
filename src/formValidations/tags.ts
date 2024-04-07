import { FormComponent, ValidationSchema } from "@/interfaces/form";

export const tagsForm: FormComponent[] = [
  {
    section: {
      col: "cols-2",
      form: [
        {
          fieldKey: "name",
          label: "Tag Name",
          type: "text",
        },
      ],
    },
  },
];
export const tagsValidationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 3,
  },
};
