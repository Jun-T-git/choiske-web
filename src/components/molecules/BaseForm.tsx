import { FC, FormEvent, ReactNode } from "react";

interface BaseFormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  errorMessage?: string | null;
  className?: string;
  id?: string;
}

/**
 * ベースフォームコンポーネント
 * すべてのフォームで使用される共通の基盤を提供
 */
export const BaseForm: FC<BaseFormProps> = ({
  onSubmit,
  children,
  errorMessage,
  className = "mx-auto space-y-7",
  id,
}) => {
  return (
    <form className={className} onSubmit={onSubmit} id={id}>
      {children}

      {/* エラーメッセージがあれば表示 */}
      {errorMessage && (
        <div className="text-red-500 text-sm font-semibold mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  );
};
