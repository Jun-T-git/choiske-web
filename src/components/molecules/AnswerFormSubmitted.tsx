import { ActionButton } from "@/components/atoms/ActionButton";
import { CopyableText } from "@/components/atoms/CopyableText";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AnswerFormSubmittedProps {
  token: string;
  editToken: string;
  isEdit: boolean;
}

/**
 * 回答送信後の表示コンポーネント
 * 送信完了後の画面を共通化
 */
export const AnswerFormSubmitted: FC<AnswerFormSubmittedProps> = ({
  token,
  editToken,
  isEdit,
}) => {
  const router = useRouter();
  const editUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/guest/${token}/answer/edit/${editToken}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {isEdit ? "回答を更新しました！" : "回答が完了しました！"}
      </h2>
      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          {isEdit
            ? "回答内容が更新されました。引き続き以下のURLで回答を編集することができます。"
            : "以下のURLから回答を編集することができます。必要な場合はこのURLを保存してください。"}
        </p>
        {!isEdit && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <CopyableText
              value={editUrl}
              label="編集用URL"
              className="break-all text-blue-600 hover:text-blue-800 font-medium"
            />
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <ShareButtons
            url={editUrl}
            title="日程調整回答の編集用URL"
            message="こちらのURLから回答内容を編集できます"
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ActionButton
          variant="primary"
          size="md"
          onClick={() => router.push(`/guest/${token}/summary`)}
        >
          一覧画面へ進む
        </ActionButton>
      </div>
    </div>
  );
};
