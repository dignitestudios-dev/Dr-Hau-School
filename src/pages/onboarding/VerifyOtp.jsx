import React, { useContext, useEffect, useState } from "react";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { Gradient, OnboardingImage, Black, Pill } from "../../assets/export";
import axios from "../../axios"; 

const VerifyOtp = () => {
  const { navigate } = useContext(GlobalContext);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading,setResendLoading] = useState(false)
  const [resendError, setResendError] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email"); 
    if (savedEmail) {
      setEmail(savedEmail); 
    } else {
      setError("Email is required.");
    }
  }, []);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; 
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value.substring(0, 1); 
      return newOtp;
    });

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index] = '';
          return newOtp;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const otpValue = otp.join(""); 

    try {
      const response = await axios.post("/auth/validatePassOTP", { code: otpValue, email }); 
      
      console.log("OTP validation response:", response.data);

      const { data } = response.data; 
      sessionStorage.setItem("resetToken", data?.resetToken);
      console.log("data reset ",data?.resetToken)
      console.log("data",data)

      navigate("/update-password"); 
    } catch (err) {
      console.error("Error validating OTP:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    setResendError(null);

    try {
      const response = await axios.post("/auth/sendPassOTP", { email });
      console.log("OTP resend response:", response?.data);

      // sessionStorage.setItem("email", email);

      // navigate("/verify-otp");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please check your email and try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className="font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Please enter the code that we sent to your email {email}.
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {otp.map((value, index) => (
            <input
            type="tel"
            inputMode="numeric"
              key={index}
              id={`otp-input-${index}`}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#c2c6cb] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#55C9FA]"
              maxLength={1} 
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full h-auto flex -mt-8 flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            <button disabled={resendLoading} type="button" onClick={(e)=>handleResend(e)} className="outline-none text-[13px] border-none text-black font-bold">
              {resendLoading?"Resending..." : "Resend now"}
            </button>
          </div>
        </div>

        <AuthSubmitBtn text={loading ? "Verifying..." : "Next"} disabled={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <img
          src={Gradient}
          alt="gradient"
          className="absolute inset-25 w-full h-full"
        />
        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />
        <div className="relative flex justify-center items-center h-full">
          <img
            src={OnboardingImage}
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

export default VerifyOtp;

