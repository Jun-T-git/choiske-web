import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextareaInput } from "../../components/atoms/TextareaInput";

/**
 * `TextareaInput` は汎用テキストエリア入力コンポーネントです。
 * 複数行のテキスト入力に対応し、バリデーション機能を提供します。
 */
const meta = {
  title: "Components/Atoms/TextareaInput",
  component: TextareaInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "フォーム項目のラベル" },
    value: { control: "text", description: "入力値" },
    onChange: { description: "値変更時のコールバック関数" },
    className: {
      control: "text",
      description: "コンポーネント全体に適用するカスタムクラス",
    },
    textareaClassName: {
      control: "text",
      description: "テキストエリアに適用するカスタムクラス",
    },
    placeholder: { control: "text", description: "プレースホルダーテキスト" },
    required: { control: "boolean", description: "必須フィールドかどうか" },
    note: { control: "text", description: "入力フィールド下部の補足テキスト" },
    rows: { control: "number", description: "テキストエリアの行数" },
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
} satisfies Meta<typeof TextareaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なテキストエリアの例です。
 */
export const Default: Story = {
  render: (args) => {
    // Storybook内で状態を管理するためのラッパー
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "説明",
    placeholder: "説明を入力してください",
    rows: 3,
    value: "",
    onChange: () => {},
  },
};

/**
 * 必須フィールドのテキストエリアです。
 */
export const Required: Story = {
  render: (args) => {
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "コメント",
    placeholder: "コメントを入力してください",
    required: true,
    rows: 3,
    value: "",
    onChange: () => {},
  },
};

/**
 * 文字数制限と文字数カウンター付きのテキストエリアです。
 */
export const WithCharacterLimit: Story = {
  render: (args) => {
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "自己紹介",
    placeholder: "自己紹介を入力してください (最大200文字)",
    maxLength: 200,
    showLength: true,
    rows: 5,
    value: "",
    onChange: () => {},
  },
};

/**
 * 補足テキスト付きのテキストエリアです。
 */
export const WithNote: Story = {
  render: (args) => {
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "イベント詳細",
    placeholder: "イベントの詳細情報を入力してください",
    note: "参加者が見ることができる情報です。場所や持ち物などを記載してください。",
    rows: 4,
    value: "",
    onChange: () => {},
  },
};

/**
 * エラーメッセージ付きのテキストエリアです。
 */
export const WithError: Story = {
  render: (args) => {
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "エラーがあるテキスト");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "意見・要望",
    placeholder: "ご意見・ご要望を入力してください",
    errorMessage: "不適切な内容が含まれています",
    rows: 3,
    value: "エラーがあるテキスト",
    onChange: () => {},
  },
};

/**
 * 無効化されたテキストエリアです。
 */
export const Disabled: Story = {
  render: (args) => {
    const ControlledTextareaInput = () => {
      const [value, setValue] = useState(args.value || "編集できないテキスト");
      return <TextareaInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTextareaInput />;
  },
  args: {
    label: "規約",
    disabled: true,
    rows: 4,
    value: "編集できないテキスト",
    onChange: () => {},
  },
};
