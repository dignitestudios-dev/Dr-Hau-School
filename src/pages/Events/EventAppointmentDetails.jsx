import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const EventAppointmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const appointment = location.state;

  if (!appointment) {
    return <div>No appointment data available.</div>;
  }

  const user = appointment?.user;
  const report = appointment?.appointment?.report;

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center">
        <IoMdArrowBack
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer text-[24px] text-gray-700 mr-2"
        />
        <h3 className="text-[24px] font-bold text-black ">Appointment Details</h3>
      </div>

      <div className="justify-center items-center mt-4">
        <div className="rounded-lg shadow-customShadow bg-white p-8">
          <div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-6">
            <div className="grid grid-cols-1 mb-6">
              <p className="font-medium text-[20px] text-black">Personal Information</p>
            </div>
            <div className="grid grid-cols-1 mb-6">
              <img
                src={user?.profilePicture || "https://i.pravatar.cc/40?img=3"}
                alt="profile"
                className="w-14 h-14 rounded-full mx-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Name</p>
                <p className="text-[14px] text-[#181818]">{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Date of Birth</p>
                <p className="text-[14px] text-[#181818]">
                  {new Date(user?.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
                <p className="text-[14px] text-[#181818]">{user?.programAttended}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Last 4 SSN</p>
                <p className="text-[14px] text-[#181818]">{appointment?.ssn || "N/A"}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
                <p className="text-[14px] text-[#181818]">{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-8">
            <div className="grid grid-cols-1 mb-6">
              <p className="font-semibold text-[20px] text-black">Appointment Details</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Vaccination</p>
                <p className="text-[14px] text-[#181818]">
                  {appointment?.appointment?.vaccinations.join(", ") || "N/A"}
                </p>
              </div>
              <div className="w-[300px]">
                <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Appointment Date</p>
                <p className="text-[14px] text-[#181818]">
                  {new Date(appointment?.appointment?.date).toLocaleDateString()}
                </p>
              </div>
              <div className="w-[300px]">
                <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Appointment Time</p>
                <p className="text-[14px] text-[#181818]">
                  {new Date(appointment?.appointment?.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Report Details */}
          {report && (
         <div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-8">
         <div className="grid grid-cols-1 mb-6">
           <p className="font-semibold text-[20px] text-black">Medical Report</p>
         </div>
       
         {/* Immunities */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Mumps Immunity</p>
             <p className="text-[14px] text-[#181818]">
               {report?.mumpsImmunity !== null ? (report?.mumpsImmunity ? "Positive" : "Negative") : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818] font-semibold">
               {report?.mumpsDate ? new Date(report?.mumpsDate).toLocaleDateString() : "Date: N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.mumpsNote || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Rubella Immunity</p>
             <p className="text-[14px] text-[#181818]">
               {report?.rubellaImmunity !== null ? (report?.rubellaImmunity ? "Positive" : "Negative") : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818] font-semibold">
               {report?.rubellaDate ? new Date(report?.rubellaDate).toLocaleDateString() : "Date: N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.rubellaNote || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Rubeola Immunity</p>
             <p className="text-[14px] text-[#181818]">
               {report?.rubeolaImmunity !== null ? (report?.rubeolaImmunity ? "Positive" : "Negative") : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818] font-semibold">
               {report?.rubeolaDate ? new Date(report?.rubeolaDate).toLocaleDateString() : "Date: N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.rubeolaNote || "Note: N/A"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Varicella Immunity</p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaImmunity !== null ? (report?.varicellaImmunity ? "Positive" : "Negative") : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818] font-semibold">
               {report?.varicellaDate ? new Date(report?.varicellaDate).toLocaleDateString() : "Date: N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaNote || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Hepatitis Immunity</p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisImmunity !== null ? (report?.hepatitisImmunity ? "Positive" : "Negative") : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818] font-semibold">
               {report?.hepatitisDate ? new Date(report?.hepatitisDate).toLocaleDateString() : "Date: N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisNote || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Physical Exam Date</p>
             <p className="text-[14px] text-[#181818]">
               {report?.physicalExamDate ? new Date(report?.physicalExamDate).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.physicalExamNote || "Note: N/A"}
             </p>
           </div>
         </div>
       
         {/* Test Dates */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">TSpot Test 1</p>
             <p className="text-[14px] text-[#181818]">
               {report?.tspot1Date ? new Date(report?.tspot1Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.tspot1Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">TSpot Test 2</p>
             <p className="text-[14px] text-[#181818]">
               {report?.tspot2Date ? new Date(report?.tspot2Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.tspot2Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Hepatitis B Vaccination 1</p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination1Date ? new Date(report?.hepatitisBVaccination1Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination1Note || "Note: N/A"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Hepatitis B Vaccination 2</p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination2Date ? new Date(report?.hepatitisBVaccination2Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination2Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Hepatitis B Vaccination 3</p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination3Date ? new Date(report?.hepatitisBVaccination3Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.hepatitisBVaccination3Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">MMR Vaccination 1</p>
             <p className="text-[14px] text-[#181818]">
               {report?.mmrVaccination1Date ? new Date(report?.mmrVaccination1Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.mmrVaccination1Note || "Note: N/A"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">MMR Vaccination 2</p>
             <p className="text-[14px] text-[#181818]">
               {report?.mmrVaccination2Date ? new Date(report?.mmrVaccination2Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.mmrVaccination2Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Varicella Vaccination 1</p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaVaccination1Date ? new Date(report?.varicellaVaccination1Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaVaccination1Note || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Varicella Vaccination 2</p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaVaccination2Date ? new Date(report?.varicellaVaccination2Date).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.varicellaVaccination2Note || "Note: N/A"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Tdap Vaccination</p>
             <p className="text-[14px] text-[#181818]">
               {report?.tdapVaccinationDate ? new Date(report?.tdapVaccinationDate).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.tdapVaccinationNote || "Note: N/A"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Influenza Vaccination</p>
             <p className="text-[14px] text-[#181818]">
               {report?.influenzaVaccinationDate ? new Date(report?.influenzaVaccinationDate).toLocaleDateString() : "N/A"}
             </p>
             <p className="text-[14px] text-[#181818]">
               {report?.influenzaVaccinationNote || "Note: N/A"}
             </p>
           </div>
         </div>
       
         {/* Drug Test Results */}
         <p className="font-semibold text-[20px] text-black mb-4">Drug Report</p>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Benzodiazepines</p>
             <p className="text-[14px] text-[#181818]">
               {report?.benzodiazepine ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Barbituates</p>
             <p className="text-[14px] text-[#181818]">
               {report?.barbituates ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Cocaine</p>
             <p className="text-[14px] text-[#181818]">
               {report?.cocaine ? "Positive" : "Negative"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Marijuana</p>
             <p className="text-[14px] text-[#181818]">
               {report?.marijuana ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Opiates</p>
             <p className="text-[14px] text-[#181818]">
               {report?.opiates ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Amphetamines</p>
             <p className="text-[14px] text-[#181818]">
               {report?.amphetamines ? "Positive" : "Negative"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Methamphetamines</p>
             <p className="text-[14px] text-[#181818]">
               {report?.methamphetamines ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">PCP</p>
             <p className="text-[14px] text-[#181818]">
               {report?.pcp ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Methadone</p>
             <p className="text-[14px] text-[#181818]">
               {report?.methadone ? "Positive" : "Negative"}
             </p>
           </div>
         </div>
       
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">MDMA</p>
             <p className="text-[14px] text-[#181818]">
               {report?.mdma ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Propoxyphene</p>
             <p className="text-[14px] text-[#181818]">
               {report?.propoxyphene ? "Positive" : "Negative"}
             </p>
           </div>
           <div>
             <p className="text-[16px] text-[#787F8C] font-semibold uppercase">Oxycodone</p>
             <p className="text-[14px] text-[#181818]">
               {report?.oxycodone ? "Positive" : "Negative"}
             </p>
           </div>
         </div>
       </div>
       
        

          
          
          )}
        </div>
      </div>
    </div>
  );
};

export default EventAppointmentDetails;
