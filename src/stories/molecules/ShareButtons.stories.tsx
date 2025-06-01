import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShareButtons } from "../../components/molecules/ShareButtons";

/**
 * `ShareButtons` はシェア用ボタングループ（LINE、メール、コピー）を提供するコンポーネントです。
 */
const meta = {
  title: "Components/Molecules/ShareButtons",
  component: ShareButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    url: {
      control: "text",
      description: "シェアするURL",
    },
    title: {
      control: "text",
      description: "シェア時のタイトル",
    },
    message: {
      control: "text",
      description: "シェア時のメッセージ",
    },
    compact: {
      control: "boolean",
      description: "コンパクト表示モード",
    },
    className: {
      control: "text",
      description: "追加のクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShareButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのシェアボタングループです。
 */
export const Default: Story = {
  args: {
    url: "https://example.com/schedule/abc123",
    title: "チーム会議の日程調整",
    message: "日程調整用URLをシェアします",
  },
};

export const Compact: Story = {
  args: {
    url: "https://example.com/schedule/abc123",
    title: "チーム会議の日程調整",
    message: "日程調整用URLをシェアします",
    compact: true,
  },
};

export const CustomMessage: Story = {
  args: {
    url: "https://example.com/schedule/abc123",
    title: "忘年会の日程調整",
    message: "忘年会の日程調整用URLです。参加可能な日を選んでください！",
  },
};
