import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectedDaysList } from "../../components/molecules/SelectedDaysList";

const meta = {
  title: "Components/Molecules/SelectedDaysList",
  component: SelectedDaysList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    selectedDays: { control: false },
    onRemove: { action: "remove" },
  },
} satisfies Meta<typeof SelectedDaysList>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = new Date();
const days = [
  today,
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
];

export const Empty: Story = {
  args: {
    selectedDays: [],
    onRemove: () => {},
  },
};

export const FewDays: Story = {
  args: {
    selectedDays: days.slice(0, 3),
    onRemove: () => {},
  },
};

export const ManyDays: Story = {
  args: {
    selectedDays: days,
    onRemove: () => {},
  },
};
