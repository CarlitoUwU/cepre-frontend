import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";


export const EditarSalon = ({ idSalon, regresar }) => {
  return (
    <div>
      <h1>Editar Salón {idSalon}</h1>
      <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
    </div>
  );
}