import { SectionHeading } from "@/components/atoms/SectionHeading";
import { AnswerForm } from "@/components/templates/AnswerForm";
import { fetchScheduleByToken } from "@/lib/queries/schedule";
import { toJstIsoString } from "@/lib/utils/dateUtils";
import { notFound } from "next/navigation";
import { FC } from "react";

interface AnswerPageProps {
  params: Promise<{ token: string }>;
}

const AnswerPage: FC<AnswerPageProps> = async ({ params }) => {
  const { token } = await params;
  if (!token) notFound();

  const schedule = await fetchScheduleByToken(token);
  if (!schedule) notFound();

  const { title, description, timeSlots } = schedule;
  const timeSlotsJst = timeSlots.map((slot) => {
    return {
      ...slot,
      slotStart: toJstIsoString(new Date(slot.slotStart)),
    };
  });

  return (
    <main className="max-w-2xl mx-auto px-1 sm:px-8 pt-5 pb-10">
      <div className="shadow-xl rounded-2xl px-3 sm:px-8 py-8 mx-auto space-y-7 border border-gray-100 bg-white/90">
        <SectionHeading>スケジュール回答</SectionHeading>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          {description && (
            <p className="text-gray-600 mb-2 text-sm">{description}</p>
          )}
        </div>
        <AnswerForm token={token} timeSlots={timeSlotsJst} />
      </div>
    </main>
  );
};

export default AnswerPage;
