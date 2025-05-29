import { getScheduleById, updateSchedule } from "@/server/service/scheduleService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 日程調整イベント取得API
 * @param req リクエスト
 * @param params パラメータ
 * @returns スケジュールの詳細情報
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ scheduleId: string }> }
) {
  const { scheduleId } = await params;
  try {
    const schedule = await getScheduleById(scheduleId);
    if (!schedule) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * 日程調整イベント編集API
 * @param req リクエスト
 * @param params パラメータ
 * @returns スケジュールID
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ scheduleId: string }> }
) {
  const { scheduleId } = await params;
  const data = await req.json();
  const updatedSchedule = await updateSchedule(scheduleId, data);
  if (!updatedSchedule) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updatedSchedule);
}