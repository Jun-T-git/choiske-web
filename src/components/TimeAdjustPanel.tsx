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
}) => (
  <fieldset className="">
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
      <label className="flex-1 flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg border border-blue-100 bg-white hover:bg-blue-50 transition text-sm text-gray-800">
        <input
          type="radio"
          checked={!withTime}
          onChange={() => setWithTime(false)}
          className="accent-blue-500"
          name="withTime"
        />
        <span>時間は調整しない（終日）</span>
      </label>
      <label className="flex-1 flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg border border-blue-100 bg-white hover:bg-blue-50 transition text-sm text-gray-800">
        <input
          type="radio"
          checked={withTime}
          onChange={() => setWithTime(true)}
          className="accent-blue-500"
          name="withTime"
        />
        <span>時間も調整する</span>
      </label>
    </div>
    {withTime && (
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4 items-center">
        <label className="flex flex-col items-start gap-1 w-full">
          <span className="text-sm text-gray-700 font-semibold">開始</span>
          <input
            type="time"
            className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
          />
        </label>
        <span className="text-gray-500 hidden sm:inline-block">〜</span>
        <label className="flex flex-col items-start gap-1 w-full">
          <span className="text-sm text-gray-700 font-semibold">終了</span>
          <input
            type="time"
            className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
          />
        </label>
        <label className="flex flex-col items-start gap-1 w-full">
          <span className="text-sm text-gray-700 font-semibold">
            選択可能な単位
          </span>
          <select
            className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            value={slotSize}
            onChange={(e) => setSlotSize(Number(e.target.value))}
          >
            <option value={0}>1日ごと（時間区切りなし）</option>
            <option value={15}>15分ごと</option>
            <option value={30}>30分ごと</option>
            <option value={60}>1時間ごと</option>
          </select>
        </label>
      </div>
    )}
  </fieldset>
);
