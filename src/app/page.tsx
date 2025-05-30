"use client";
import {
  CalendarIllustration,
  PeopleIllustration,
} from "@/components/atoms/IllustrationElement";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiShare2,
} from "react-icons/fi";

// 特徴セクションのためのデータ
const features = [
  {
    icon: <FiClock className="text-blue-500" />,
    title: "時間単位の細かい調整",
    description:
      "日付だけでなく時間も30分単位で調整可能。より精度の高いスケジュール調整ができます。",
  },
  {
    icon: <FiShare2 className="text-blue-500" />,
    title: "会員登録一切不要",
    description:
      "アカウント作成やログイン不要。URLを共有するだけで、誰でもすぐに使い始められます。",
  },
  {
    icon: <FiCheckCircle className="text-blue-500" />,
    title: "シンプルで高機能",
    description:
      "直感的な操作性と必要な機能を両立。複雑な設定なしで、すぐに最適な日程を見つけられます。",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ヒーローセクション */}
      <section className="flex flex-col items-center justify-center min-h-[65vh] md:min-h-[80vh] px-4 pb-10 md:pb-0 relative overflow-hidden">
        {/* 装飾要素 - CLS防止のため初期状態でもスペースを確保 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-5 left-10 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl"
          style={{ transform: "translateY(0)" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-5 right-10 w-40 h-40 rounded-full bg-indigo-300/10 blur-3xl"
          style={{ transform: "translateY(0)" }}
        />

        {/* 中央コンテンツ */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 z-10 w-full max-w-5xl">
          {/* イラスト部分 (モバイルでは非表示) */}
          <div className="hidden md:flex md:order-1 order-2 mt-8 md:mt-0 mb-20 md:mb-0 flex-col items-center">
            <motion.div
              className="mb-6 md:mb-8 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-white/40 to-blue-100/40 rounded-xl blur-xl transform scale-95"></div>
              <CalendarIllustration className="w-full max-w-[240px]" />
            </motion.div>
            <motion.div
              className="w-full relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-white/40 to-indigo-100/40 rounded-xl blur-xl transform scale-95"></div>
              <PeopleIllustration className="w-full max-w-[230px]" />
            </motion.div>
          </div>

          {/* メインカード */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ transform: "translateY(0)" }}
            className="md:order-2 order-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 max-w-md w-full p-8 flex flex-col items-center gap-5 z-10"
          >
            <div className="flex items-center justify-center bg-blue-100 rounded-xl w-16 h-16">
              <FiCalendar className="text-blue-600" size={30} />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
                ちょいスケ
              </h1>
              <p className="text-blue-500 text-sm font-semibold mb-4 tracking-wide">
                30分単位で調整できる日程調整ツール
              </p>
              <p className="text-gray-700 text-center mb-5 leading-relaxed">
                会員登録なしですぐに使える！
                <br />
                日付も時間も細かく調整可能で、
                <br />
                シンプル操作で最適な日程が見つかります。
              </p>
            </div>

            <Link
              href="/new"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl py-3.5 text-center shadow-md transition duration-300 transform hover:translate-y-[-1px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              <motion.span
                className="inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                今すぐ作成（会員登録不要）
                <FiCalendar size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* スクロールガイド */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute md:bottom-5 bottom-5 flex flex-col items-center"
        >
          <span className="text-sm text-gray-500 hidden md:block">
            詳細を見る
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-6 flex items-center justify-center"
          >
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 16L2 10L3.4 8.6L8 13.2L12.6 8.6L14 10L8 16Z"
                fill="#94A3B8"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* 特徴セクション */}
      <section className="py-12 px-3 md:py-16 md:px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 md:mb-10">
            ちょいスケの特徴
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={{ transform: "translateY(0)" }}
                className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer min-h-[200px]"
              >
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用方法セクション */}
      <section className="py-12 px-3 md:py-16 md:px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 md:mb-10">
            シンプル3ステップ
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* 接続線 (PCのみ表示) */}
            <div className="hidden md:block absolute top-16 left-[25%] w-[50%] h-0.5 bg-blue-100">
              <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-blue-400 -mt-0.5"></div>
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-blue-400 -mt-0.5"></div>
            </div>

            {/* ステップ1 */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ transform: "translateY(0)" }}
              className="flex flex-col items-center text-center min-h-[230px]"
            >
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-5 shadow-md">
                1
              </div>
              <h3 className="font-bold text-gray-800 mb-3">日時を選択</h3>
              <p className="text-sm text-gray-600 mb-4">
                日付だけでなく、30分単位で時間帯も選択可能。細かい時間調整もカンタンにできます。
              </p>
              <FiClock className="text-blue-500" size={28} />
            </motion.div>

            {/* ステップ2 */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ transform: "translateY(0)" }}
              className="flex flex-col items-center text-center min-h-[230px]"
            >
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-5 shadow-md">
                2
              </div>
              <h3 className="font-bold text-gray-800 mb-3">簡単に共有</h3>
              <p className="text-sm text-gray-600 mb-4">
                ログイン不要でURLを共有。回答する側も会員登録なしでスムーズに回答できます。
              </p>
              <FiShare2 className="text-blue-500" size={28} />
            </motion.div>

            {/* ステップ3 */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ transform: "translateY(0)" }}
              className="flex flex-col items-center text-center min-h-[230px]"
            >
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-5 shadow-md">
                3
              </div>
              <h3 className="font-bold text-gray-800 mb-3">最適日程を発見</h3>
              <p className="text-sm text-gray-600 mb-4">
                シンプルなUIで直感的操作。全員が参加可能な最適な日時を視覚的に素早く確認できます。
              </p>
              <FiCheckCircle className="text-blue-500" size={28} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-12 px-3 md:py-16 md:px-4 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            さっそく使ってみませんか？
          </h2>
          <p className="text-gray-600 mb-6">
            会員登録不要・時間調整機能付き・シンプル操作
            <br />
            他のサービスにはない使いやすさを体験してください。
          </p>

          <Link
            href="/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 px-8 text-center shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            今すぐ無料で始める
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 text-center bg-gray-50 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ちょいスケ All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
