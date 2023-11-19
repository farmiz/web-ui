import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldComponentProps } from "@/interfaces/form";
import { memo } from "react";
import SelectField from "../SelectField";
import DatePicker from "../DatePicker";
import Permission from "../Permission";
import Phone from "../Phone";

function CustomFieldBuilder({
  handleBlur,
  handleChange,
  props,
  state,
}: FormFieldComponentProps) {
  const handleSelectFieldChanged = (field: any, value: any) => {
    if (Array.isArray(value)) {
      const r: any = value.map((val) => val.value);
      handleChange({ target: { name: field, value: r } });
    } else {
      handleChange({ target: { name: field, value: value.value } });
    }
  };
  const generateSelectValues = (
    options: Record<string, any>[],
    values: string | string[]
  ) => {
    if (!values) return {};
    if (values === "string")
      return options.find((option) => option.value === values);

    return options.filter((option) => values.includes(option.value));
  };
  switch (props.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return (
        <Input
          value={state && state[props.fieldKey] ? state[props.fieldKey] : ""}
          onChange={handleChange}
          type={props.type}
          name={props.fieldKey}
          id={props.id || `form__${props.fieldKey}`}
          onBlur={handleBlur}
          defaultValue={props.defaultValue}
        />
      );

    case "date":
      return (
        <DatePicker
          fieldKey={props.fieldKey}
          onChange={handleChange}
          disabled={props.disabled}
          value={state && state[props.fieldKey] ? state[props.fieldKey] : ""}
          disableDate={props.disableDate}
        />
      );
    case "textarea":
      return (
        <Textarea
          className={`${props.className}`}
          value={state && state[props.fieldKey] ? state[props.fieldKey] : ""}
          onChange={handleChange}
          name={props.fieldKey}
          id={props.id || `form__${props.fieldKey}`}
          onBlur={handleBlur}
        />
      );
    case "select":
      return (
        <SelectField
          isSearchable={props.isSearchable}
          options={props.options}
          isMulti={props.isMultiSelect}
          onChange={(val: any) => handleSelectFieldChanged(props.fieldKey, val)}
          onBlur={handleBlur}
          closeMenuOnSelect={props.isMultiSelect ? false : true}
          value={generateSelectValues(props.options, state[props.fieldKey])}
        />
      );
    case "permission":
      return (
        <Permission
          fieldKey={props.fieldKey}
          resources={props.resources}
          actions={props.actions}
          onChange={handleChange}
        />
      );

    case "phone":
      return (
        <Phone
          fieldKey={props.fieldKey}
          onChange={handleChange}
          value={state && state[props.fieldKey] ? state[props.fieldKey] : ""}
        />
      );
  }
}

export default memo(CustomFieldBuilder);
