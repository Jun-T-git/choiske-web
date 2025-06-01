// filepath: /src/stories/molecules/BatchSelectPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelectPanel } from "../../components/molecules/BatchSelectPanel";

const WEEK_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
const noop = () => {};

/**
 * `BatchSelectPanel` はカレンダーで複数の日付をまとめて選択するためのパネルコンポーネントです。
 * 月全体の選択や特定の曜日の選択が可能です。
 */
const meta = {
  title: "Components/Molecules/BatchSelectPanel",
  component: BatchSelectPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: "boolean",
      description: "パネルを表示するかどうか",
    },
    onToggle: {
      description: "パネル開閉時のコールバック関数",
      action: "toggled",
    },
    allDaysToggled: {
      control: "boolean",
      description: "月全体のトグル状態",
    },
    toggleAllDaysInMonth: {
      description: "月全体をトグルするハンドラ関数",
      action: "all days toggled",
    },
    weekdayToggles: {
      control: "object",
      description: "各曜日のトグル状態配列",
    },
    toggleWeekdayButton: {
      description: "指定した曜日をトグルするハンドラ関数",
      action: "weekday toggled",
    },
    WEEK_LABELS: {
      control: false,
      description: "曜日ラベル配列",
    },
    currentMonthDays: {
      control: false,
      description: "現在の月の日付配列",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BatchSelectPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    show: false,
    onToggle: noop,
    allDaysToggled: false,
    toggleAllDaysInMonth: noop,
    weekdayToggles: [false, false, false, false, false, false, false],
    toggleWeekdayButton: noop,
    WEEK_LABELS,
    currentMonthDays: [],
  },
};

export const Expanded: Story = {
  args: {
    show: true,
    onToggle: noop,
    allDaysToggled: false,
    toggleAllDaysInMonth: noop,
    weekdayToggles: [false, false, false, false, false, false, false],
    toggleWeekdayButton: noop,
    WEEK_LABELS,
    currentMonthDays: [],
  },
};

export const MonthSelected: Story = {
  args: {
    show: true,
    onToggle: noop,
    allDaysToggled: true,
    toggleAllDaysInMonth: noop,
    weekdayToggles: [false, false, false, false, false, false, false],
    toggleWeekdayButton: noop,
    WEEK_LABELS,
    currentMonthDays: [],
  },
};

export const WeekdaysSelected: Story = {
  args: {
    show: true,
    onToggle: noop,
    allDaysToggled: false,
    toggleAllDaysInMonth: noop,
    weekdayToggles: [false, true, true, true, false, false, false],
    toggleWeekdayButton: noop,
    WEEK_LABELS,
    currentMonthDays: [],
  },
};
