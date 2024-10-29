import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";
import LoadingPlaceholder from "../global/LoadingPlaceholder"; 

const AppointmentsTable = ({ data, loading, currentPage, totalPages, setCurrentPage }) => {
  const navigate = useNavigate();

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

  const handlePageNumberClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={`mx-1 px-3 py-1 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageNumberClick(1)} className={`mx-1 px-3 py-1 rounded-full transition-all duration-300 ${currentPage === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}>1</button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<span key="left-ellipsis" className="mx-1 text-gray-500">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={`mx-1 px-3 py-1 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="right-ellipsis" className="mx-1 text-gray-500">...</span>);
      }

      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageNumberClick(totalPages)} className={`mx-1 px-3 py-1 rounded-full transition-all duration-300 ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}>{totalPages}</button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <IoMdArrowBack onClick={() => navigate("/dashboard")} className="text-[24px] text-gray-700 mr-2 cursor-pointer" />
          <h3 className="text-[24px] font-bold text-black">Appointment List</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 rounded-l-lg px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">ADDRESS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 rounded-r-lg px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingPlaceholder /> 
            ) : (
              data.map((appointment, index) => {
                const user = appointment?.user;
                return (
                  <tr key={index} className="text-[14px] text-gray-900 border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/student-profile', { state: appointment })}>
                      <img
                        src={user?.profilePicture || `https://i.pravatar.cc/40?img=${index + 1}`}
                        alt={user?.firstName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{`${user?.firstName} ${user?.lastName}`}</span>
                    </td>
                    <td className="py-3 px-4">{new Date(user?.dob).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{user?.address || "N/A"}</td>
                    <td className="py-3 px-4">{user?.programAttended}</td>
                    <td className={`py-3 px-4 ${appointment?.status === 'Scheduled' ? 'text-blue-500' : 'text-red-500'}`}>
                      {appointment?.status}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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

      {/* <div className="flex justify-center items-center mt-2">
        <div className="flex items-center mx-4">
          {renderPageNumbers()}
        </div>
      </div> */}
    </div>
  );
};

export default AppointmentsTable;
