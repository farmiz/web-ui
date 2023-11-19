import { FC } from "react";
import { defineButtonPosition } from "@/components/forms/FormBuilder/utils";
import { FormButtonProps } from "@/interfaces/form";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  formButton: FormButtonProps;
}
const SubmitButton: FC<SubmitButtonProps> = ({ formButton }) => {
  return (
    <div
      className={`flex items-center ${
        defineButtonPosition[formButton.position]
      } my-4`}
    >
      <Button
        disabled={formButton.disabled}
        className={`${formButton.className} min-w-[200px] rounded-sm h-12`}
        onClick={formButton.onClick}
      >
        {formButton.loading && (
          <div className="animate-spin h-6 w-6 mr-3 border-4 rounded-full border-[#eee] border-r-[#10172a]"></div>
        )}
        {formButton.label}
      </Button>
    </div>
  );
};

export default SubmitButton;
