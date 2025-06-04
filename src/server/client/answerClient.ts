import { toUtcIsoString } from "@/lib/utils/dateUtils";
import { prisma } from "@/server/client/prisma";
import { Answer } from "@/types/answer";
import { SlotResponse } from "@/types/slotResponse";

export type CreateAnswerInput = {
  scheduleId: string;
  name: string;
  comment: string | null;
  slotResponses: SlotResponse[];
};

export type EditAnswerInput = {
  editToken: string;
  name?: string;
  comment?: string | null;
  slotResponses: SlotResponse[];
};

/**
 * 回答（Answer）新規作成
 * @param input CreateAnswerInput
 * @returns 作成したAnswer（SlotResponse含む）
 */
export async function createAnswer(input: CreateAnswerInput): Promise<Answer & { slotResponses: SlotResponse[] } | null> {
  const answer = await prisma.answer.create({
    data: {
      scheduleId: input.scheduleId,
      name: input.name,
      comment: input.comment || null,
      slotResponses: {
        create: input.slotResponses.map((sr) => ({
          slotId: sr.slotId,
          status: sr.status,
        })),
      },
    },
    include: {
      slotResponses: true,
    },
  });
  if (!answer) return null;
  
  // DateはUTC ISO文字列に変換して返す（明示的）
  return {
    ...answer,
    createdAt: toUtcIsoString(answer.createdAt),
    updatedAt: toUtcIsoString(answer.updatedAt),
    slotResponses: answer.slotResponses.map((sr) => ({
      ...sr,
    })),
  };
}

/**
 * 編集用トークンによる回答編集
 * @param input EditAnswerInput
 * @returns 更新したAnswer（SlotResponse含む）
 */
export async function editAnswerByToken(input: EditAnswerInput): Promise<Answer & { slotResponses: SlotResponse[] } | null> {
  // 編集用トークンから回答を取得
  const existingAnswer = await prisma.answer.findUnique({
    where: { editToken: input.editToken },  // schemaのマッピングに基づきJS側では editToken
    include: { slotResponses: true },
  });
  
  if (!existingAnswer) return null;

  // 既存の回答を更新
  await prisma.answer.update({
    where: { id: existingAnswer.id },
    data: {
      name: input.name !== undefined ? input.name : existingAnswer.name,
      comment: input.comment !== undefined ? input.comment : existingAnswer.comment,
    },
    include: { slotResponses: true },
  });

  // SlotResponseの差分更新（最適化）
  // 既存の回答状況リスト
  const existingResponses = existingAnswer.slotResponses;
  const inputResponses = input.slotResponses;
  
  // 1. 追加・更新が必要なレスポンスの特定
  const responsesToUpsert = inputResponses.map(sr => {
    // 既存のレスポンスを検索
    const existingResponse = existingResponses.find(er => er.slotId === sr.slotId);
    
    if (existingResponse) {
      // 既存のレスポンスがあり、ステータスが異なる場合は更新
      if (existingResponse.status !== sr.status) {
        return prisma.slotResponse.update({
          where: { id: existingResponse.id },
          data: { status: sr.status }
        });
      }
      // ステータスが同じ場合は何もしない
      return null;
    } else {
      // 既存のレスポンスがない場合は作成
      return prisma.slotResponse.create({
        data: {
          answerId: existingAnswer.id,
          slotId: sr.slotId,
          status: sr.status
        }
      });
    }
  }).filter(Boolean); // nullを除外
  
  // 2. 削除が必要なレスポンスの特定（既存にあるが入力にない）
  const responseIdsToDelete = existingResponses
    .filter(er => !inputResponses.some(ir => ir.slotId === er.slotId))
    .map(er => er.id);
  
  // 3. 必要な更新操作を実行
  if (responseIdsToDelete.length > 0) {
    await prisma.slotResponse.deleteMany({
      where: { id: { in: responseIdsToDelete } }
    });
  }
  
  if (responsesToUpsert.length > 0) {
    await Promise.all(responsesToUpsert);
  }

  // 更新後のデータを取得
  const finalAnswer = await prisma.answer.findUnique({
    where: { id: existingAnswer.id },
    include: { slotResponses: true },
  });

  if (!finalAnswer) return null;

  // DateはUTC ISO文字列に変換して返す（明示的）
  return {
    ...finalAnswer,
    createdAt: toUtcIsoString(finalAnswer.createdAt),
    updatedAt: toUtcIsoString(finalAnswer.updatedAt),
    slotResponses: finalAnswer.slotResponses,
  };
}

/**
 * 編集用トークンによる回答取得
 * @param editToken 編集用トークン
 * @returns Answer（SlotResponse含む）
 */
export async function getAnswerByEditToken(editToken: string): Promise<(Answer & { slotResponses: SlotResponse[]; scheduleId: string }) | null> {
  const answer = await prisma.answer.findUnique({
    where: { editToken },
    include: { slotResponses: true },
  });
  
  if (!answer) return null;
  
  // DateはUTC ISO文字列に変換して返す（明示的）
  return {
    ...answer,
    createdAt: toUtcIsoString(answer.createdAt),
    updatedAt: toUtcIsoString(answer.updatedAt),
    slotResponses: answer.slotResponses,
  };
}
