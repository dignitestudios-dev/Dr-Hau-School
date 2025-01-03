import Home from "../pages/Dashboard/Home";
import OnboardLayout from "../layouts/OnboardLayout";
import GlobalLayout from "../layouts/GlobalLayout";
import Appointments from "../pages/Appointments/Appointments";
import Events from "../pages/Events/Events";
import StudentProfile from "../pages/Student/StudentProfile";
import EventDetails from "../pages/Events/EventDetails";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notifications/Notifications";
import PrivacyPolicy from "../pages/Privacypolicy/PrivacyPolicy";
import TermsOfService from "../pages/Termsandconditions/TermsOfService";
import EditProfile from "../pages/Profile/EditProfile";
import Splash from "../pages/onboarding/Splash";
import ProfileSetup from "../pages/onboarding/ProfileSetup";
import CookiePolicy from "../pages/CookiePolicy/CookiePolicy";
import EventAppointmentDetails from "../pages/Events/EventAppointmentDetails";
import ReportDetails from "../pages/Appointments/ReportDetails";


export const normalRoutes = [
    {
      title: "Dashboard",
      url: "/dashboard",
      page: <GlobalLayout page={<Home />} />,
    },
    {
      title: "Appointments",
      url: "/appointments",
      page: <GlobalLayout page={<Appointments />} />,
    },
    {
      title: "Events",
      url: "/events",
      page: <GlobalLayout page={<Events />} />,
    },
    {
      title: "Events",
      url: "/student-profile",
      page: <GlobalLayout page={<StudentProfile />} />,
    },
    {
      title: "Events Details",
      url: "/event-details/:id",
      page: <GlobalLayout page={<EventDetails />} />,
    },
    {
      title: "Profile",
      url: "/profile",
      page: <GlobalLayout page={<Profile />} />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      page: <GlobalLayout page={<Notifications />} />,
    },
    {
      title: "Privacy Policy",
      url: "/privacy-policy",
      page: <GlobalLayout page={<PrivacyPolicy />} />,
    },
    {
      title: "Terms Of Service",
      url: "/termsofservice",
      page: <GlobalLayout page={<TermsOfService />} />,
    },
    {
      title: "Edit Profile",
      url: "/edit-profile",
      page: <GlobalLayout page={<EditProfile />} />,
    },
    {
      title: "Splash",
      url: "/",
      page: <Splash />
    },
    {
      title: "Profile Setup",
      url: "/profile-setup",
      page: <ProfileSetup />,
    },
    {
      title: "Cookie Policy",
      url: "/cookie-policy",
      page: <GlobalLayout page={<CookiePolicy />} />,
    },
    {
      title: "Event Appointment Details",
      url: "/event-appointment-details",
      page: <GlobalLayout page={<EventAppointmentDetails />} />,
    },


    {
      title: "Report Details",
      url: "/report-details/:appointmentId",
      page: <GlobalLayout page={<ReportDetails />} />,
    },

    // <Route path="/report-details/:appointmentId" element={<ReportDetails />} />


]    
