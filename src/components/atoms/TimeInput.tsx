import { FC } from "react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  name?: string;
  className?: string;
  inputClassName?: string;
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
}) => (
  <label className={`flex flex-col items-start gap-1 w-full ${className}`}>
    <span className="text-sm text-gray-700 font-semibold">{label}</span>
    <input
      type="time"
      name={name}
      className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base ${inputClassName}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);
