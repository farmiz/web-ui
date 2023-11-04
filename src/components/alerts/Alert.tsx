import { Shapes } from "lucide-react";
import React from "react";

type AlertType = "error" | "warning" | "success" | "info";
interface AlertProps {
  text: string;
  type: AlertType;
}
const Alert: React.FC<AlertProps> = ({ text, type }) => {
  const alertMapper: { [k in AlertType]?: Record<string, string> } = {
    error: {
      className: "bg-red-50 text-red-600",
    },
    success: {
      className: "bg-green-50 text-green-800",
    },
    info: {
      className: "bg-blue-50 text-blue-800",
    },
    warning: {
      className: "bg-yellow-50 text-yellow-800",
    },
  };
  return (
    <div
      className={`${alertMapper[type]?.className} text-sm p-3 flex justify-between rounded items-center`}
    >
      <div>
        <div className="flex items-center">
          <Shapes />
          <p>
            <span className="font-bold">{type.toUpperCase()}:</span>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
