"use client";

import { ScheduleForm } from "@/components/templates/ScheduleForm";
import { ReactNode } from "react";

/**
 * 新規日程調整作成ページ
 */
export default function NewSchedulePage(): ReactNode {
  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-8 pt-5 pb-10">
      <div className="bg-white/90 shadow-xl rounded-2xl px-4 py-8">
        <ScheduleForm />
      </div>
    </main>
  );
}
