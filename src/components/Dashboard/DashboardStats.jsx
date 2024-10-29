import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const DashboardStats = () => {
  const navigate = useNavigate();
  const [eventsCount, setEventsCount] = useState(0);
  
  useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const response = await axios.post('/event/school/count', {
          currentDate: new Date().toISOString(),
        });
        
        if (response?.data?.success) {
          setEventsCount(response?.data?.data?.eventsCount);
        }
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    };

    fetchEventCount();
  }, []);

  return (
    <div onClick={() => navigate("/events")} className="w-full lg:w-[70%] grid grid-cols-2 lg:grid-cols-5 justify-start items-start gap-2 lg:gap-[280px]">
      <div className="w-full lg:w-[240px] h-[100px] rounded-[24px] bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
          <CgFileDocument className="h-4" />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[28px] font-bold text-black">{eventsCount < 10 ? `0${eventsCount}` : eventsCount}</span>
          <span className="text-black text-[14px] font-normal">Upcoming Events</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
