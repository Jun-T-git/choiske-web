"use client";

import { LogoMark } from "@/components/atoms/LogoMark";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに出力（本番環境ではエラー監視サービスに送信するなど）
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center"
        >
          {/* ロゴ */}
          <div className="flex justify-center mb-6">
            <LogoMark className="w-16 h-16" />
          </div>

          {/* エラーアイコン */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FiAlertTriangle size={40} className="text-red-500" />
            </div>
          </div>

          {/* エラーメッセージ */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-gray-600 mb-8">
            申し訳ありませんが、ページの表示中に問題が発生しました。
            <br />
            しばらく時間をおいてから再度お試しください。
          </p>

          {/* ボタングループ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg px-5 py-3 transition-colors duration-200 w-full sm:w-auto"
            >
              <FiArrowLeft />
              トップページに戻る
            </Link>
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-3 transition-colors duration-200 w-full sm:w-auto"
            >
              <FiRefreshCw />
              もう一度試す
            </button>
          </div>

          {/* エラー情報（開発環境でのみ表示） */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-sm font-mono text-gray-500 break-all">
                {error.message || "Unknown error"}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-gray-400 mt-2">
                  エラーID: {error.digest}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
