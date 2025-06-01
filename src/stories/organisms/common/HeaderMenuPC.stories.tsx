import type { Meta, StoryObj } from "@storybook/react";
import { HeaderMenuPC } from "../../../components/organisms/common/HeaderMenuPC";

const meta = {
  title: "Components/Organisms/HeaderMenuPC",
  component: HeaderMenuPC,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onLinkClick: { action: "linkClick" },
  },
} satisfies Meta<typeof HeaderMenuPC>;

export default meta;
type Story = StoryObj<typeof HeaderMenuPC>;

export const Default: Story = {
  args: {
    onLinkClick: () => {},
  },
};
