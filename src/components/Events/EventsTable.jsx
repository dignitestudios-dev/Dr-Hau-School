import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import LoadingPlaceholder from "../global/LoadingPlaceholder";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 10; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`/event/school?page=${currentPage}&limit=${eventsPerPage}`, {
          status: selectedTab === "all" ? null : selectedTab,
          date: new Date().toISOString(),
        });
        if (response?.data?.success) {
          setEvents(response?.data?.data);
          setTotalPages(response?.data?.totalPages); 
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedTab, currentPage]);

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

  const filteredData =
    selectedTab === "all"
      ? events
      : events.filter((event) => event?.status === selectedTab);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Events</h3>
        </div>
      </div>

      <div className="w-full h-auto bg-white p-6 rounded-md">
        <div className="flex gap-6 text-[14px] border-b mb-4">
          {["all", "upcoming", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${selectedTab === tab ? "text-black border-b-2 border-black font-bold" : "text-gray-500"}`}
              onClick={() => {
                setSelectedTab(tab);
                setCurrentPage(1); 
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-6">
              <LoadingPlaceholder />
            </div>
          ) : (
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                  <th className="py-2 px-4">DATE</th>
                  <th className="py-2 px-4">VACCINATION</th>
                  <th className="py-2 px-4">TIME</th>
                  <th className="py-2 px-4">STATUS</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((event, index) => (
                  <tr key={index} className="text-[14px] text-gray-900 border-b border-[#E5E7EB]">
                    <td className="py-3 px-4">{new Date(event?.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{event?.vaccinations?.join(", ")}</td>
                    <td className="py-3 px-4">
                      {new Date(event?.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event?.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`py-1 px-3 rounded-full text-white capitalize ${event?.status === "upcoming" ? "bg-orange-500" : event?.status === "completed" ? "bg-green-500" : "bg-red-500"}`}>
                        {event?.status}
                      </span>
                    </td>
                    <td onClick={() => navigate(`/event-details/${event?._id}`, { state: { event, userId: event?.user?._id } })} className="py-3 px-4 text-blue-500">
                      <p className="cursor-pointer">View details</p>
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
            className={`px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Previous
          </button>

          <span className="text-gray-500">Page {currentPage} of {totalPages}</span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EventsTable;
