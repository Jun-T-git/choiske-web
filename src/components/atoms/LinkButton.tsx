import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 汎用リンクボタン
 */
export function LinkButton({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Link
      href={href}
      className={`block text-center px-4 py-2 rounded font-semibold transition ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}
