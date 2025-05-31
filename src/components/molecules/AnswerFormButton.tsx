import { ActionButton } from "@/components/atoms/ActionButton";
import { FC } from "react";

interface AnswerFormButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
  handleCancel: () => void;
}

/**
 * 回答フォーム送信ボタン
 * AnswerForm/AnswerEditFormで使用する送信ボタンと戻るボタンのUI
 */
export const AnswerFormButton: FC<AnswerFormButtonProps> = ({
  isSubmitting,
  isEdit,
  handleCancel,
}) => {
  return (
    <div className="mt-6 flex justify-center gap-4 w-full">
      <ActionButton
        type="button"
        variant="secondary"
        size="md"
        fullWidth
        onClick={handleCancel}
        disabled={isSubmitting}
        className="max-w-xs"
      >
        キャンセル
      </ActionButton>
      <ActionButton
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isSubmitting}
        loadingText={isEdit ? "更新中..." : "送信中..."}
        className="max-w-xs"
      >
        {isEdit ? "更新" : "送信"}
      </ActionButton>
    </div>
  );
};
