import { FC } from "react";
import { FormSection } from "../../molecules/FormSection";
import { TimeAdjustPanel } from "../../molecules/TimeAdjustPanel";

/**
 * 時間調整セクション
 * @param withTime 時間調整ON/OFF
 * @param setWithTime ON/OFF切替関数
 * @param timeFrom 開始時刻
 * @param setTimeFrom 開始時刻更新関数
 * @param timeTo 終了時刻
 * @param setTimeTo 終了時刻更新関数
 * @param slotSize 区切り分数
 * @param setSlotSize 区切り分数更新関数
 * @param onTimeError 時刻入力エラー時のコールバック
 */
export const TimeAdjustSection: FC<{
  withTime: boolean;
  setWithTime: (v: boolean) => void;
  timeFrom: string;
  setTimeFrom: (v: string) => void;
  timeTo: string;
  setTimeTo: (v: string) => void;
  slotSize: number;
  setSlotSize: (v: number) => void;
  mode?: "create" | "edit";
  onTimeError?: (error: string | null) => void;
}> = ({
  withTime,
  setWithTime,
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  slotSize,
  setSlotSize,
  mode = "create",
  onTimeError,
}) => (
  <FormSection
    title="時間を調整する（任意）"
    step={3}
    description="必要な場合のみ「時間も調整する」を選択してください"
  >
    <TimeAdjustPanel
      withTime={withTime}
      setWithTime={setWithTime}
      timeFrom={timeFrom}
      setTimeFrom={setTimeFrom}
      timeTo={timeTo}
      setTimeTo={setTimeTo}
      slotSize={slotSize}
      setSlotSize={setSlotSize}
      mode={mode} // 編集モードでは一部編集不可
      onError={onTimeError}
    />
  </FormSection>
);
