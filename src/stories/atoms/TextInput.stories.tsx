import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextInput } from "../../components/atoms/TextInput";

/**
 * `TextInput` は汎用的なテキスト入力コンポーネントです。
 * ラベル、プレースホルダー、バリデーション機能などを提供します。
 */
const meta = {
  title: "Components/Atoms/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "フォーム項目のラベル" },
    value: { control: "text", description: "入力値" },
    onChange: { description: "値変更時のコールバック関数" },
    note: { control: "text", description: "入力フィールド下部の補足テキスト" },
    className: {
      control: "text",
      description: "コンポーネント全体に適用するカスタムクラス",
    },
    inputClassName: {
      control: "text",
      description: "入力フィールドに適用するカスタムクラス",
    },
    placeholder: { control: "text", description: "プレースホルダーテキスト" },
    required: { control: "boolean", description: "必須フィールドかどうか" },
    maxLength: { control: "number", description: "最大文字数" },
    minLength: { control: "number", description: "最小文字数" },
    showLength: {
      control: "boolean",
      description: "文字数カウンターを表示するかどうか",
    },
    errorMessage: { control: "text", description: "カスタムエラーメッセージ" },
    fieldName: {
      control: "text",
      description: "バリデーションエラーメッセージ内で使用されるフィールド名",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * シンプルなテキスト入力フィールドです。
 */
export const Default: Story = {
  render: (args) => {
    // Storybook内で状態を管理するためのラッパー
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "テキストフィールド",
    placeholder: "ここに入力してください",
    value: "",
    onChange: (value: string) => {},
  },
};

/**
 * 必須フィールドの例です。
 */
export const Required: Story = {
  render: (args) => {
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "必須フィールド",
    placeholder: "ここに入力してください",
    required: true,
    value: "",
    onChange: (value: string) => {},
  },
};

/**
 * 文字数制限付きのテキスト入力フィールドです。
 */
export const WithCharacterLimit: Story = {
  render: (args) => {
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "文字数制限あり",
    placeholder: "最大20文字まで",
    maxLength: 20,
    showLength: true,
    value: "",
    onChange: (value: string) => {},
  },
};

/**
 * 補足テキスト付きのテキスト入力フィールドです。
 */
export const WithNote: Story = {
  render: (args) => {
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "名前",
    placeholder: "フルネームを入力",
    note: "姓と名の間は半角スペースで区切ってください",
    value: "",
    onChange: (value: string) => {},
  },
};

/**
 * エラーメッセージ付きのテキスト入力フィールドです。
 */
export const WithError: Story = {
  render: (args) => {
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "入力済みテキスト");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "メールアドレス",
    placeholder: "example@example.com",
    errorMessage: "有効なメールアドレスを入力してください",
    value: "入力済みテキスト",
    onChange: (value: string) => {},
  },
};

/**
 * 無効化されたテキスト入力フィールドです。
 */
export const Disabled: Story = {
  render: (args) => {
    const ControlledTextInput = () => {
      const [value, setValue] = useState(args.value || "編集できない値");
      return <TextInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextInput />;
  },
  args: {
    label: "無効化フィールド",
    disabled: true,
    value: "編集できない値",
    onChange: (value: string) => {},
  },
};
