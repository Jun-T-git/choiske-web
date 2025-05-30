import Link from "next/link";
import { FC } from "react";
import { FiHome, FiPlusCircle } from "react-icons/fi";

export const HeaderMenuPC: FC<{ onLinkClick?: () => void }> = ({
  onLinkClick,
}) => (
  <nav className="hidden sm:flex gap-3 text-base items-center">
    <Link
      href="/new"
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
      onClick={onLinkClick}
    >
      <FiPlusCircle className="w-5 h-5" />
      <span>新規作成</span>
    </Link>
    <Link
      href="/"
      className="flex items-center gap-1 text-gray-600 hover:text-blue-700 transition-colors"
      onClick={onLinkClick}
    >
      <FiHome className="w-5 h-5" />
      <span>トップ</span>
    </Link>
  </nav>
);
