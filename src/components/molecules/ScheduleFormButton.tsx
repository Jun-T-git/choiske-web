import { ActionButton } from "@/components/atoms/ActionButton";
import { FC } from "react";

interface ScheduleFormButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
  isDisabled: boolean;
}

/**
 * スケジュールフォーム送信ボタン
 * ScheduleFormで使用する送信ボタンのUI
 */
export const ScheduleFormButton: FC<ScheduleFormButtonProps> = ({
  isSubmitting,
  isEdit,
  isDisabled,
}) => {
  return (
    <ActionButton
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      disabled={isDisabled}
      isLoading={isSubmitting}
      loadingText="処理中..."
      className="h-12 font-bold text-base"
    >
      {isEdit ? "日程調整を保存" : "日程調整を作成"}
    </ActionButton>
  );
};
