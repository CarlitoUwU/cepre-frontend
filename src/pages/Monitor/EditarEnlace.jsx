import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { ButtonNegative } from "@/components/ui/ButtonNegative";

export const EditarEnlace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { linkType, currentLink } = location.state || {};

  const [tempLink, setTempLink] = useState(currentLink || "");

  const saveLink = () => {
    if (tempLink.trim() !== "") {
      navigate("/monitor", { state: { linkType, newLink: tempLink } });
    }
  };  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 m-5">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          Ingresar enlace {linkType === "meet" ? "Meet" : "Classroom"}
        </h3>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded"
          placeholder="Pegar enlace aquí..."
          value={tempLink}
          onChange={(e) => setTempLink(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <ButtonNegative onClick={() => navigate("/monitor")}>Cancelar</ButtonNegative>
          <Button onClick={saveLink}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};
