import { CopyableText } from "@/components/atoms/CopyableText";
import { LinkButton } from "@/components/atoms/LinkButton";
import { fetchScheduleSummaryById } from "@/lib/queries/schedule";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiSave,
  FiShare2,
} from "react-icons/fi";

/**
 * 完了画面
 * - scheduleId パラメータからAPIでタイトル・URLを取得し表示
 * - タイトル、調整用URL（コピー機能付き）、導線ボタン
 */
export default async function NewCompletePage({
  params,
  searchParams,
}: {
  params: Promise<{ scheduleId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { scheduleId } = await params;
  const { mode } = await searchParams;

  const scheduleSummary = await fetchScheduleSummaryById(scheduleId);
  const { title, answerSummaryUrl, hostUrl } = scheduleSummary;

  return (
    <main className="max-w-2xl mx-auto px-3 sm:px-8 pt-5 pb-10">
      <div className="bg-white/90 shadow-xl rounded-2xl px-4 sm:px-8 py-8 max-w-2xl mx-auto border border-gray-100 flex flex-col items-center gap-8 animate-fade-in">
        <div className="flex flex-col items-center w-full">
          <FiCheckCircle className="text-green-500" size={48} />
          <h1 className="text-xl font-bold text-gray-900 text-center mt-3 mb-1">
            {mode === "edit"
              ? "日程調整を更新しました"
              : "日程調整を作成しました"}
          </h1>
          <div className="w-full flex flex-col items-center my-4 py-3 px-6 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">
              イベント名
            </div>
            <div className="inline-flex items-center px-2">
              <FiCalendar className="text-blue-500 mr-2" size={18} />
              <span className="text-gray-800 font-bold text-lg">{title}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full relative overflow-hidden">
          <div className="absolute right-0 top-0 w-20 h-20 opacity-5">
            <FiShare2 size={80} />
          </div>
          <h2 className="text-blue-800 font-bold text-lg flex items-center mb-3">
            <span className="bg-blue-600 rounded-full w-6 h-6 inline-flex items-center justify-center text-white mr-2 text-sm">
              1
            </span>
            参加者へ日程調整URLをシェアしてください
          </h2>
          <p className="text-sm text-blue-700 mb-4">
            参加者はこのURLから日程調整の回答ができます。LINEやSlack、メールなどで共有しましょう。
          </p>

          <div className="relative">
            <CopyableText
              value={answerSummaryUrl}
              label="日程調整用URL"
              className="w-full"
              inputClassName="text-base bg-white border-blue-200"
              buttonClassName="text-base bg-blue-500 hover:bg-blue-600"
            />
            <div className="absolute right-14 top-1/2 transform -translate-y-2/3 text-blue-400">
              <FiShare2 size={18} />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 w-full relative overflow-hidden">
          <div className="absolute right-0 top-0 w-20 h-20 opacity-5">
            <FiSave size={80} />
          </div>
          <h2 className="text-yellow-800 font-bold text-lg flex items-center mb-3">
            <span className="bg-yellow-600 rounded-full w-6 h-6 inline-flex items-center justify-center text-white mr-2 text-sm">
              2
            </span>
            このURLを必ず保存してください
          </h2>
          <p className="text-sm text-yellow-700 mb-4">
            このURLからイベントの編集・管理ができます。ブックマークに追加するか、メモに残しておきましょう。
          </p>

          <div className="relative">
            <CopyableText
              value={hostUrl}
              label="管理用URL（このページ）"
              className="w-full"
              inputClassName="text-base bg-white border-yellow-200"
              buttonClassName="text-base bg-yellow-500 hover:bg-yellow-600"
            />
            <div className="absolute right-14 top-1/2 transform -translate-y-2/3 text-yellow-400">
              <FiSave size={18} />
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-100 pt-6 mt-2">
          <p className="text-center text-sm text-gray-500 mb-4">次のステップ</p>
          <div className="flex flex-col gap-3 w-full">
            <LinkButton
              href={answerSummaryUrl}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold shadow-sm transition flex items-center justify-center"
            >
              <span>日程調整ページを確認する</span>
              <FiArrowRight className="ml-2" />
            </LinkButton>
            <LinkButton
              href={`/host/${scheduleId}/edit`}
              className="w-full py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg text-base font-bold border border-yellow-100 transition"
            >
              イベントを編集する
            </LinkButton>
            <LinkButton
              href="/new"
              className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-blue-600 rounded-lg text-base font-bold border border-gray-100 transition"
            >
              別のイベントを作成する
            </LinkButton>
          </div>
        </div>
      </div>
    </main>
  );
}
