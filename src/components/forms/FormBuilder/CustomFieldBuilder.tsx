import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldComponentProps } from "@/interfaces/form";
import { memo } from "react";
import SelectField from "../SelectField";
import DatePicker from "../DatePicker";
import { get } from "lodash";
import Permission from "../Permission";
import Phone from "../Phone";

function CustomFieldBuilder({
  handleBlur,
  handleChange,
  props,
  state,
  customOptions,
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
          value={get(state, props.fieldKey, "")}
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
          value={get(state, props.fieldKey, "")}
          disableDate={props.disableDate}
        />
      );
    case "textarea":
      return (
        <Textarea
          className={`${props.className}`}
          value={get(state, props.fieldKey, "")}
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
          options={[
            ...props.options,
            ...(customOptions ? customOptions[props.fieldKey] || [] : [])
          ]}
          isMulti={props.isMultiSelect}
          onChange={(val: any) => handleSelectFieldChanged(props.fieldKey, val)}
          onBlur={handleBlur}
          closeMenuOnSelect={props.isMultiSelect ? false : true}
        />
      );
    case "permission":
      return (
        <Permission
          fieldKey={props.fieldKey}
          resources={props.resources}
          actions={props.actions}
          onChange={handleChange}
          value={get(state, props.fieldKey, "")}
          dynamicFieldKey={props.dynamicFieldKey}
        />
      );

    case "phone":
      return (
        <Phone
          fieldKey={props.fieldKey}
          onChange={handleChange}
          value={get(state, props.fieldKey, "")}
        />
      );
  }
}

export default memo(CustomFieldBuilder);
