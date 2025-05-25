import { FC, ReactNode } from "react";

export type InputLabelProps = {
  label: ReactNode;
  required?: boolean;
  className?: string;
};

/**
 * 汎用ラベル＋必須/任意バッジ
 */
export const InputLabel: FC<InputLabelProps> = ({
  label,
  required = false,
  className = "",
}) => (
  <label
    className={`text-sm font-semibold text-gray-700 mb-1 flex items-center ${className}`}
  >
    {label}
    {required ? (
      <span className="inline-block bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-bold ml-2 align-middle">
        必須
      </span>
    ) : (
      <span className="inline-block bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-xs font-bold ml-2 align-middle">
        任意
      </span>
    )}
  </label>
);
