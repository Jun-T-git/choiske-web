import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ScheduleSharePanel } from "@/components/molecules/ScheduleSharePanel";
import { AnswerForm } from "@/components/templates/AnswerForm";
import { fetchScheduleByToken } from "@/lib/queries/schedule";
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

  return (
    <main className="max-w-4xl mx-auto px-1 sm:px-8 pt-5 pb-10">
      <div className="shadow-xl rounded-2xl px-3 sm:px-8 py-8 mx-auto space-y-7 border border-gray-100 bg-white/90">
        <SectionHeading>スケジュール回答</SectionHeading>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          {description && (
            <p className="text-gray-600 mb-2 text-sm">{description}</p>
          )}
          <ScheduleSharePanel title={title} token={token} className="mt-6" />
        </div>
        <AnswerForm token={token} timeSlots={timeSlots} mode="create" />
      </div>
    </main>
  );
};

export default AnswerPage;
