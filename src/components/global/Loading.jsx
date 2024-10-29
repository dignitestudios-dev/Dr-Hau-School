import React from "react";

const Loading = () => {
  return (
    <div className="w-full p-6 flex items-center justify-center overflow-auto">
      <div className="">
        <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
        <span className="ml-4 text-xl text-gray-700"></span>
      </div>
    </div>
  );
};

export default Loading;
