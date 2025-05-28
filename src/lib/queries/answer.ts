import { SlotStatus } from "@/constants/slotStatus";

export type CreateAnswerPayload = {
  scheduleId: string;
  name?: string;
  comment?: string;
  slotResponses: { slotId: string; status: SlotStatus }[];
};

/**
 * 回答（Answer）新規作成APIクライアント
 * @param payload CreateAnswerPayload
 * @returns 作成したAnswerのID
 */
export async function createAnswer(payload: CreateAnswerPayload): Promise<{ id: string }> {
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
 * 回答（Answer）取得APIクライアント
 * @param answerId 回答ID
 * @returns 回答データ
 */