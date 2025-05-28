import { getScheduleByToken } from "@/server/service/scheduleService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 日程調整イベント取得API
 * @param req リクエスト
 * @param params パラメータ
 * @returns スケジュールの詳細情報
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  try {
    const schedule = await getScheduleByToken(token);
    if (!schedule) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}