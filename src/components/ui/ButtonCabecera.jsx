import React from "react";

export const ButtonCabecera = ({ text = "button", data_role = "", className = "", handleClick = () => { } }) => {
  return (
    <button
      className={className + '  py-1 my-2 px-3 rounded-md cursor-pointer'}
      type="button"
      onClick={handleClick}
      data-role={data_role}
    >
      {text}
    </button>
  );
}