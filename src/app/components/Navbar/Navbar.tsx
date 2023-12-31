import React, { useContext, useEffect, useState } from "react";
import {
  MdPerson,
  MdNotifications,
  MdLogout,
  MdArrowDropDown,
} from "react-icons/md";
import DropDownItem from "../DropDownItem/DropDownItem";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const authCtx=useContext(AuthContext)

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const [activeTab, setActiveTab] = useState("unread");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        hour12: false,
      };

      const formattedDate = new Date().toLocaleDateString(
        "en-US",
        options as any
      );
      setCurrentDate(formattedDate);
    };

    // Update the current date on component mount
    getCurrentDate();

    // Update the current date every minute
    const interval = setInterval(getCurrentDate, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);



  return (
    <nav className="bg-primary-dark shadow p-4 sticky top-0 z-10 h-[64px] flex border-none">
      <div className="flex justify-between items-center w-full">
        {/* Profile Icon */}
        <div className="relative mr-4">
          <button onClick={toggleProfile} className="text-light flex items-end">
            {/* Your profile icon */}
            <MdPerson className="text-light text-2xl" />
            <MdArrowDropDown className="text-light text-2xl -ms-1" />
          </button>
          {isProfileOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md">
              <DropDownItem>
                <Link href={"profile"} className="flex items-center gap-1">
                  <MdPerson />
                  Profile
                </Link>
              </DropDownItem>
              <DropDownItem>
                <p
                  onClick={authCtx?.logout}
                  className="flex items-center gap-1"
                >
                  <MdLogout />
                  Logout
                </p>
              </DropDownItem>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-full">
          {/* Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            className="py-2 px-3 border border-primary-main rounded-radius-large focus:outline-none focus:border-primary-light max-w-[320px] sm:w-full"
          />

          {/* Date Display */}
          
          <div className="text-light ml-4 font-medium px-3 py-2 bg-primary-light rounded-radius-large"><span className="text-dark">Today is : </span>{currentDate}</div>
        </div>

        {/* Icons */}
        <div className="flex items-center">
          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="text-light flex items-end"
            >
              {/* Your notification icon */}
              <MdNotifications className="text-light text-2xl" />
              <MdArrowDropDown className="text-light text-2xl -ms-1" />
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white p-2 rounded-md shadow">
                {/* Notification Tabs */}
                <div className="flex mb-2">
                  <button
                    className={`w-1/2 py-1 text-center text-light rounded-radius-main ${
                      activeTab === "unread"
                        ? "bg-primary-dark"
                        : "text-primary-dark"
                    }`}
                    onClick={() => handleTabChange("unread")}
                  >
                    Unread
                  </button>
                  <button
                    className={`w-1/2 py-1 text-center text-light rounded-radius-main ${
                      activeTab === "read"
                        ? "bg-primary-dark"
                        : "text-primary-dark"
                    }`}
                    onClick={() => handleTabChange("read")}
                  >
                    Read
                  </button>
                </div>

                {/* Your notification dropdown content */}
                {activeTab === "unread" && (
                  <>
                    <DropDownItem>
                      <p>Unread Notification 1</p>
                    </DropDownItem>
                    <DropDownItem>
                      <p>Unread Notification 2</p>
                    </DropDownItem>
                  </>
                )}
                {activeTab === "read" && (
                  <>
                    <DropDownItem>
                      <p>Read Notification 1</p>
                    </DropDownItem>
                    <DropDownItem>
                      <p>Read Notification 2</p>
                    </DropDownItem>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;