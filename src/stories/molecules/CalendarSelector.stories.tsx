// filepath: /src/stories/molecules/CalendarSelector.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarSelector } from "../../components/molecules/CalendarSelector";

const noop = () => {};
const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

/**
 * `CalendarSelector` は複数日付選択可能なカレンダーUIコンポーネントです。
 * react-day-picker をベースに構築されています。
 */
const meta = {
  title: "Components/Molecules/CalendarSelector",
  component: CalendarSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedDays: {
      control: "object",
      description: "選択済みの日付配列",
    },
    onSelect: {
      description: "日付選択時のコールバック関数",
      action: "selected",
    },
    month: {
      control: false,
      description: "表示中の月",
    },
    setMonth: {
      description: "月変更時のコールバック関数",
      action: "month changed",
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedDays: [],
    onSelect: noop,
    month: today,
    setMonth: noop,
  },
};

export const WithSelectedDates: Story = {
  args: {
    selectedDays: [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    ],
    onSelect: noop,
    month: today,
    setMonth: noop,
  },
};

export const NextMonth: Story = {
  args: {
    selectedDays: [],
    onSelect: noop,
    month: nextMonth,
    setMonth: noop,
  },
};
