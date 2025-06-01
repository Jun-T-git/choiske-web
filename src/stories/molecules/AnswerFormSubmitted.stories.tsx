import type { Meta, StoryObj } from "@storybook/react";
import { AnswerFormSubmitted } from "../../components/molecules/AnswerFormSubmitted";

const meta = {
  title: "Components/Molecules/AnswerFormSubmitted",
  component: AnswerFormSubmitted,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    token: { control: "text" },
    editToken: { control: "text" },
    isEdit: { control: "boolean" },
  },
} satisfies Meta<typeof AnswerFormSubmitted>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    token: "sampletoken",
    editToken: "edittoken",
    isEdit: false,
  },
};

export const Edit: Story = {
  args: {
    token: "sampletoken",
    editToken: "edittoken",
    isEdit: true,
  },
};
