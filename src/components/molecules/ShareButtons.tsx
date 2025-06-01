"use client";
import { Toast } from "@/components/atoms/Toast";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { useToast } from "@/lib/hooks/useToast";
import { FiCopy, FiMail } from "react-icons/fi";

interface ShareButtonsProps {
  url: string;
  title: string;
  message?: string;
  compact?: boolean;
  className?: string;
}

/**
 * シェア用ボタングループ（LINE、メール、コピー）
 */
export const ShareButtons = ({
  url,
  title,
  message = "日程調整用URLをシェアします",
  compact = false,
  className = "",
}: ShareButtonsProps) => {
  const { copy, copied } = useClipboard({
    timeout: 1500,
    onError: (err) =>
      console.error("クリップボードへのコピーに失敗しました", err),
  });

  const {
    showToast,
    hideToast,
    visible,
    message: toastMessage,
  } = useToast({
    duration: 1800,
    autoClose: true,
  });

  // URLをエンコード
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedMessage = encodeURIComponent(message);

  // LINEシェアURL
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedMessage}%0A${encodedTitle}`;

  // メールシェアURL
  const mailShareUrl = `mailto:?subject=${encodedTitle}&body=${encodedMessage}%0A${encodedUrl}`;

  // URLコピー
  const handleCopy = async () => {
    const success = await copy(url);
    if (success) {
      showToast("URLをコピーしました", "success");
    }
  };

  return (
    <div className={`${className}`}>
      {/* コンパクト表示の場合はラベルなし、通常表示の場合はラベルあり */}
      {!compact && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">シェア</h3>
      )}

      <div className="flex flex-wrap gap-2">
        {/* LINEボタン */}
        <a
          href={lineShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-3 py-2 bg-[#06C755] text-white rounded-md hover:opacity-90 transition-opacity"
          aria-label="LINEでシェア"
        >
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-1"
              fill="white"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            {!compact && <span className="text-sm">LINEで送る</span>}
          </div>
        </a>

        {/* メールボタン */}
        <a
          href={mailShareUrl}
          className="flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          aria-label="メールでシェア"
        >
          <div className="flex items-center">
            <FiMail className="text-gray-700" size={18} />
            {!compact && <span className="text-sm ml-1">メールで送る</span>}
          </div>
        </a>

        {/* コピーボタン */}
        <button
          onClick={handleCopy}
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
            copied
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
          }`}
          aria-label="URLをコピー"
        >
          <div className="flex items-center">
            <FiCopy size={18} />
            {!compact && (
              <span className="text-sm ml-1">
                {copied ? "コピーしました" : "URLをコピー"}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* トースト通知 */}
      <Toast
        isVisible={visible}
        message={toastMessage}
        onClose={hideToast}
        type="success"
        position="bottom"
      />
    </div>
  );
};
