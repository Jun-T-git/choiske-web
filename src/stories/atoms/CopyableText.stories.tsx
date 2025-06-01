import type { Meta, StoryObj } from "@storybook/react";
import { CopyableText } from "../../components/atoms/CopyableText";

/**
 * `CopyableText` は、テキストをコピーボタン付きで表示するコンポーネントです。
 * URLやコードなど、ユーザーがコピーしたいテキストに使用します。
 */
const meta = {
  title: "Components/Atoms/CopyableText",
  component: CopyableText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "コピー対象のテキスト",
    },
    label: {
      control: "text",
      description: "ラベル（任意）",
    },
    className: {
      control: "text",
      description: "コンポーネント全体に適用するカスタムクラス",
    },
    inputClassName: {
      control: "text",
      description: "入力フィールドに適用するカスタムクラス",
    },
    buttonClassName: {
      control: "text",
      description: "コピーボタンに適用するカスタムクラス",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", width: "100%", maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyableText>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのコピーテキストボックスです。
 */
export const Default: Story = {
  args: {
    value: "https://example.com/share/abc123",
  },
};

/**
 * ラベル付きのコピーテキストボックスです。
 */
export const WithLabel: Story = {
  args: {
    value: "https://example.com/share/abc123",
    label: "共有用URL",
  },
};

/**
 * 長いテキストのコピーテキストボックスです。
 */
export const LongText: Story = {
  args: {
    value:
      "これは非常に長いテキストで、横幅を超える場合には自動的に省略される可能性があります。このようなケースでも、コピー機能は正常に動作します。",
    label: "長いテキスト",
  },
};

/**
 * カスタムスタイルのコピーテキストボックスです。
 */
export const CustomStyling: Story = {
  args: {
    value: "INVITE-CODE-123456",
    label: "招待コード",
    inputClassName: "bg-gray-50 font-mono text-center",
    buttonClassName: "bg-green-600 hover:bg-green-700",
  },
};
