import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TimeInput } from "../../components/atoms/TimeInput";

/**
 * `TimeInput` は時刻入力用の専用コンポーネントです。
 * HTML5の時刻入力と組み合わせ、バリデーション機能を提供します。
 */
const meta = {
  title: "Components/Atoms/TimeInput",
  component: TimeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "フォーム項目のラベル" },
    value: { control: "text", description: "時刻の値（HH:MM形式）" },
    onChange: { description: "値変更時のコールバック関数" },
    name: { control: "text", description: "input要素のname属性" },
    className: {
      control: "text",
      description: "コンポーネント全体に適用するカスタムクラス",
    },
    inputClassName: {
      control: "text",
      description: "input要素に適用するカスタムクラス",
    },
    required: { control: "boolean", description: "必須フィールドかどうか" },
    errorMessage: { control: "text", description: "カスタムエラーメッセージ" },
  },
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的な時刻入力の例です。
 */
export const Default: Story = {
  render: (args) => {
    // Storybook内で状態を管理するためのラッパー
    const ControlledTimeInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TimeInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTimeInput />;
  },
  args: {
    label: "開始時間",
    value: "09:00",
    onChange: () => {},
  },
};

/**
 * 必須フィールドの時刻入力の例です。
 */
export const Required: Story = {
  render: (args) => {
    const ControlledTimeInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TimeInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTimeInput />;
  },
  args: {
    label: "集合時間",
    required: true,
    value: "10:30",
    onChange: () => {},
  },
};

/**
 * 空の状態の時刻入力の例です。
 */
export const Empty: Story = {
  render: (args) => {
    const ControlledTimeInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TimeInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTimeInput />;
  },
  args: {
    label: "終了時間（任意）",
    value: "",
    onChange: () => {},
  },
};

/**
 * エラーメッセージ付きの時刻入力の例です。
 */
export const WithError: Story = {
  render: (args) => {
    const ControlledTimeInput = () => {
      const [value, setValue] = useState(args.value || "25:00");
      return <TimeInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTimeInput />;
  },
  args: {
    label: "予約時間",
    errorMessage: "有効な時間を入力してください",
    value: "25:00",
    onChange: () => {},
  },
};

/**
 * 必須フィールドで値が空の時のエラー表示例です。
 */
export const RequiredEmpty: Story = {
  render: (args) => {
    const ControlledTimeInput = () => {
      const [value, setValue] = useState(args.value || "");
      return <TimeInput {...args} value={value} onChange={setValue} />;
    };
    return <ControlledTimeInput />;
  },
  args: {
    label: "出発時間",
    required: true,
    value: "",
    onChange: () => {},
  },
};
