import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className="flex items-center justify-center h-screen bg-gray-200">
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
          <button
            onClick={() => navigate("/monitor")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={saveLink}
            className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815] transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
