import { isIsoDateString, toJstIsoString, toUtcIsoString } from "@/lib/utils/dateUtils";
import { Schedule, ScheduleSummary, ScheduleWithAnswers } from "@/types/schedule";
import { TimeSlot } from "@/types/timeSlot";

/**
 * スケジュール作成APIを呼び出すクライアント関数
 * @param title スケジュールのタイトル
 * @param slotSizeMinutes スロットのサイズ（分）
 * @param slots スロットのリスト（ISO 8601形式の文字列）
 * @return スケジュールのID
 */
export async function createSchedule(
  title: string,
  description: string | undefined,
  slotSizeMinutes: number,
  slots: (string | Date)[]
): Promise<string> {
  // slotsをUTCのISO文字列に変換
  const utcSlots = slots.map(slot => {
    if (typeof slot === 'string') {
      // 既にISO文字列なら変換してからUTC ISOに
      return new Date(slot).toISOString();
    }
    // DateオブジェクトならUTC ISOに
    return toUtcIsoString(slot);
  });
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title, description, slotSizeMinutes, slots: utcSlots}),
  });
  
  if (!res.ok) {
    throw new Error("Failed to create schedule");
  }
  return res.json();
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
  const data = await res.json();
  
  // レスポンスの日付フィールドをJSTに変換
  if (data.slots && Array.isArray(data.slots)) {
    data.slots = data.slots.map((slot: string) => {
      if (isIsoDateString(slot)) {
        return toJstIsoString(new Date(slot));
      }
      return slot;
    });
  }
  
  if (data.date && isIsoDateString(data.date)) {
    data.date = toJstIsoString(new Date(data.date));
  }
  
  return data;
}

/**
 * スケジュール取得APIを呼び出すクライアント関数
 * @param scheduleId スケジュールのID
 * @return スケジュールの詳細情報
 */
export async function fetchScheduleById(
  scheduleId: string
): Promise<Schedule & { timeSlots: TimeSlot[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${scheduleId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  const data = await res.json();
  
  // timeSlots内の日付をJST文字列に変換
  if (data.timeSlots && Array.isArray(data.timeSlots)) {
    data.timeSlots = data.timeSlots.map((slot: TimeSlot) => ({
      ...slot,
      slotStart: isIsoDateString(slot.slotStart) 
        ? toJstIsoString(new Date(slot.slotStart))
        : slot.slotStart,
    }));
  }
  
  return data;
}

/**
 * publicTokenからスケジュールを取得するAPIを呼び出すクライアント関数
 * @param publicToken パブリックトークン
 * @return スケジュールの詳細情報
 */
export async function fetchScheduleByToken(
  publicToken: string
): Promise<Schedule & { timeSlots: TimeSlot[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/token/${publicToken}`);
  if (!res.ok) {
    throw new Error("Failed to fetch schedule by token");
  }
  const data = await res.json();
  
  // timeSlots内の日付をJST文字列に変換
  if (data.timeSlots && Array.isArray(data.timeSlots)) {
    data.timeSlots = data.timeSlots.map((slot: TimeSlot) => ({
      ...slot,
      slotStart: isIsoDateString(slot.slotStart) 
        ? toJstIsoString(new Date(slot.slotStart))
        : slot.slotStart,
    }));
  }
  
  return data;
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
  description: string | undefined,
  slotSizeMinutes: number,
  slots: (string | Date)[]
): Promise<string> {
  // slotsをUTCのISO文字列に変換
  const utcSlots = slots.map(slot => {
    if (typeof slot === 'string') {
      // 既にISO文字列なら変換してからUTC ISOに
      return new Date(slot).toISOString();
    }
    // DateオブジェクトならUTC ISOに
    return toUtcIsoString(slot);
  });
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${scheduleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, slotSizeMinutes, slots: utcSlots }),
  });
  
  if (!res.ok) {
    throw new Error("Failed to update schedule");
  }
  return res.json();
}

/**
 * スケジュールとその回答全てを取得するAPIを呼び出すクライアント関数
 * @param publicToken パブリックトークン
 * @return スケジュールとその回答
 */
export async function fetchScheduleWithAnswersByToken(
  publicToken: string
): Promise<ScheduleWithAnswers | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/answers/token/${publicToken}`);
  if (!res.ok) {
    throw new Error("Failed to fetch schedule with answers by token");
  }
  const data = await res.json();
  
  // timeSlots内の日付をJST文字列に変換
  if (data.timeSlots && Array.isArray(data.timeSlots)) {
    data.timeSlots = data.timeSlots.map((slot: TimeSlot) => ({
      ...slot,
      slotStart: isIsoDateString(slot.slotStart) 
        ? toJstIsoString(new Date(slot.slotStart))
        : slot.slotStart,
    }));
  }
  
  return data;
}