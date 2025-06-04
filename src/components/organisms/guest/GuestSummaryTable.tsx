"use client";
import TimezoneIndicator from "@/components/atoms/TimezoneIndicator";
import { SlotStatus } from "@/constants/slotStatus";
import {
  formatMonthDay,
  isIsoDateString,
  jstIsoToDate,
  utcIsoToJstIso,
} from "@/lib/utils/dateUtils";
import { Answer } from "@/types/answer";
import { SlotResponse } from "@/types/slotResponse";
import { FC, useState } from "react";
import { CommentPopover } from "./CommentPopover";

/**
 * 指定された日付文字列をJST表示用のDateオブジェクトに変換する
 * @param dateStr UTC ISO形式の日付文字列またはその他の日付文字列
 * @returns JST日付オブジェクト
 */
const toJstDate = (dateStr: string): Date => {
  if (isIsoDateString(dateStr)) {
    // UTCのISO文字列をJSTに変換してからDateオブジェクトに変換
    const jstStr = utcIsoToJstIso(dateStr);
    return jstIsoToDate(jstStr);
  }
  // ISO文字列でない場合は直接Dateに変換（ローカルタイムゾーン）
  return new Date(dateStr);
};

type SlotSummary = {
  slotId: string;
  slotStart: string;
  date: string;
  time: string;
  statusCounts: { [key in SlotStatus]: number };
};

type GuestSummaryTableProps = {
  slots: SlotSummary[];
  answers: (Answer & {
    slotResponses: SlotResponse[];
  })[];
};

const STATUS_UI = {
  [SlotStatus.OK]: {
    label: "○",
    color: "bg-green-100 text-green-700 border-green-400",
  },
  [SlotStatus.NG]: {
    label: "×",
    color: "bg-red-100 text-red-700 border-red-400",
  },
  [SlotStatus.PENDING]: {
    label: "△",
    color: "bg-yellow-100 text-yellow-700 border-yellow-400",
  },
};

