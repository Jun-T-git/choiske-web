# ディレクトリ構成・コーディング規約（2025 年 5 月・現行実装準拠）

本ドキュメントは「チョイスケ」Web サービスの現行実装に基づくディレクトリ構成・コーディング規約です。

---

## 1. ディレクトリ構成

```
/
├── docs/                      # ドキュメント類（要件定義・設計・規約など）
│   ├── requirements.md        # 要件定義書
│   ├── tech-stack.md          # 技術選定・技術構成
│   ├── db-design.md           # DB設計（論理・物理・ER図）
│   ├── api-design.md          # API設計書
│   ├── flow.md                # 画面遷移・シーケンス図
│   └── coding-rules.md        # 本ファイル（ディレクトリ構成・コーディング規約）
├── public/                    # 静的ファイル（画像・アイコン等）
├── prisma/                    # Prismaスキーマ・マイグレーション
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/                   # Next.js App Router（ページ・レイアウト等）
│   │   ├── new/               # 新規日程調整作成ページ
│   │   ├── host/              # ホスト用ページ
│   │   ├── guest/             # ゲスト用ページ
│   │   └── ...                # その他ページ
│   ├── components/            # UIコンポーネント群
│   │   ├── atoms/             # 汎用UI部品
│   │   ├── molecules/         # 複合UI部品
│   │   ├── organisms/         # セクション単位UI
│   │   ├── templates/         # 画面テンプレート
│   │   └── pages/             # ページ単位（必要に応じて）
│   ├── lib/                   # 型定義・hooks・utils・APIクエリ
│   │   ├── hooks/             # カスタムhooks
│   │   ├── queries/           # APIクエリ
│   │   └── utils/             # 汎用ユーティリティ
│   ├── server/                # サーバーサイドロジック
│   │   ├── client/            # DB/APIクライアント
│   │   └── service/           # ドメインロジック
│   └── types/                 # 型定義
├── eslint.config.mjs          # ESLint設定
├── next-env.d.ts              # Next.js型定義
├── next.config.ts             # Next.js設定
├── package.json               # パッケージ管理
├── tailwind.config.js         # Tailwind CSS設定
├── tsconfig.json              # TypeScript設定
└── README.md                  # プロジェクト説明
```

---

## 2. コーディング規約

### 2.1. 言語・フレームワーク

- TypeScript（型安全を徹底）
- Next.js（App Router）
- React 18
- UI は Tailwind CSS
- DB は Prisma（PostgreSQL）

### 2.2. 命名規則

- 変数・関数: キャメルケース（例: userName, fetchData）
- 型・インターフェース: パスカルケース（例: User, ScheduleResponse）
- コンポーネント: パスカルケース（例: ScheduleForm）
- hooks: use から始めるキャメルケース（例: useDateSelect）

### 2.3. ファイル構成・分割

- ページ単位は`src/app/`配下にディレクトリで分割
- UI 部品は`src/components/`配下で AtomicDesign に基づき atoms/molecules/organisms/templates/pages に分類
- 型定義・hooks・utils・API クエリは`src/lib/`配下
- サーバーロジックは`src/server/`配下
- 型定義は`src/types/`配下

### 2.4. 型安全・バリデーション

- すべての関数・props・API 通信は型定義を明示
- API リクエスト/レスポンス型は型エイリアスで定義し、フロント・バックエンドで共有
- バリデーションは zod 等の型スキーマライブラリを推奨

### 2.5. コメント・ドキュメント

- 複雑なロジック・型定義には JSDoc コメントを付与
- UI/ロジックの主要ブロックには簡潔な日本語コメントを推奨
- ドキュメントは`docs/`配下で管理し、設計・運用ルールも明記

### 2.6. コードスタイル

- インデント: 2 スペース
- セミコロン: あり
- シングルクォート推奨（ESLint/Prettier で統一）
- 不要な any 型・型省略は禁止
- 1 ファイル 1 責任原則
- import 順序は外部 → 内部 → 相対パス

### 2.7. テスト

- 単体テスト: Vitest + React Testing Library
- E2E テスト: Playwright
- テストコードは`src/tests/`または各機能ディレクトリ直下に配置

### 2.8. 環境変数・セキュリティ

- 環境変数は.env.local 等で管理し、機密情報は Git 管理外
- 外部 API キー等は絶対にリポジトリに含めない
- PR 時は ESLint/Prettier/型チェック/テストを必ず通す

### 2.9. フロントエンド（React/Next.js）実装規約

- React コンポーネントはパスカルケースで命名
- hooks は use から始めるキャメルケースで命名し、src/lib/hooks/配下に配置
- hooks は必ず関数コンポーネントまたは他の hooks のトップレベルで呼び出す
- props や state には必ず型定義を明示
- JSX 内のイベントハンドラはアロー関数で記述
- 1 ファイル 1 コンポーネントを原則とする
- 共通コンポーネントは src/components/、hooks は src/lib/hooks/等に配置
- 主要なコンポーネント・hooks・関数には JSDoc コメントを付与
- CSS クラス名は Tailwind CSS のユーティリティクラスを基本とする
- UI ロジックや状態管理は必ずカスタム hooks として切り出す
- 1 コンポーネントにつき 1hooks を原則とする（複数の hooks をまたいで状態を持たない）
- コンポーネントはアロー関数＋ React.FC 型で定義
- hooks・コンポーネントともに主要なものには JSDoc コメントを付与

### 2.11. ユーザビリティ・デザインガイドライン

- 直感的な操作を最優先し、専門用語や複雑な UI は避ける
- アプリケーション全体で UI/UX に統一感を持たせる
- 入力項目は最小限にし、詳細設定は折りたたみや任意入力とする
- 主要な操作（追加・削除・リセット等）は大きく分かりやすいボタンで配置
- 状態（選択中・未選択・エラー等）は色やアイコンで明確にフィードバック
- スマートフォン・PC どちらでも快適に操作できるレスポンシブデザイン
- 入力例や説明文を適宜表示し、迷わず操作できるようにする
- 一括選択・解除・複数選択など、繰り返し操作の負担を減らす補助機能を設ける
- エラーや未入力時は即時に分かりやすくガイドする
- 画面遷移や操作後のフィードバック（例: 完了メッセージ）を明示する
- 色覚バリアフリー・アクセシビリティにも十分配慮する
