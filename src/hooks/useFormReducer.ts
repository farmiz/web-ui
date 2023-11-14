import { FormBuilderAction, FormBuilderState } from "@/interfaces/form";
import { useReducer } from "react";

export const useFormFlowReducer = (defaultValues: Record<string, any>) => {
  const reducer = (state: FormBuilderState, action: FormBuilderAction) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        if ("field" in action) {
          // Split the field into nested levels
          const fieldLevels = action.field.split(".");

          // Handle nested fields
          if (fieldLevels.length > 1) {
            return {
              ...state,
              [fieldLevels[0]]: {
                ...state[fieldLevels[0]],
                [fieldLevels[1]]: action.value,
              },
            };
          } else {
            return {
              ...state,
              [action.field]: action.value,
            };
          }
        }
        return state;
      case "RESET_FORM":
        return defaultValues;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValues);
  return { state, dispatch };
};
