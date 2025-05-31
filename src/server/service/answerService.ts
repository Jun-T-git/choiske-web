import { createAnswer, CreateAnswerInput, editAnswerByToken, EditAnswerInput, getAnswerByEditToken as getAnswerByEditTokenClient } from "@/server/client/answerClient";

/**
 * 回答（Answer）新規作成サービス
 * @param input CreateAnswerInput
 * @returns 作成したAnswer（SlotResponse含む） | null
 */
export async function createAnswerService(input: CreateAnswerInput) {
  return await createAnswer(input);
}

/**
 * 編集用トークンによる回答編集サービス
 * @param input EditAnswerInput
 * @returns 更新したAnswer（SlotResponse含む） | null
 */
export async function editAnswerByTokenService(input: EditAnswerInput) {
  return await editAnswerByToken(input);
}

/**
 * 編集用トークンによる回答取得サービス
 * @param editToken 編集用トークン
 * @returns Answer（SlotResponse含む） | null
 */
export async function getAnswerByEditToken(editToken: string) {
  return await getAnswerByEditTokenClient(editToken);
}