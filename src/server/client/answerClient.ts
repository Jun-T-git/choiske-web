import { prisma } from "@/server/client/prisma";
import { Answer } from "@/types/answer";
import { SlotResponse } from "@/types/slotResponse";

export type CreateAnswerInput = {
  scheduleId: string;
  name: string;
  comment: string | null;
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
  // DateはISO文字列に変換して返す
  return {
    ...answer,
    createdAt: answer.createdAt.toISOString(),
    updatedAt: answer.updatedAt.toISOString(),
    slotResponses: answer.slotResponses.map((sr) => ({
      ...sr,
    })),
  };
}
