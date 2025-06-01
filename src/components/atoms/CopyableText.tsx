"use client";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { FiCheck, FiCopy } from "react-icons/fi";

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
  const { copy, copied } = useClipboard({ timeout: 1200 });

  const handleCopy = async () => {
    if (!value) return;
    await copy(value);
  };

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
              <FiCheck className="inline-block align-middle" size={20} />
              <span className="sr-only">コピー済み</span>
            </>
          ) : (
            <>
              <FiCopy className="inline-block align-middle" size={20} />
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
