import type { Meta, StoryObj } from "@storybook/react";
import { TimeAdjustPanel } from "../../components/molecules/TimeAdjustPanel";

const meta = {
  title: "Components/Molecules/TimeAdjustPanel",
  component: TimeAdjustPanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    withTime: { control: "boolean" },
    timeFrom: { control: "text" },
    timeTo: { control: "text" },
    slotSize: { control: "number" },
    mode: { control: "select", options: ["create", "edit"] },
    onError: { action: "error" },
  },
} satisfies Meta<typeof TimeAdjustPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    withTime: true,
    setWithTime: () => {},
    timeFrom: "09:00",
    setTimeFrom: () => {},
    timeTo: "18:00",
    setTimeTo: () => {},
    slotSize: 60,
    setSlotSize: () => {},
    mode: "create",
  },
};

export const EditMode: Story = {
  ...Default,
  args: {
    ...Default.args,
    mode: "edit",
  },
};
