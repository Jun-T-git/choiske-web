export type Schedule = {
  id: string;
  title: string;
  slotSizeMinutes: number;
  publicToken: string;
  createdAt: Date;
  expiresAt: Date;
};

export type ScheduleSummary = {
  title: string;
  answerUrl: string; // アンケート回答URL
  hostUrl: string; // ホストURL（スケジュール作成者用）
};