import React from "react";

interface SelectProps {
  name: string; // 🔹 Agregar el nombre del select
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name} // 🔹 Añadir name aquí
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded bg-white focus:border-2 focus:border-[#78211E]"
    >
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  );
};
