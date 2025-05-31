import { FC } from "react";
import { BatchSelectPanel } from "../../molecules/BatchSelectPanel";
import { CalendarSelector } from "../../molecules/CalendarSelector";
import { FormSection } from "../../molecules/FormSection";
import { SelectedDaysList } from "../../molecules/SelectedDaysList";

/**
 * 候補日選択・カレンダー・バッチ・まとめて選択セクション
 */
export const DateSelectSection: FC<{
  selectedDays: Date[];
  setSelectedDays: (days: Date[]) => void;
  month: Date;
  setMonth: (d: Date) => void;
  weekdayToggles: boolean[];
  toggleWeekdayButton: (idx: number) => void;
  allDaysToggled: boolean;
  toggleAllDaysInMonth: () => void;
  showBatchSelect: boolean;
  setShowBatchSelect: (v: boolean) => void;
  goPrevMonth: () => void;
  goNextMonth: () => void;
  error: string;
}> = ({
  selectedDays,
  setSelectedDays,
  month,
  setMonth,
  weekdayToggles,
  toggleWeekdayButton,
  allDaysToggled,
  toggleAllDaysInMonth,
  showBatchSelect,
  setShowBatchSelect,
  goPrevMonth,
  goNextMonth,
  error,
}) => {
  const WEEK_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

  // 今月の日付リストを生成
  const currentMonthDays: Date[] = [];
  const year = month.getFullYear();
  const m = month.getMonth();
  for (let d = 1; d <= 31; d++) {
    const date = new Date(year, m, d);
    if (date.getMonth() !== m) break;
    currentMonthDays.push(date);
  }

  // 選択日の削除ハンドラ
  const handleRemoveSelectedDay = (date: Date) => {
    setSelectedDays(selectedDays.filter((d) => d.getTime() !== date.getTime()));
  };

  return (
    <FormSection
      title="候補日をカレンダーから選択"
      step={2}
      description="カレンダーをタップして候補日を選択できます。もう一度タップで解除できます。"
    >
      <div className="border border-gray-100 rounded-lg p-2 pt-0 bg-white shadow-sm max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-2 mt-2">
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-gray-400"
            onClick={goPrevMonth}
          >
            ＜ 前の月
          </button>
          <span className="font-bold text-blue-700 text-md">
            {month.getFullYear()}年{month.getMonth() + 1}月
          </span>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-gray-400"
            onClick={goNextMonth}
          >
            次の月 ＞
          </button>
        </div>

        <CalendarSelector
          selectedDays={selectedDays}
          onSelect={(selected) => selected && setSelectedDays(selected)}
          month={month}
          setMonth={setMonth}
        />
      </div>

      <div className="text-center mt-3">
        <button
          type="button"
          className={`text-xs font-semibold inline-flex items-center ${
            showBatchSelect
              ? "text-blue-600 underline"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setShowBatchSelect(!showBatchSelect)}
        >
          {showBatchSelect ? "閉じる ↑" : "まとめて選択 ↓"}
        </button>
      </div>

      {showBatchSelect && (
        <BatchSelectPanel
          show={showBatchSelect}
          onToggle={() => setShowBatchSelect(!showBatchSelect)}
          weekdayToggles={weekdayToggles}
          toggleWeekdayButton={toggleWeekdayButton}
          allDaysToggled={allDaysToggled}
          toggleAllDaysInMonth={toggleAllDaysInMonth}
          WEEK_LABELS={WEEK_LABELS}
          currentMonthDays={currentMonthDays}
        />
      )}

      <SelectedDaysList
        selectedDays={selectedDays}
        onRemove={handleRemoveSelectedDay}
      />

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </FormSection>
  );
};
