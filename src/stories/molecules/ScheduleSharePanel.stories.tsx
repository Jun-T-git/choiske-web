import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleSharePanel } from "../../components/molecules/ScheduleSharePanel";

const meta = {
  title: "Components/Molecules/ScheduleSharePanel",
  component: ScheduleSharePanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    token: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof ScheduleSharePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "チーム会議",
    token: "sampletoken",
    className: "max-w-xl mx-auto",
  },
};
