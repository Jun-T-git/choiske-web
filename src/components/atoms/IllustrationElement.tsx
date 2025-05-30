"use client";
import { motion } from "framer-motion";
import React from "react";

interface IllustrationProps {
  className?: string;
}

export const CalendarIllustration: React.FC<IllustrationProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`${className} relative w-full max-w-[250px] h-[180px] flex items-center justify-center`}
    >
      {/* 背景装飾 */}
      <motion.div
        className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-blue-100 opacity-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      <motion.div
        className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-indigo-100 opacity-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* カレンダー本体 */}
      <motion.div
        className="relative w-[180px] h-[150px] rounded-xl bg-white border border-gray-200 shadow-md overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* カレンダーヘッダー */}
        <div className="w-full h-8 bg-blue-600 flex items-center px-3">
          <div className="w-16 h-2 bg-white rounded-full" />
          <div className="ml-auto w-4 h-4 rounded-full bg-blue-400" />
        </div>

        {/* カレンダーグリッド */}
        <div className="p-2">
          <div className="grid grid-cols-5 gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="h-5 rounded bg-gray-50 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>

          {/* カレンダー行 1 */}
          <div className="grid grid-cols-5 gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`r1-${i}`}
                className="h-6 rounded bg-blue-50 flex items-center justify-center"
              >
                {i === 1 || i === 3 ? (
                  <motion.div
                    className="w-full h-full rounded bg-blue-100 border border-blue-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ) : (
                  <div className="w-2 h-2 bg-gray-200 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* カレンダー行 2 - ハイライト行 */}
          <div className="grid grid-cols-5 gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`r2-${i}`}
                className="h-6 rounded bg-blue-50 flex items-center justify-center"
              >
                {i === 0 ? (
                  <div className="w-2 h-2 bg-gray-200 rounded-full" />
                ) : i === 1 || i === 2 ? (
                  <motion.div
                    className="relative w-full h-full rounded bg-blue-200 border border-blue-400 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {i === 2 && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded bg-blue-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.6, 0] }}
                          transition={{
                            type: "tween",
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 1,
                            delay: 1,
                          }}
                        />
                        <motion.div
                          className="w-4 h-4 rounded-full bg-blue-500 z-10 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{
                            type: "tween",
                            duration: 0.5,
                            delay: 1.5,
                          }}
                        >
                          <motion.div
                            className="w-2 h-2 border-r border-b border-white transform rotate-45"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.3 }}
                          />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <div className="w-2 h-2 bg-gray-200 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* カレンダー行 3 */}
          <div className="grid grid-cols-5 gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`r3-${i}`}
                className="h-6 rounded bg-blue-50 flex items-center justify-center"
              >
                {i === 2 ? (
                  <motion.div
                    className="w-full h-full rounded bg-blue-100 border border-blue-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ) : (
                  <div className="w-2 h-2 bg-gray-200 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* 時間選択バー */}
          <motion.div
            className="mt-3 h-3 bg-gray-100 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.6, delay: 1.6 }}
            />
            <motion.div
              className="absolute h-3 w-3 rounded-full bg-white border-2 border-blue-500 top-0"
              style={{ left: "60%" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 2.2 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const PeopleIllustration: React.FC<IllustrationProps> = ({
  className = "",
}) => {
  // 型定義
  type SizeType = "sm" | "md" | "lg";
  type ColorType = "blue" | "indigo" | "purple" | "teal" | "green";

  type Member = {
    x: number;
    y: number;
    size: SizeType;
    colorKey: ColorType;
    delay: number;
    emoji: string;
  };

  // シンプルに3人で三角形状に配置
  const memberPositions: Member[] = [
    { x: 0, y: -30, size: "md", colorKey: "blue", delay: 0.2, emoji: "" }, // 上
    { x: -30, y: 15, size: "md", colorKey: "indigo", delay: 0.4, emoji: "" }, // 左下
    { x: 30, y: 15, size: "md", colorKey: "purple", delay: 0.6, emoji: "" }, // 右下
  ];

  // サイズのマッピング
  const sizeMap: Record<
    SizeType,
    { container: string; head: string; body: string; emoji: string }
  > = {
    sm: {
      container: "w-10 h-10",
      head: "w-4 h-4",
      body: "w-7 h-3.5",
      emoji: "text-[8px]",
    },
    md: {
      container: "w-12 h-12",
      head: "w-5 h-5",
      body: "w-8 h-4",
      emoji: "text-[10px]",
    },
    lg: {
      container: "w-14 h-14",
      head: "w-6 h-6",
      body: "w-10 h-5",
      emoji: "text-[12px]",
    },
  };

  // カラーマッピング
  const colorClasses: Record<
    ColorType,
    {
      dark: string;
      border: string;
      gradient: string;
    }
  > = {
    blue: {
      dark: "bg-blue-500",
      border: "border-blue-400",
      gradient: "from-blue-200 to-blue-300",
    },
    indigo: {
      dark: "bg-indigo-500",
      border: "border-indigo-400",
      gradient: "from-indigo-200 to-indigo-300",
    },
    purple: {
      dark: "bg-purple-500",
      border: "border-purple-400",
      gradient: "from-purple-200 to-purple-300",
    },
    teal: {
      dark: "bg-teal-500",
      border: "border-teal-400",
      gradient: "from-teal-200 to-teal-300",
    },
    green: {
      dark: "bg-emerald-500",
      border: "border-emerald-400",
      gradient: "from-emerald-200 to-emerald-300",
    },
  };

  return (
    <div
      className={`${className} relative flex justify-center items-center py-4 h-[140px] md:h-[160px]`}
    >
      {/* シンプルな背景の円 */}
      <motion.div
        className="absolute w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-blue-50/60 border border-blue-100"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />

      {/* シンプルな人物アイコン (3人) */}
      {memberPositions.map((member, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: member.x * 1.5,
            y: member.y * 1.5,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            x: member.x,
            y: member.y,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: member.delay,
          }}
        >
          {/* 人物アイコン */}
          <motion.div
            className={`${
              sizeMap[member.size].container
            } rounded-full bg-gradient-to-b ${
              colorClasses[member.colorKey].gradient
            } flex items-center justify-center relative shadow-sm border ${
              colorClasses[member.colorKey].border
            }`}
            animate={{ y: [0, -2, 0] }}
            transition={{
              type: "tween",
              repeat: Infinity,
              duration: 3,
              delay: member.delay,
              ease: "easeInOut",
            }}
          >
            {/* 顔 */}
            <div
              className={`${sizeMap[member.size].head} rounded-full ${
                colorClasses[member.colorKey].dark
              } absolute top-[20%] overflow-hidden flex items-center justify-center`}
            >
              {/* 絵文字を表示しない */}
            </div>
            {/* 体 */}
            <div
              className={`${sizeMap[member.size].body} ${
                colorClasses[member.colorKey].dark
              } absolute bottom-0 rounded-t-full`}
            ></div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
