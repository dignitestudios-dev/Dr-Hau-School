import React, { useContext, useState } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import PasswordUpdateModal from "../../components/onboarding/PasswordUpdateModal";
import { Gradient, Black, Pill, UpdatepasswordImage } from "../../assets/export";
import axios from "../../axios";

const UpdatePassword = () => {
  const { navigate } = useContext(GlobalContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const email = sessionStorage.getItem("email");
      const resetToken = sessionStorage.getItem("resetToken");

      const response = await axios.post("/auth/updatePassOTP", {
        email,
        password: newPassword,
        confirmPassword,
        resetToken, 
      });

      console.log("Password update response:", response?.data);
      setIsUpdated(true); 
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.response?.data?.message || "Failed to update password. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-4 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start -mt-6 items-start flex-col">
          <h1 className="text-[36px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Update Password
          </h1>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"New Password"}
            placeholder={"Enter your new password"}
            type={"password"}
            value={newPassword}
            setState={setNewPassword}
          />
          <AuthInput
            text={"Confirm Password"}
            placeholder={"Enter your confirm password here"}
            type={"password"}
            value={confirmPassword}
            setState={setConfirmPassword}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        
        <AuthSubmitBtn text={"Update Password"} />

        {isUpdated && (
          <PasswordUpdateModal
            isOpen={isUpdated}
            onRequestClose={() => setIsUpdated(false)} 
          />
        )}
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <img
          src={Gradient}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        />
        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />
        <div className="relative flex justify-center items-center h-full">
          <img
            src={UpdatepasswordImage}
            alt="login_mockup"
            className="relative w-[60%] h-full object-contain"
          />
        </div>

        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-[20px] font-medium">This is the end!</h3>
          <p className="text-[16px] text-[#E0EAFFBF]">
            After entering the new password you will gain access to your account.
          </p>

          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
