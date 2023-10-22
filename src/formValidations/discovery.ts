import { FormComponent } from "@/interfaces/form";
import { z } from "zod";

export const discoveryValidationSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 chars"),
  amount: z.preprocess((a) => parseInt(z.string().parse(a)), z.number()),
  tags: z.enum(["good", "bad", "ugly"]),
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  closingDate: z.date(),
  profitPercentage: z.number(),
  riskLevel: z.enum(["high", "low", "moderate"]),
  duration: z.number(),
});
type RiskLevel = "high" | "low" | "moderate";
type Tag = "good" | "bad" | "ugly";

type SelectFieldOptions<T> = { label: string; value: T }[];
const riskLevelArray: SelectFieldOptions<RiskLevel> = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Moderate",
    value: "moderate",
  },
  {
    label: "Low",
    value: "low",
  },
];
const tags: SelectFieldOptions<Tag> = [
  {
    label: "Bad",
    value: "bad",
  },
  {
    label: "Good",
    value: "good",
  },
  {
    label: "Ugly",
    value: "ugly",
  },
];
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
          label: "Duration (should be in months)",
          fieldKey: "duration",
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
          type: "select",
          options: riskLevelArray,
        },
        {
          label: "Tags",
          fieldKey: "tags",
          type: "multi-select",
          options: tags,
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
