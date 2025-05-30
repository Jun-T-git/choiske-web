"use client";
import { TextInput } from "@/components/atoms/TextInput";
import { TextareaInput } from "@/components/atoms/TextareaInput";
import { SlotStatusTable } from "@/components/organisms/guest/SlotStatusTable";
import { SLOT_STATUS_LIST, SlotStatus } from "@/constants/slotStatus";
import { createAnswer } from "@/lib/queries/answer";
import { TimeSlot } from "@/types/timeSlot";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";

interface AnswerFormProps {
  token: string; // トークンを受け取る
  timeSlots: TimeSlot[];
}

export const AnswerForm: FC<AnswerFormProps> = ({ token, timeSlots }) => {
  const router = useRouter();
  // 送信中の状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);

  // timeSlots: [{ id, slotStart, ... }]
  const slotMetaList = useMemo(
    () =>
      timeSlots.map((slot) => {
        const [date, time] = slot.slotStart.split("T");
        return {
          slotId: slot.id,
          date,
          time: time.slice(0, 5),
        };
      }),
    [timeSlots]
  );

  // statusList: [{ slotId, status }]
  const [statusList, setStatusList] = useState<
    { slotId: string; status: SlotStatus }[]
  >(() =>
    slotMetaList.map((s) => ({ slotId: s.slotId, status: SlotStatus.OK }))
  );
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // セルクリック
  const handleCellClick = (slotId: string) => {
    setStatusList((prev) =>
      prev.map((s) =>
        s.slotId === slotId
          ? {
              ...s,
              status:
                SLOT_STATUS_LIST[
                  (SLOT_STATUS_LIST.indexOf(s.status) + 1) %
                    SLOT_STATUS_LIST.length
                ],
            }
          : s
      )
    );
  };

  // 行一括更新
  const handleRowBulkUpdate = (date: string, newStatus: SlotStatus) => {
    setStatusList((prev) =>
      prev.map((s) =>
        slotMetaList.find((meta) => meta.slotId === s.slotId)?.date === date
          ? { ...s, status: newStatus }
          : s
      )
    );
  };
  // 列一括更新
  const handleColBulkUpdate = (time: string, newStatus: SlotStatus) => {
    setStatusList((prev) =>
      prev.map((s) =>
        slotMetaList.find((meta) => meta.slotId === s.slotId)?.time === time
          ? { ...s, status: newStatus }
          : s
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 送信中状態に設定
    setIsSubmitting(true);
    try {
      await createAnswer({
        scheduleId: timeSlots[0]?.scheduleId ?? "",
        name,
        comment,
        slotResponses: statusList,
      });
      router.push(`/guest/${token}/summary`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || "送信に失敗しました");
      } else {
        alert("送信に失敗しました");
      }
    } finally {
      // エラーが発生しても送信中状態を解除
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          label="お名前"
          value={name}
          onChange={setName}
          placeholder="例: 山田太郎"
          maxLength={12}
          required
          note="あなた（回答者）のお名前を入力してください"
        />
      </div>
      <div className="overflow-x-auto mb-4">
        <SlotStatusTable
          timeSlots={slotMetaList}
          statusList={statusList}
          onCellClick={handleCellClick}
          onRowBulkUpdate={handleRowBulkUpdate}
          onColBulkUpdate={handleColBulkUpdate}
        />
      </div>
      <div>
        <TextareaInput
          label="コメント"
          value={comment}
          onChange={setComment}
          placeholder="例: △の日は来週までに確定します！"
          rows={3}
          maxLength={100}
        />
      </div>
      <div className="mt-6 flex justify-center gap-4 w-full">
        <button
          type="button"
          className="w-full max-w-xs px-6 py-2 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold shadow-sm hover:from-gray-100 hover:to-gray-200 hover:text-blue-600 hover:border-blue-300 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="w-full max-w-xs px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              送信中...
            </span>
          ) : (
            "送信"
          )}
        </button>
      </div>
    </form>
  );
};
