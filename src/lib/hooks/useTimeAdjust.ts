import { useState } from "react";

/**
 * 時間調整に関する状態とロジックを管理するカスタムフック
 * UIや動作はScheduleForm.tsxと同一
 * @returns 時間調整用の状態・セッター
 */
export function useTimeAdjust(options?: {
  initialWithTime?: boolean;
  initialTimeFrom?: string;
  initialTimeTo?: string;
  initialSlotSize?: number;
}) {
  // 「時間も調整する」かどうかの状態
  const [withTime, setWithTime] = useState(options?.initialWithTime ?? false);
  // 時間調整用の状態
  const [timeFrom, setTimeFrom] = useState(options?.initialTimeFrom ?? "09:00");
  const [timeTo, setTimeTo] = useState(options?.initialTimeTo ?? "18:00");
  const [slotSize, setSlotSize] = useState(options?.initialSlotSize ?? 60); // デフォルト1時間ごと（終日選択時は1日）

  /**
   * 時間スロットを生成する関数
   * - 開始時刻(timeFrom)と終了時刻(timeTo)を分割し、slotSize(分)ごとにスロットを生成
   * - withTimeがfalseの場合は00:00の1スロットのみを返す
   * @returns 時間スロットの配列
   * @example timeFrom="09:00", timeTo="18:00", slotSize=60の場合
   * const slots = generateTimeSlots();
   * console.log(slots); // ["09:00", "10:00", ..., "17:00"]
   */
  const generateTimeSlots = () => {
    if (!withTime) return ["00:00"]; // withTimeがfalseの場合は00:00の1スロットのみ
    const [startHour, startMinute] = timeFrom.split(":").map(Number);
    const [endHour, endMinute] = timeTo.split(":").map(Number);
    const startTime = startHour * 60 + startMinute; // 開始時刻を分に変換
    const endTime = endHour * 60 + endMinute; // 終了時刻を分に変換
    const slots = [];
    for (let time = startTime; time <= endTime; time += slotSize) {
      const hour = Math.floor(time / 60).toString().padStart(2, "0");
      const minute = (time % 60).toString().padStart(2, "0");
      slots.push(`${hour}:${minute}`);
    }
    return slots;
  };

  return {
    withTime,
    setWithTime,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    slotSize,
    setSlotSize,
    generateTimeSlots,
  };
}
