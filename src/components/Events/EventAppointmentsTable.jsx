import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import LoadingPlaceholder from "../global/LoadingPlaceholder";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const EventAppointmentsTable = ({ id }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location?.state?.userId;

  const fetchAppointments = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/appointment/school/${id}?page=${page}&limit=10`);
      if (response?.data?.success) {
        setAppointments(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (appointment) => {
    navigate('/event-appointment-details', { state: appointment });
  };

  return (
    <div className="w-full h-auto bg-white rounded-md">
      <div className="overflow-x-auto">
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                <th className="py-2 rounded-l-lg px-4">STUDENT</th>
                <th className="py-2 px-4">DATE OF BIRTH</th>
                <th className="py-2 px-4">CAMPUS</th>
                <th className="py-2 px-4">PROGRAM</th>
                <th className="py-2 rounded-r-lg px-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
                <tr 
                  key={index} 
                  className="text-[14px] text-gray-900 border-b border-[#E5E7EB]" 
                  onClick={() => handleRowClick(appointment)}
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={appointment?.user?.profilePicture}
                      alt={appointment?.user?.firstName}
                      className="w-8 h-8 rounded-full"
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          <MdChevronLeft className="mr-2" /> Previous
        </button>

        <span className="text-gray-500">Page {currentPage} of {totalPages}</span>

        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Next <MdChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default EventAppointmentsTable;
