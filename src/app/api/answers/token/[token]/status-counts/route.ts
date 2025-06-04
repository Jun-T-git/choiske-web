import { prisma } from "@/server/client/prisma";
import { getSlotStatusCounts } from "@/server/client/slotStatsClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * スケジュールのタイムスロット回答状況集計API
 * 
 * @param req リクエスト
 * @param params URLパラメータ
 * @returns 集計結果
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // トークンからスケジュールを取得
    const schedule = await prisma.schedule.findUnique({
      where: { publicToken: token },
    });
    
    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }
    
    // タイムスロットの回答状況を集計
    const statusCounts = await getSlotStatusCounts(schedule.id);
    
    return NextResponse.json({ statusCounts });
  } catch (error) {
    console.error("Error getting status counts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
