import { getScheduleSummaryById } from "@/server/service/scheduleService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 日程調整イベント概要取得API
 * @param req リクエスト
 * @param params パラメータ
 * @returns スケジュールの概要情報
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ scheduleId: string }> }
) {
  const { scheduleId } = await params;
  try {
    const scheduleSummary = await getScheduleSummaryById(scheduleId);
    if (!scheduleSummary) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(scheduleSummary);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
