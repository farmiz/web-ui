import { FC } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneProps {
  onChange: any;
  value: any;
  fieldKey: string;
}
const Phone: FC<PhoneProps> = ({ onChange, value, fieldKey }) => {
  return (
    <div>
      <PhoneInput
        defaultCountry="gh"
        value={value}
        onChange={({}) => {
          // const phoneNumber = meta.inputValue.split(".");
          onChange({
            target: {
              name: fieldKey,
              //   value: {
              //     // number: phoneNumber,
              //     // prefix: meta.dialCode,
              //     // country: meta.iso2 && meta.iso2.toUpperCase(),
              //   },
            },
          });
        }}
      />
    </div>
  );
};
export default Phone;
