import { getDateAfterPeriod } from "@/lib/utils/dateUtils";
import {
  CreateScheduleInput as BaseInput,
  createSchedule as createScheduleClient,
  getScheduleById as getScheduleByIdClient,
  getScheduleByToken as getScheduleByTokenClient,
  updateSchedule as updateScheduleClient
} from "@/server/client/scheduleClient";
import { Schedule, ScheduleSummary, ScheduleWithAnswers } from "@/types/schedule";
import { TimeSlot } from "@/types/timeSlot";

export type CreateScheduleInput = Omit<BaseInput, "expiresAt"> & { expiresAt?: Date };

/**
 * 日程調整イベント新規作成
 * @param data スケジュールデータ
 * @returns スケジュールID
 */
export async function createSchedule(data: CreateScheduleInput): Promise<string> {
  // expires_at: 現在時刻から1年後の23:59:59を設定
  const expiresAt = getDateAfterPeriod(new Date(), { years: 1 });
  expiresAt.setHours(23, 59, 59, 999);

  const schedule = await createScheduleClient({ ...data, expiresAt})

  return schedule.id;
}

/**
 * スケジュールIDから日程調整データの概要情報を取得
 * @param id スケジュールID
 * @returns ScheduleSummary | null
 */
export async function getScheduleSummaryById(scheduleId: string): Promise<ScheduleSummary | null> {
  const schedule = await getScheduleByIdClient(scheduleId, false);
  if (!schedule) return null;
  return {
    title: schedule.title,
    answerSummaryUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/${schedule.publicToken}/summary`,
    hostUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/host/${schedule.publicToken}/done`,
  };
}

/**
 * スケジュールIDから日程調整データを取得
 * @param id スケジュールID
 * @returns Schedule | null
 */
export async function getScheduleById(scheduleId: string): Promise<Schedule & {timeSlots: TimeSlot[]} | null> {
  const schedule = await getScheduleByIdClient(scheduleId, true);
  if (!schedule) {
    return null;
  }
  const timeSlots = schedule.timeSlots || [];
  return {
    ...schedule,
    timeSlots: timeSlots
  };
}

/**
 * publicTokenからスケジュールを取得
 * @param publicToken パブリックトークン
 * @returns スケジュールデータ（TimeSlot含む）またはnull
 */
export async function getScheduleByToken(publicToken: string): Promise<Schedule & {timeSlots: TimeSlot[]} | null> {
  const schedule = await getScheduleByTokenClient(publicToken, false);
  if (!schedule) {
    return null;
  }
  const timeSlots = schedule.timeSlots || [];
  return {
    ...schedule,
    timeSlots: timeSlots
  };
}

/**
 * スケジュールを更新
 * @param id スケジュールID
 * @param data スケジュールデータ
 * @returns スケジュールID
 */
export async function updateSchedule(
  scheduleId: string,
  data: CreateScheduleInput
): Promise<string | null> {
  // expires_at: 現在時刻から1年後の23:59:59を設定
  const expiresAt = getDateAfterPeriod(new Date(), { years: 1 });
  expiresAt.setHours(23, 59, 59, 999);

  const updatedSchedule = await updateScheduleClient(scheduleId, {
    ...data,
    expiresAt,
  });
  return updatedSchedule?.id || null;
}

/**
 * スケジュールとその回答全てを取得
 * @param publicToken パブリックトークン
 * @return スケジュールと回答
 */
export async function getScheduleWithAnswersByToken(publicToken: string): Promise<ScheduleWithAnswers | null> {
  const schedule = await getScheduleByTokenClient(publicToken, true);
  if (!schedule) {
    return null;
  }
  const timeSlots = schedule.timeSlots || [];
  return {
    ...schedule,
    timeSlots: timeSlots,
    answers: schedule.answers?.map(answer => ({
      ...answer,
      slotResponses: answer.slotResponses || []
    })) || []
  };
}
