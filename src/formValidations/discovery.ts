import { FormComponent } from "@/interfaces/form";
import { z } from "zod";

export const discoveryValidationSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 chars"),
  amount: z.number(),
  tags: z.enum(["good", "bad", "ugly"]),
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  closingDate: z.date(),
  profitPercentage: z.number(),
  riskLevel: z.enum(["high", "low", "moderate"]),
  duration: z.number()
});
export const discoveryForm: FormComponent[] = [
  {
    section: {
      col: "cols-3",
      form: [
        {
          label: "Name",
          fieldKey: "name",
          type: "text",
          required: true,
        },
        {
          label: "Amount",
          fieldKey: "amount",
          type: "number",
          required: true,
        },
        {
          label: "Tags",
          fieldKey: "tags",
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
          label: "Profit percentage",
          fieldKey: "profitPercentage",
          type: "number",
        },
        {
          label: "Risk level",
          fieldKey: "riskLevel",
          type: "text",
        },
        {
          label: "Profit percentage",
          fieldKey: "profitPercentage",
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
          label: "Start date",
          fieldKey: "startDate",
          type: "date",
        },
        {
          label: "End date",
          fieldKey: "endDate",
          type: "date",
        },
        {
          label: "Closing date",
          fieldKey: "closingDate",
          type: "date",
        },
      ],
    },
  },
  {
    section: {
      col: "cols-2",
      form: [
        {
          label: "Duration (should be in months)",
          fieldKey: "duration",
          type: "text",
        },
        {
          label: "Closing date",
          fieldKey: "closingDate",
          type: "date",
        },
      ],
    },
  },
  {
    section: {
      col: "cols-1",
      form: [
        {
          label: "Description",
          fieldKey: "description",
          type: "textarea",
        },
      ],
    },
  },
];
