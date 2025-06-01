import type { Meta, StoryObj } from "@storybook/react";
import { FormSection } from "../../components/molecules/FormSection";

/**
 * `FormSection` はフォーム内のセクションを視覚的に分離し、見出しとステップ情報を表示するコンポーネントです。
 */
const meta = {
  title: "Components/Molecules/FormSection",
  component: FormSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "セクションの見出し",
    },
    step: {
      control: "number",
      description: "ステップ番号（オプション）",
    },
    description: {
      control: "text",
      description: "説明文（オプション）",
    },
    children: {
      control: "text",
      description: "セクション内のコンテンツ",
    },
    className: {
      control: "text",
      description: "追加のクラス名",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なフォームセクション。
 */
export const Default: Story = {
  args: {
    title: "イベント情報",
    children: (
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              イベント名
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="例：チーム会議"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              場所
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="例：会議室A"
            />
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * ステップ付きのフォームセクション。
 */
export const WithStep: Story = {
  args: {
    title: "日程候補を選択",
    step: 2,
    children: (
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <div className="flex flex-wrap gap-2">
          {["2023/06/01", "2023/06/02", "2023/06/03"].map((date) => (
            <div key={date} className="p-2 bg-blue-100 text-blue-800 rounded">
              {date}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * 説明テキスト付きのフォームセクション。
 */
export const WithDescription: Story = {
  args: {
    title: "参加者情報",
    step: 3,
    description:
      "参加者の情報を入力してください。この情報は主催者にのみ共有されます。",
    children: (
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              お名前
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * タイトルなしのフォームセクション。
 */
export const WithoutTitle: Story = {
  args: {
    children: (
      <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <p className="text-gray-600">
          ここにフォームのコンテンツが入ります。タイトルがない場合でもセクションとして使用できます。
        </p>
      </div>
    ),
  },
};
