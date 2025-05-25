import { FC, InputHTMLAttributes } from "react";
import { InputLabel } from "./InputLabel";

export type TextInputProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  note?: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">;

/**
 * 汎用テキスト入力コンポーネント
 */
export const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  note,
  className = "",
  inputClassName = "",
  placeholder,
  required = false,
  ...props
}) => (
  <div className={className}>
    {label && <InputLabel label={label} required={required} />}
    <input
      type="text"
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm ${inputClassName}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      {...props}
    />
    <div className="text-xs text-gray-400 mt-1">{note}</div>
  </div>
);
