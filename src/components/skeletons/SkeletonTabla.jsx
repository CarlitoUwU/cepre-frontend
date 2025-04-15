import React from 'react';

export const SkeletonTabla = ({ numRows = 5, numColums = 4 }) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#78211E] text-white font-extrabold">
            {[...Array(numColums)].map((_, i) => (
              <th key={i} className="py-2 px-4 border-b border-gray-300 text-center">
                <div className="h-6 w-1/3 bg-gray-300 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(numRows)].map((_, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"}`}>
              {[...Array(numColums)].map((_, j) => (
                <td key={j} className="py-2 px-4 border-b border-gray-300">
                  <div className="h-4 w-1/3 bg-gray-200 animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};