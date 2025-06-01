import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeading } from "../../components/atoms/SectionHeading";

/**
 * `SectionHeading` は、フォームやコンテンツのセクションの見出しとして使用されるコンポーネントです。
 * ステップ番号を表示するオプションがあります。
 */
const meta = {
  title: "Components/Atoms/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "見出しのテキスト",
    },
    step: {
      control: "number",
      description: "ステップ番号（任意）",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ステップ番号なしの基本的な見出しです。
 */
export const Default: Story = {
  args: {
    children: "セクション見出し",
  },
};

/**
 * ステップ番号ありの見出しです。
 * ウィザード形式のフォームなどで使用されます。
 */
export const WithStep: Story = {
  args: {
    children: "イベント情報を入力",
    step: 1,
  },
};

/**
 * 長いテキストの見出しです。
 */
export const LongText: Story = {
  args: {
    children:
      "とても長いセクション見出しのテキストがここに入ります。内容が長い場合でも適切に表示されます。",
    step: 2,
  },
};

/**
 * 文字列のステップを使用した見出しです。
 */
export const StringStep: Story = {
  args: {
    children: "特別なセクション",
    step: "★",
  },
};
