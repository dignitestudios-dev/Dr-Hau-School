import React, { useState, useRef } from "react";
import axios from "../../axios"; 
import ProfileCompleteModal from "../../components/onboarding/ProfileCompleteModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { MdAddAPhoto } from "react-icons/md";
import {Logo} from "../../assets/export";

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
  
  const [campuses, setCampuses] = useState([]); // Dynamic campuses list

  const fileInputRef = useRef(null); 

  const schoolCampusData = {
    "ACC": ["Los Angeles", "Ontario", "Orange County"],
    "Annenberg": ["None"],
    "Azusa Adult School": ["None"],
    "CCC": ["Garden Grove", "North Hollywood", "San Bernardino", "San Diego"],
    "CDI": ["None"],
    "Claremont Adult School": ["None"],
    "CNI OC": ["None"],
    "College of the Desert": ["None"],
    "Crafton Hills": ["None"],
    "Fontana School District": ["None"],
    "Glendale Career College": ["None"],
    "Healthcare Career College": ["None"],
    "Monrovia Adult School": ["None"],
    "National Career College": ["None"],
    "NDCI": ["None"],
    "Northwest": ["Anaheim", "Long Beach", "Pomona", "Riverside", "San Diego", "Van Nuys", "West Covina"],
    "Pacific College": ["None"],
    "Platt": ["Alhambra", "Anaheim", "Ontario", "Riverside"],
    "Smith Chason": ["None"],
    "Unitek": ["Bakersfield", "Concord", "Fremont", "Hayward", "Reno", "Sacramento", "San Jose", "South San Francisco"]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSchoolChange = (e) => {
    const selectedSchool = e.target.value;
    setFormData({ ...formData, schoolName: selectedSchool, campus: "" });
    setCampuses(schoolCampusData[selectedSchool] || []); // Update campus options based on selected school
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); 

    // Validation to ensure all fields are filled
    if (
      !formData.schoolName ||
      !formData.programDep ||
      !formData.adminName ||
      !formData.campus ||
      !formData.profilePicture
    ) {
      ErrorToast("Please fill in all fields and upload a profile picture.");
      return; // Prevent form submission if any required field is missing
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios?.post('/school/complete', data, {
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
          <img src={Logo} alt="perfectboat_logo" className="h-24 mt-8" />
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
              <select
                name="schoolName"
                value={formData.schoolName}
                onChange={handleSchoolChange}
                className="border border-black p-3 rounded-md"
                required
              >
                <option value="">Select a School</option>
                {Object.keys(schoolCampusData).map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Campus</label>
              <select
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                required
                disabled={!formData.schoolName} // Disable until school is selected
              >
                <option value="">Select a Campus</option>
                {campuses.map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
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
