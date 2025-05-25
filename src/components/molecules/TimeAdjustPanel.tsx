import { TimeInput } from "@/components/atoms/TimeInput";
import { FC } from "react";

interface TimeAdjustPanelProps {
  withTime: boolean;
  setWithTime: (v: boolean) => void;
  timeFrom: string;
  setTimeFrom: (v: string) => void;
  timeTo: string;
  setTimeTo: (v: string) => void;
  slotSize: number;
  setSlotSize: (v: number) => void;
  mode?: "create" | "edit";
}

/**
 * 時間調整パネルコンポーネント
 * @param withTime 時間調整ON/OFF
 * @param setWithTime ON/OFF切替関数
 * @param timeFrom 開始時刻
 * @param setTimeFrom 開始時刻更新関数
 * @param timeTo 終了時刻
 * @param setTimeTo 終了時刻更新関数
 * @param slotSize 区切り分数
 * @param setSlotSize 区切り分数更新関数
 */
export const TimeAdjustPanel: FC<TimeAdjustPanelProps> = ({
  withTime,
  setWithTime,
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  slotSize,
  setSlotSize,
  mode = "create",
}) => (
  <fieldset className="">
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
      <span className="text-xs text-gray-400 ml-1 font-normal">
        ※この項目は後から変更できません
      </span>
      <label
        className={`flex-1 flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg border border-blue-100 bg-white hover:bg-blue-50 transition text-sm text-gray-800 ${
          mode === "create"
            ? ""
            : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
        }`}
      >
        <input
          type="radio"
          checked={!withTime}
          onChange={() => setWithTime(false)}
          className="accent-blue-500"
          name="withTime"
          disabled={mode !== "create"}
        />
        <span>時間は調整しない（日付のみ）</span>
      </label>
      <label
        className={`flex-1 flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg border border-blue-100 bg-white hover:bg-blue-50 transition text-sm text-gray-800 ${
          mode === "create"
            ? ""
            : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
        }`}
      >
        <input
          type="radio"
          checked={withTime}
          onChange={() => setWithTime(true)}
          className="accent-blue-500"
          name="withTime"
          disabled={mode !== "create"}
        />
        <span>時間も調整する</span>
      </label>
    </div>
    {withTime && (
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4 items-center">
        <TimeInput label="開始" value={timeFrom} onChange={setTimeFrom} />
        <span className="text-gray-500 hidden sm:inline-block">〜</span>
        <TimeInput label="終了" value={timeTo} onChange={setTimeTo} />
        <label className="flex flex-col items-start gap-1 w-full">
          <span className="text-sm text-gray-700 font-semibold flex items-end gap-2">
            調整可能な単位
            <span className="text-xs text-gray-400 ml-1 font-normal">
              ※この項目は後から変更できません
            </span>
          </span>
          <select
            className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base ${
              mode === "create"
                ? ""
                : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
            }`}
            value={slotSize}
            onChange={(e) => setSlotSize(Number(e.target.value))}
            disabled={mode !== "create"}
          >
            <option value={30}>30分ごと</option>
            <option value={60}>1時間ごと</option>
          </select>
        </label>
      </div>
    )}
  </fieldset>
);
