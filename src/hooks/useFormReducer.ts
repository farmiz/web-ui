import { FormBuilderAction, FormBuilderState } from "@/interfaces/form";
import { useReducer } from "react";

export const useFormFlowReducer = (defaultValues: Record<string, any>) => {
  const reducer = (state: FormBuilderState, action: FormBuilderAction) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        if ("field" in action) {
          const fieldLevels = action.field.split(".");
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
      case "SET_DEFAULT_STATE":
        return { ...state, ...defaultValues };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValues);

  const setDefaultState = (defaultState: Record<string, any>) => {
    dispatch({ type: "SET_DEFAULT_STATE", values: defaultState });
  };

  return { state, dispatch, setDefaultState };
};
