// Header component with logo, app name, and user icon with dropdown
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/Gsynergy.svg";

const Header = () => {
  const [user] = useState(auth.currentUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <header className="w-full bg-slate-150 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Company Logo" className="h-10 w-auto" />
        </div>

        {/* Centered App Name */}
        <div className="text-3xl font-medium flex-1 text-center">
          Data Viewer App
        </div>

        {/* User Icon with Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2">
            <UserCircleIcon className="w-8 h-8 text-gray-700 cursor-pointer" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="px-4 py-2 text-gray-700 border-b">
                {user?.displayName || "User"}
              </div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-200" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
