import { FiClock, FiShare2, FiCheckCircle } from "react-icons/fi";
import { ReactNode } from "react";

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export const homeFeatures: Feature[] = [
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
