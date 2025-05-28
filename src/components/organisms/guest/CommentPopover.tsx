"use client";
import { FC, useEffect, useState } from "react";

interface CommentPopoverProps {
  comment: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CommentPopover: FC<CommentPopoverProps> = ({
  comment,
  open,
  onOpenChange,
}) => {
  const controlled = typeof open === "boolean" && !!onOpenChange;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlled ? open : internalOpen;
  const setOpen = controlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest(".comment-popover-root")) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen, setOpen]);

  return (
    <div className="relative inline-block comment-popover-root">
      <button
        type="button"
        className="text-blue-400 hover:text-blue-600 focus:outline-none transition-transform duration-150 hover:-translate-y-0.5 active:scale-95"
        aria-label="コメントを表示"
        onClick={() => setOpen(!isOpen)}
        tabIndex={0}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.1-3.3A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 animate-fadein">
          <div className="relative">
            <div className="bg-white border border-blue-200 rounded-xl shadow-2xl px-2.5 py-1.5 text-xs text-gray-700 whitespace-pre-line min-w-[150px] max-w-xs md:max-w-sm lg:max-w-md transition-all duration-200">
              <div className="flex items-center justify-between gap-2">
                <span className="flex-1 break-words text-left">{comment}</span>
                <button
                  type="button"
                  className="ml-2 text-blue-400 hover:text-blue-600 focus:outline-none rounded-full transition-colors duration-100"
                  aria-label="閉じる"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* 吹き出し三角 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white border-b-0"
              style={{ zIndex: 41 }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-blue-200 border-b-0 mt-0.5"
              style={{ zIndex: 40 }}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
