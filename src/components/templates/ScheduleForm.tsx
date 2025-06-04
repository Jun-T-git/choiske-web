"use client";

import TimezoneIndicator from "@/components/atoms/TimezoneIndicator";
import { BaseForm } from "@/components/molecules/BaseForm";
import { FormButton } from "@/components/molecules/FormButton";
import { DateSelectSection } from "@/components/organisms/host/DateSelectSection";
import { TimeAdjustSection } from "@/components/organisms/host/TimeAdjustSection";
import { TitleInputSection } from "@/components/organisms/host/TitleInputSection";
import { useFormSubmit } from "@/lib/hooks/useFormSubmit";
import { useScheduleSelect } from "@/lib/hooks/useScheduleSelect";
import { createSchedule, updateSchedule } from "@/lib/queries/schedule";
import {
  isIsoDateString,
  jstIsoToDate,
  utcIsoToJstIso,
} from "@/lib/utils/dateUtils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import "react-day-picker/dist/style.css";

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

interface SubmitData {
  title: string;
  description: string;
  slotSizeMinutes: number;
  slots: string[];
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  scheduleId,
  initialData = {},
}) => {
  const {
    initialTitle = "",
    initialDescription = "",
    initialSelectedDays = [], // この値はUTC ISOフォーマットの配列
    initialSlotSize = 60,
    initialWithTime = true,
    initialTimeFrom = "09:00",
    initialTimeTo = "19:00",
  } = initialData;

  // UTCフォーマットのデータをJSTのDateオブジェクトに変換
  const convertedInitialSelectedDays = initialSelectedDays.map((dateStr) => {
    if (isIsoDateString(dateStr)) {
      // UTCのISO文字列をJSTに変換してからDateオブジェクトに変換
      const jstStr = utcIsoToJstIso(dateStr);
      return jstIsoToDate(jstStr);
    }
    return new Date(dateStr);
  });

  // タイトルと説明
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const router = useRouter();

  // スケジュール選択の統合ロジック
  const scheduleSelect = useScheduleSelect({
    initialSelectedDays: convertedInitialSelectedDays,
    initialTimeFrom,
    initialTimeTo,
    initialSlotSize,
    initialWithTime,
  });

  // フォーム送信処理用のカスタムフック
  const { submitForm, isSubmitting, errorMessage } = useFormSubmit<
    SubmitData,
    string
  >({
    onSubmit: async (data) => {
      const { title, description, slotSizeMinutes, slots } = data;
      if (scheduleId) {
        return await updateSchedule(
          scheduleId,
          title,
          description,
          slotSizeMinutes,
          slots
        );
      } else {
        return await createSchedule(title, description, slotSizeMinutes, slots);
      }
    },
    onSuccess: (savedScheduleId) => {
      if (scheduleId) {
        // 編集モードの場合：編集完了画面へ
        router.push(`/host/${savedScheduleId}/done?mode=edit`);
      } else {
        // 新規作成の場合：作成完了画面へ
        router.push(`/host/${savedScheduleId}/done`);
      }
    },
  });

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 選択された日付と時間からスロットを生成（UTC時間に変換）
      const slots = scheduleSelect.generateFullTimeSlots();
      // 終日選択時は1440分（1日）、それ以外は指定された分数
      const slotSizeMinutes = scheduleSelect.withTime
        ? scheduleSelect.slotSize
        : 1440;

      await submitForm({
        title,
        description,
        slotSizeMinutes,
        slots,
      });
    } catch (err) {
      // エラーはuseFormSubmit内で処理されるため、ここでは何もしない
      console.error("フォーム送信中にエラーが発生しました:", err);
    }
  };

  // バリデーションチェック
  const isFormValid = scheduleSelect.isValid && title.trim() !== "";

  return (
    <BaseForm onSubmit={handleSubmit} errorMessage={errorMessage}>
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
        selectedDays={scheduleSelect.selectedDays}
        setSelectedDays={scheduleSelect.setSelectedDays}
        month={scheduleSelect.month}
        setMonth={scheduleSelect.setMonth}
        weekdayToggles={scheduleSelect.weekdayToggles}
        toggleWeekdayButton={scheduleSelect.toggleWeekdayButton}
        allDaysToggled={scheduleSelect.allDaysToggled}
        toggleAllDaysInMonth={scheduleSelect.toggleAllDaysInMonth}
        showBatchSelect={scheduleSelect.showBatchSelect}
        setShowBatchSelect={scheduleSelect.setShowBatchSelect}
        goPrevMonth={scheduleSelect.goPrevMonth}
        goNextMonth={scheduleSelect.goNextMonth}
        error={scheduleSelect.error}
      />

      <TimeAdjustSection
        withTime={scheduleSelect.withTime}
        setWithTime={scheduleSelect.setWithTime}
        timeFrom={scheduleSelect.timeFrom}
        setTimeFrom={scheduleSelect.setTimeFrom}
        timeTo={scheduleSelect.timeTo}
        setTimeTo={scheduleSelect.setTimeTo}
        slotSize={scheduleSelect.slotSize}
        setSlotSize={scheduleSelect.setSlotSize}
        mode={scheduleId ? "edit" : "create"}
        onTimeError={(error) => (scheduleSelect.timeError = error)}
      />

      <div className="flex justify-end mt-2 mb-4">
        <TimezoneIndicator />
      </div>

      <FormButton
        isSubmitting={isSubmitting}
        isEdit={!!scheduleId}
        buttonText="日程調整を作成"
        editButtonText="日程調整を保存"
        loadingText="処理中..."
        editLoadingText="処理中..."
        variant="primary"
        size="lg"
        fullWidth
        disabled={!isFormValid}
        className="h-12 font-bold text-base"
      />
    </BaseForm>
  );
};
