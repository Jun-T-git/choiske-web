import { toUtcIsoString } from "@/lib/utils/dateUtils";
import { prisma } from "@/server/client/prisma";
import { Schedule, ScheduleWithAnswers } from "@/types/schedule";
import { TimeSlot } from "@/types/timeSlot";

export type CreateScheduleInput = {
  title: string;
  description?: string;
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
      description: input.description || null,
      slotSizeMinutes: input.slotSizeMinutes,
      expiresAt: input.expiresAt,
      timeSlots: {
        create: input.slots.map((slot: string) => ({
          // 明示的にUTCとして保存
          slotStart: new Date(slot)
        })),
      },
    },
  });
  
  // DateはISO文字列に変換して返す（DBはUTC、APIレスポンスもUTC）
  return {
    ...schedule,
    createdAt: schedule.createdAt.toISOString(),
    expiresAt: schedule.expiresAt.toISOString(),
  };
}

/** 
 * スケジュールIDからスケジュールを取得（TimeSlot含む場合は型も付与）
 */
export async function getScheduleById(
  scheduleId: string,
  includeTimeSlots = false
): Promise<
    (Schedule & { timeSlots?: TimeSlot[] }) | null
> {
  if (includeTimeSlots) {
    // TimeSlotを含む場合
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { timeSlots: { orderBy: { slotStart: 'asc' } } },
    });
    if (!schedule) return null;
    
    // 日付はUTC ISO文字列として返す
    return {
      ...schedule,
      createdAt: schedule.createdAt.toISOString(),
      expiresAt: schedule.expiresAt.toISOString(),
      timeSlots: schedule.timeSlots.map(slot => ({
        ...slot,
        slotStart: toUtcIsoString(slot.slotStart),  // 明示的にtoUtcIsoStringを使用
      })),
    };
  } else {
    // TimeSlotを含まない場合
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) return null;
    
    // 日付はUTC ISO文字列として返す
    return {
      ...schedule,
      createdAt: schedule.createdAt.toISOString(),
      expiresAt: schedule.expiresAt.toISOString(),
    };
  }
}

/**
 * publicTokenからスケジュールを取得
 * @param publicToken パブリックトークン
 * @returns スケジュール
 */
export async function getScheduleByToken(publicToken: string, includeAnswers: boolean): Promise<ScheduleWithAnswers | null> {
  if (includeAnswers) {
    // 回答を含めて返す場合
    const schedule = await prisma.schedule.findFirst({
      where: { publicToken },
      include: {
        timeSlots: { orderBy: { slotStart: 'asc' } },
        answers: {
          include: {
            slotResponses: true,
          },
        },
      },
    });
    if (!schedule) return null;
    
    // 日付はUTC ISO文字列として返す
    return {
      ...schedule,
      createdAt: schedule.createdAt.toISOString(),
      expiresAt: schedule.expiresAt.toISOString(),
      timeSlots: schedule.timeSlots.map(slot => ({
        ...slot,
        slotStart: toUtcIsoString(slot.slotStart),  // 明示的にtoUtcIsoStringを使用
      })),
      answers: schedule.answers.map(answer => ({
        ...answer,
        createdAt: answer.createdAt.toISOString(),
        updatedAt: answer.updatedAt.toISOString()
      })),
    };
  }
  
  // 回答を含めず返す場合
  const schedule = await prisma.schedule.findFirst({
    where: { publicToken },
    include: { timeSlots: { orderBy: { slotStart: 'asc' } } },
  });
  if (!schedule) return null;
  
  // 日付はUTC ISO文字列として返す
  return {
    ...schedule,
    createdAt: schedule.createdAt.toISOString(),
    expiresAt: schedule.expiresAt.toISOString(),
    timeSlots: schedule.timeSlots.map(slot => ({
      ...slot,
      slotStart: toUtcIsoString(slot.slotStart),  // 明示的にtoUtcIsoStringを使用
    })),
  };
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

  // 追加・削除スロットの判定
  const addedTimeSlots = data.slots.filter((slot) => {
    return !existingTimeSlots.some((existingSlot) => {
      return existingSlot.slotStart.toISOString() === new Date(slot).toISOString();
    });
  });
  const deletedTimeSlots = existingTimeSlots.filter((existingSlot) => {
    return !data.slots.some((slot) => {
      return existingSlot.slotStart.toISOString() === new Date(slot).toISOString();
    });
  });

  // トランザクション外でSlotResponseを先に削除（パフォーマンス向上のため）
  if (deletedTimeSlots.length > 0) {
    await prisma.slotResponse.deleteMany({
      where: {
        slotId: { in: deletedTimeSlots.map((slot) => slot.id) },
      },
    });
  }

  // スケジュール更新とTimeSlot操作のみトランザクション内で実行
  const schedule = await prisma.schedule.update({
    where: { id: scheduleId },
    data: {
      title: data.title,
      description: data.description || null,
      slotSizeMinutes: data.slotSizeMinutes,
      expiresAt: data.expiresAt,
      timeSlots: {
        create: addedTimeSlots.map((slot) => ({
          slotStart: new Date(slot),
        })),
        deleteMany: deletedTimeSlots.length > 0 ? {
          id: { in: deletedTimeSlots.map((slot) => slot.id) }
        } : undefined,
      },
    },
  });
  
  // 日付はUTC ISO文字列として返す
  return {
    ...schedule,
    createdAt: schedule.createdAt.toISOString(),
    expiresAt: schedule.expiresAt.toISOString()
  };
}

/**
 * スケジュールとその回答全てを取得
 * @param publicToken パブリックトークン
 * @return スケジュールと回答
 */
export async function getScheduleWithAnswersByToken(publicToken: string): Promise<ScheduleWithAnswers | null> {
  const schedule = await getScheduleByToken(publicToken, true);
  if (!schedule) {
    return null;
  }
  return {
    ...schedule,
    timeSlots: schedule.timeSlots || [],
    answers: schedule.answers || [],
  };
}