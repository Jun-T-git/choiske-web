import { FC } from "react";
import { TimeAdjustPanel } from "./TimeAdjustPanel";

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
}> = ({
  withTime,
  setWithTime,
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  slotSize,
  setSlotSize,
}) => (
  <section>
    <h3 className="text-md font-bold text-gray-700 mb-2 mt-4">
      3. 時間を調整する（任意）
    </h3>
    <p className="text-xs text-gray-500 mb-3">
      必要な場合のみ「時間も調整する」を選択してください
    </p>
    <TimeAdjustPanel
      withTime={withTime}
      setWithTime={setWithTime}
      timeFrom={timeFrom}
      setTimeFrom={setTimeFrom}
      timeTo={timeTo}
      setTimeTo={setTimeTo}
      slotSize={slotSize}
      setSlotSize={setSlotSize}
    />
  </section>
);
