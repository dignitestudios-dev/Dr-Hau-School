import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; 
import Loading from "../../components/global/Loading";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/school"); 
      if (response.data.success) {
        setData(response.data.data); 
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to fetch profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[24px] font-bold text-black">Profile</h3>
      </div>

      <div className="justify-center items-center">
        <div className="rounded-lg shadow-customShadow bg-white lg:h-[570px] p-8">
          <div className="rounded-xl shadow-customShadow bg-gray-50 border border-[#F9FAFB] py-4 px-6 mb-6">
            <div className="grid grid-cols-1 mb-6">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[20px] text-black">Personal Information</p>
                <button onClick={() => navigate("/edit-profile")} className="bg-black grid grid-cols-2 justify-center items-center text-white px-4 py-2 rounded-md">
                  <AiFillEdit />
                  Edit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 mb-6">
              <img src={data?.profilePicture || "https://i.pravatar.cc/40?img=3"} alt="profile" className="w-14 h-14 rounded-full mx-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Administrator Name</p>
                <p className="text-[14px] text-[#181818]">{data?.adminName}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">School Name</p>
                <p className="text-[14px] text-[#181818]">{data?.schoolName}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
                <p className="text-[14px] text-[#181818]">{data?.programDep}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Campus</p>
                <p className="text-[14px] text-[#181818]">{data?.campus}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
                <p className="text-[14px] text-[#181818]">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
