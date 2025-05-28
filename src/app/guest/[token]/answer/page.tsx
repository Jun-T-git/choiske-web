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
    <main className="max-w-3xl mx-auto p-4">
      <SectionHeading>スケジュール回答</SectionHeading>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        {description && (
          <p className="text-gray-600 mb-2 text-sm">{description}</p>
        )}
      </div>
      <AnswerForm token={token} timeSlots={timeSlotsJst} />
    </main>
  );
};

export default AnswerPage;
