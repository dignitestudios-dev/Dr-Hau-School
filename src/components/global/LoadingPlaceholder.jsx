import React from 'react';

const LoadingPlaceholder = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index} className="text-[14px] text-gray-900 border-b border-[#E5E7EB]">
          <td className="py-3 px-4">
            <div className="animate-pulse flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="h-4 bg-gray-200 w-24 rounded" />
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
          <td className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
          <td className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
          <td className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded w-16" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default LoadingPlaceholder;
