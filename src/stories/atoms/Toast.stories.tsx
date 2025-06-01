import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "../../components/atoms/Toast";

/**
 * `Toast` は、ユーザーへのフィードバックを表示するための通知コンポーネントです。
 * 成功、エラー、警告、情報など、さまざまな種類のメッセージを表示できます。
 */
const meta = {
  title: "Components/Atoms/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "表示するメッセージ",
    },
    isVisible: {
      control: "boolean",
      description: "トーストを表示するかどうか",
    },
    onClose: {
      description: "閉じるボタンがクリックされたときのコールバック関数",
    },
    type: {
      control: {
        type: "select",
        options: ["info", "success", "error", "warning"],
      },
      description: "トーストの種類",
    },
    position: {
      control: { type: "select", options: ["top", "bottom"] },
      description: "トーストの表示位置",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          height: "200px",
          position: "relative",
          width: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの情報トーストです。
 */
export const Info: Story = {
  args: {
    message: "情報メッセージです",
    isVisible: true,
    onClose: () => {},
    type: "info",
    position: "bottom",
  },
};

/**
 * 成功メッセージのトーストです。
 */
export const Success: Story = {
  args: {
    message: "操作が正常に完了しました",
    isVisible: true,
    onClose: () => {},
    type: "success",
    position: "bottom",
  },
};

/**
 * エラーメッセージのトーストです。
 */
export const Error: Story = {
  args: {
    message: "エラーが発生しました",
    isVisible: true,
    onClose: () => {},
    type: "error",
    position: "bottom",
  },
};

/**
 * 警告メッセージのトーストです。
 */
export const Warning: Story = {
  args: {
    message: "この操作は取り消せません",
    isVisible: true,
    onClose: () => {},
    type: "warning",
    position: "bottom",
  },
};

/**
 * 上部に表示するトーストです。
 */
export const TopPosition: Story = {
  args: {
    message: "画面上部に表示されるトースト",
    isVisible: true,
    onClose: () => {},
    type: "info",
    position: "top",
  },
};
