# API 設計書（2025 年 5 月版・可変スロット対応・現行実装準拠）

本ドキュメントは「チョイスケ」Web サービスの API 設計です。

---

## 関連ドキュメント

- [DB 設計書](./db-design.md)
- [画面遷移設計](./flow.md)
- [技術選定](./tech-stack.md)

---

## 1. エンドポイント一覧

| メソッド | パス                                   | 概要                   |
| -------- | -------------------------------------- | ---------------------- |
| POST     | /api/schedules                         | 日程調整の新規作成     |
| GET      | /api/schedules/[id]                    | 日程調整データ取得     |
| GET      | /api/schedules/[id]/time-slots         | 候補スロット一覧取得   |
| POST     | /api/schedules/[id]/answers            | 回答登録               |
| PATCH    | /api/schedules/[id]/answers/[answerId] | 回答編集               |
| GET      | /api/schedules/[id]/answers            | 回答一覧取得           |
| GET      | /api/schedules/[id]/result             | 集計・決定スロット取得 |
| POST     | /api/schedules/[id]/result             | スロット決定           |

---

## 2. 各エンドポイント詳細

### POST /api/schedules

- 概要: 新規日程調整の作成
- リクエスト例:

```json
{
  "title": "飲み会候補",
  "slotSizeMinutes": 30,
  "description": "6月の飲み会候補日です。ご都合を教えてください。", // 任意
  "timeSlots": [
    { "slotStart": "2025-06-01T13:00:00Z" },
    { "slotStart": "2025-06-01T18:00:00Z" }
  ]
}
```

- レスポンス例:

```json
{
  "id": "clwxyz123",
  "url": "https://choiske.com/s/clwxyz123"
}
```

### GET /api/schedules/[id]

- 概要: 日程調整データの取得
- レスポンス例:

```json
{
  "schedule": {
    "id": "clwxyz123",
    "title": "飲み会候補",
    "slotSizeMinutes": 30,
    "description": "6月の飲み会候補日です。ご都合を教えてください。", // 任意
    "timeSlots": [
      { "id": "slot1", "slotStart": "2025-06-01T13:00:00Z" },
      { "id": "slot2", "slotStart": "2025-06-01T18:00:00Z" }
    ],
    "answers": [
      {
        "id": "ans1",
        "name": "佐藤花子",
        "comment": "遅れて参加するかもです", // 任意
        "responses": [
          { "slotId": "slot1", "status": 1 },
          { "slotId": "slot2", "status": 3 }
        ],
        "createdAt": "2025-05-17T12:00:00Z",
        "updatedAt": "2025-05-17T12:00:00Z"
      }
    ],
    "createdAt": "2025-05-17T11:00:00Z"
  }
}
```

### GET /api/schedules/[id]/time-slots

- 概要: 候補スロット一覧取得
- レスポンス例:

```json
{
  "timeSlots": [
    { "id": "slot1", "slotStart": "2025-06-01T13:00:00Z" },
    { "id": "slot2", "slotStart": "2025-06-01T18:00:00Z" }
  ]
}
```

### POST /api/schedules/[id]/answers

- 概要: 回答登録
- リクエスト例:

```json
{
  "name": "佐藤花子",
  "comment": "遅れて参加するかもです", // 任意
  "responses": [
    { "slotId": "slot1", "status": 1 },
    { "slotId": "slot2", "status": 3 }
  ]
}
```

- レスポンス例:

```json
{
  "answerId": "ans1"
}
```

### PATCH /api/schedules/[id]/answers/[answerId]

- 概要: 回答編集
- リクエスト例:

```json
{
  "comment": "やっぱり最初から参加できます", // 任意
  "responses": [
    { "slotId": "slot1", "status": 1 },
    { "slotId": "slot2", "status": 1 }
  ]
}
```

- レスポンス例:

```json
{
  "success": true
}
```

### GET /api/schedules/[id]/result

- 概要: 集計・決定スロット取得
- レスポンス例:

```json
{
  "summary": [
    {
      "slotId": "slot1",
      "okCount": 2,
      "ngCount": 1,
      "undecidedCount": 1,
      "unansweredCount": 0
    },
    {
      "slotId": "slot2",
      "okCount": 1,
      "ngCount": 2,
      "undecidedCount": 1,
      "unansweredCount": 0
    }
  ],
  "decidedSlotId": null
}
```

### POST /api/schedules/[id]/result

- 概要: スロット決定
- リクエスト例:

```json
{
  "decidedSlotId": "slot1"
}
```

- レスポンス例:

```json
{
  "success": true
}
```

---

## 3. status 値の定義

- 1 = OK（参加可）
- 2 = NG（参加不可）
- 0 = 未回答
- 3 = 未確定
