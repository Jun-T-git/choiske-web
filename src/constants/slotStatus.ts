// 回答ステータス（1=OK=○,2=NG=×,0=未回答=空）
export enum SlotStatus {
  OK = 1,        // ○ (OK)
  NG = 2,        // × (NG)
  PENDING = 3, // △ (未確定)
}

export const SLOT_STATUS_LABEL: Record<SlotStatus, string> = {
  [SlotStatus.OK]: "○",
  [SlotStatus.NG]: "×",
  [SlotStatus.PENDING]: "△",
};

export const SLOT_STATUS_LIST: SlotStatus[] = [
  SlotStatus.OK,
  SlotStatus.NG,
  SlotStatus.PENDING,
];