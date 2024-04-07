import { Label } from "@/components/ui/label";
import { FormIconProps } from "@/interfaces/form";
import { FC } from "react";

interface InputLabelProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  id: string;
  required?: boolean;
}

const InputLabel: FC<InputLabelProps> = ({ label, id, required }) => {
  return (
    <>
      {label && typeof label === "string" && (
        <Label htmlFor={id} className="cursor-pointer text-sm block">
          {label} {required && <sup className="font-bold text-red-500">*</sup>}
        </Label>
      )}

      {label && typeof label !== "string" && (
        <Label
          htmlFor={id}
          className={`cursor-pointer text-sm block ${label.className || ""}`}
        >
          {label.text}
          {required && <sup className="font-bold text-red-500">*</sup>}
        </Label>
      )}
    </>
  );
};

export default InputLabel;
