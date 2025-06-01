import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "../../components/atoms/LoadingSpinner";

/**
 * `LoadingSpinner` は、アプリケーション内で使用されるローディングインジケータです。
 * サイズやカラーをカスタマイズ可能です。
 */
const meta = {
  title: "Components/Atoms/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 8, max: 64, step: 4 },
      description: "スピナーのサイズ（ピクセル）",
    },
    color: {
      control: "color",
      description: "スピナーの色",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのローディングスピナーです。
 */
export const Default: Story = {
  args: {
    size: 24,
    color: "currentColor",
  },
};

/**
 * 小さいサイズのスピナーです。
 */
export const Small: Story = {
  args: {
    size: 16,
    color: "currentColor",
  },
};

/**
 * 大きいサイズのスピナーです。
 */
export const Large: Story = {
  args: {
    size: 48,
    color: "currentColor",
  },
};

/**
 * カラーカスタマイズされたスピナーです。
 */
export const CustomColor: Story = {
  args: {
    size: 32,
    color: "#3B82F6", // ブルー
  },
};

/**
 * 複数のスピナーを表示する例です。
 */
export const MultipleSpinners: Story = {
  render: () => (
    <div className="flex space-x-8 items-center">
      <LoadingSpinner size={16} color="#3B82F6" />
      <LoadingSpinner size={24} color="#10B981" />
      <LoadingSpinner size={32} color="#F59E0B" />
      <LoadingSpinner size={48} color="#EF4444" />
    </div>
  ),
};
