import type { Meta, StoryObj } from "@storybook/react";
import { CalendarIllustration } from "../../components/atoms/IllustrationElement";

/**
 * `IllustrationElement` はアプリケーション内で使用されるイラストレーション要素です。
 * アニメーション効果を含み、視覚的な装飾として使用されます。
 */
const meta = {
  title: "Components/Atoms/IllustrationElement",
  component: CalendarIllustration,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "dark", value: "#333333" },
        { name: "blue", value: "#EFF6FF" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: "3rem", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのカレンダーイラストレーションです。
 * アニメーション効果が含まれています。
 */
export const Default: Story = {};

/**
 * 大きいサイズのカレンダーイラストレーションです。
 */
export const Large: Story = {
  args: {
    className: "scale-125",
  },
};

/**
 * 小さいサイズのカレンダーイラストレーションです。
 */
export const Small: Story = {
  args: {
    className: "scale-75",
  },
};

/**
 * 異なるサイズとスタイルのイラストレーションを表示する例です。
 */
export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-8">
      <div className="flex flex-col items-center">
        <CalendarIllustration className="scale-75" />
        <p className="mt-2 text-sm text-gray-600">小</p>
      </div>

      <div className="flex flex-col items-center">
        <CalendarIllustration />
        <p className="mt-2 text-sm text-gray-600">標準</p>
      </div>

      <div className="flex flex-col items-center">
        <CalendarIllustration className="scale-125" />
        <p className="mt-2 text-sm text-gray-600">大</p>
      </div>
    </div>
  ),
};

/**
 * アプリケーション内での使用例です。
 */
export const InContext: Story = {
  render: () => (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        日程調整をはじめましょう
      </h2>
      <p className="text-gray-600 mb-6">
        簡単に候補日を作成し、参加者と共有できます。
      </p>

      <div className="flex justify-center mb-6">
        <CalendarIllustration />
      </div>

      <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
        新しい日程を作成する
      </button>
    </div>
  ),
};
