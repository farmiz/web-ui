import { FormComponent, SelectFieldOptions } from "@/interfaces/form";
import { z } from "zod";

// const tagsSchema = z.object({
//   label: z.string(),
//   value: z.string(),
// });
export const discoveryValidationSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 chars"),
  amount: z.coerce.number().gt(0, "Amount should be greater than 0"),
  tags: z.array(z.string()).min(1),
  description: z.string().min(1),
  startDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "Start date must today or the future",
  }),
  endDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "End date must today or the future",
  }),
  duration: z.coerce.number().gt(0),
  closingDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "Start date must today or the future",
  }),
  profitPercentage: z.coerce
    .number()
    .min(0, "Profit percentage should be greater than 0").max(100),
  riskLevel: z.string(z.enum(["high", "low", "moderate"])).min(3),
});

export const discoveryDefaultValues = {
  name: "",
  amount: null,
  tags: [],
  description: "",
  startDate: null,
  endDate: null,
  duration: null,
  closingDate: null,
  profitPercentage: null,
  riskLevel: "",
};
type RiskLevel = "high" | "low" | "moderate";
type Tag = "good" | "bad" | "ugly";

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
