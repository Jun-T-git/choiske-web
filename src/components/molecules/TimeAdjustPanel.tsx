import { FC, useEffect, useState } from "react";

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
  onError?: (error: string | null) => void;
}

/**
 * 時刻の文字列を分単位の数値に変換する
 * @param timeStr "HH:MM"形式の時刻文字列
 * @returns 分単位の数値
 */
const convertTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

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
  onError,
}) => {
  // 時刻のバリデーションエラー状態
  const [timeError, setTimeError] = useState<string | null>(null);

  // 時刻の変更時にバリデーションを実行
  useEffect(() => {
    if (!withTime) {
      setTimeError(null);
      if (onError) onError(null);
      return;
    }

    const fromMinutes = convertTimeToMinutes(timeFrom);
    const toMinutes = convertTimeToMinutes(timeTo);

    if (fromMinutes >= toMinutes) {
      const error = "開始時刻は終了時刻より前に設定してください";
      setTimeError(error);
      if (onError) onError(error);
    } else {
      setTimeError(null);
      if (onError) onError(null);
    }
  }, [timeFrom, timeTo, withTime, onError]);

  return (
    <fieldset className="">
      <div className="flex flex-col gap-2 sm:gap-4 mb-2">
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
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          withTime
            ? "max-h-[500px] opacity-100 scale-100 mt-6"
            : "max-h-0 opacity-0 scale-95 mt-0"
        }`}
      >
        {withTime && (
          <div className="flex flex-col gap-2 sm:gap-4 items-center">
            <label className="flex flex-col items-start gap-1 w-full">
              <span className="text-sm text-gray-700 font-semibold flex items-end gap-2">
                調整可能な単位
                <span className="text-xs text-gray-400 ml-1 font-normal">
                  ※この項目は後から変更できません
                </span>
              </span>
              <select
                className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base hover:border-blue-300 ${
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
            {/* 開始時刻セレクト */}
            <label className="flex flex-col items-start gap-1 w-full">
              <span className="text-sm text-gray-700 font-semibold">開始</span>
              <select
                className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base hover:border-blue-300 ${
                  mode === "create"
                    ? ""
                    : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
                }`}
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                disabled={mode !== "create"}
              >
                {Array.from({ length: (24 * 60) / slotSize + 1 }, (_, i) => {
                  const minutes = i * slotSize;
                  if (minutes > 24 * 60) return null;
                  const h = Math.floor(minutes / 60);
                  const m = minutes % 60;
                  const label = `${h.toString().padStart(2, "0")}:${m
                    .toString()
                    .padStart(2, "0")}`;
                  return (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
            {/* 終了時刻セレクト */}
            <label className="flex flex-col items-start gap-1 w-full">
              <span className="text-sm text-gray-700 font-semibold">終了</span>
              <select
                className={`border border-gray-300 rounded-lg px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base hover:border-blue-300 ${
                  mode === "create"
                    ? ""
                    : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
                }`}
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                disabled={mode !== "create"}
              >
                {Array.from({ length: (24 * 60) / slotSize + 1 }, (_, i) => {
                  const minutes = i * slotSize;
                  if (minutes > 24 * 60) return null;
                  const h = Math.floor(minutes / 60);
                  const m = minutes % 60;
                  const label = `${h.toString().padStart(2, "0")}:${m
                    .toString()
                    .padStart(2, "0")}`;
                  return (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        )}

        {/* バリデーションエラーメッセージ */}
        {timeError && withTime && (
          <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-2 bg-red-50 p-2 rounded-lg border border-red-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {timeError}
          </div>
        )}
      </div>
    </fieldset>
  );
};
