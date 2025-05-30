"use client";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export const LogoMark: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <span
    className={`relative inline-flex items-center justify-center w-9 h-9 ${className}`}
  >
    <span className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
      <FiCalendar className="w-1/2 h-1/2 text-white" />
    </span>
    <span className="absolute -top-1/9 -right-1/9 w-1/3 h-1/3 bg-blue-400 rounded-full border-2 border-white shadow-sm" />
  </span>
);
