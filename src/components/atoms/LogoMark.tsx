"use client";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export const LogoMark: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <span
    className={`relative inline-flex items-center justify-center ${className}`}
  >
    <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
      <FiCalendar className="w-[18px] h-[18px] text-white" />
    </span>
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-sm" />
  </span>
);
