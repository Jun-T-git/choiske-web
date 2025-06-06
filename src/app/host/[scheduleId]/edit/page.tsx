import { ScheduleForm } from "@/components/templates/ScheduleForm";
import { fetchScheduleById } from "@/lib/queries/schedule";
import { toJstIsoString } from "@/lib/utils/dateUtils";
import { addMinutes } from "date-fns";
import { notFound } from "next/navigation";

/**
 * スケジュール編集ページ
 * - ScheduleForm を再利用し、初期値を渡す
 */
export default async function ScheduleEditPage({
  params,
}: {
  params: Promise<{ scheduleId: string }>;
}) {
  const { scheduleId } = await params;
  const schedule = await fetchScheduleById(scheduleId);
  // slotStartのISO文字列を全て00:00に変換し、リストから重複を排除
  const selectedDays = Array.from(
    new Set(schedule.timeSlots.map((slot) => slot.slotStart.split("T")[0]))
  );
  // スロットサイズ（分）
  const slotSize = schedule?.slotSizeMinutes;
  const withTime = schedule?.slotSizeMinutes !== 1440;
  // ISO文字列から時間部分を抽出（例: "2023-10-01T10:00:00+09:00" -> "10:00")
  const timeFrom = withTime
    ? schedule.timeSlots[0]?.slotStart.split("T")[1].slice(0, 5)
    : undefined;
  // 最後のスロットにスロットサイズ(分)を加算し、時間部分を抽出（例: "2023-10-01T10:00:00+09:00" + 60 -> "11:00"）
  const timeTo = withTime
    ? toJstIsoString(
        addMinutes(
          new Date(
            schedule.timeSlots[schedule.timeSlots.length - 1]?.slotStart
          ),
          schedule.slotSizeMinutes || 0
        )
      )
        .split("T")[1]
        .slice(0, 5)
    : undefined;
  if (!schedule) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-8 pt-5 pb-10">
      <div className="bg-white/90 shadow-xl rounded-2xl px-4 py-8">
        <ScheduleForm
          initialData={{
            initialTitle: schedule.title,
            initialDescription: schedule.description || "",
            initialSelectedDays: selectedDays,
            initialSlotSize: slotSize,
            initialWithTime: withTime,
            initialTimeFrom: timeFrom,
            initialTimeTo: timeTo,
          }}
          scheduleId={scheduleId}
        />
      </div>
    </main>
  );
}
