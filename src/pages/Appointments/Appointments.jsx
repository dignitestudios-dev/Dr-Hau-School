import React, { useEffect, useState } from "react";
import axios from "../../axios"; 
import AppointmentsTable from "../../components/Appointments/AppointmentsTable";

const Appointments = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appointmentsPerPage] = useState(15); 

  const getAppointments = async (page) => {
    setLoading(true);
    setError(null); 
    try {
      const { data } = await axios.get(`/appointment/school?page=${page}&limit=${appointmentsPerPage}`);
      console.log("getAppointments data:", data);
      setAppointmentData(data?.data || []); 
      setTotalPages(data?.totalPages); 
    } catch (err) {
      console.error("Error fetching Appointments data:", err);
      setError("Failed to fetch Appointments. Please try again later."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      {error && <p className="text-red-500">{error}</p>}
      <AppointmentsTable 
        data={appointmentData} 
        loading={loading} 
        currentPage={currentPage} 
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Appointments;
