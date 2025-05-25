"use client";

import { DateSelectSection } from "@/components/organisms/DateSelectSection";
import { TimeAdjustSection } from "@/components/organisms/TimeAdjustSection";
import { TitleInputSection } from "@/components/organisms/TitleInputSection";
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
        ? await updateSchedule(scheduleId, title, slotSizeSubmit, slots)
        : await createSchedule(title, slotSizeSubmit, slots);
      // 成功した場合は作成完了画面に遷移
      if (data) {
        const savedScheduleId = data;
        scheduleId
          ? router.push(`/host/${savedScheduleId}/done?mode=edit`)
          : router.push(`/host/${savedScheduleId}/done`);
      }
    } catch (err: any) {
      console.error("Error:", err);
      alert("日程調整の作成に失敗しました。");
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
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white px-6 py-3 rounded-xl w-full font-bold text-md shadow-lg transition"
      >
        {scheduleId ? "日程調整を保存" : "日程調整を作成"}
      </button>
    </form>
  );
};
