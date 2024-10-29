import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const appointment = location.state;
  console.log("``",appointment)
  console.log("~~",appointment?.appointment?.date)

  if (!appointment) {
    return <div>No appointment data available.</div>; 
  }

  const user = appointment?.user; 

  return (
    <div className="w-full p-6 rounded-md shadow-md overflow-auto">
      <div className="flex items-center">
        <IoMdArrowBack onClick={() => navigate("/dashboard")} className="cursor-pointer text-[24px] text-gray-700 mr-2" />
        <h3 className="text-[24px] font-bold text-black">Student Profile</h3>
      </div>

      <div className="justify-center items-center mt-4">
        <div className="rounded-lg shadow-customShadow bg-white p-8">
          <div className='rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-6'>
            <div className='grid grid-cols-1 mb-6'>
              <p className='font-medium text-[20px] text-black'>Personal Information</p>
            </div>
            <div className='grid grid-cols-1 mb-6'>
              <img src={user?.profilePicture || "https://i.pravatar.cc/40?img=3"} alt="profile" className="w-14 h-14 rounded-full mx-2" />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6'>
              <div className=''>
                <p className='text-[14px] text-[#787F8C] font-semibold uppercase'>Name</p>
                <p className='text-[14px] text-[#181818]'>{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
              <div className='w-[300px]'>
                <p className='text-[14px] text-[#787F8C] font-semibold uppercase'>Date of Birth</p>
                <p className='text-[14px] text-[#181818]'>{new Date(user?.dob).toLocaleDateString()}</p>
              </div>
              <div className='w-[300px]'>
                <p className='text-[14px] text-[#787F8C] font-semibold uppercase'>Program Attended</p>
                <p className='text-[14px] text-[#181818]'>{user?.programAttended}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6'>
              <div className=''>
                <p className='text-[14px] text-[#787F8C] font-semibold uppercase'>Last 4 SSN</p>
                <p className='text-[14px] text-[#181818]'>{appointment?.ssn || "N/A"}</p>
              </div>
              <div className='w-[300px]'>
                <p className='text-[14px] text-[#787F8C] font-semibold uppercase'>Email</p>
                <p className='text-[14px] text-[#181818]'>{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className='rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-8'>
            <div className='grid grid-cols-1 mb-6'>
              <p className='font-semibold text-[20px] text-black'>Appointment Details</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6'>
              <div className=''>
                <p className='text-[16px] text-[#787F8C] font-semibold uppercase'>Vaccination</p>
                <p className='text-[14px] text-[#181818]'>{appointment?.appointment?.vaccination || "N/A"}</p>
              </div>
              <div className='w-[300px]'>
                <p className='text-[16px] text-[#787F8C] font-semibold uppercase'>Appointment Date</p>
                <p className='text-[14px] text-[#181818]'>{new Date(appointment?.appointment?.date).toLocaleDateString()}</p>
              </div>
              <div className='w-[300px]'>
                <p className='text-[16px] text-[#787F8C] font-semibold uppercase'>Appointment Time</p>
                <p className='text-[14px] text-[#181818]'>
                  {/* {`${new Date(appointment?.appointment?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(appointment?.appointment?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} */}
                  {`${new Date(appointment?.appointment?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
