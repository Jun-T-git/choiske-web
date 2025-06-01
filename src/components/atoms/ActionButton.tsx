import { FC, ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/**
 * 共通アクションボタンコンポーネント
 * 各フォームで使用される送信ボタン、キャンセルボタン等を共通化
 */
export const ActionButton: FC<ActionButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  isLoading = false,
  loadingText,
  variant = "primary",
  size = "md",
  fullWidth = false,
}) => {
  // variantに応じたスタイル
  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow focus:ring-blue-300",
    secondary:
      "border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:text-blue-600 hover:border-blue-300 shadow-sm focus:ring-blue-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow focus:ring-red-300",
    outline:
      "border border-blue-300 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-200",
  };

  // sizeに応じたスタイル
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs rounded-lg",
    md: "px-6 py-2 text-sm rounded-xl",
    lg: "px-8 py-3 text-base rounded-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthClass}
        font-semibold transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-70 disabled:cursor-not-allowed
        ${disabled && !isLoading ? "bg-opacity-60" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <span className="inline-flex items-center justify-center">
          <LoadingSpinner className="-ml-1 mr-2" size={16} />
          {loadingText || children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
