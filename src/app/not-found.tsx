"use client";
import { LogoMark } from "@/components/atoms/LogoMark";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiPlus } from "react-icons/fi";

export default function NotFound() {
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

          {/* エラーメッセージ */}
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
            <br />
            URLが正しいかご確認ください。
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
            <Link
              href="/new"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-3 transition-colors duration-200 w-full sm:w-auto"
            >
              <FiPlus />
              新しく予定を作成する
            </Link>
          </div>

          {/* アイコン装飾 */}
          <div className="relative max-w-[200px] h-[100px] mx-auto mt-10">
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20"
            >
              <FiCalendar size={100} className="text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
