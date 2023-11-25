import { FormComponent, ValidationSchema } from "@/interfaces/form";

export const discoveryDefaultValues = {
  name: "",
  amount: 0,
  tags: [],
  description: "",
  startDate: null,
  endDate: null,
  duration: {
    type: "",
    value: 0,
  },
  closingDate: null,
  profitPercentage: 0,
  riskLevel: "",
};

const defaultValidation = {
  required: true,
  minLength: 3,
};

export const discoveryValidationSchema: ValidationSchema = {
  name: defaultValidation,
  amount: {
    required: true,
    minValue: 1,
  },
  tags: {
    isEnum: true,
    enumValues: ["good", "bad", "ugly"],
    required: true,
  },
  description: defaultValidation,
  startDate: {
    required: true,
  },
  endDate: {
    required: true,
  },
  duration: {
    required: true,
    customValidation(value) {
      return value.value > 1 && value.type;
    },
  },
  riskLevel: {
    isEnum: true,
    required: true,
    enumValues: ["high", "moderate", "low"],
  },
  profitPercentage: {
    minValue: 1,
    maxValue: 100,
    required: true,
  },
};

export const riskLevelOptions = [
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
export const tagsOptions = [
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
        },
        {
          label: "Amount",
          fieldKey: "amount",
          type: "number",
        },
        {
          label: "Duration Type",
          fieldKey: "duration.type",
          type: "select",
          options: [
            {
              label: "Days",
              value: "days",
            },
            {
              label: "Months",
              value: "months",
            },
            {
              label: "Years",
              value: "years",
            },
          ],
        },
        {
          label: "Duration Value",
          fieldKey: "duration.value",
          type: "number",
        },
        {
          label: "Profit percentage",
          fieldKey: "profitPercentage",
          type: "number",
        },
        {
          label: "Risk level",
          fieldKey: "riskLevel",
          type: "select",
          options: riskLevelOptions,
        },
      ],
    },
  },
  {
    section: {
      col: "cols-3",
      form: [
        {
          label: "Tags",
          fieldKey: "tags",
          type: "select",
          options: tagsOptions,
          isMultiSelect: true,
          isClearable: true,
        },
        {
          label: "Start date",
          fieldKey: "startDate",
          type: "date",
          disableDate: (date: any) => date < new Date(),
        },
        {
          label: "End date",
          fieldKey: "endDate",
          type: "date",
          disableDate: (date: any) => date < new Date(),
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
