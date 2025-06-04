# タイムゾーン処理ガイドライン

## 概要

Choiske Web アプリケーションでは、タイムゾーン処理に関して以下のルールを採用しています：

1. サーバーサイド/データベース: **UTC**でデータを保存・処理
2. クライアントサイド表示: **JST (Asia/Tokyo)**で表示

## 基本原則

- データベースには常に UTC でデータを格納する
- API リクエストは常に UTC の ISO 形式の日付文字列を送信する
- API レスポンスは常に UTC の ISO 形式の日付文字列を返す
- クライアント側での表示時に、UTC から JST への変換を行う

## ユーティリティ関数

タイムゾーン変換を容易にするために、`/src/lib/utils/dateUtils.ts`に以下のユーティリティ関数を用意しています：

```typescript
// UTCのDateオブジェクトをJSTのISO文字列に変換
toJstIsoString(date: Date): string

// DateオブジェクトをUTCのISO文字列に変換
toUtcIsoString(date: Date): string

// JSTのISO文字列をDateオブジェクトに変換
jstIsoToDate(isoString: string): Date

// UTCのISO文字列をJSTのISO文字列に変換
utcIsoToJstIso(utcIsoString: string): string

// JSTのISO文字列をUTCのISO文字列に変換
jstIsoToUtcIso(jstIsoString: string): string

// 文字列がISO形式の日付文字列かどうかを判定
isIsoDateString(str: string): boolean
```

## 実装パターン

### API 呼び出し時（クライアント → サーバー）

```typescript
// クライアントで作成した日付をUTCに変換してからAPIに送信
const date = new Date(); // ローカルの日付
const utcIsoString = toUtcIsoString(date);
await api.createSchedule({ date: utcIsoString });
```

### API レスポンス処理時（サーバー → クライアント）

```typescript
// サーバーからのUTC日付をJSTで表示用に変換
const schedule = await api.getSchedule(id);
const jstDate = utcIsoToJstIso(schedule.date);
displayDate(jstDate);
```

### 日付表示コンポーネント内

```typescript
// UTCのISO文字列を受け取り、JST表示用に変換するヘルパー関数
const toJstDate = (dateStr: string): Date => {
  if (isIsoDateString(dateStr)) {
    const jstStr = utcIsoToJstIso(dateStr);
    return jstIsoToDate(jstStr);
  }
  return new Date(dateStr);
};

// 表示時に変換関数を使用
<span>{formatMonthDay(toJstDate(utcDateString))}</span>;
```

## 注意点

- 日付計算を行う場合は、常に同一のタイムゾーンで計算を行うこと
- ブラウザの`new Date()`は現地時間で作成されることに注意
- 日付文字列をパースするときは、常にタイムゾーンを明示的に扱うこと
- フォームからの入力は JST として扱い、API に送信する前に UTC に変換する

## テスト

タイムゾーン関連のテストを書く際は、以下の点に注意してください：

- テスト環境でもタイムゾーンを明示的に設定する
- 特定の日付で固定したテストを書く場合は、タイムゾーンを考慮する
- UTC/JST の変換が正しく行われるか検証するテストを含める

## よくある問題と解決法

1. **問題**: 日付が 1 日ずれて表示される
   **解決**: UTC から JST への変換が適切に行われているか確認

2. **問題**: 時間が 9 時間ずれる
   **解決**: JST (UTC+9) と UTC の時差を考慮し、適切な変換関数を使用

3. **問題**: DB に保存した日付とクライアント表示が一致しない
   **解決**: クライアント表示時に`utcIsoToJstIso`関数で JST に変換する
