import { FC, ReactNode } from "react";

export type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  step?: number | string;
};

/**
 * セクション見出しコンポーネント
 * @example <SectionHeading step={1}>イベント情報を入力</SectionHeading>
 */
export const SectionHeading: FC<SectionHeadingProps> = ({
  children,
  className = "",
  step,
}) => (
  <div className={`relative w-full flex items-center mb-8 ${className}`}>
    {step && (
      <span
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-extrabold text-base shadow-lg border-4 border-white -ml-2 z-10 drop-shadow-md"
        style={{ boxShadow: "0 4px 16px 0 rgba(59,130,246,0.10)" }}
      >
        {step}
      </span>
    )}
    <h3
      className="flex-1 text-md font-bold text-gray-800 tracking-tight pl-2 flex items-center h-full relative"
      style={{ lineHeight: "2.5rem" }}
    >
      <span className="inline-block align-middle">{children}</span>
      <span className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full" />
    </h3>
  </div>
);
