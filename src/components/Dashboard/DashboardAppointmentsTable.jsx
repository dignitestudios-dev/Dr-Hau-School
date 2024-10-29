import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; 
import LoadingPlaceholder from "../global/LoadingPlaceholder";

const DashboardAppointmentsTable = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/appointment/school"); 
      console.log("getAppointments data:", data);
      setAppointmentData(data?.data || []); 
    } catch (err) {
      console.error("Error fetching appointments data:", err);
      setError("Failed to fetch appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="w-full h-auto bg-white ">
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-[24px] font-bold text-black">Appointment List</h3>
        <p onClick={() => navigate("/appointments")} className="text-blue-500 text-sm underline cursor-pointer">See all</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingPlaceholder /> 
            ) : (
              appointmentData?.map((appointment, index) => (
                <tr key={index} className="text-[14px] text-gray-900 border-b border-[#E5E7EB]">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      onClick={() => navigate("/student-profile", { state: appointment })}
                      src={appointment?.user?.profilePicture || `https://i.pravatar.cc/40?img=${index + 1}`}
                      alt={appointment?.user?.firstName}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    <span>{`${appointment?.user?.firstName} ${appointment?.user?.lastName}`}</span>
                  </td>
                  <td className="py-3 px-4">{new Date(appointment?.user?.dob).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{appointment?.user?.campus}</td>
                  <td className="py-3 px-4">{appointment?.user?.programAttended}</td>
                  <td className={`py-3 px-4 ${appointment?.status === 'Scheduled' ? 'text-blue-500' : 'text-red-500'}`}>
                    {appointment?.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAppointmentsTable;
