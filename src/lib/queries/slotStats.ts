import { SlotStatusCount } from "@/server/client/slotStatsClient";

/**
 * スケジュールのタイムスロット状態集計を取得する
 * @param token スケジュールの公開トークン
 * @returns 集計結果
 */
export async function getSlotStatusCounts(token: string): Promise<SlotStatusCount[]> {
  try {
    const response = await fetch(`/api/answers/token/${token}/status-counts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch slot status counts: ${response.status}`);
    }

    const data = await response.json();
    return data.statusCounts;
  } catch (error) {
    console.error("Error fetching slot status counts:", error);
    throw error;
  }
}
