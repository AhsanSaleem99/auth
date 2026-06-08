"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { logout } from "@/actions/user";
import { redirect } from "next/navigation";
import "@/app/globals.css";

interface NavbarProps {
  user: { id: string; role: string; name?: string; avatarUrl?: string } | null;
}

const handleLogout = async () => {
  await logout();
  redirect("/");
};

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay so user can move mouse into dropdown
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-neutral-900 text-white shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-white transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 group"
      >
        {/* Icon */}
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-blue-500 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c0-1 1-3 3-3s3 2 3 3c0 1-1 3-3 3s-3-2-3-3z"
          />
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10-4-8-8-8-8 4-8 10 8 8 8 8z"
          />
        </svg>

        <span className="text-2xl md:text-3xl font-bold tracking-tight">
          Auth
          <span className="text-white transition-colors duration-300 group-hover:text-blue-400">
            X
          </span>
        </span>
      </Link>

      {/* Nav Links / Avatar */}
      <ul className="flex gap-2 md:gap-6 items-center">
        {!user ? (
          <>
            <li>
              <Link
                href="/login"
                className="text-white hover:text-blue-400 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/private/dashboard"
                className="text-white hover:text-blue-400 transition-colors duration-300"
              >
                Dashboard
              </Link>
            </li>

            {/* Avatar + Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Avatar Button */}
              <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-400 transition-colors">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user.name?.[0].toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg overflow-hidden z-50">
                  <ul className="flex flex-col py-1">
                    {/* Placeholder Options */}
                    <li>
                      <button className="w-full text-center px-4 py-2 text-white hover:bg-blue-600 transition-colors cursor-not-allowed ">
                        FAQs
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-center px-4 py-2 text-white hover:bg-blue-600 transition-colors cursor-not-allowed">
                        Help Center
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-center px-4 py-2 text-white hover:bg-blue-600 transition-colors cursor-not-allowed">
                        Support
                      </button>
                    </li>

                    {/* Settings - only for admin */}
                    {user.role === "admin" && (
                      <li>
                        <Link
                          href="/private/settings"
                          className="block px-4 py-2 text-center text-white hover:bg-blue-600 transition-colors"
                        >
                          Settings
                        </Link>
                      </li>
                    )}

                    {/* Logout always last */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-cente px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
