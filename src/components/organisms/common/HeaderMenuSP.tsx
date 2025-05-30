import Link from "next/link";
import { FC } from "react";
import { FiCalendar, FiHome, FiPlusCircle, FiX } from "react-icons/fi";

export const HeaderMenuSP: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => (
  <div
    id="mobile-menu"
    className={`sm:hidden fixed inset-0 z-40 pointer-events-none select-none`}
    aria-hidden={!open}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/80 to-blue-200/60 backdrop-blur-sm transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto select-auto" : "opacity-0"
      }`}
    />
    <nav
      className={`absolute right-0 top-0 w-72 max-w-[90vw] h-full bg-white/95 border-l border-blue-100 shadow-2xl flex flex-col gap-2 text-base px-6 py-8 transition-transform duration-200 rounded-l-2xl ${
        open
          ? "translate-x-0 pointer-events-auto select-auto"
          : "translate-x-full"
      }`}
      tabIndex={open ? 0 : -1}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="flex items-center gap-2 text-lg font-bold text-blue-700">
          <FiCalendar className="w-5 h-5 text-blue-500" /> ちょいスケ
        </span>
        <button
          className="p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="メニューを閉じる"
          onClick={onClose}
        >
          <FiX className="w-6 h-6 text-blue-700" />
        </button>
      </div>
      <div className="border-t border-blue-100 mb-2" />
      <Link
        href="/new"
        className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-3 text-lg font-semibold transition-colors"
        onClick={onClose}
      >
        <FiPlusCircle className="w-5 h-5" />
        新規作成
      </Link>
      <div className="border-t border-blue-50 mx-2" />
      <Link
        href="/"
        className="flex items-center gap-3 text-gray-600 hover:bg-blue-50 rounded-lg px-3 py-3 text-lg font-semibold transition-colors"
        onClick={onClose}
      >
        <FiHome className="w-5 h-5" />
        トップ
      </Link>
      <div className="border-t border-blue-50 mx-2" />
    </nav>
  </div>
);
