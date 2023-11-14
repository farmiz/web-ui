import { FC } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneProps {
  onChange: any;
  fieldKey: string;
  value: any;
}
const Phone: FC<PhoneProps> = ({ onChange, value, fieldKey }) => {
  const handleChange = ({}, meta: any) => {
    const stateValue = {
      prefix: meta?.country?.dialCode || "",
      number: meta?.inputValue?.split(" ")[1] || "",
      country: meta?.country?.iso2 || "",
    };
    onChange({ target: { name: fieldKey, value: stateValue } });
  };
  const processedValue = value ? `+${value.prefix}${value.number}` : value;
  return (
    <div>
      <PhoneInput
        defaultCountry="gh"
        value={processedValue}
        onChange={handleChange}
      />
    </div>
  );
};
export default Phone;
