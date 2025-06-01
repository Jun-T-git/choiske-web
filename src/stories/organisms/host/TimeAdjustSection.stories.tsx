import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimeAdjustSection } from "../../../components/organisms/host/TimeAdjustSection";

const meta = {
  title: "Components/Organisms/TimeAdjustSection",
  component: TimeAdjustSection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    withTime: { control: "boolean" },
    timeFrom: { control: "text" },
    timeTo: { control: "text" },
    slotSize: { control: "number" },
    mode: { control: "select", options: ["create", "edit"] },
    onTimeError: { action: "error" },
  },
} satisfies Meta<typeof TimeAdjustSection>;

export default meta;
type Story = StoryObj<typeof TimeAdjustSection>;

export const Default: Story = {
  render: (args) => {
    const [withTime, setWithTime] = useState(true);
    const [timeFrom, setTimeFrom] = useState("09:00");
    const [timeTo, setTimeTo] = useState("18:00");
    const [slotSize, setSlotSize] = useState(60);
    return (
      <TimeAdjustSection
        {...args}
        withTime={withTime}
        setWithTime={setWithTime}
        timeFrom={timeFrom}
        setTimeFrom={setTimeFrom}
        timeTo={timeTo}
        setTimeTo={setTimeTo}
        slotSize={slotSize}
        setSlotSize={setSlotSize}
      />
    );
  },
  args: {
    mode: "create",
  },
};
