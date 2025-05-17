# 技術選定・技術構成（Tech Stack）

本ドキュメントは「チョイスケ」Web サービスの技術選定・技術構成の詳細をまとめたものです。

---

## 1. フロントエンド

- フレームワーク: Next.js（App Router, React 18, TypeScript）
- UI: Tailwind CSS（ユーティリティファースト CSS, モバイル・アクセシビリティ対応）
- UI コンポーネント: shadcn/ui, Radix UI（必要に応じて）
- 状態管理: React Context + useReducer（小規模想定）、必要に応じて Zustand
- 日付操作: date-fns
- カレンダー UI: react-big-calendar または FullCalendar
- フォーム: react-hook-form + zod
- アイコン: Lucide Icons
- SEO: next-seo
- アクセシビリティ: eslint-plugin-jsx-a11y, Storybook

## 2. バックエンド

- ランタイム: Node.js（LTS）
- API: Next.js API Routes または Edge Functions（必要に応じて）
- ORM: Prisma（TypeScript 対応、型安全な DB 操作）
- データベース: PostgreSQL（Prisma 対応、クラウド DB：Supabase, Vercel Postgres, Railway 等）
- 認証: 匿名識別子（会員登録なし、必要に応じて Magic Link 等も検討可）
- ストレージ: 必要に応じて Supabase Storage や S3 等

## 3. インフラ・ホスティング

- フロント: Vercel（Next.js 最適化, 独自ドメイン, HTTPS 自動化）
- バックエンド: Vercel（API Routes/Edge Functions）、DB はクラウド PostgreSQL
- CI/CD: Vercel（GitHub 連携自動デプロイ）

## 4. 広告・マネタイズ

- Google AdSense
- 必要に応じてアフィリエイト（A8.net 等）
- 広告表示制御: AdSense カテゴリ除外＋独自フィルタ

## 5. 通知・共有

- SNS 共有: Web Share API、OGP
- メール通知: SendGrid API（メールアドレス任意入力時のみ）

## 6. セキュリティ

- HTTPS（Vercel 標準）
- ランダム URL: nanoid
- データ自動削除: バックエンドで定期バッチ（Prisma + cron-job.org 等）
- 個人情報最小化

## 7. テスト・保守

- 型安全: TypeScript
- 単体テスト: Vitest + React Testing Library
- E2E テスト: Playwright
- Lint/Format: ESLint, Prettier
- ドキュメント: Storybook, JSDoc, Notion

---

ご要望や要件の変更に応じて、技術選定は随時見直します。
