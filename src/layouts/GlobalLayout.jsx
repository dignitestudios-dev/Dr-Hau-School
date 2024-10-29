import React, { useEffect } from "react";
// import { Logo } from "../assets/export";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const GlobalLayout = ({ page }) => {

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    } 
  },[])
  return (
    <div className="w-full h-screen overflow-y-hidden flex justify-start items-start">
      <Sidebar />
      <div className="w-full lg:w-[calc(100%-280px)]  h-full relative flex flex-col justify-start items-start">
        <Navbar />
        <div className="w-full h-[calc(100%-60px)] bg-[#F3F5F7] white text-white   flex flex-col justify-start items-start">
          {page}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;