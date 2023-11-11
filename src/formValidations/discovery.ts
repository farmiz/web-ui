import { FormComponent } from "@/interfaces/form";

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

const riskLevelArray = [
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
const tags = [
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
          required: true
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
          type: "select",
          options: tags,
          isMultiSelect: true,
          isClearable: true,
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
