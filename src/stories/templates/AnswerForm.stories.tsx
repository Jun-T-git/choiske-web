import { SlotStatus } from "@/constants/slotStatus";
import type { Meta, StoryObj } from "@storybook/react";
import { AnswerForm } from "../../components/templates/AnswerForm";

const meta = {
  title: "Components/Templates/AnswerForm",
  component: AnswerForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    token: { control: "text" },
    timeSlots: { control: false },
    mode: { control: "select", options: ["create", "edit"] },
    editToken: { control: "text" },
    initialName: { control: "text" },
    initialComment: { control: "text" },
    initialResponses: { control: false },
  },
} satisfies Meta<typeof AnswerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTimeSlots = [
  { id: "1", scheduleId: "schedule-123", slotStart: "2025-06-01T10:00:00" },
  { id: "2", scheduleId: "schedule-123", slotStart: "2025-06-01T11:00:00" },
  { id: "3", scheduleId: "schedule-123", slotStart: "2025-06-01T12:00:00" },
  { id: "4", scheduleId: "schedule-123", slotStart: "2025-06-02T10:00:00" },
  { id: "5", scheduleId: "schedule-123", slotStart: "2025-06-02T11:00:00" },
  { id: "6", scheduleId: "schedule-123", slotStart: "2025-06-02T12:00:00" },
];

export const Default: Story = {
  args: {
    token: "sampletoken",
    timeSlots: sampleTimeSlots,
    mode: "create",
    initialName: "",
    initialComment: "",
  },
};

export const Edit: Story = {
  args: {
    token: "sampletoken",
    timeSlots: sampleTimeSlots,
    mode: "edit",
    editToken: "edittoken",
    initialName: "山田太郎",
    initialComment: "調整ありがとうございます！",
    initialResponses: [
      { slotId: "1", status: SlotStatus.OK },
      { slotId: "2", status: SlotStatus.NG },
      { slotId: "3", status: SlotStatus.PENDING },
      { slotId: "4", status: SlotStatus.OK },
      { slotId: "5", status: SlotStatus.OK },
      { slotId: "6", status: SlotStatus.PENDING },
    ],
  },
};
