import { FC } from "react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from "react-icons/fi";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "error" | "info" | "warning";
  position?: "top" | "bottom";
  className?: string;
}

/**
 * トースト通知コンポーネント
 * コピー成功時や操作フィードバック用の通知バーとして使用
 */
export const Toast: FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  type = "info",
  position = "bottom",
  className = "",
}) => {
  // タイプに応じたスタイル
  const typeStyles = {
    info: {
      bg: "bg-gray-800",
      icon: <FiInfo className="text-blue-300" />,
    },
    success: {
      bg: "bg-green-800",
      icon: <FiCheckCircle className="text-green-300" />,
    },
    error: {
      bg: "bg-red-800",
      icon: <FiAlertCircle className="text-red-300" />,
    },
    warning: {
      bg: "bg-yellow-700",
      icon: <FiAlertTriangle className="text-yellow-300" />,
    },
  };

  // 位置に応じたスタイル
  const positionStyles = {
    top: "top-4",
    bottom: "bottom-4",
  };

  // 表示状態のスタイル
  const visibilityClass = isVisible
    ? "opacity-100 transform translate-y-0"
    : "opacity-0 transform translate-y-4 pointer-events-none";

  if (!message) return null;

  return (
    <div
      className={`fixed ${positionStyles[position]} left-1/2 transform -translate-x-1/2 ${typeStyles[type].bg} text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50 transition-all duration-300 ${visibilityClass} ${className}`}
      role="alert"
    >
      <span className="mr-2">{typeStyles[type].icon}</span>
      <span className="mr-2">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-700 rounded-full"
        aria-label="閉じる"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};
