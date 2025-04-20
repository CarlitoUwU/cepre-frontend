import React from "react";
import { Input } from "./Input";

export const EditableCell = ({ editable, value, name, onChange, type = "text" }) => {
  return editable ? (
    <Input type={type} name={name} value={value} onChange={onChange} />
  ) : (
    value || "-"
  );
}
