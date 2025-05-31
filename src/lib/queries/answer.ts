import { SlotStatus } from "@/constants/slotStatus";
import { Answer } from "@/types/answer";
import { SlotResponse } from "@/types/slotResponse";

export type CreateAnswerPayload = {
  scheduleId: string;
  name?: string;
  comment?: string;
  slotResponses: { slotId: string; status: SlotStatus }[];
};

export type EditAnswerPayload = {
  name?: string;
  comment?: string;
  slotResponses: { slotId: string; status: SlotStatus }[];
};

/**
 * 回答（Answer）新規作成APIクライアント
 * @param payload CreateAnswerPayload
 * @returns 作成したAnswerのID
 */
export async function createAnswer(payload: CreateAnswerPayload): Promise<{ id: string; editToken: string }> {
  const res = await fetch("/api/answers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to create answer");
  }
  return await res.json();
}

/**
 * 編集用トークンによる回答（Answer）編集APIクライアント
 * @param editToken 編集用トークン
 * @param payload EditAnswerPayload
 * @returns 更新したAnswerのID
 */
export async function editAnswerByToken(editToken: string, payload: EditAnswerPayload): Promise<{ id: string }> {
  const res = await fetch(`/api/answers/edit/${editToken}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to update answer");
  }
  return await res.json();
}

/**
 * 回答（Answer）取得APIクライアント
 * @param answerId 回答ID
 * @returns 回答データ
 */

/**
 * 編集用トークンによる回答（Answer）取得APIクライアント
 * @param editToken 編集用トークン
 * @returns 回答データ
 */
export async function getAnswerByEditToken(editToken: string): Promise<Answer & { slotResponses: SlotResponse[]; scheduleId: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/answers/edit/${editToken}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to fetch answer");
  }
  return await res.json();
}