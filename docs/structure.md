# ディレクトリ構成（2025 年 5 月現在）

本プロジェクトのディレクトリ構成は以下の通りです。

```
/
├── docs/
│   ├── requirements.md      # 要件定義書
│   └── tech-stack.md        # 技術選定・技術構成ドキュメント
├── public/                  # 静的ファイル（画像・アイコン等）
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                 # Next.js App Router（ページ・レイアウト等）
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.module.css
│       └── page.tsx
├── eslint.config.mjs        # ESLint設定
├── next-env.d.ts            # Next.js型定義
├── next.config.ts           # Next.js設定
├── package.json             # パッケージ管理
├── README.md                # プロジェクト説明
└── tsconfig.json            # TypeScript設定
```

## 補足

- `docs/`：要件定義や技術選定などのドキュメントを格納します。
- `public/`：画像やアイコンなどの静的ファイルを配置します。
- `src/app/`：Next.js の App Router 配下。ページ、レイアウト、グローバル CSS 等を管理します。
- プロジェクトルートには各種設定ファイルや README が配置されています。

今後、機能追加や規模拡大に応じて `src/components/` や `src/features/` などのディレクトリを追加することを推奨します。
