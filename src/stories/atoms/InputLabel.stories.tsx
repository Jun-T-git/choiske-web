import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputLabel } from "../../components/atoms/InputLabel";

/**
 * `InputLabel` は、フォーム入力フィールド用のラベルコンポーネントです。
 * 必須または任意の表示バッジを含みます。
 */
const meta = {
  title: "Components/Atoms/InputLabel",
  component: InputLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "ラベルのテキスト",
    },
    required: {
      control: "boolean",
      description: "必須フィールドかどうか",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの入力ラベルです。任意バッジが表示されます。
 */
export const Default: Story = {
  args: {
    label: "お名前",
  },
};

/**
 * 必須フィールド用の入力ラベルです。
 */
export const Required: Story = {
  args: {
    label: "メールアドレス",
    required: true,
  },
};

/**
 * 長いテキストの入力ラベルです。
 */
export const LongLabel: Story = {
  args: {
    label: "とても長いラベル名称が入力される場合の表示確認用サンプル",
    required: true,
  },
};
