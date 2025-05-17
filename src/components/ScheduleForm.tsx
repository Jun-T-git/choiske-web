import type { SelectMultipleEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useScheduleCalendar } from "../lib/hooks/useScheduleCalendar";
import { useTimeAdjust } from "../lib/hooks/useTimeAdjust";
import { DateSelectSection } from "./DateSelectSection";
import { TimeAdjustSection } from "./TimeAdjustSection";
import { TitleInputSection } from "./TitleInputSection";

const WEEK_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * 日程調整作成フォーム
 * - タイトル入力
 * - 候補日カレンダー選択
 * - まとめて選択（曜日・月一括）
 * - 選択済み日付リスト
 * - 時間調整
 * - バリデーション・送信
 */
export const ScheduleForm: React.FC = () => {
  // カレンダー・日付選択・曜日/月一括トグル等のロジックをカスタムフックで管理
  const {
    title,
    setTitle,
    selectedDays,
    setSelectedDays,
    month,
    setMonth,
    error,
    setError,
    weekdayToggles,
    toggleWeekdayButton,
    allDaysToggled,
    toggleAllDaysInMonth,
    showBatchSelect,
    setShowBatchSelect,
    goPrevMonth,
    goNextMonth,
    resetSelectedDays,
  } = useScheduleCalendar();
  // 時間調整用の状態・ロジックをカスタムフックで管理
  const {
    withTime,
    setWithTime,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    slotSize,
    setSlotSize,
  } = useTimeAdjust();

  /**
   * カレンダーで日付選択時のハンドラ
   */
  const handleSelect: SelectMultipleEventHandler = (days) => {
    setSelectedDays(days ? days : []);
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDays.length === 0) {
      setError("候補日を1日以上選択してください");
      return;
    }
    setError("");
    // TODO: API連携
    alert(
      `タイトル: ${title}\n候補日:\n` +
        selectedDays
          .sort((a, b) => a.getTime() - b.getTime())
          .map((d) => d.toLocaleDateString())
          .join(", ")
    );
  };

  return (
    <form
      className="bg-white/90 shadow-xl rounded-2xl px-4 sm:px-8 py-8 max-w-2xl mx-auto space-y-7 border border-gray-100"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        <span className="inline-block border-b-4 border-blue-400 pb-1">
          新しく日程調整を作成
        </span>
      </h1>
      <TitleInputSection title={title} setTitle={setTitle} />
      <DateSelectSection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        month={month}
        setMonth={setMonth}
        weekdayToggles={weekdayToggles}
        toggleWeekdayButton={toggleWeekdayButton}
        allDaysToggled={allDaysToggled}
        toggleAllDaysInMonth={toggleAllDaysInMonth}
        showBatchSelect={showBatchSelect}
        setShowBatchSelect={setShowBatchSelect}
        goPrevMonth={goPrevMonth}
        goNextMonth={goNextMonth}
        error={error}
      />
      <TimeAdjustSection
        withTime={withTime}
        setWithTime={setWithTime}
        timeFrom={timeFrom}
        setTimeFrom={setTimeFrom}
        timeTo={timeTo}
        setTimeTo={setTimeTo}
        slotSize={slotSize}
        setSlotSize={setSlotSize}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white px-6 py-3 rounded-xl w-full font-bold text-md shadow-lg transition"
      >
        日程調整を作成
      </button>
    </form>
  );
};
