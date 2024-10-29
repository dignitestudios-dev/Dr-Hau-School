import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AuthInput = ({ state, setState, text, type, error, placeholder }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="ml-1 text-sm font-medium text-black capitalize">
        {text}
      </label>
      <div
        className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#F3F3F3] flex items-center justify-start ${
          error ? "border-red-500" : ""
        }`}
      >
        <div className="w-full h-full flex items-center justify-center rounded-[12px] relative">
          <input
            type={isPassVisible ? "text" : type}
            placeholder={placeholder}
            className="w-full outline-none bg-[#F3F3F3] rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-black bg-transparent h-full px-3 text-sm font-medium"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {type === "password" && (
            <span
              onClick={() => setIsPassVisible((prev) => !prev)}
              className="absolute cursor-pointer top-4 text-lg right-2"
              style={{ color: "#6B7373" }}
            >
              {!isPassVisible ? <BsEyeSlash /> : <BsEye />}
            </span>
          )}
        </div>
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>} 
    </div>
  );
};

export default AuthInput;