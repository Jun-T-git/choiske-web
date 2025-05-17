import { useState } from "react";

export type TimeSlot = { slotStart: string };
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 日〜土

/**
 * 日程調整フォーム全体の状態・ロジックを管理するカスタムフック
 * - タイトル・期間・曜日・時間帯・スロットサイズ等の状態管理
 * - 候補スロット自動生成
 * - バリデーション・送信処理
 * @returns フォーム状態・ロジック一式
 */
export function useScheduleForm() {
  /** スケジュールタイトル */
  const [title, setTitle] = useState("");
  /** 主催者名（未使用の場合は空） */
  const [ownerName, setOwnerName] = useState("");
  /** スロットサイズ（分） */
  const [slotSize, setSlotSize] = useState(1440); // 1日
  /** 開始日（YYYY-MM-DD） */
  const [startDate, setStartDate] = useState("");
  /** 終了日（YYYY-MM-DD） */
  const [endDate, setEndDate] = useState("");
  /** 有効な曜日リスト */
  const [weekdays, setWeekdays] = useState<Weekday[]>([1, 2, 3, 4, 5]); // 平日デフォルト
  /** 開始時刻（HH:mm） */
  const [timeFrom, setTimeFrom] = useState("09:00");
  /** 終了時刻（HH:mm） */
  const [timeTo, setTimeTo] = useState("18:00");
  /** 生成された候補スロットリスト */
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  /**
   * 曜日トグル（指定曜日のON/OFF切替）
   * @param w 曜日番号（0:日〜6:土）
   */
  const toggleWeekday = (w: Weekday) => {
    setWeekdays((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w].sort()
    );
  };
  /** 平日のみ選択 */
  const setWeekdaysWeekday = () => setWeekdays([1, 2, 3, 4, 5]);
  /** 全曜日選択 */
  const setWeekdaysAll = () => setWeekdays([0, 1, 2, 3, 4, 5, 6]);

  /**
   * 候補スロット自動生成ロジック
   * - 期間・曜日・時間帯・スロットサイズに基づきスロット配列を生成
   */
  const generateSlots = () => {
    if (!startDate || !endDate || weekdays.length === 0 || !timeFrom || !timeTo)
      return;
    const slots: TimeSlot[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (weekdays.includes(d.getDay() as Weekday)) {
        // 1日単位 or 時間帯分割
        if (slotSize === 1440) {
          const slotStart = new Date(d);
          slotStart.setHours(0, 0, 0, 0);
          slots.push({ slotStart: slotStart.toISOString() });
        } else {
          // 時間帯分割
          const [fromH, fromM] = timeFrom.split(":").map(Number);
          const [toH, toM] = timeTo.split(":").map(Number);
          const startMin = fromH * 60 + fromM;
          const endMin = toH * 60 + toM;
          for (let min = startMin; min + slotSize <= endMin; min += slotSize) {
            const slot = new Date(d);
            slot.setHours(Math.floor(min / 60), min % 60, 0, 0);
            slots.push({ slotStart: slot.toISOString() });
          }
        }
      }
    }
    setTimeSlots(slots);
  };

  /**
   * 指定インデックスのスロットを削除
   * @param idx 削除対象インデックス
   */
  const removeTimeSlot = (idx: number) => {
    setTimeSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  /**
   * フォーム送信処理（例: デバッグ用アラート）
   * @param e フォームイベント
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      "送信: " +
        JSON.stringify(
          {
            title,
            ownerName,
            slotSize,
            startDate,
            endDate,
            weekdays,
            timeFrom,
            timeTo,
            timeSlots,
          },
          null,
          2
        )
    );
  };

  return {
    title,
    setTitle, // スケジュールタイトル
    ownerName,
    setOwnerName, // 主催者名
    slotSize,
    setSlotSize, // スロットサイズ
    startDate,
    setStartDate, // 開始日
    endDate,
    setEndDate, // 終了日
    weekdays,
    toggleWeekday,
    setWeekdaysWeekday,
    setWeekdaysAll, // 曜日操作
    timeFrom,
    setTimeFrom, // 開始時刻
    timeTo,
    setTimeTo, // 終了時刻
    timeSlots,
    generateSlots,
    removeTimeSlot, // スロット生成・削除
    handleSubmit, // 送信処理
  };
}
