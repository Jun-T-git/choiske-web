# テスト戦略と実装ガイド

## テスト戦略概要

チョイスケプロジェクトでは、以下の 3 層でのテストを実施します。

1. 単体テスト (Vitest)
2. コンポーネントテスト (Storybook + Test Runner)
3. E2E テスト (Playwright)

## テスト対象と優先度

| 対象                 | テスト種別           | 優先度 | コメント                                   |
| -------------------- | -------------------- | ------ | ------------------------------------------ |
| lib/utils            | 単体                 | 高     | 基本的なユーティリティ関数は堅牢性が必須   |
| lib/hooks            | 単体                 | 高     | 状態管理の中核部分                         |
| components/atoms     | コンポーネント       | 中     | 再利用性の高い UI を検証                   |
| components/molecules | コンポーネント       | 中     | 複合コンポーネントの動作確認               |
| components/organisms | 単体＋コンポーネント | 中     | ビジネスロジックと結合した部分は単体テスト |
| components/templates | E2E                  | 高     | 主要フロー検証                             |
| app/\*               | E2E                  | 高     | エンドツーエンドのユーザーフロー検証       |

## テスト実装方針

### 単体テスト (Vitest)

- `src/**/__tests__/*.test.ts(x)` にテストファイルを配置
- Hooks、Utils、Service 層を中心にテスト
- モックを活用し、外部依存を排除

### コンポーネントテスト (Storybook)

- `src/stories/**/*.stories.tsx` に既存の Stories を拡張
- `play()` 関数を使ったインタラクションテスト実装
- スナップショットテストよりインタラクションテストを優先

### E2E テスト (Playwright)

- `src/tests/e2e/*.spec.ts` にテストシナリオ配置
- 主要ユーザーフロー（スケジュール作成、回答、サマリー表示）を重点的にテスト
- テスト環境用のデータシードを準備

## V サンプルコード

それぞれのサンプルコードは、以下のファイルを参照してください：

- 単体テスト: `/src/lib/utils/__tests__/dateUtils.test.ts`
- Hooks テスト: `/src/lib/hooks/__tests__/useFormSubmit.test.tsx`
- コンポーネントテスト: `/src/stories/atoms/TextInput.stories-with-test.tsx`
- 組織テスト: `/src/components/organisms/guest/__tests__/SlotStatusTable.test.tsx`
- E2E テスト: `/src/tests/e2e/schedule-flows.spec.ts`

## テスト実行コマンド

テスト実行のためのコマンドは以下の通りです：

```bash
# 単体テスト
npm run test:unit

# 特定ファイルの単体テスト
npm run test:unit -- dateUtils.test.ts

# ウォッチモードでの単体テスト
npm run test:unit:watch

# Storybookのインタラクションテスト
npm run test-storybook

# E2Eテスト
npm run test:e2e

# 特定ファイルのE2Eテスト
npm run test:e2e -- schedule-flows.spec.ts

# UIモードでE2Eテスト
npm run test:e2e:ui
```

## CI/CD との連携

GitHub Actions などの CI 環境では、以下のようにテストを設定してください：

1. プルリクエスト時に単体テストと Storybook テストを実行
2. メインブランチへのマージ前に E2E テストを実行
3. テスト結果をアーティファクトとして保存（特に E2E テストのスクリーンショットやビデオ）

## テストの追加方針

新機能を追加する際は、以下の順でテストを実装することを推奨します：

1. ユーティリティや純粋関数の単体テスト
2. Hooks/ステート管理のテスト
3. UI コンポーネントの Storybook ストーリー（インタラクションテスト付き）
4. 主要機能の E2E テストシナリオ
