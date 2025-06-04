import { SlotStatus } from "@/constants/slotStatus";
import { toUtcIsoString } from "@/lib/utils/dateUtils";
import { prisma } from "@/server/client/prisma";

/**
 * タイムスロットの回答状況集計結果
 */
export type SlotStatusCount = {
  slotId: string;
  slotStart: string;
  statusCounts: {
    [SlotStatus.OK]: number;
    [SlotStatus.NG]: number;
    [SlotStatus.PENDING]: number;
  };
};

/**
 * スケジュールIDに基づいて、タイムスロットごとの回答状況を集計
 * DB側で効率的に集計することでクライアント側の処理負荷を軽減
 * 
 * @param scheduleId スケジュールID
 * @returns タイムスロットごとの集計結果
 */
export async function getSlotStatusCounts(scheduleId: string): Promise<SlotStatusCount[]> {
  // タイムスロット全件取得
  const timeSlots = await prisma.timeSlot.findMany({
    where: { scheduleId },
    orderBy: { slotStart: 'asc' },
    include: { slotResponses: true },
  });

  // 各スロットについて集計
  return timeSlots.map(slot => {
    // 各ステータスのカウントを初期化
    const counts = {
      [SlotStatus.OK]: 0,
      [SlotStatus.NG]: 0,
      [SlotStatus.PENDING]: 0,
    };
    
    // 各回答のステータスをカウント
    slot.slotResponses.forEach(response => {
      // 有効なステータスのみカウント
      if (response.status === SlotStatus.OK || 
          response.status === SlotStatus.NG || 
          response.status === SlotStatus.PENDING) {
        counts[response.status as SlotStatus]++;
      }
    });
    
    return {
      slotId: slot.id,
      slotStart: toUtcIsoString(slot.slotStart),
      statusCounts: counts,
    };
  });
}

/**
 * より効率的な実装として、RawSQLを使用した集計
 * 大量のデータがある場合に使用
 */
// クエリ結果の型を定義
type SlotStatusQueryResult = {
  slotId: string;
  slotStart: Date;
  okCount: bigint | number;
  ngCount: bigint | number;
  pendingCount: bigint | number;
};

export async function getSlotStatusCountsOptimized(scheduleId: string): Promise<SlotStatusCount[]> {
  // 集計クエリを実行
  const results = await prisma.$queryRaw<SlotStatusQueryResult[]>`
    SELECT 
      ts.id AS "slotId",
      ts.slot_start AS "slotStart",
      SUM(CASE WHEN sr.status = ${SlotStatus.OK} THEN 1 ELSE 0 END) AS "okCount",
      SUM(CASE WHEN sr.status = ${SlotStatus.NG} THEN 1 ELSE 0 END) AS "ngCount",
      SUM(CASE WHEN sr.status = ${SlotStatus.PENDING} THEN 1 ELSE 0 END) AS "pendingCount"
    FROM "TimeSlot" ts
    LEFT JOIN "SlotResponse" sr ON ts.id = sr.slot_id
    WHERE ts.schedule_id = ${scheduleId}
    GROUP BY ts.id, ts.slot_start
    ORDER BY ts.slot_start ASC
  `;

  // 結果を整形して返却
  return results.map(row => ({
    slotId: row.slotId,
    slotStart: toUtcIsoString(row.slotStart),
    statusCounts: {
      [SlotStatus.OK]: Number(row.okCount) || 0,
      [SlotStatus.NG]: Number(row.ngCount) || 0,
      [SlotStatus.PENDING]: Number(row.pendingCount) || 0,
    },
  }));
}
