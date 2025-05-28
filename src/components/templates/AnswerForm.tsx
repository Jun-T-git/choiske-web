"use client";
import { TextInput } from "@/components/atoms/TextInput";
import { TextareaInput } from "@/components/atoms/TextareaInput";
import { SlotStatusTable } from "@/components/organisms/guest/SlotStatusTable";
import { SLOT_STATUS_LIST, SlotStatus } from "@/constants/slotStatus";
import { createAnswer } from "@/lib/queries/answer";
import { TimeSlot } from "@/types/timeSlot";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

interface AnswerFormProps {
  token: string; // トークンを受け取る
  timeSlots: TimeSlot[];
}

export const AnswerForm: FC<AnswerFormProps> = ({ token, timeSlots }) => {
  const router = useRouter();

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

  useEffect(() => {
    console.log("statusList updated:", statusList);
  }, [statusList]);

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
    try {
      await createAnswer({
        scheduleId: timeSlots[0]?.scheduleId ?? "",
        name,
        comment,
        slotResponses: statusList,
      });
      router.push(`/guest/${token}/summary`);
    } catch (err: any) {
      alert(err.message || "送信に失敗しました");
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
          required
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
        />
      </div>
      <div className="mt-6 flex justify-center gap-4 w-full">
        <button
          type="button"
          className="w-full max-w-xs px-6 py-2 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold shadow-sm hover:from-gray-100 hover:to-gray-200 hover:text-blue-600 hover:border-blue-300 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => window.history.back()}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="w-full max-w-xs px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          送信
        </button>
      </div>
    </form>
  );
};
