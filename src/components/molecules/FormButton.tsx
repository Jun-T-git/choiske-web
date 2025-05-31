import { ActionButton } from "@/components/atoms/ActionButton";
import { FC, ReactNode } from "react";

interface FormButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
  buttonText?: string;
  editButtonText?: string;
  loadingText?: string;
  editLoadingText?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

/**
 * フォーム送信ボタンの共通コンポーネント
 * 様々な種類のフォームで使用できる汎用的なボタンコンポーネント
 */
export const FormButton: FC<FormButtonProps> = ({
  isSubmitting,
  isEdit,
  buttonText = "送信",
  editButtonText = "更新",
  loadingText = "送信中...",
  editLoadingText = "更新中...",
  variant = "primary",
  size = "md",
  fullWidth = true,
  disabled = false,
  className = "",
  onClick,
  type = "submit",
  children,
}) => {
  const displayText = isEdit ? editButtonText : buttonText;
  const displayLoadingText = isEdit ? editLoadingText : loadingText;

  return (
    <ActionButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      isLoading={isSubmitting}
      loadingText={displayLoadingText}
      className={className}
      onClick={onClick}
    >
      {children || displayText}
    </ActionButton>
  );
};

/**
 * フォームボタングループ（送信ボタンとキャンセルボタン）
 */
interface FormButtonGroupProps {
  isSubmitting: boolean;
  isEdit: boolean;
  submitButtonText?: string;
  editSubmitButtonText?: string;
  loadingText?: string;
  editLoadingText?: string;
  cancelText?: string;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
}

export const FormButtonGroup: FC<FormButtonGroupProps> = ({
  isSubmitting,
  isEdit,
  submitButtonText = "送信",
  editSubmitButtonText = "更新",
  loadingText = "送信中...",
  editLoadingText = "更新中...",
  cancelText = "キャンセル",
  onCancel,
  disabled = false,
  className = "mt-6 flex justify-center gap-4 w-full",
  submitButtonClassName = "max-w-xs",
  cancelButtonClassName = "max-w-xs",
}) => {
  return (
    <div className={className}>
      <ActionButton
        type="button"
        variant="secondary"
        size="md"
        fullWidth
        onClick={onCancel}
        disabled={isSubmitting}
        className={cancelButtonClassName}
      >
        {cancelText}
      </ActionButton>
      <FormButton
        isSubmitting={isSubmitting}
        isEdit={isEdit}
        buttonText={submitButtonText}
        editButtonText={editSubmitButtonText}
        loadingText={loadingText}
        editLoadingText={editLoadingText}
        disabled={disabled}
        className={submitButtonClassName}
      />
    </div>
  );
};
