import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionButton } from "../../components/atoms/ActionButton";

/**
 * `ActionButton` は共通アクションボタンコンポーネントです。
 * 各フォームで使用される送信ボタン、キャンセルボタン等を共通化します。
 */
const meta = {
  title: "Components/Atoms/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline"],
      description: "ボタンのスタイルバリエーション",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "ボタンのサイズ",
    },
    disabled: { control: "boolean", description: "ボタンの無効状態" },
    isLoading: { control: "boolean", description: "ローディング状態" },
    loadingText: { control: "text", description: "ローディング中のテキスト" },
    fullWidth: {
      control: "boolean",
      description: "横幅を親要素に合わせて100%にするか",
    },
    onClick: { description: "クリック時のイベントハンドラ" },
    children: {
      control: "text",
      description: "ボタン内のテキストやコンポーネント",
    },
    className: { control: "text", description: "追加のCSSクラス名" },
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なプライマリボタンのスタイルです。
 */
export const Primary: Story = {
  args: {
    children: "送信する",
    variant: "primary",
    size: "md",
  },
};

/**
 * セカンダリボタンのスタイルです。
 */
export const Secondary: Story = {
  args: {
    children: "キャンセル",
    variant: "secondary",
    size: "md",
  },
};

/**
 * 危険な操作を示す赤いボタンです。
 */
export const Danger: Story = {
  args: {
    children: "削除する",
    variant: "danger",
    size: "md",
  },
};

/**
 * アウトラインスタイルのボタンです。
 */
export const Outline: Story = {
  args: {
    children: "詳細を見る",
    variant: "outline",
    size: "md",
  },
};

/**
 * 小さいサイズのボタンです。
 */
export const Small: Story = {
  args: {
    children: "小ボタン",
    variant: "primary",
    size: "sm",
  },
};

/**
 * 大きいサイズのボタンです。
 */
export const Large: Story = {
  args: {
    children: "大ボタン",
    variant: "primary",
    size: "lg",
  },
};

/**
 * 横幅いっぱいに広がるボタンです。
 */
export const FullWidth: Story = {
  args: {
    children: "横幅いっぱい",
    variant: "primary",
    size: "md",
    fullWidth: true,
  },
};

/**
 * ローディング状態のボタンです。
 */
export const Loading: Story = {
  args: {
    children: "処理中",
    variant: "primary",
    size: "md",
    isLoading: true,
  },
};

/**
 * ローディング状態でテキストが変化するボタンです。
 */
export const LoadingWithText: Story = {
  args: {
    children: "送信する",
    loadingText: "送信中...",
    variant: "primary",
    size: "md",
    isLoading: true,
  },
};

/**
 * 無効化されたボタンです。
 */
export const Disabled: Story = {
  args: {
    children: "無効ボタン",
    variant: "primary",
    size: "md",
    disabled: true,
  },
};
