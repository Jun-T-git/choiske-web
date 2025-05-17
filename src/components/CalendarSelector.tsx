import { ja } from "date-fns/locale";
import { FC } from "react";
import { DayPicker } from "react-day-picker";

interface CalendarSelectorProps {
  selectedDays: Date[];
  onSelect: (
    selected: Date[] | undefined,
    triggerDate: Date | undefined
  ) => void;
  month: Date;
  setMonth: (d: Date) => void;
}

/**
 * カレンダー選択コンポーネント
 * - 複数日選択カレンダーUI
 * @param selectedDays 選択済み日付配列
 * @param onSelect 日付選択ハンドラ
 * @param month 表示中の月
 * @param setMonth 月変更ハンドラ
 */
export const CalendarSelector: FC<CalendarSelectorProps> = ({
  selectedDays,
  onSelect,
  month,
  setMonth,
}) => (
  <DayPicker
    mode="multiple"
    required={false}
    selected={selectedDays}
    onSelect={(selected, triggerDate) => onSelect(selected, triggerDate)}
    showOutsideDays
    month={month}
    onMonthChange={setMonth}
    className="mx-auto"
    modifiersClassNames={{ selected: "!bg-blue-500 !text-white" }}
    locale={ja}
  />
);
