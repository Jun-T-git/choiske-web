import { CopyableText } from "@/components/atoms/CopyableText";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { AnswerEditForm } from "@/components/templates/AnswerEditForm";
import { getAnswerByEditToken } from "@/lib/queries/answer";
import { fetchScheduleByToken } from "@/lib/queries/schedule";
import { toJstIsoString } from "@/lib/utils/dateUtils";
import { notFound } from "next/navigation";
import { FC } from "react";

interface EditAnswerPageProps {
  params: Promise<{ token: string; editToken: string }>;
}

const EditAnswerPage: FC<EditAnswerPageProps> = async ({ params }) => {
  const { token, editToken } = await params;
  if (!token || !editToken) notFound();

  try {
    // スケジュールを取得
    const schedule = await fetchScheduleByToken(token);
    if (!schedule) notFound();

    // 回答を取得
    const answer = await getAnswerByEditToken(editToken);
    if (!answer || answer.scheduleId !== schedule.id) notFound();

    const { title, description, timeSlots } = schedule;
    const timeSlotsJst = timeSlots.map((slot) => {
      return {
        ...slot,
        slotStart: toJstIsoString(new Date(slot.slotStart)),
      };
    });

    // 編集用URL
    const editUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/guest/${token}/answer/edit/${editToken}`;

    return (
      <main className="max-w-4xl mx-auto px-1 sm:px-8 pt-5 pb-10">
        <SectionHeading>{title}</SectionHeading>
        <p className="mt-2 mb-6 text-gray-600 whitespace-pre-line">
          {description}
        </p>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            この編集用URLを保存
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            このURLを使うと後からいつでも回答を編集できます
          </p>
          <CopyableText value={editUrl} className="text-sm" />
          <div className="mt-3 pt-3 border-t border-gray-100">
            <ShareButtons
              url={editUrl}
              title={`${title} - 回答編集URL`}
              message={`「${title}」の日程調整回答を編集するためのURLです。`}
              compact={true}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">回答を編集</h2>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <AnswerEditForm
              token={token}
              editToken={editToken}
              timeSlots={timeSlotsJst}
              initialName={answer.name}
              initialComment={answer.comment}
              initialResponses={answer.slotResponses}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading edit page:", error);
    notFound();
  }
};

export default EditAnswerPage;
