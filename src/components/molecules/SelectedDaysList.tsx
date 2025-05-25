import { formatMonthDay } from "@/lib/utils/dateUtils";
import { FC, useState } from "react";

interface SelectedDaysListProps {
  selectedDays: Date[];
  onRemove: (date: Date) => void;
}

/**
 * 選択済み日付リスト表示コンポーネント
 * @param selectedDays 選択済み日付配列
 * @param onRemove 日付削除ハンドラ
 */
export const SelectedDaysList: FC<SelectedDaysListProps> = ({
  selectedDays,
  onRemove,
}) => {
  const [expanded, setExpanded] = useState(false);
  const sortedDays = selectedDays
    .slice()
    .sort((a, b) => a.getTime() - b.getTime());
  const MAX_VISIBLE = 10;
  const isFolded = sortedDays.length > MAX_VISIBLE && !expanded;
  const visibleDays = isFolded ? sortedDays.slice(0, MAX_VISIBLE) : sortedDays;
  const hiddenCount = sortedDays.length - MAX_VISIBLE;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedDays.length === 0 && (
        <span className="text-gray-400 text-sm">
          候補日が選択されていません
        </span>
      )}
      {visibleDays.map((d) => (
        <span
          key={formatMonthDay(d)}
          className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm flex items-center gap-1"
        >
          {formatMonthDay(d)}
          <button
            type="button"
            className="ml-1 text-blue-400 hover:text-red-500"
            onClick={() => onRemove(d)}
            aria-label="削除"
          >
            ×
          </button>
        </span>
      ))}
      {isFolded && (
        <button
          type="button"
          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300 transition"
          onClick={() => setExpanded(true)}
        >
          +{hiddenCount}件を表示
        </button>
      )}
      {!isFolded && sortedDays.length > MAX_VISIBLE && (
        <button
          type="button"
          className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm hover:bg-gray-200 transition"
          onClick={() => setExpanded(false)}
        >
          折りたたむ
        </button>
      )}
    </div>
  );
};
