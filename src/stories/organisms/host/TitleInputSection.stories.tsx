import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TitleInputSection } from "../../../components/organisms/host/TitleInputSection";

const meta = {
  title: "Components/Organisms/TitleInputSection",
  component: TitleInputSection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof TitleInputSection>;

export default meta;
type Story = StoryObj<typeof TitleInputSection>;

export const Default: Story = {
  render: (args) => {
    const [title, setTitle] = useState("イベントタイトル");
    const [description, setDescription] = useState("イベントの説明");
    return (
      <TitleInputSection
        {...args}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    );
  },
};
