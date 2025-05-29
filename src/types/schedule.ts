import { Answer } from "./answer";
import { SlotResponse } from "./slotResponse";
import { TimeSlot } from "./timeSlot";

export type Schedule = {
  id: string;
  title: string;
  description: string | null;
  slotSizeMinutes: number;
  publicToken: string;
  createdAt: string;
  expiresAt: string;
};

export type ScheduleSummary = {
  title: string;
  answerSummaryUrl: string; // アンケート回答URL
  hostUrl: string; // ホストURL（スケジュール作成者用）
};

export type ScheduleWithAnswers = Schedule
  & { timeSlots?: TimeSlot[] }
  & {
    answers?: (Answer
      & { slotResponses?: SlotResponse[] })[]
  };