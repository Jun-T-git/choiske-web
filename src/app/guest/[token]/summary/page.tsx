import { LinkButton } from "@/components/atoms/LinkButton";
import { GuestSummaryTable } from "@/components/organisms/guest/GuestSummaryTable";
import { SlotStatus } from "@/constants/slotStatus";
import { fetchScheduleWithAnswersByToken } from "@/lib/queries/schedule";
import { toJstIsoString } from "@/lib/utils/dateUtils";
import { FiUserPlus, FiUsers } from "react-icons/fi";

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
    <>
      <main className="max-w-4xl mx-auto px-1 sm:px-8 pt-5 pb-10">
        <section className="w-full mb-4 bg-white/90 rounded-2xl shadow-md p-6 flex flex-col gap-2 border border-blue-100">
          <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-400 rounded-full mr-2" />
            {schedule.title}
          </h1>
          {schedule.description && (
            <p className="text-gray-700 text-sm md:text-lg mt-1 whitespace-pre-line leading-relaxed">
              {schedule.description}
            </p>
          )}
          <div className="mt-4 flex flex-col gap-3 items-start">
            <LinkButton
              href={"/guest/" + token + "/answer"}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition text-base flex items-center gap-1 w-full max-w-xs justify-center"
            >
              <FiUserPlus className="inline-block w-4 h-4" />
              日程調整に回答する
            </LinkButton>
            {/* <span className="text-xs text-gray-500 ml-1">
              ※ 回答は何度でも編集できます
            </span> */}
          </div>
        </section>
        <section className="w-full bg-white/95 rounded-2xl shadow-md p-4 md:p-6 border border-blue-50">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            <FiUsers className="inline-block align-middle text-blue-400 w-5 h-5" />
            みんなの回答
          </h2>
          <GuestSummaryTable slots={slots} answers={answers} />

          <div className="mt-8 flex justify-center">
            <LinkButton
              href={`/guest/${token}/answer`}
              className="px-6 py-3 w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition text-base flex items-center gap-2 justify-center"
            >
              <FiUserPlus className="w-5 h-5" />
              日程調整に回答する
            </LinkButton>
          </div>
        </section>
      </main>
    </>
  );
}
