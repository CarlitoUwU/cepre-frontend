import React from 'react';

export const Dia = ({ nombre }) => {
    return (
        <div className="text-center font-semibold text-sm bg-gray-200 p-2 border border-radius rounded-lg border-gray-300">
            {nombre}
        </div>
    );
};
