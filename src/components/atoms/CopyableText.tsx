"use client";
import { useCallback, useState } from "react";

/**
 * 汎用コピーボックス
 * - value: コピー対象のテキスト
 * - label: ラベル（任意）
 * - className: 追加クラス（任意）
 */
export function CopyableText({
  value,
  label,
  className,
  inputClassName,
  buttonClassName,
}: {
  value: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [value]);

  return (
    <div className={`mb-4 ${className ?? ""}`}>
      {label && <div className="text-gray-600 mb-1">{label}</div>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          readOnly
          className={`flex-1 border border-gray-300 rounded px-2 py-2 text-base ${
            inputClassName ?? ""
          }`}
        />
        <button
          onClick={handleCopy}
          className={`h-10 px-3 py-2 bg-blue-500 text-white rounded flex items-center gap-1 ${
            buttonClassName ?? ""
          }`}
          aria-label="コピー"
          style={{ minHeight: 40 }}
        >
          {copied ? (
            <>
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 20 20"
                className="inline-block align-middle"
              >
                <path
                  d="M5 10l4 4 6-6"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">コピー済み</span>
            </>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 20 20"
                className="inline-block align-middle"
              >
                <rect
                  x="7"
                  y="7"
                  width="9"
                  height="9"
                  rx="2"
                  stroke="#fff"
                  strokeWidth="1.8"
                />
                <rect
                  x="4"
                  y="4"
                  width="9"
                  height="9"
                  rx="2"
                  stroke="#fff"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="sr-only">コピー</span>
            </>
          )}
        </button>
      </div>
      <div style={{ minHeight: 20, display: "flex", alignItems: "center" }}>
        <span
          className={`text-xs mt-1 transition-opacity duration-200 text-gray-500 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
          style={{ minHeight: 16 }}
        >
          コピーしました
        </span>
      </div>
    </div>
  );
}
