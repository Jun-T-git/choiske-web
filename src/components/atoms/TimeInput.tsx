import { validateTimeFormat } from "@/lib/utils/validationUtils";
import { FC, useEffect, useState } from "react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  name?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  errorMessage?: string;
}

/**
 * 汎用時刻入力コンポーネント
 */
export const TimeInput: FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  name,
  className = "",
  inputClassName = "",
  required = false,
  errorMessage,
}) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (required && !value) {
      setError("時間を入力してください");
      return;
    }

    const validationError = validateTimeFormat(value);
    setError(errorMessage || validationError || "");
  }, [value, required, errorMessage]);

  return (
    <div className={`flex flex-col items-start gap-1 w-full ${className}`}>
      <label className="text-sm text-gray-700 font-semibold">
        {label}
        {required && (
          <span className="inline-block bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-bold ml-2 align-middle">
            必須
          </span>
        )}
      </label>
      <input
        type="time"
        name={name}
        className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base ${inputClassName} ${
          error ? "border-red-400" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};
