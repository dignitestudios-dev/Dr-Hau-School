import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import EventAppointmentsTable from '../../components/Events/EventAppointmentsTable';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import EventsModal from '../../components/Events/EventsModal';

const EventDetail = () => {
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { id } = useParams()

  const eventDetail = location.state; 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!eventDetail) {
    return <div>No event details available.</div>; 
  }

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto"> 
      <div className="flex items-center mb-6">
        <IoMdArrowBack onClick={() => navigate("/events")}
          className="text-[24px] text-gray-700 mr-3" />
        <h3 className="text-[24px] font-bold text-black">Event Detail</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex mb-6 border-b">
          <button
            className={`mr-4 pb-2 text-[16px] font-semibold ${activeTab === 'details' ? 'text-black border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`pb-2 text-[16px] font-semibold ${activeTab === 'appointments' ? 'text-black border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>

        {activeTab === 'details' ? (
          <div>
            <h4 className="text-[20px] font-bold text-black mb-4">
              Vaccination Appointment 
              <span className={`bg-${eventDetail?.event?.status === "Upcoming" ? "orange" : eventDetail?.event?.status === "Completed" ? "green" : "red"}-500 text-white px-3 py-2 text-[12px] rounded-full ml-2`}>
                {eventDetail?.event?.status}
              </span>
            </h4>
            <p className="text-[14px] text-gray-600 mb-4">{eventDetail?.event?.description}</p>

            <div className="flex items-center text-[14px] text-gray-700 mb-2">
              <span className="mr-3">🕒</span> {new Date(eventDetail?.event?.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(eventDetail?.event?.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center text-[14px] text-gray-700 mb-4">
              <span className="mr-3">📅</span> {new Date(eventDetail?.event?.date).toLocaleDateString()}
            </div>

            <div className="mb-4">
              <strong className='text-black'>Vaccinations:</strong>
              <ul className="list-disc ml-5 text-[14px] text-[#858585]">
                {eventDetail?.event?.vaccinations?.map((vaccine, index) => (
                  <li key={index}>{vaccine}</li>
                ))}
              </ul>
            </div>

            <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-md">Send Alerts to Students</button>
          </div>
        ) : (
          <EventAppointmentsTable id={id} />
        )}
      </div>
      <EventsModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default EventDetail;