export const GuestSummaryTable: FC<GuestSummaryTableProps> = ({
  slots,
  answers,
}) => {
  // 各日付ごとのスロット数を事前に集計
  const dateSlotCount: { [date: string]: number } = {};
  slots.forEach((slot) => {
    dateSlotCount[slot.date] = (dateSlotCount[slot.date] || 0) + 1;
  });

  // すべての日付でスロットが1つだけか判定
  const allDatesSingleSlot = Object.values(dateSlotCount).every((c) => c === 1);

  // 日付の境界判定を内部で計算
  const dateBoundaries: { [rowIdx: number]: string } = {};
  slots.forEach((slot, idx) => {
    if (idx === 0 || slots[idx - 1].date !== slot.date) {
      dateBoundaries[idx] = slot.date;
    }
  });

  // OK数→PENDING数→NG数の順で降順ソート
  const sortedSlots = [...slots].sort((a, b) => {
    if (b.statusCounts[SlotStatus.OK] !== a.statusCounts[SlotStatus.OK]) {
      return b.statusCounts[SlotStatus.OK] - a.statusCounts[SlotStatus.OK];
    }
    if (
      b.statusCounts[SlotStatus.PENDING] !== a.statusCounts[SlotStatus.PENDING]
    ) {
      return (
        b.statusCounts[SlotStatus.PENDING] - a.statusCounts[SlotStatus.PENDING]
      );
    }
    return a.statusCounts[SlotStatus.NG] - b.statusCounts[SlotStatus.NG]; // NGは少ない方が上
  });
  const topCounts: [number, number, number][] = [];
  let rank = 0;
  for (let i = 0; i < sortedSlots.length && rank < 3; i++) {
    const s = sortedSlots[i];
    const key: [number, number, number] = [
      s.statusCounts[SlotStatus.OK],
      s.statusCounts[SlotStatus.PENDING],
      s.statusCounts[SlotStatus.NG],
    ];
    if (
      !topCounts.some(
        ([ok, p, ng]) => ok === key[0] && p === key[1] && ng === key[2]
      )
    ) {
      topCounts.push(key);
      rank++;
    }
  }

  // コメントポップオーバーのopen indexを管理
  const [openCommentIdx, setOpenCommentIdx] = useState<number | null>(null);

  return (
    <div className="overflow-y-auto max-h-[80vh] rounded-xl border border-gray-100 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="flex justify-end p-2">
        <TimezoneIndicator />
      </div>
      <table className="min-w-full text-center align-middle text-xs md:text-sm">
        <thead>
          <tr>
            <th className="bg-white sticky top-0 left-0 z-30 text-blue-900 font-semibold px-3 py-3 md:px-6 md:py-4 rounded-tl-xl border-b border-blue-100 text-sm md:text-base">
              日付
            </th>
            {!allDatesSingleSlot && (
              <th className="bg-white sticky top-0 left-14 z-30 text-blue-900 font-semibold px-3 py-3 md:px-6 md:py-4 border-b border-blue-100 text-sm md:text-base">
                時間
              </th>
            )}
            <th className="bg-white sticky top-0 z-20 px-3 py-3 md:px-6 md:py-4 text-blue-900 font-semibold border-b border-blue-100 text-sm md:text-base">
              集計
            </th>
            {answers.map((a) => (
              <th
                key={a.id}
                className="bg-white sticky top-0 z-20 px-2 py-2 md:px-4 md:py-3 text-blue-900 font-semibold border-b border-blue-50 text-xs md:text-sm"
              >
                {a.name || "匿名"}
              </th>
            ))}
          </tr>
          <tr>
            <th className="bg-white sticky top-[42px] left-0 z-30 text-xs text-gray-400 text-center pr-2">
              コメント
            </th>
            {!allDatesSingleSlot && (
              <th className="bg-white sticky top-[42px] z-20" />
            )}
            <th className="bg-white sticky top-[42px] z-20" />
            {answers.map((a, i) => (
              <th
                key={a.id}
                className="bg-white sticky top-[42px] z-10 py-1 text-center align-middle"
              >
                {a.comment ? (
                  <CommentPopover
                    comment={a.comment}
                    open={openCommentIdx === i}
                    onOpenChange={(v) => setOpenCommentIdx(v ? i : null)}
                  />
                ) : (
                  "-"
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx) => {
            // 日付の重複非表示
            const showDate =
              dateBoundaries[idx] || slots[idx - 1]?.date !== slot.date;
            // グラデーション用クラス
            let gradClass = "";
            const slotKey: [number, number, number] = [
              slot.statusCounts[SlotStatus.OK],
              slot.statusCounts[SlotStatus.PENDING],
              slot.statusCounts[SlotStatus.NG],
            ];
            if (
              topCounts[0] &&
              slotKey[0] === topCounts[0][0] &&
              slotKey[1] === topCounts[0][1] &&
              slotKey[2] === topCounts[0][2]
            )
              gradClass = "bg-green-300/80";
            else if (
              topCounts[1] &&
              slotKey[0] === topCounts[1][0] &&
              slotKey[1] === topCounts[1][1] &&
              slotKey[2] === topCounts[1][2]
            )
              gradClass = "bg-green-200/80";
            else if (
              topCounts[2] &&
              slotKey[0] === topCounts[2][0] &&
              slotKey[1] === topCounts[2][1] &&
              slotKey[2] === topCounts[2][2]
            )
              gradClass = "bg-green-100/80";

            return (
              <tr
                key={slot.slotId}
                className={`${
                  showDate ? "border-t-2 border-gray-200" : ""
                } ${gradClass}`}
              >
                <td className="px-2 py-2 md:px-4 md:py-3 font-bold bg-gray-50 text-gray-700 sticky left-0 z-10 whitespace-nowrap">
                  {showDate ? formatMonthDay(toJstDate(slot.date)) : ""}
                </td>
                {!allDatesSingleSlot && (
                  <td
                    className={`px-2 py-2 md:px-4 md:py-3 font-bold bg-gray-50 text-gray-700 sticky left-14 z-10 whitespace-nowrap${
                      gradClass ? ` ${gradClass}` : ""
                    }`}
                  >
                    {slot.time}
                  </td>
                )}
                <td className="px-2 py-2 md:px-4 md:py-3 text-xs text-gray-700 border-r border-gray-300">
                  <span className="mr-2 text-green-600">
                    ○{slot.statusCounts[SlotStatus.OK]}
                  </span>
                  <span className="mr-2 text-yellow-600">
                    △{slot.statusCounts[SlotStatus.PENDING]}
                  </span>
                  <span className="text-red-600">
                    ×{slot.statusCounts[SlotStatus.NG]}
                  </span>
                </td>
                {answers.map((a) => {
                  const resp = a.slotResponses.find(
                    (r) => r.slotId === slot.slotId
                  );
                  const s = (resp?.status as SlotStatus) ?? SlotStatus.PENDING;
                  const ui = STATUS_UI[s];
                  return (
                    <td
                      key={a.id}
                      className={`px-2 py-2 md:px-4 md:py-3 font-bold ${ui.color}`}
                    >
                      {ui.label}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
