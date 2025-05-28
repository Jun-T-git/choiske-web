import { createAnswerService } from "@/server/service/answerService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 回答新規作成API
 * @param req 
 * @returns 作成した回答のID
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 必須項目チェック
    if (!body.scheduleId || !Array.isArray(body.slotResponses)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    // name, commentは任意
    const input = {
      scheduleId: body.scheduleId,
      name: body.name,
      comment: body.comment,
      slotResponses: body.slotResponses, // [{slotId, status}]
    };
    const answer = await createAnswerService(input);
    if (!answer) {
      return NextResponse.json({ error: "Failed to create answer" }, { status: 500 });
    }
    return NextResponse.json({ id: answer.id });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}