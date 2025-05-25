# DB 設計書（2025 年 5 月版・可変スロット対応・現行実装準拠）

本ドキュメントは「チョイスケ」Web サービスの DB 設計（論理設計＋物理設計、スロット可変対応）を現行 schema.prisma に基づきまとめたものです。

---

## 関連ドキュメント

- [API 設計書](./api-design.md)
- [技術選定](./tech-stack.md)

---

## 1. エンティティ一覧

- Schedule（スケジュール調整）
- TimeSlot（候補スロット）
- Answer（参加者回答）
- SlotResponse（スロットごとの回答）

---

## 2. 各エンティティの概要

### Schedule

- 日程調整の親エンティティ。タイトル、説明文、スロットサイズ、作成日時、有効期限、公開用トークンなどを持つ。

### TimeSlot

- スケジュールごとに設定された「可変長の時間スロット」（例: 2025-05-17 13:00-13:30, 13:30-14:00 など）を管理。

### Answer

- 参加者ごとの回答（名前、コメント、各スロットへの回答）。

### SlotResponse

- 各スロットごとに参加者が「OK/NG/未回答」等で可否を数値（例: 1=OK, 2=NG, 0=未回答, 3=未確定）で回答。

---

## 3. 関連・リレーション

- Schedule 1 : N TimeSlot
- Schedule 1 : N Answer
- Answer 1 : N SlotResponse
- TimeSlot 1 : N SlotResponse

---

## 4. テーブル定義（物理設計・Prisma スキーマ準拠）

### Schedule（スケジュール調整）

| カラム名          | 型       | 主キー | NOT NULL | デフォルト | 説明                     |
| ----------------- | -------- | ------ | -------- | ---------- | ------------------------ |
| id                | String   | ○      | ○        | nanoid()   | スケジュール ID          |
| title             | String   |        | ○        |            | タイトル                 |
| description       | String?  |        |          |            | 説明文（任意）           |
| slot_size_minutes | Int      |        | ○        |            | スロットの長さ（分単位） |
| public_token      | String   | Unique | ○        | nanoid()   | 公開用トークン           |
| created_at        | DateTime |        | ○        | now()      | 作成日時                 |
| expires_at        | DateTime |        | ○        |            | 有効期限                 |

---

### TimeSlot（候補スロット）

| カラム名    | 型       | 主キー | NOT NULL | デフォルト | 説明                |
| ----------- | -------- | ------ | -------- | ---------- | ------------------- |
| id          | String   | ○      | ○        | nanoid()   | スロット ID         |
| schedule_id | String   |        | ○        |            | スケジュール ID(FK) |
| slot_start  | DateTime |        | ○        |            | スロット開始日時    |

---

### Answer（参加者回答）

| カラム名    | 型       | 主キー | NOT NULL | デフォルト | 説明                 |
| ----------- | -------- | ------ | -------- | ---------- | -------------------- |
| id          | String   | ○      | ○        | nanoid()   | 回答 ID              |
| schedule_id | String   |        | ○        |            | スケジュール ID(FK)  |
| name        | String?  |        |          |            | 参加者名（任意）     |
| comment     | String?  |        |          |            | 回答コメント（任意） |
| created_at  | DateTime |        | ○        | now()      | 回答作成日時         |
| updated_at  | DateTime |        | ○        | updatedAt  | 回答更新日時         |

---

### SlotResponse（スロットごとの回答）

| カラム名  | 型     | 主キー | NOT NULL | デフォルト | 説明                                          |
| --------- | ------ | ------ | -------- | ---------- | --------------------------------------------- |
| id        | String | ○      | ○        | nanoid()   | 回答詳細 ID                                   |
| answer_id | String |        | ○        |            | 回答 ID(FK)                                   |
| slot_id   | String |        | ○        |            | スロット ID(FK)                               |
| status    | Int    |        | ○        |            | 回答ステータス（1=OK,2=NG,0=未回答,3=未確定） |

---

### 備考

- status は数値（例: 1=OK, 2=NG, 0=未回答, 3=未確定）で管理
- Answer の name/comment は任意項目
- Schedule の description も任意項目
- slot_size_minutes でスロットの長さ（例: 15, 30, 60 分など）を管理
- TimeSlot で各スロットの開始日時を保持（可変長対応）
- SlotResponse で各スロットごとの可否を管理
- 日付・時間は全て DateTime 型（ISO8601/UTC）
- Prisma の nanoid() で主キー自動生成

---

## 5. ER 図（エンティティ・リレーションシップ図）

```mermaid
erDiagram
    Schedule ||--o{ TimeSlot : has
    Schedule ||--o{ Answer : has
    TimeSlot ||--o{ SlotResponse : has
    Answer ||--o{ SlotResponse : has

    Schedule {
        string id PK
        string title
        string? description
        int slot_size_minutes
        string public_token Unique
        datetime created_at
        datetime expires_at
    }
    TimeSlot {
        string id PK
        string schedule_id FK
        datetime slot_start
    }
    Answer {
        string id PK
        string schedule_id FK
        string? name
        string? comment
        datetime created_at
        datetime updated_at
    }
    SlotResponse {
        string id PK
        string answer_id FK
        string slot_id FK
        int status
    }
```
