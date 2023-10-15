import React from "react";

export interface FormHeaderProps {
  title: string;
  description: string;
}
const FormHeader: React.FC<FormHeaderProps> = ({ description, title }) => {
  return (
    <div className="mb-2 border-b border-gray-100">
      <h1 className="text-gray-800 font-bold text-xl">{title}</h1>
      <p className="text-gray-600 mb-1">
        <small>{description}</small>
      </p>
    </div>
  );
};

export default FormHeader;
