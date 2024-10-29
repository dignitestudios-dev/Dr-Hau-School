import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { RiNotificationLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsExclamationSquare } from "react-icons/bs";
import { HiOutlineShieldExclamation } from "react-icons/hi2";
import { MdOutlineCookie } from "react-icons/md";





export const sidebarArr = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    title: "Events",
    url: "/events",
    icon: <HiOutlineDocumentText />,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <FiUser />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: <RiNotificationLine />,
  },
  {
    title: "Terms Of Services",
    url: "/termsofservice",
    icon: <HiOutlineShieldExclamation />,
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
    icon: <HiOutlineExclamationCircle />,
  },
  {
    title: "Cookie Policy",
    url: "/cookie-policy",
    icon: <MdOutlineCookie />,
  },
];