import React from "react";
import Select, { Props } from "react-select";
interface SelectFieldProps extends Props {}
const SelectField: React.FC<SelectFieldProps> = ({
  options,
  className,
  ...props
}) => {
  return (
    <Select
    
      {...props}
      options={options}
      className={`${className}`}
      theme={(theme) => {
        return {
          ...theme,
          borderRadius: 4,
          border: "none",
          colors: {
            ...theme.colors,
            neutral0: "#f9fafb",
            primary: "#10172a",
            primary25: "#e7e7e75e",
            neutral80: "#10172a", //text selected
            neutral5: "#e7e7e75e", // field disabled
            primary50: "#e7e7e75e",
          },
          spacing: {
            ...theme.spacing,
            baseUnit: 5,
          },
        };
      }}
    />
  );
};

export default SelectField;
