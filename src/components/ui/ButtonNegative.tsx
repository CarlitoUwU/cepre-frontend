import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonNegative({ children, ...props }: Props) {
  return (
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
