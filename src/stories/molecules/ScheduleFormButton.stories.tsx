import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScheduleFormButton } from "../../components/molecules/ScheduleFormButton";

const meta = {
  title: "Components/Molecules/ScheduleFormButton",
  component: ScheduleFormButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isSubmitting: { control: "boolean" },
    isEdit: { control: "boolean" },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof ScheduleFormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    isEdit: false,
    isDisabled: false,
  },
};

export const Edit: Story = {
  args: {
    isSubmitting: false,
    isEdit: true,
    isDisabled: false,
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
    isEdit: false,
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    isSubmitting: false,
    isEdit: false,
    isDisabled: true,
  },
};
