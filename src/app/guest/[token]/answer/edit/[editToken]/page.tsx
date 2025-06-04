import { SectionHeading } from "@/components/atoms/SectionHeading";
import { AnswerForm } from "@/components/templates/AnswerForm";
import { SlotStatus } from "@/constants/slotStatus";
import { getAnswerByEditToken } from "@/lib/queries/answer";
import { fetchScheduleByToken } from "@/lib/queries/schedule";
import { notFound } from "next/navigation";
import { FC } from "react";

interface EditAnswerPageProps {
  params: Promise<{ token: string; editToken: string }>;
}

const EditAnswerPage: FC<EditAnswerPageProps> = async ({ params }) => {
  const { token, editToken } = await params;
  if (!token || !editToken) notFound();

  try {
    // スケジュールと回答を並列で取得
    const [schedule, answer] = await Promise.all([
      fetchScheduleByToken(token),
      getAnswerByEditToken(editToken),
    ]);
    if (!schedule || !answer || answer.scheduleId !== schedule.id) notFound();

    // answer.slotResponsesに未回答のtimeSlotsが存在する場合は未定ステータスで仮埋めする
    // （スケジュール編集で日程が追加された場合の対応）
    const unansweredSlots = schedule.timeSlots.filter(
      (slot) =>
        !answer.slotResponses.some((response) => response.slotId === slot.id)
    );
    const slotResponses = [...answer.slotResponses];
    unansweredSlots.forEach((slot) => {
      slotResponses.push({
        id: "", // 新規作成時はIDは空
        answerId: answer.id,
        slotId: slot.id,
        status: SlotStatus.PENDING, // 未回答は「未定」として扱う
      });
    });

    const { title, description, timeSlots } = schedule;

    return (
      <main className="max-w-4xl mx-auto px-1 sm:px-8 pt-5 pb-10">
        <div className="shadow-xl rounded-2xl px-3 sm:px-8 py-8 mx-auto space-y-7 border border-gray-100 bg-white/90">
          <div className="pb-2">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {description && (
              <p className="text-gray-600 whitespace-pre-line mt-2">
                {description}
              </p>
            )}
          </div>

          <div className="w-full border-b border-gray-200 mb-6"></div>

          <SectionHeading>回答を編集</SectionHeading>
          <AnswerForm
            token={token}
            editToken={editToken}
            timeSlots={timeSlots}
            mode="edit"
            initialName={answer.name}
            initialComment={answer.comment}
            initialResponses={slotResponses}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading edit page:", error);
    notFound();
  }
};

export default EditAnswerPage;
