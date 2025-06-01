import { validateTimeFormat, validateTimeRange } from "@/lib/utils/validationUtils";
import { useEffect, useState } from "react";
import { useDateSelect } from "./useDateSelect";

/**
 * 日程選択と時間調整を一体的に管理するカスタムフック
 * これにより、日付選択と時間選択の機能を一つのフックで扱えます
 */
export function useScheduleSelect(options?: {
  initialSelectedDays?: Date[];
  initialWithTime?: boolean;
  initialTimeFrom?: string;
  initialTimeTo?: string;
  initialSlotSize?: number;
}) {
  // 日付選択部分のロジックを統合
  const dateSelect = useDateSelect(options?.initialSelectedDays || []);

  // 時間調整部分のロジック
  const [withTime, setWithTime] = useState(options?.initialWithTime ?? false);
  const [timeFrom, setTimeFrom] = useState(options?.initialTimeFrom ?? "09:00");
  const [timeTo, setTimeTo] = useState(options?.initialTimeTo ?? "18:00");
  const [slotSize, setSlotSize] = useState(options?.initialSlotSize ?? 60);
  const [timeError, setTimeError] = useState<string | null>(null);

  // 時間のバリデーション
  useEffect(() => {
    if (!withTime) {
      setTimeError(null);
      return;
    }
    
    // 各時間のフォーマットを検証
    const fromError = validateTimeFormat(timeFrom);
    if (fromError) {
      setTimeError(fromError);
      return;
    }
    
    const toError = validateTimeFormat(timeTo);
    if (toError) {
      setTimeError(toError);
      return;
    }
    
    // 時間範囲を検証
    const rangeError = validateTimeRange(timeFrom, timeTo);
    if (rangeError) {
      setTimeError(rangeError);
      return;
    }
    
    setTimeError(null);
  }, [withTime, timeFrom, timeTo]);

  /**
   * 時間スロットを生成する関数
   */
  const generateTimeSlots = () => {
    if (!withTime) return ["00:00"];
    
    const [startHour, startMinute] = timeFrom.split(":").map(Number);
    const [endHour, endMinute] = timeTo.split(":").map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const slots = [];
    
    for (let time = startTime; time < endTime; time += slotSize) {
      const hour = Math.floor(time / 60).toString().padStart(2, "0");
      const minute = (time % 60).toString().padStart(2, "0");
      slots.push(`${hour}:${minute}`);
    }
    
    return slots;
  };

  /**
   * 日付と時間からスロットを生成
   */
  const generateFullTimeSlots = () => {
    const timeSlots = generateTimeSlots();
    const fullSlots: string[] = [];
    
    dateSelect.selectedDays.forEach(day => {
      timeSlots.forEach(timeStr => {
        const slot = new Date(day);
        const [hour, minute] = timeStr.split(":").map(Number);
        slot.setHours(hour, minute, 0, 0);
        fullSlots.push(slot.toISOString());
      });
    });
    
    return fullSlots;
  };

  return {
    // 日付選択関連
    ...dateSelect,
    
    // 時間調整関連
    withTime,
    setWithTime,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    slotSize,
    setSlotSize,
    timeError,
    
    // 統合機能
    generateTimeSlots,
    generateFullTimeSlots,
    
    // フォームの有効性
    isValid: dateSelect.selectedDays.length > 0 && !timeError,
  };
}
