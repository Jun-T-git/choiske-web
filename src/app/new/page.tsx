"use client";

import { ScheduleForm } from "@/components/ScheduleForm";
import { ReactNode } from "react";

/**
 * 新規日程調整作成ページ
 */
export default function NewSchedulePage(): ReactNode {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <ScheduleForm />
    </main>
  );
}
