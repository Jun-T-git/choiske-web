import type { Meta, StoryObj } from "@storybook/react-vite";
import { GuestSummaryTable } from "../../../components/organisms/guest/GuestSummaryTable";
import { SlotStatus } from "../../../constants/slotStatus";

const meta = {
  title: "Components/Organisms/GuestSummaryTable",
  component: GuestSummaryTable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    slots: { control: false },
    answers: { control: false },
    scheduleToken: { control: "text" },
  },
} satisfies Meta<typeof GuestSummaryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const slots = [
  {
    slotId: "1",
    slotStart: "2025-06-01T10:00:00",
    date: "2025-06-01",
    time: "10:00",
    statusCounts: {
      [SlotStatus.OK]: 2,
      [SlotStatus.NG]: 1,
      [SlotStatus.PENDING]: 0,
    },
  },
  {
    slotId: "2",
    slotStart: "2025-06-01T14:00:00",
    date: "2025-06-01",
    time: "14:00",
    statusCounts: {
      [SlotStatus.OK]: 1,
      [SlotStatus.NG]: 1,
      [SlotStatus.PENDING]: 1,
    },
  },
  {
    slotId: "3",
    slotStart: "2025-06-02T10:00:00",
    date: "2025-06-02",
    time: "10:00",
    statusCounts: {
      [SlotStatus.OK]: 0,
      [SlotStatus.NG]: 2,
      [SlotStatus.PENDING]: 1,
    },
  },
];
const answers = [
  {
    id: "a1",
    name: "山田太郎",
    comment: "よろしくお願いします！",
    scheduleId: "s1",
    editToken: "token1",
    createdAt: "2025-05-01T12:00:00Z",
    updatedAt: "2025-05-01T12:00:00Z",
    slotResponses: [
      { id: "sr1-1", answerId: "a1", slotId: "1", status: SlotStatus.OK },
      { id: "sr1-2", answerId: "a1", slotId: "2", status: SlotStatus.PENDING },
      { id: "sr1-3", answerId: "a1", slotId: "3", status: SlotStatus.NG },
    ],
  },
  {
    id: "a2",
    name: "佐藤花子",
    comment: "",
    scheduleId: "s1",
    editToken: "token2",
    createdAt: "2025-05-01T12:00:00Z",
    updatedAt: "2025-05-01T12:00:00Z",
    slotResponses: [
      { id: "sr2-1", answerId: "a2", slotId: "1", status: SlotStatus.OK },
      { id: "sr2-2", answerId: "a2", slotId: "2", status: SlotStatus.NG },
      { id: "sr2-3", answerId: "a2", slotId: "3", status: SlotStatus.NG },
    ],
  },
];

export const Default: Story = {
  args: {
    slots,
    answers,
  },
};

export const WithServerSideCounting: Story = {
  args: {
    slots,
    answers,
    scheduleToken: "sample-token-123",
  },
};
