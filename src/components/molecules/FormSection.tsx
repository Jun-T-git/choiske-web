import { FC, ReactNode } from "react";
import { SectionHeading } from "../atoms/SectionHeading";

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  step?: number | string;
  description?: string;
}

/**
 * フォームセクションコンポーネント
 * フォーム内の各セクションを視覚的に分離し、見出しとステップ情報を表示する
 *
 * @param title セクションの見出し
 * @param step ステップ番号（オプション）
 * @param description 説明文（オプション）
 * @param children セクション内のコンテンツ
 * @param className 追加のクラス名
 */
export const FormSection: FC<FormSectionProps> = ({
  title,
  children,
  className = "",
  step,
  description,
}) => {
  return (
    <section className={`mb-6 ${className}`}>
      {title && <SectionHeading step={step}>{title}</SectionHeading>}
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
};
