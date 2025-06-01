import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlotStatusTable } from "../../../components/organisms/guest/SlotStatusTable";
import { SlotStatus } from "../../../constants/slotStatus";

const meta = {
  title: "Components/Organisms/SlotStatusTable",
  component: SlotStatusTable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    timeSlots: { control: false },
    statusList: { control: false },
    onCellClick: { action: "cellClick" },
    onRowBulkUpdate: { action: "rowBulkUpdate" },
    onColBulkUpdate: { action: "colBulkUpdate" },
  },
} satisfies Meta<typeof SlotStatusTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTimeSlots = [
  { slotId: "1", date: "2025-06-01", time: "10:00" },
  { slotId: "2", date: "2025-06-01", time: "14:00" },
  { slotId: "3", date: "2025-06-02", time: "10:00" },
];
const sampleStatusList = [
  { slotId: "1", status: SlotStatus.OK },
  { slotId: "2", status: SlotStatus.PENDING },
  { slotId: "3", status: SlotStatus.NG },
];

export const Default: Story = {
  args: {
    timeSlots: sampleTimeSlots,
    statusList: sampleStatusList,
    onCellClick: () => {},
  },
};
