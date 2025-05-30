"use client";

import { DateSelectSection } from "@/components/organisms/host/DateSelectSection";
import { TimeAdjustSection } from "@/components/organisms/host/TimeAdjustSection";
import { TitleInputSection } from "@/components/organisms/host/TitleInputSection";
import { createSchedule, updateSchedule } from "@/lib/queries/schedule";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { useDateSelect } from "../../lib/hooks/useDateSelect";
import { useTimeAdjust } from "../../lib/hooks/useTimeAdjust";

/**
 * 日程調整作成フォーム
 * - タイトル入力
 * - 候補日カレンダー選択
 * - まとめて選択（曜日・月一括）
 * - 選択済み日付リスト
 * - 時間調整
 * - バリデーション・送信
 */
export type ScheduleFormProps = {
  scheduleId?: string; // 編集モードのみ
  initialData?: {
    initialTitle?: string;
    initialDescription?: string;
    initialSelectedDays?: string[]; // ISO形式の文字列（例: "2023-10-01 T00:00:00Z"）
    initialSlotSize?: number;
    initialWithTime?: boolean;
    initialTimeFrom?: string;
    initialTimeTo?: string;
  };
};

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  scheduleId,
  initialData = {},
}) => {
  const {
    initialTitle = "",
    initialDescription = "",
    initialSelectedDays = [],
    initialSlotSize,
    initialWithTime,
    initialTimeFrom,
    initialTimeTo,
  } = initialData;

  // タイトル
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  // 時間調整のエラー状態
  const [timeError, setTimeError] = useState<string | null>(null);
  // 送信中の状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  // カレンダー・日付選択・曜日/月一括トグル等のロジックをカスタムフックで管理
  const {
    selectedDays,
    setSelectedDays,
    month,
    setMonth,
    error,
    weekdayToggles,
    toggleWeekdayButton,
    allDaysToggled,
    toggleAllDaysInMonth,
    showBatchSelect,
    setShowBatchSelect,
    goPrevMonth,
    goNextMonth,
  } = useDateSelect(initialSelectedDays.map((day) => new Date(day))); // ISO形式の文字列をDate型に変換
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
    generateTimeSlots,
  } = useTimeAdjust({
    initialWithTime,
    initialTimeFrom,
    initialTimeTo,
    initialSlotSize,
  });
  const router = useRouter();

  /**
   * フォーム送信処理（API連携）
   * @param e フォームイベント
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信中状態に設定
    setIsSubmitting(true);
    try {
      const slots = selectedDays
        .map((day) => {
          const date = new Date(day);
          const dateTimeSlots = generateTimeSlots().map((slot) => {
            const [hours, minutes] = slot.split(":").map(Number);
            date.setHours(hours, minutes, 0, 0);
            return date.toISOString();
          });
          return dateTimeSlots;
        })
        .flat();
      const slotSizeSubmit = withTime ? slotSize : 1440; // 終日選択時は1440分（1日）
      const data = scheduleId
        ? await updateSchedule(
            scheduleId,
            title,
            description,
            slotSizeSubmit,
            slots
          )
        : await createSchedule(title, description, slotSizeSubmit, slots);
      // 成功した場合は作成完了画面に遷移
      if (data) {
        const savedScheduleId = data;
        if (scheduleId) {
          router.push(`/host/${savedScheduleId}/done?mode=edit`);
        } else {
          router.push(`/host/${savedScheduleId}/done`);
        }
      }
    } catch (err: unknown) {
      console.error("Error:", err);
      alert("日程調整の作成に失敗しました。");
    } finally {
      // エラーが発生しても送信中状態を解除
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="bg-white/90 shadow-xl rounded-2xl px-4 sm:px-8 py-8 max-w-2xl mx-auto space-y-7 border border-gray-100"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        <span className="inline-block border-b-4 border-blue-400 pb-1">
          {scheduleId ? "日程調整を編集する" : "日程調整を作成する"}
        </span>
      </h1>
      <TitleInputSection
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
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
        mode={scheduleId ? "edit" : "create"}
        onTimeError={setTimeError}
      />
      <button
        type="submit"
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed relative"
        disabled={
          isSubmitting ||
          !!error ||
          !title.trim() ||
          selectedDays.length === 0 ||
          !!timeError
        }
      >
        {isSubmitting ? (
          <>
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              処理中...
            </span>
          </>
        ) : scheduleId ? (
          "日程調整を保存"
        ) : (
          "日程調整を作成"
        )}
      </button>
    </form>
  );
};
