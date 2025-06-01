import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormButton } from "../../components/molecules/FormButton";

const meta = {
  title: "Components/Molecules/FormButton",
  component: FormButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isSubmitting: { control: "boolean" },
    isEdit: { control: "boolean" },
    buttonText: { control: "text" },
    editButtonText: { control: "text" },
    loadingText: { control: "text" },
    editLoadingText: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    onClick: { action: "clicked" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    children: { control: false },
  },
} satisfies Meta<typeof FormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    isEdit: false,
    buttonText: "送信",
    onClick: () => {},
  },
};

export const Edit: Story = {
  args: {
    isSubmitting: false,
    isEdit: true,
    buttonText: "送信",
    editButtonText: "更新",
    onClick: () => {},
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
    isEdit: false,
    buttonText: "送信",
    loadingText: "送信中...",
    onClick: () => {},
  },
};
