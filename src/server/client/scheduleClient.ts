import { Schedule } from "@/types/schedule";
import { TimeSlot } from "@/types/timeSlot";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateScheduleInput = {
  title: string;
  slotSizeMinutes: number;
  slots: string[];
  expiresAt: Date;
};

/**
 * 日程調整イベント新規作成
 * @param input スケジュールデータ
 * @returns
 */
export async function createSchedule(input: CreateScheduleInput): Promise<Schedule> {
  const schedule = await prisma.schedule.create({
    data: {
      title: input.title,
      slotSizeMinutes: input.slotSizeMinutes,
      expiresAt: input.expiresAt,
      timeSlots: {
        create: input.slots.map((slot: string) => ({
          slotStart: new Date(slot)
        })),
      },
    },
  });
  return schedule;
}

/** 
 * スケジュールIDからスケジュールを取得
 * @param scheduleId スケジュールID
 * @param includeTimeSlots タイムスロットを含めるかどうか
 * @returns スケジュール
 */
export async function getScheduleById(scheduleId: string, includeTimeSlots = false): Promise<Schedule & { timeSlots?: TimeSlot[] } | null> {
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
    include: includeTimeSlots ? { timeSlots: true } : undefined,
  });
  if (!schedule) return null;
  return schedule;
}

/**
 * スケジュール編集
 * - timeSlotsはdata.slotsに新しく追加されたもののみを追加（scheduleIdに紐づくもの）
 * - 既存のtimeSlotsのうち、data.slotsに存在しないものは削除（scheduleIdに紐づくもの）
 * @param scheduleId スケジュールID
 * @param data スケジュールデータ
 * @returns Schedule | null
 */
export async function updateSchedule(scheduleId: string, data: CreateScheduleInput): Promise<Schedule | null> {
  // 既存のタイムスロットを取得
  const existingTimeSlots = await prisma.timeSlot.findMany({
    where: { scheduleId },
  });

  // 追加するタイムスロット
  const addedTimeSlots = data.slots.filter((slot) => {
    // data.slotsに存在するが、既存のスロットには存在しない場合
    return !existingTimeSlots.some((existingSlot) => {
      return existingSlot.slotStart.toISOString() === new Date(slot).toISOString();
    });
  });

  // 削除するタイムスロット
  const deletedTimeSlots = existingTimeSlots.filter((existingSlot) => {
    // 既存のスロットがdata.slotsに存在しない場合
    return !data.slots.some((slot) => {
      return existingSlot.slotStart.toISOString() === new Date(slot).toISOString();
    });
  });

  // スケジュールを更新
  const schedule = await prisma.schedule.update({
    where: { id: scheduleId },
    data: {
      title: data.title,
      slotSizeMinutes: data.slotSizeMinutes,
      expiresAt: data.expiresAt,
      timeSlots: {
        create: addedTimeSlots.map((slot) => ({
          slotStart: new Date(slot),
        })),
        deleteMany: deletedTimeSlots.map((slot) => ({
          id: slot.id,
        })),
      },
    },
  });
  return schedule;
}