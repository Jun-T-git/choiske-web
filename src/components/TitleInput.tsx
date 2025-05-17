import { FC } from "react";

type TitleInputProps = {
  title: string;
  setTitle: (v: string) => void;
};

/**
 * タイトル入力欄コンポーネント
 * @param title スケジュールタイトル
 * @param setTitle タイトル更新関数
 */
export const TitleInput: FC<TitleInputProps> = ({ title, setTitle }) => (
  <div>
    <label className="hidden">タイトル</label>
    <input
      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      placeholder="例: 5月の定例会議やランチ会"
    />
    <div className="text-xs text-gray-400 mt-1">
      参加者に分かりやすいタイトルを入力してください
    </div>
  </div>
);
