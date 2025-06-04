import React from "react";

type TimezoneIndicatorProps = {
  className?: string;
};

/**
 * タイムゾーンインジケーターコンポーネント
 *
 * このコンポーネントは、表示されているデータのタイムゾーンを
 * ユーザーに明示的に示すために使用されます。
 */
const TimezoneIndicator: React.FC<TimezoneIndicatorProps> = ({ className }) => {
  return (
    <div className={`text-xs text-gray-500 ${className || ""}`}>
      <span className="inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        日本時間 (JST)
      </span>
    </div>
  );
};

export default TimezoneIndicator;
