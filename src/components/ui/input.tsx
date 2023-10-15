import * as React from "react";

import { cn } from "../..//lib/utils.ts";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-[.6rem] px-4 leading-tight focus:outline-none focus:bg-white",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
