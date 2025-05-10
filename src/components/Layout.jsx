import React from "react";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-20 px-4">{children}</main>
    </div>
  );
};
