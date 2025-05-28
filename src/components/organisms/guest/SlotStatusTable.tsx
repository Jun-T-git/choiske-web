import { SlotStatus } from "@/constants/slotStatus";
import { formatMonthDay } from "@/lib/utils/dateUtils";
import { FC } from "react";

interface SlotStatusTableProps {
  timeSlots: { slotId: string; date: string; time: string }[];
  statusList: { slotId: string; status: SlotStatus }[];
  onCellClick: (slotId: string) => void;
  onRowBulkUpdate?: (date: string, status: SlotStatus) => void;
  onColBulkUpdate?: (time: string, status: SlotStatus) => void;
}

const STATUS_UI = {
  [SlotStatus.OK]: {
    label: "○",
    color: "bg-green-100 text-green-700",
    desc: "OK (○)",
  },
  [SlotStatus.NG]: {
    label: "×",
    color: "bg-red-100 text-red-700",
    desc: "NG (×)",
  },
  [SlotStatus.PENDING]: {
    label: "△",
    color: "bg-yellow-100 text-yellow-700",
    desc: "未確定 (△)",
  },
};

export const SlotStatusTable: FC<SlotStatusTableProps> = ({
  timeSlots,
  statusList,
  onCellClick,
  onRowBulkUpdate,
  onColBulkUpdate,
}) => {
  // 日付・時間の一覧を生成
  const dates = Array.from(new Set(timeSlots.map((s) => s.date))); // 日付の一覧（ユニーク）
  const times = Array.from(new Set(timeSlots.map((s) => s.time))); // 時間の一覧（ユニーク）
  const withTime = times.length >= 2; // 時間も調整対象か（日付のみ調整の場合はfalse）
  // dateMap: date -> time[]
  const dateMap: Record<string, string[]> = {};
  timeSlots.forEach(({ date, time }) => {
    if (!dateMap[date]) dateMap[date] = [];
    if (!dateMap[date].includes(time)) dateMap[date].push(time);
  });
  // slotIdでstatusを引く
  const statusMap = Object.fromEntries(
    statusList.map((s) => [s.slotId, s.status])
  );

  return (
    <div className="rounded-2xl overflow-x-auto border border-gray-200 bg-white pb-3">
      <div className="relative">
        {/* 吹き出しガイド（テーブル右下・三角左上） */}
        <div
          className="absolute bottom-2 right-2 z-20 flex items-center"
          style={{ pointerEvents: "none" }}
        >
          <div className="relative">
            <span className="block bg-white border border-blue-100 text-gray-500 font-semibold rounded-xl px-3 py-1 shadow text-xs md:text-sm whitespace-nowrap">
              枠をタップで変更
            </span>
            {/* 三角を左上に */}
            <span className="absolute -top-1.5 left-3 w-3 h-3 bg-white border-t border-l border-blue-100 rotate-45 z-10" />
          </div>
        </div>
        <table className="min-w-full text-center align-middle text-xs md:text-sm">
          <thead>
            <tr>
              <th className="border border-gray-200 px-2 py-2 md:px-4 md:py-3 bg-white text-blue-900 font-bold sticky left-0 z-10 shadow-sm rounded-tl-2xl">
                日程調整
              </th>
              {times.map((time, i) => {
                // 列が全て○か×か判定
                const allColStatus = dates.map(
                  (date) =>
                    statusMap[
                      timeSlots.find((s) => s.date === date && s.time === time)
                        ?.slotId ?? ""
                    ]
                );
                const isAllOk =
                  allColStatus.length > 0 &&
                  allColStatus.every((s) => s === SlotStatus.OK);
                const isAllNg =
                  allColStatus.length > 0 &&
                  allColStatus.every((s) => s === SlotStatus.NG);
                return (
                  <th
                    key={time}
                    className={`border border-gray-200 px-2 py-2 md:px-4 md:py-3 text-blue-900 font-bold bg-white ${
                      i === times.length - 1 ? "rounded-tr-2xl" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{withTime ? time : "まとめて更新"}</span>
                      <div className="flex gap-1 md:gap-2 mt-1">
                        <button
                          type="button"
                          className={`text-green-600 text-base px-3 py-1 border font-bold shadow-sm transition ${
                            isAllOk
                              ? "bg-green-100 border-green-300 text-green-800"
                              : "hover:bg-green-50 border-green-100"
                          }`}
                          title="この列を全て○にする"
                          onClick={() =>
                            onColBulkUpdate &&
                            onColBulkUpdate(time, SlotStatus.OK)
                          }
                        >
                          ○
                        </button>
                        <button
                          type="button"
                          className={`text-red-600 text-base px-3 py-1 border font-bold shadow-sm transition ${
                            isAllNg
                              ? "bg-red-100 border-red-300 text-red-800"
                              : "hover:bg-red-50 border-red-100"
                          }`}
                          title="この列を全て×にする"
                          onClick={() =>
                            onColBulkUpdate &&
                            onColBulkUpdate(time, SlotStatus.NG)
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, rowIdx) => {
              // 行が全て○か×か判定
              const allRowStatus = dateMap[date].map((time) => {
                const slot = timeSlots.find(
                  (s) => s.date === date && s.time === time
                );
                return slot ? statusMap[slot.slotId] : undefined;
              });
              const isAllOk =
                allRowStatus.length > 0 &&
                allRowStatus.every((s) => s === SlotStatus.OK);
              const isAllNg =
                allRowStatus.length > 0 &&
                allRowStatus.every((s) => s === SlotStatus.NG);
              return (
                <tr
                  key={date}
                  className={
                    rowIdx % 2 === 1
                      ? "bg-gray-50 hover:bg-blue-50 transition-colors"
                      : "hover:bg-blue-50 transition-colors"
                  }
                >
                  <td
                    className={`border border-gray-200 px-2 py-2 md:px-4 md:py-3 font-bold text-gray-700 sticky left-0 z-10 shadow-sm whitespace-nowrap bg-white`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{formatMonthDay(new Date(date))}</span>
                      <div className="flex gap-1 md:gap-2 mt-1">
                        <button
                          type="button"
                          className={`text-green-600 text-base px-3 py-1 border font-bold shadow-sm transition ${
                            isAllOk
                              ? "bg-green-100 border-green-300 text-green-800"
                              : "hover:bg-green-50 border-green-100"
                          }`}
                          title="この行を全て○にする"
                          onClick={() =>
                            onRowBulkUpdate &&
                            onRowBulkUpdate(date, SlotStatus.OK)
                          }
                        >
                          ○
                        </button>
                        <button
                          type="button"
                          className={`text-red-600 text-base px-3 py-1 border font-bold shadow-sm transition ${
                            isAllNg
                              ? "bg-red-100 border-red-300 text-red-800"
                              : "hover:bg-red-50 border-red-100"
                          }`}
                          title="この行を全て×にする"
                          onClick={() =>
                            onRowBulkUpdate &&
                            onRowBulkUpdate(date, SlotStatus.NG)
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </td>
                  {dateMap[date].map((time) => {
                    const slot = timeSlots.find(
                      (s) => s.date === date && s.time === time
                    );
                    if (!slot) return <td key={time} />;
                    const s = statusMap[slot.slotId] ?? SlotStatus.OK;
                    const ui = STATUS_UI[s];
                    return (
                      <td
                        key={slot.slotId}
                        className={`relative transition-all duration-150 px-1.5 py-1 md:px-3 md:py-2 cursor-pointer select-none text-xl md:text-2xl font-bold border border-gray-200 ${ui.color} hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 group`}
                        onClick={() => onCellClick(slot.slotId)}
                        style={{
                          minWidth: 32,
                          minHeight: 32,
                          maxWidth: 44,
                          maxHeight: 44,
                        }}
                        tabIndex={0}
                        aria-label={ui.desc + "（タップで切替）"}
                      >
                        <span className="inline-block align-middle drop-shadow-sm">
                          {ui.label}
                        </span>
                        <span className="hidden group-hover:inline absolute left-1/2 top-full mt-2 -translate-x-1/2 text-xs bg-white border border-blue-100 rounded px-2 py-1 shadow z-20 whitespace-nowrap">
                          {ui.desc}（タップで切替）
                        </span>
                        {/* アニメーションエフェクト */}
                        <span className="absolute inset-0 pointer-events-none group-active:animate-ping group-active:bg-blue-100/30" />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-4 mt-4 px-3 text-sm text-gray-500 items-center left-0 bottom-0 rounded-2xl">
          <div className="flex items-center gap-1">
            <span className="text-green-600 text-lg">○</span>OK
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 text-lg">×</span>NG
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-600 text-lg">△</span>未定
          </div>
        </div>
      </div>
    </div>
  );
};
