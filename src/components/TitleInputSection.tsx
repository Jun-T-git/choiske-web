import { FC } from "react";
import { TitleInput } from "./TitleInput";

/**
 * タイトル入力＋説明セクション
 * @param title スケジュールタイトル
 * @param setTitle タイトル更新関数
 */
export const TitleInputSection: FC<{
  title: string;
  setTitle: (v: string) => void;
}> = ({ title, setTitle }) => (
  <section>
    <h3 className="text-md font-bold text-gray-700 mb-2">1. タイトルを入力</h3>
    <TitleInput title={title} setTitle={setTitle} />
  </section>
);
