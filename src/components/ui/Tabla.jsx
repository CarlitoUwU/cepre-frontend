import React, { useState, useEffect } from "react";

export const Tabla = ({ encabezado = [], datos = [], index_key = null, filtroDic = {}, selected = null, filtrar = true }) => {
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [filtroPosicion, setFiltroPosicion] = useState({});
  const [seleccionados, setSeleccionados] = useState({});

  const toggleFiltro = (index, event) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    setFiltroPosicion({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setFiltroActivo((prev) => (prev === index ? null : index));
  };

  const manejarCheckbox = (index, valor, onChange) => (event) => {
    const checked = event.target.checked;

    setSeleccionados((prev) => {
      const nuevoValores = checked ? [valor] : [];

      if (onChange) {
        onChange(nuevoValores);
      }

      return {
        ...prev,
        [index]: nuevoValores,
      };
    });
  };

  useEffect(() => {
    if (!selected) return;
    const inicial = {};
    for (const [colIndex, optionIndex] of Object.entries(selected)) {
      const idx = parseInt(colIndex);
      const opcion = filtroDic[idx]?.options?.[optionIndex];
      if (opcion !== undefined) {
        inicial[idx] = [opcion];
      }
    }
    setSeleccionados(inicial);
  }, [selected, filtroDic]);

  useEffect(() => {
    const cerrarFiltros = (event) => {
      if (!event.target.closest(".filtro-dropdown")) setFiltroActivo(null);
    };
    document.addEventListener("click", cerrarFiltros);
    return () => document.removeEventListener("click", cerrarFiltros);
  }, []);

  const datosFiltrados = filtrar ? datos.filter((fila) =>
    Object.entries(seleccionados).every(([index, valores]) =>
      valores.length ? valores.includes(fila[index]) : true
    )
  ) : datos;

  return (
    <div className="overflow-x-auto relative rounded-xl">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#78211E] text-white font-extrabold">
            {encabezado.map((item, index) => (
              <th key={index} className="py-2 px-4 border-b border-gray-300 relative text-center">
                {filtroDic[index] ? (
                  <div className="inline-flex items-center gap-2 relative">
                    <p>{item}</p>
                    <button className="cursor-pointer w-[12px] h-[12px]" onClick={(e) => toggleFiltro(index, e)}>
                      <img className="w-[12px] h-[12px]" src={filtroActivo === index ? "/flecha-arriba.png" : "/flecha-abajo.png"} alt="" />
                    </button>
                    {filtroActivo === index && (
                      <div
                        className="fixed bg-white border border-gray-300 p-2 shadow-lg z-50 min-w-[150px] rounded-md filtro-dropdown"
                        style={filtroPosicion}
                      >
                        {filtroDic[index]?.options.map((valor, i) => (
                          <label key={i} className="flex items-center gap-2 text-black px-2 py-1 hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!seleccionados[index]?.includes(valor)}
                              onChange={manejarCheckbox(index, valor, filtroDic[index].onChange)}
                            />
                            {valor}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  item
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.length > 0 ? (
            datosFiltrados.map((fila, i) => (
              <tr key={index_key ? fila[index_key] : i} className={`${i % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"}`}>
                {fila.map((item, j) => (
                  <td key={`${i}_${j}`} className="py-2 px-4 border-b border-gray-300">
                    {item}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={encabezado.length} className="text-center py-4 text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
