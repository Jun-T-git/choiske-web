import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnswerFormButton } from "../../components/molecules/AnswerFormButton";

const meta = {
  title: "Components/Molecules/AnswerFormButton",
  component: AnswerFormButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isSubmitting: { control: "boolean" },
    isEdit: { control: "boolean" },
    handleCancel: { action: "cancel" },
  },
} satisfies Meta<typeof AnswerFormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    isEdit: false,
    handleCancel: () => {},
  },
};

export const Edit: Story = {
  args: {
    isSubmitting: false,
    isEdit: true,
    handleCancel: () => {},
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
    isEdit: false,
    handleCancel: () => {},
  },
};
