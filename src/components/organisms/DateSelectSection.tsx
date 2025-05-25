import { FC } from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { BatchSelectPanel } from "../molecules/BatchSelectPanel";
import { CalendarSelector } from "../molecules/CalendarSelector";
import { SelectedDaysList } from "../molecules/SelectedDaysList";

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
  return (
    <section>
      <SectionHeading step={2}>候補日をカレンダーから選択</SectionHeading>
      <p className="text-xs text-gray-500 mb-3">
        カレンダーをタップして候補日を選択できます。もう一度タップで解除できます。
      </p>
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
          onSelect={(selected) => setSelectedDays(selected || [])}
          month={month}
          setMonth={setMonth}
        />
      </div>

      <BatchSelectPanel
        show={showBatchSelect}
        onToggle={() => setShowBatchSelect(!showBatchSelect)}
        allDaysToggled={allDaysToggled}
        toggleAllDaysInMonth={toggleAllDaysInMonth}
        weekdayToggles={weekdayToggles}
        toggleWeekdayButton={toggleWeekdayButton}
        WEEK_LABELS={WEEK_LABELS}
      />
      <SelectedDaysList
        selectedDays={selectedDays}
        onRemove={(date) =>
          setSelectedDays(
            selectedDays.filter((x) => x.getTime() !== date.getTime())
          )
        }
      />
      <div className="text-xs text-blue-600 mt-2 font-semibold">
        {selectedDays.length}日選択中
        {selectedDays.length > 0 && (
          <button
            type="button"
            className="ml-4 px-2 py-1 rounded bg-red-100 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-200 transition"
            onClick={() => setSelectedDays([])}
          >
            候補日を全て削除する
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-base mt-2 font-bold drop-shadow">
          {error}
        </div>
      )}
    </section>
  );
};
