import React from "react";

export const ButtonCabecera = ({ text = "button", className = "", handleClick = () => { } }) => {
  return (
    <button
      className={className + '  py-1 my-2 px-3 rounded-md cursor-pointer'}
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}