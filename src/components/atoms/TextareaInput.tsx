import { validateLength } from "@/lib/utils/validationUtils";
import { FC, TextareaHTMLAttributes, useEffect, useState } from "react";
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
  minLength?: number;
  showLength?: boolean;
  errorMessage?: string;
  fieldName?: string;
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
  minLength,
  showLength = false,
  errorMessage,
  fieldName,
  ...props
}) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const validationError = validateLength(value, {
      minLength,
      maxLength,
      required,
      fieldName: fieldName || label || "テキスト",
    });

    // カスタムエラーメッセージが指定されていれば、それを優先
    setError(errorMessage || validationError || "");
  }, [value, maxLength, minLength, required, errorMessage, fieldName, label]);

  return (
    <div className={className}>
      {label && <InputLabel label={label} required={required} />}
      <textarea
        className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm ${textareaClassName} ${
          error ? "border-red-400" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      <div className="flex items-center justify-between mt-1">
        {note && <div className="text-xs text-gray-400">{note}</div>}
        {showLength && (
          <div className="text-xs text-gray-400 ml-auto">
            {value.length}
            {maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
      <div className="min-h-[20px]">
        {error ? (
          <div className="text-xs text-red-500 mt-1">{error}</div>
        ) : (
          <div className="text-xs text-transparent mt-1">placeholder</div>
        )}
      </div>
    </div>
  );
};
