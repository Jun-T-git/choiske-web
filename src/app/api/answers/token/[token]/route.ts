import { getScheduleWithAnswersByToken } from "@/server/service/scheduleService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 回答取得API
 * @param req リクエスト
 * @param params パラメータ
 * @returns {ScheduleWithAnswers} スケジュールと回答の詳細情報
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  try {
    const answer = await getScheduleWithAnswersByToken(token);
    if (!answer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(answer);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}