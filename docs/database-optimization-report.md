# データベース最適化レポート

## 実施した最適化

### 1. インデックスとユニーク制約の追加

スキーマ設計を改善し、検索効率を向上させるために以下のインデックスと制約を追加しました：

```prisma
model Schedule {
  // 既存フィールド...

  @@index([publicToken])
  @@index([expiresAt])
}

model TimeSlot {
  // 既存フィールド...

  @@index([scheduleId, slotStart])
}

model Answer {
  // 既存フィールド...

  @@index([editToken])
  @@index([scheduleId])
}

model SlotResponse {
  // 既存フィールド...

  @@unique([answerId, slotId])
  @@index([answerId, slotId])
  @@index([slotId])
  @@index([answerId])
}
```

これにより次の効果が期待できます：

- 頻繁に検索されるフィールドへのアクセスが高速化
- 複合インデックスによる結合クエリの効率化
- ユニーク制約による重複データの防止

### 2. SlotResponse の差分更新

回答編集時に、全ての SlotResponse を削除して再作成するという非効率なアプローチを、差分に基づく更新に変更しました：

```typescript
// 変更前: 全削除 -> 全作成
await prisma.slotResponse.deleteMany({ where: { answerId: existingAnswer.id } });
await Promise.all(input.slotResponses.map((sr) => prisma.slotResponse.create({...})));

// 変更後: 必要なレコードのみを更新・作成・削除
const responsesToUpsert = // 更新または作成が必要なレコードを特定
const responseIdsToDelete = // 削除が必要なレコードを特定

if (responseIdsToDelete.length > 0) {
  await prisma.slotResponse.deleteMany({...});
}

if (responsesToUpsert.length > 0) {
  await Promise.all(responsesToUpsert);
}
```

これにより次の効果が期待できます：

- データベース操作の総数を削減
- トランザクション時間の短縮
- サーバーリソースの効率的な使用

### 3. サーバーサイドでの集計処理

クライアント側で行っていたスロット状態の集計をサーバー側へ移行しました：

1. サーバー側集計関数の実装：

   ```typescript
   export async function getSlotStatusCounts(
     scheduleId: string
   ): Promise<SlotStatusCount[]>;
   ```

2. 最適化されたクエリの実装：

   ```typescript
   export async function getSlotStatusCountsOptimized(
     scheduleId: string
   ): Promise<SlotStatusCount[]>;
   ```

3. 専用 API エンドポイントの作成：
   ```typescript
   // /api/schedules/[token]/status-counts/route.ts
   export async function GET(
     req: NextRequest,
     { params }: { params: { token: string } }
   );
   ```

この変更により次の効果が期待できます：

- クライアント側の計算負荷の軽減
- パフォーマンスの向上（特に多数の回答がある場合）
- ネットワーク転送データ量の削減

## テスト方法

以下のシナリオで最適化の効果を確認できます：

1. **スケジュール表示**：多数の回答（10 件以上）がある大規模スケジュールを開き、集計表示がスムーズに行われることを確認
2. **回答編集**：既存の回答を編集し、応答時間が改善していることを確認

3. **新規スケジュール作成**：多数のスロットを含むスケジュールの作成と、トランザクションが正常に完了することを確認

## 今後の改善点

以下の追加最適化を検討することをお勧めします：

1. キャッシュ層の導入：頻繁にアクセスされる読み取り専用データのキャッシュ

2. アーカイブ戦略：有効期限切れのスケジュールを別テーブルに移動

3. クエリのさらなる最適化：実際の使用パターンに基づくチューニング

4. タイムスロットの構造最適化：繰り返しパターンのある予定を効率的に表現する方法の検討
