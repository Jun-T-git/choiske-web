import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoMark } from "../../components/atoms/LogoMark";

/**
 * `LogoMark` はアプリケーションのアイコンやロゴマークを表示するコンポーネントです。
 * カレンダーアイコンと装飾要素で構成されています。
 */
const meta = {
  title: "Components/Atoms/LogoMark",
  component: LogoMark,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "dark", value: "#333333" },
        { name: "blue", value: "#EFF6FF" }, // 青系の背景
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
        style={{ padding: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのロゴマークです。
 */
export const Default: Story = {};

/**
 * 大きいサイズのロゴマークです。
 */
export const Large: Story = {
  args: {
    className: "w-16 h-16",
  },
};

/**
 * 小さいサイズのロゴマークです。
 */
export const Small: Story = {
  args: {
    className: "w-6 h-6",
  },
};

/**
 * 異なるサイズのロゴマークを並べて表示する例です。
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end space-x-4">
      <LogoMark className="w-5 h-5" />
      <LogoMark className="w-8 h-8" />
      <LogoMark className="w-12 h-12" />
      <LogoMark className="w-16 h-16" />
      <LogoMark className="w-20 h-20" />
    </div>
  ),
};

/**
 * ヘッダーなどで使用する例です。
 */
export const InHeader: Story = {
  render: () => (
    <div className="w-full max-w-xl bg-white shadow-sm border border-gray-100 rounded-lg p-3 flex items-center">
      <LogoMark className="w-8 h-8" />
      <span className="ml-2 text-xl font-bold text-gray-800">ChoiSke</span>
      <div className="ml-auto flex space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
      </div>
    </div>
  ),
};
