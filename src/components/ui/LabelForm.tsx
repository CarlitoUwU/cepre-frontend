import React from "react";

interface LabelFormProps {
  text: string;
}

export const LabelForm: React.FC<LabelFormProps> = ({ text }) => {
  return <label className="block font-semibold mt-5">{text}</label>;
};
