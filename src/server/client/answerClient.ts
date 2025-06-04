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

  // 既存の回答状況を更新
  // 1. 現在のslotResponsesを全て削除
  await prisma.slotResponse.deleteMany({
    where: { answerId: existingAnswer.id },
  });

  // 2. 新しいslotResponsesを作成
  await Promise.all(
    input.slotResponses.map((sr) =>
      prisma.slotResponse.create({
        data: {
          answerId: existingAnswer.id,
          slotId: sr.slotId,
          status: sr.status,
        },
      })
    )
  );

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
