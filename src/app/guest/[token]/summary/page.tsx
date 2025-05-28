import { LinkButton } from "@/components/atoms/LinkButton";
import { GuestSummaryTable } from "@/components/organisms/guest/GuestSummaryTable";
import { SlotStatus } from "@/constants/slotStatus";
import { fetchScheduleWithAnswersByToken } from "@/lib/queries/schedule";
import { toJstIsoString } from "@/lib/utils/dateUtils";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function GuestSummaryPage({ params }: Props) {
  const { token } = await params;
  // スケジュール・スロット・回答一覧を取得
  const data = await fetchScheduleWithAnswersByToken(token);
  if (!data) return <div>スケジュールが見つかりません</div>;
  const schedule = data;
  const timeSlots =
    data.timeSlots?.map((slot) => ({
      ...slot,
      slotStart: toJstIsoString(new Date(slot.slotStart)),
    })) ?? [];
  const answers = (data.answers ?? []).map((a) => ({
    ...a,
    slotResponses: a.slotResponses ?? [],
  }));

  // スロットごとに集計
  // 日付ごとに区切り線を入れるため、各スロットにdate情報を付与
  const slots = timeSlots.map((slot) => {
    // slotStartからdate, timeを生成
    const [date, timeWithSec] = slot.slotStart.split("T");
    const time = timeWithSec?.slice(0, 5) ?? "";
    const statusCounts = {
      [SlotStatus.OK]: 0,
      [SlotStatus.NG]: 0,
      [SlotStatus.PENDING]: 0,
    };
    answers.forEach((a) => {
      const resp = a.slotResponses?.find((r) => r.slotId === slot.id);
      if (
        resp &&
        (resp.status === SlotStatus.OK ||
          resp.status === SlotStatus.NG ||
          resp.status === SlotStatus.PENDING)
      ) {
        statusCounts[resp.status as SlotStatus] =
          (statusCounts[resp.status as SlotStatus] || 0) + 1;
      }
    });
    return {
      slotId: slot.id,
      slotStart: slot.slotStart,
      date,
      time,
      statusCounts,
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-8 px-2 md:px-0">
      <section className="w-full max-w-3xl mb-8 bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-blue-100">
        <h1 className="text-xl md:text-3xl font-bold text-blue-900 flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-blue-400 rounded-full mr-2" />
          {schedule.title}
        </h1>
        {schedule.description && (
          <p className="text-gray-700 text-sm md:text-lg mt-1 whitespace-pre-line leading-relaxed">
            {schedule.description}
          </p>
        )}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <LinkButton
            href={"/guest/" + token + "/answer"}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition text-base"
          >
            <span className="inline-block align-middle mr-1">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            日程調整に回答する
          </LinkButton>
          <span className="text-xs text-gray-500 ml-1">
            ※ 回答は何度でも編集できます
          </span>
        </div>
      </section>
      <section className="w-full max-w-3xl bg-white/95 rounded-2xl shadow p-4 md:p-6 border border-blue-50">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-blue-800 flex items-center gap-2">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block align-middle text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2a4 4 0 018 0v2M5 10a4 4 0 018 0v2m-8 4v-2a4 4 0 018 0v2"
            />
          </svg>
          みんなの回答
        </h2>
        <GuestSummaryTable slots={slots} answers={answers} />
      </section>
    </main>
  );
}
