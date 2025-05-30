import { CopyableText } from "@/components/atoms/CopyableText";
import { LinkButton } from "@/components/atoms/LinkButton";
import { fetchScheduleSummaryById } from "@/lib/queries/schedule";
import { FiCheckCircle } from "react-icons/fi";

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
  const { title, answerSummaryUrl } = scheduleSummary;

  return (
    <main className="max-w-2xl mx-auto px-3 sm:px-8 pt-5 pb-10">
      <div className="bg-white/90 shadow-xl rounded-2xl px-4 sm:px-8 py-8 max-w-2xl mx-auto border border-gray-100 flex flex-col items-center gap-6 animate-fade-in">
        <FiCheckCircle className="text-green-500" size={48} />
        <h1 className="text-xl font-bold text-gray-900 text-center">
          {mode === "edit"
            ? "日程調整を更新しました"
            : "日程調整を作成しました"}
        </h1>
        <p className="text-gray-500 text-center text-sm">
          下記のURLを参加者に共有してください
        </p>
        <div className="w-full">
          <div className="text-xs text-gray-400 mb-1">タイトル</div>
          <div className="text-base font-semibold text-gray-800 bg-gray-50 rounded px-3 py-2 border border-gray-100 truncate">
            {title}
          </div>
        </div>
        <div className="w-full">
          <CopyableText
            value={answerSummaryUrl}
            label="日程調整用URL"
            className="w-full"
            inputClassName="text-base"
            buttonClassName="text-base"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <LinkButton
            href={answerSummaryUrl}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold shadow-sm transition"
          >
            日程調整ページへ
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
    </main>
  );
}
