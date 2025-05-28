import { createAnswer, CreateAnswerInput } from "@/server/client/answerClient";

/**
 * 回答（Answer）新規作成サービス
 * @param input CreateAnswerInput
 * @returns 作成したAnswer（SlotResponse含む） | null
 */
export async function createAnswerService(input: CreateAnswerInput) {
  return await createAnswer(input);
}