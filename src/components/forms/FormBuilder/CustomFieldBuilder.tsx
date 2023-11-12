import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldComponentProps } from "@/interfaces/form";
import { memo } from "react";
import SelectField from "../SelectField";
import DatePicker from "../DatePicker";

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
  switch (props.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return (
        <Input
          value={state[props.fieldKey]}
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
          value={state[props.fieldKey]}
          disableDate={props.disableDate}
        />
      );
    case "textarea":
      return (
        <Textarea
          className={`${props.className}`}
          value={state[props.fieldKey]}
          onChange={handleChange}
          name={props.fieldKey}
          id={props.id || `form__${props.fieldKey}`}
          onBlur={handleBlur}
        />
      );
    case "select":
      if (props.type === "select") {
        return (
          <SelectField
            isSearchable={props.isSearchable}
            options={props.options}
            isMulti={props.isMultiSelect}
            onChange={(val: any) =>
              handleSelectFieldChanged(props.fieldKey, val)
            }
            onBlur={handleBlur}
            closeMenuOnSelect={props.isMultiSelect ? false : true}
          />
        );
      }
  }
}

export default memo(CustomFieldBuilder);
