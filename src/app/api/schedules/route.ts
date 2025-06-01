import { createSchedule } from "@/server/service/scheduleService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// DB設計書に合わせたスキーマ
const scheduleSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(255),
  description: z.string().max(100).optional(),
  slotSizeMinutes: z.number().int().positive(),
  slots: z.array(
    z.string().datetime({ offset: true, message: "ISO8601形式の日付時刻で指定してください" })
  ), // ISO8601文字列
});

/**
 * 日程調整イベント新規作成API
 * POST /api/schedules
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Received body:", body);
  const result = scheduleSchema.safeParse(body);
  if (!result.success) {
    console.log("Validation error", result.error.flatten());
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 }
    );
  }
  const data = result.data;
  const scheduleId = await createSchedule(data);
  return NextResponse.json(scheduleId);
}
