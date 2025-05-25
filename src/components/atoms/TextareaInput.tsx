import { FC, TextareaHTMLAttributes } from "react";
import { InputLabel } from "./InputLabel";

export type TextareaInputProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  required?: boolean;
  note?: string;
  rows?: number;
  maxLength?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">;

/**
 * 汎用テキストエリア入力コンポーネント
 */
export const TextareaInput: FC<TextareaInputProps> = ({
  label,
  value,
  onChange,
  className = "",
  textareaClassName = "",
  placeholder,
  required,
  note,
  rows = 3,
  maxLength,
  ...props
}) => (
  <div className={className}>
    {label && <InputLabel label={label} required={required} />}
    <textarea
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm ${textareaClassName}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      maxLength={maxLength}
      {...props}
    />
    {note && <div className="text-xs text-gray-400 mt-1">{note}</div>}
  </div>
);
