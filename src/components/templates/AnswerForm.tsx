"use client";
import { TextInput } from "@/components/atoms/TextInput";
import { TextareaInput } from "@/components/atoms/TextareaInput";
import { AnswerFormSubmitted } from "@/components/molecules/AnswerFormSubmitted";
import { BaseForm } from "@/components/molecules/BaseForm";
import { FormButtonGroup } from "@/components/molecules/FormButton";
import { SlotStatusTable } from "@/components/organisms/guest/SlotStatusTable";
import { SLOT_STATUS_LIST, SlotStatus } from "@/constants/slotStatus";
import { useFormSubmit } from "@/lib/hooks/useFormSubmit";
import { createAnswer, editAnswerByToken } from "@/lib/queries/answer";
import { TimeSlot } from "@/types/timeSlot";
import { FC, FormEvent, useMemo, useState } from "react";

type AnswerFormMode = "create" | "edit";

interface BaseAnswerFormData {
  name: string;
  comment: string;
  slotResponses: { slotId: string; status: SlotStatus }[];
}

interface CreateAnswerFormData extends BaseAnswerFormData {
  scheduleId: string;
}

type EditAnswerFormData = BaseAnswerFormData;

interface AnswerFormProps {
  token: string;
  timeSlots: TimeSlot[];
  mode: AnswerFormMode;
  editToken?: string;
  initialName?: string;
  initialComment?: string | null;
  initialResponses?: { slotId: string; status: SlotStatus }[];
}

/**
 * 回答フォームコンポーネント（新規作成/編集共通）
 * - 新規作成と編集で共通化したフォームコンポーネント
 * - ユーザーは名前とスケジュールの回答を入力
 * - 各日時に対する回答を入力（OK/NG/Maybe）
 * - 送信後、編集用URLが表示される
 */
export const AnswerForm: FC<AnswerFormProps> = ({
  token,
  timeSlots,
  mode,
  editToken = "",
  initialName = "",
  initialComment = "",
  initialResponses,
}) => {
  const isEditMode = mode === "edit";

  // timeSlots: [{ id, slotStart, ... }]
  const slotMetaList = useMemo(
    () =>
      timeSlots.map((slot) => {
        const [date, time] = slot.slotStart.split("T");
        return {
          slotId: slot.id,
          date,
          time: time.slice(0, 5),
        };
      }),
    [timeSlots]
  );

  // フォームの入力値
  const [name, setName] = useState(initialName);
  const [comment, setComment] = useState(initialComment || "");

  // 回答データの状態
  const [responseEditToken, setResponseEditToken] = useState(editToken);

  // statusList: [{ slotId, status }]
  const [statusList, setStatusList] = useState<
    { slotId: string; status: SlotStatus }[]
  >(
    () =>
      initialResponses ||
      slotMetaList.map((s) => ({ slotId: s.slotId, status: SlotStatus.OK }))
  );

  // フォーム送信関数を選択
  const submitFn = isEditMode
    ? (data: EditAnswerFormData) => editAnswerByToken(editToken, data)
    : (data: CreateAnswerFormData) => createAnswer(data);

  // フォーム送信ロジック
  const { submitForm, isSubmitting, isSuccess, errorMessage } = useFormSubmit<
    any, // TypeScriptの制限により、条件付き型を使用できないためanyで対応
    any
  >({
    onSubmit: submitFn,
    onSuccess: (response) => {
      if (!isEditMode && "editToken" in response) {
        setResponseEditToken(response.editToken);
      }
    },
    onError: (err) => {
      console.error(
        `回答${isEditMode ? "更新" : "送信"}中にエラーが発生しました`,
        err
      );
    },
  });

  // セルクリック
  const handleCellClick = (slotId: string) => {
    setStatusList((prev) =>
      prev.map((s) =>
        s.slotId === slotId
          ? {
              ...s,
              status:
                SLOT_STATUS_LIST[
                  (SLOT_STATUS_LIST.indexOf(s.status) + 1) %
                    SLOT_STATUS_LIST.length
                ],
            }
          : s
      )
    );
  };

  // 行一括更新
  const handleRowBulkUpdate = (date: string, newStatus: SlotStatus) => {
    setStatusList((prev) =>
      prev.map((s) =>
        slotMetaList.find((meta) => meta.slotId === s.slotId)?.date === date
          ? { ...s, status: newStatus }
          : s
      )
    );
  };

  // 列一括更新
  const handleColBulkUpdate = (time: string, newStatus: SlotStatus) => {
    setStatusList((prev) =>
      prev.map((s) =>
        slotMetaList.find((meta) => meta.slotId === s.slotId)?.time === time
          ? { ...s, status: newStatus }
          : s
      )
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const baseData = {
        name,
        comment,
        slotResponses: statusList,
      };

      if (isEditMode) {
        await submitForm(baseData);
      } else {
        await submitForm({
          ...baseData,
          scheduleId: timeSlots[0]?.scheduleId ?? "",
        });
      }
    } catch (err) {
      // エラーはuseFormSubmit内で処理されるため、ここでは何もしない
    }
  };

  // キャンセルボタンのハンドラ
  const handleCancel = () => {
    window.history.back();
  };

  // 送信/更新完了後の画面
  const currentEditToken = isEditMode ? editToken : responseEditToken;
  if (isSuccess && currentEditToken) {
    return (
      <AnswerFormSubmitted
        token={token}
        editToken={currentEditToken}
        isEdit={isEditMode}
      />
    );
  }

  return (
    <BaseForm onSubmit={handleSubmit} errorMessage={errorMessage}>
      <div className="mb-4">
        <TextInput
          label="お名前"
          value={name}
          onChange={setName}
          placeholder="例: 山田太郎"
          maxLength={12}
          required
          note="あなた（回答者）のお名前を入力してください"
        />
      </div>
      <div className="overflow-x-auto mb-4">
        <SlotStatusTable
          timeSlots={slotMetaList}
          statusList={statusList}
          onCellClick={handleCellClick}
          onRowBulkUpdate={handleRowBulkUpdate}
          onColBulkUpdate={handleColBulkUpdate}
        />
      </div>
      <div>
        <TextareaInput
          label="コメント"
          value={comment}
          onChange={setComment}
          placeholder="例: △の日は来週までに確定します！"
          rows={3}
          maxLength={100}
        />
      </div>

      <FormButtonGroup
        isSubmitting={isSubmitting}
        isEdit={isEditMode}
        onCancel={handleCancel}
      />
    </BaseForm>
  );
};
