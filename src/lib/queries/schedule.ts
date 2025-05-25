import { Schedule, ScheduleSummary } from "@/types/schedule";

/**
 * スケジュール作成APIを呼び出すクライアント関数
 * @param title スケジュールのタイトル
 * @param slotSizeMinutes スロットのサイズ（分）
 * @param slots スロットのリスト（ISO 8601形式の文字列）
 * @return スケジュールのID
 */
export async function createSchedule(
  title: string,
  slotSizeMinutes: number,
  slots: string[]
): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title, slotSizeMinutes, slots}),
  });
  if (!res.ok) {
    throw new Error("Failed to create schedule");
  }
  return await res.json();
}

/**
 * スケジュール概要取得APIを呼び出すクライアント関数
 * @param scheduleId スケジュールのID
 * @return スケジュールの概要情報
 */
export async function fetchScheduleSummaryById(
  scheduleId: string
): Promise<ScheduleSummary> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${scheduleId}/summary`);
  if (!res.ok) {
    throw new Error("Failed to fetch schedule summary");
  }
  return await res.json();
}

/**
 * スケジュール取得APIを呼び出すクライアント関数
 * @param scheduleId スケジュールのID
 * @return スケジュールの詳細情報
 */
export async function fetchScheduleById(
  scheduleId: string
): Promise<Schedule & { timeSlots: { slotStart: string }[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${scheduleId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  return await res.json();
}

/**
 * スケジュール更新APIを呼び出すクライアント関数
 * @param scheduleId スケジュールのID
 * @param title スケジュールのタイトル
 * @param slotSizeMinutes スロットのサイズ（分）
 * @param slots スロットのリスト（ISO 8601形式の文字列）
 * @return 更新されたスケジュールの詳細情報
 */
export async function updateSchedule(
  scheduleId: string,
  title: string,
  slotSizeMinutes: number,
  slots: string[]
): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${scheduleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slotSizeMinutes, slots }),
  });
  if (!res.ok) {
    throw new Error("Failed to update schedule");
  }
  return await res.json();
}