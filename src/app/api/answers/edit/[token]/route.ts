import { editAnswerByTokenService, getAnswerByEditToken } from "@/server/service/answerService";
import { NextRequest, NextResponse } from "next/server";

/**
 * 編集用トークンによる回答取得API
 * @param req リクエスト
 * @param params パラメータ
 * @returns 回答データ
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  try {
    const answer = await getAnswerByEditToken(token);
    if (!answer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(answer);
  } catch (error) {
    console.error("Error fetching answer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * 回答編集API (editTokenを使用)
 * @param req リクエスト
 * @param params パラメータ
 * @returns 更新した回答のID
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  try {
    const body = await req.json();
    // 必須項目チェック
    if (!Array.isArray(body.slotResponses)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    // name, commentは任意項目
    const input = {
      editToken: token,
      name: body.name,
      comment: body.comment,
      slotResponses: body.slotResponses, // [{slotId, status}]
    };
    
    const answer = await editAnswerByTokenService(input);
    if (!answer) {
      return NextResponse.json({ error: "Failed to update answer" }, { status: 404 });
    }
    
    return NextResponse.json({ id: answer.id, editToken: answer.editToken });
  } catch (error) {
    console.error("Error updating answer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
