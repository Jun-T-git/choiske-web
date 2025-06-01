import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseForm } from "../../components/molecules/BaseForm";

const meta = {
  title: "Components/Molecules/BaseForm",
  component: BaseForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onSubmit: { action: "submit" },
    errorMessage: { control: "text" },
    className: { control: "text" },
    id: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof BaseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (e: React.FormEvent<Element>) => {
      e.preventDefault();
    },
    errorMessage: "",
    children: (
      <div>
        <label>
          名前: <input type="text" />
        </label>
        <button type="submit">送信</button>
      </div>
    ),
  },
};

export const WithError: Story = {
  args: {
    onSubmit: (e: React.FormEvent<Element>) => {
      e.preventDefault();
    },
    errorMessage: "エラーが発生しました",
    children: (
      <div>
        <label>
          名前: <input type="text" />
        </label>
        <button type="submit">送信</button>
      </div>
    ),
  },
};
