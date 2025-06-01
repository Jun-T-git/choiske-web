import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommentPopover } from "../../../components/organisms/guest/CommentPopover";

const meta = {
  title: "Components/Organisms/CommentPopover",
  component: CommentPopover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    comment: { control: "text" },
    open: { control: "boolean" },
    onOpenChange: { action: "openChange" },
  },
} satisfies Meta<typeof CommentPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comment: "サンプルのコメントです。\n複数行もOK!",
  },
};

export const Opened: Story = {
  args: {
    comment: "開いた状態のコメントです。",
    open: true,
  },
};
