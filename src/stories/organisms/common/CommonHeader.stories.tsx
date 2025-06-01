import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommonHeader } from "../../../components/organisms/common/CommonHeader";

const meta = {
  title: "Components/Organisms/CommonHeader",
  component: CommonHeader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CommonHeader>;

export default meta;
type Story = StoryObj<typeof CommonHeader>;

export const Default: Story = {};
