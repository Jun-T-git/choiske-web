import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "../../components/atoms/LinkButton";

/**
 * `LinkButton` は、Next.jsのLinkコンポーネントを使用したボタンスタイルのリンクコンポーネントです。
 * ナビゲーションやアクションのために使用されます。
 */
const meta = {
  title: "Components/Atoms/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "リンク先のURL",
    },
    children: {
      control: "text",
      description: "ボタン内のテキスト",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのリンクボタンです。
 */
export const Default: Story = {
  args: {
    href: "#",
    children: "ボタンテキスト",
  },
};

/**
 * プライマリスタイルのリンクボタンです。
 */
export const Primary: Story = {
  args: {
    href: "#",
    children: "詳細を見る",
    className: "bg-blue-600 hover:bg-blue-700 text-white",
  },
};

/**
 * セカンダリスタイルのリンクボタンです。
 */
export const Secondary: Story = {
  args: {
    href: "#",
    children: "キャンセル",
    className: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
  },
};

/**
 * アウトラインスタイルのリンクボタンです。
 */
export const Outline: Story = {
  args: {
    href: "#",
    children: "保存する",
    className: "border border-blue-500 text-blue-600 hover:bg-blue-50",
  },
};

/**
 * 危険なアクションを示す赤いリンクボタンです。
 */
export const Danger: Story = {
  args: {
    href: "#",
    children: "削除する",
    className: "bg-red-600 hover:bg-red-700 text-white",
  },
};
