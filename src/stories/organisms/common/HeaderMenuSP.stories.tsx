import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeaderMenuSP } from "../../../components/organisms/common/HeaderMenuSP";

const meta = {
  title: "Components/Organisms/HeaderMenuSP",
  component: HeaderMenuSP,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "close" },
  },
} satisfies Meta<typeof HeaderMenuSP>;

export default meta;
type Story = StoryObj<typeof HeaderMenuSP>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
};
