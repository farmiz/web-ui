
import { FieldErrors, FieldValues } from "react-hook-form";

interface ErrorMessageProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  fieldName: keyof T;
}

const InputErrorMessage = <T extends FieldValues>({
  errors,
  fieldName,
}: ErrorMessageProps<T>) => {
  const errorMessage = errors[fieldName]?.message as string | undefined;

  return errorMessage ? (
    <span className="text-red-800 block text-sm">{errorMessage}</span>
  ) : null;
};

export default InputErrorMessage;
