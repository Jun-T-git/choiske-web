import { FC } from "react";
import { SectionHeading } from "../../atoms/SectionHeading";
import { TextInput } from "../../atoms/TextInput";
import { TextareaInput } from "../../atoms/TextareaInput";

/**
 * タイトル入力＋説明セクション
 * @param title スケジュールタイトル
 * @param setTitle タイトル更新関数
 */
export const TitleInputSection: FC<{
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}> = ({ title, setTitle, description, setDescription }) => (
  <section>
    <SectionHeading step={1}>イベント情報を入力</SectionHeading>
    <TextInput
      label="イベント名"
      value={title}
      onChange={setTitle}
      placeholder="例: 5月の定例会議やランチ会"
      note="参加者に分かりやすいイベント名を入力してください"
      required={true}
      maxLength={30}
    />
    <TextareaInput
      label="イベントの補足説明"
      value={description}
      onChange={setDescription}
      placeholder="例: 回答締切は5月1日までです。会場は〇〇です。"
      rows={3}
      maxLength={200}
      className="mt-4"
      textareaClassName="h-24"
    />
  </section>
);
