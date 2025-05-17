import { useState } from "react";

/**
 * 時間調整に関する状態とロジックを管理するカスタムフック
 * UIや動作はScheduleForm.tsxと同一
 * @returns 時間調整用の状態・セッター
 */
export function useTimeAdjust() {
  // 「時間も調整する」かどうかの状態
  const [withTime, setWithTime] = useState(false);
  // 時間調整用の状態
  const [timeFrom, setTimeFrom] = useState("09:00");
  const [timeTo, setTimeTo] = useState("18:00");
  const [slotSize, setSlotSize] = useState(60); // デフォルト1時間ごと

  return {
    withTime,
    setWithTime,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    slotSize,
    setSlotSize,
  };
}
