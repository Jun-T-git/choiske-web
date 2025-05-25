import { CopyableText } from "@/components/atoms/CopyableText";
import { LinkButton } from "@/components/atoms/LinkButton";
import { fetchScheduleSummaryById } from "@/lib/queries/schedule";

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
  const { title, answerUrl, hostUrl } = scheduleSummary;

  return (
    <main className="max-w-lg mx-auto p-6 bg-white/90 shadow-2xl rounded-2xl border border-gray-100 flex flex-col items-center animate-fade-in">
      <div className="flex flex-col items-center w-full">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="mb-4 text-green-500"
        >
          <circle cx="24" cy="24" r="24" fill="#22c55e" fillOpacity="0.15" />
          <path
            d="M16 24l6 6 10-10"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 tracking-tight text-center">
          {mode === "edit"
            ? "日程調整を更新しました"
            : "日程調整を作成しました"}
        </h1>
        <p className="text-gray-600 text-center mb-6 text-base sm:text-lg">
          下記のURLを参加者に共有してください
        </p>
      </div>
      <div className="mb-6 w-full">
        <div className="text-gray-500 mb-1 text-sm">タイトル</div>
        <div className="text-lg font-semibold text-gray-800 bg-gray-50 rounded px-3 py-2 border border-gray-200 truncate">
          {title}
        </div>
      </div>
      <div className="w-full mb-6">
        <CopyableText
          value={answerUrl}
          label="調整用URL"
          className="w-full"
          inputClassName="text-base"
          buttonClassName="text-base"
        />
      </div>
      <div className="flex flex-col gap-3 w-full mt-2">
        <LinkButton
          href={answerUrl}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white rounded-xl text-lg font-bold shadow-md transition"
        >
          この日程調整ページへ
        </LinkButton>
        <LinkButton
          href={`/host/${scheduleId}/edit`}
          className="w-full py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl text-lg font-bold border border-yellow-100 transition"
        >
          スケジュールを編集
        </LinkButton>
        <LinkButton
          href="/"
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-lg font-bold border border-gray-200 transition"
        >
          トップページへ
        </LinkButton>
        <LinkButton
          href="/host/new"
          className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-lg font-bold border border-blue-100 transition"
        >
          新しく作成する
        </LinkButton>
      </div>
    </main>
  );
}
