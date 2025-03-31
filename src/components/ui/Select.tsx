import React from "react";

interface SelectProps {
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: number; name: string }[];
}

export const Select: React.FC<SelectProps> = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded bg-white focus:border-2 focus:border-[#78211E]"
    >
      {options.map((op) => (
        <option key={op?.id ?? op} value={op?.id ?? op}>
          {op?.name ?? op}
        </option>
      ))}
    </select>
  );
};
