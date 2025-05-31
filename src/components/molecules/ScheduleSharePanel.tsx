"use client";
import { FC, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ShareButtons } from "./ShareButtons";

interface ScheduleSharePanelProps {
  title: string;
  token: string;
  className?: string;
}

/**
 * スケジュール共有パネル
 * - 回答ページへのリンクと編集ページへのリンクを共有するためのパネル
 */
export const ScheduleSharePanel: FC<ScheduleSharePanelProps> = ({
  title,
  token,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 回答用URL
  const answerUrl = `${window.location.origin}/guest/${token}/answer`;
  // サマリー（一覧表示）用URL
  const summaryUrl = `${window.location.origin}/guest/${token}/summary`;

  return (
    <div
      className={`border border-blue-100 rounded-lg overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
      >
        <span className="font-medium">このスケジュールを共有する</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="p-4 bg-white">
          <div className="mb-5">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              回答用URL
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              このURLを共有して、他の参加者に回答を促しましょう
            </p>
            <ShareButtons
              url={answerUrl}
              title={`${title} - 日程調整`}
              message={`「${title}」の日程調整に回答をお願いします。`}
              className="mt-1"
            />
          </div>

          <div className="mb-1 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              回答状況確認用URL
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              このURLでみんなの回答状況を確認できます
            </p>
            <ShareButtons
              url={summaryUrl}
              title={`${title} - 回答状況`}
              message={`「${title}」の日程調整の回答状況です。`}
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
