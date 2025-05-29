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
}: React.ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  className?: string;
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

export type LinkButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    children: React.ReactNode;
    className?: string;
  };
