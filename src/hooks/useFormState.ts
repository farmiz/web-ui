import { useState } from "react";

export const useFormState = (key: string, value: any) => {
  const [input, setInput] = useState({ [key]: value });
  return {
    input,
    setInput,
  };
};
