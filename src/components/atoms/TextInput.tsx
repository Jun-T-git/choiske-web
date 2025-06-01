import { validateLength } from "@/lib/utils/validationUtils";
import { FC, InputHTMLAttributes, useEffect, useState } from "react";
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
  maxLength?: number;
  minLength?: number;
  showLength?: boolean;
  errorMessage?: string;
  fieldName?: string;
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
      <input
        type="text"
        className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm ${inputClassName} ${
          error ? "border-red-400" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        {...props}
      />
      <div className="flex items-center justify-between mt-1">
        <div className="text-xs text-gray-400">{note}</div>
        {showLength && (
          <div className="text-xs text-gray-400 ml-auto">
            {value.length}
            {maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};
