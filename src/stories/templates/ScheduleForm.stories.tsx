import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScheduleForm } from "../../components/templates/ScheduleForm";

const meta = {
  title: "Components/Templates/ScheduleForm",
  component: ScheduleForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    scheduleId: { control: "text" },
    initialData: { control: false },
  },
} satisfies Meta<typeof ScheduleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialData: {
      initialTitle: "新規イベント",
      initialDescription: "イベントの説明を入力してください。",
      initialSelectedDays: ["2025-06-01", "2025-06-02"],
      initialSlotSize: 60,
      initialWithTime: true,
      initialTimeFrom: "09:00",
      initialTimeTo: "18:00",
    },
  },
};

export const Edit: Story = {
  args: {
    scheduleId: "schedule-123",
    initialData: {
      initialTitle: "編集イベント",
      initialDescription: "編集用のイベント説明です。",
      initialSelectedDays: ["2025-06-01", "2025-06-02", "2025-06-03"],
      initialSlotSize: 30,
      initialWithTime: true,
      initialTimeFrom: "10:00",
      initialTimeTo: "17:00",
    },
  },
};
