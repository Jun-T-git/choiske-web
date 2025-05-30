"use client";
import { LogoMark } from "@/components/atoms/LogoMark";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { HeaderMenuPC } from "./HeaderMenuPC";
import { HeaderMenuSP } from "./HeaderMenuSP";

export const CommonHeader: FC = () => {
  const [open, setOpen] = useState(false);

  // メニュー開閉ハンドラ
  const handleMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  // メニュー外クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu && !menu.contains(e.target as Node)) {
        handleMenuToggle();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleMenuToggle();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-2 py-1.5">
        <Link
          href="/"
          className="group flex items-center"
          aria-label="トップページへ"
        >
          <div className="flex items-center rounded-full px-3 py-1 transition-all duration-300">
            {/* ロゴマーク部分 */}
            <LogoMark className="mr-2 group-hover:scale-105 transform-gpu transition-transform duration-300" />

            {/* テキストロゴ部分 */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <span
                  className="text-blue-600 font-bold leading-tight"
                  style={{
                    fontFamily: '"M PLUS Rounded 1c", system-ui, sans-serif',
                    fontSize: "1.4rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  ちょいスケ
                </span>
                <span className="ml-1 text-[10px] text-white font-medium tracking-tight px-1.5 py-0.5 bg-blue-500 rounded-full hidden sm:inline-flex items-center">
                  β版
                </span>
              </div>
              <span
                className="text-[10px] text-gray-400 tracking-tight font-medium -mt-0.5 pl-0.5"
                style={{
                  fontFamily: '"M PLUS Rounded 1c", system-ui, sans-serif',
                }}
              >
                ベストなスケジュールをチョイス
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <HeaderMenuPC />
          {/* モバイル用ハンバーガー */}
          <button
            className={`sm:hidden p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
              open ? "bg-blue-50 shadow-inner" : ""
            }`}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={handleMenuToggle}
          >
            {open ? (
              <FiX className="w-5 h-5 text-blue-600 transition-all duration-200" />
            ) : (
              <FiMenu className="w-5 h-5 text-blue-600 transition-all duration-200" />
            )}
          </button>
        </div>
      </div>
      <HeaderMenuSP open={open} onClose={() => setOpen(false)} />
    </header>
  );
};
