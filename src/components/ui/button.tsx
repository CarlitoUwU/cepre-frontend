import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({children, ...props}: Props) {
  return (
    <button className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[rgb(90,24,21)]" {...props}>
        {children}
    </button>
  );
}

