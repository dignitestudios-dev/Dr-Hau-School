import React, { useState, useRef } from "react";
import axios from "../../axios"; 
import ProfileCompleteModal from "../../components/onboarding/ProfileCompleteModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { MdAddAPhoto } from "react-icons/md";


const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    programDep: "", 
    adminName: "",
    campus: "",
    profilePicture: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); 

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('/school/complete', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setSuccessMessage(response?.data?.message);
        setIsModalOpen(true);
        localStorage.setItem("token", response?.data?.data?.token);
      }
    } catch (error) {
      setApiError(error?.response?.data?.message);
     // console.error("API error:", error?.response?.data?.message);
      // console.error("API error:", error);
      ErrorToast(error?.response?.data?.message || "Please try again.");


    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (successMessage) {
      setFormData({
        schoolName: "",
        programDep: "", 
        adminName: "",
        campus: "",
        profilePicture: null,
      });
      setSuccessMessage("");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-6">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 hidden lg:block">
        <h1 className="text-xl sm:text-3xl font-bold">Logo</h1>
      </div>
      <div className="bg-white w-full h-auto sm:h-auto max-w-4xl sm:mt-8 mt-6 p-4 lg:p-10 sm:p-6 rounded-lg shadow-lg lg:ml-28 lg:h-[600px]">
        <div className="lg:flex lg:items-center lg:justify-start mb-4 sm:mb-6">
          <h1 className="lg:text-[28px] sm:text-xl font-bold lg:mr-6">Profile Setup</h1>
        </div>

        <div className="lg:flex lg:items-center lg:justify-start mb-6">
          <img
            src={formData?.profilePicture ? URL.createObjectURL(formData?.profilePicture) : "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <button type="button" onClick={handleUploadClick} className="text-black font-bold underline">Upload Photo</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData?.schoolName}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="School Name"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Administrator Name</label>
              <input
                type="text"
                name="adminName"
                value={formData?.adminName}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Administrator Name"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Program Department</label>
              <input
                type="text"
                name="programDep" 
                value={formData?.programDep} 
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Program Department"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Campus</label>
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Campus"
                required
              />
            </div>
          </div>

          {apiError && <p className="text-red-600 mt-4">{apiError}</p>}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}

          <div className="mt-6 flex justify-center sm:justify-start mb-6">
            <button
              type="submit"
              className="bg-black w-full sm:w-[150px] text-white py-2 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <ProfileCompleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={successMessage}
      />
    </div>
  );
};

export default ProfileSetup;
