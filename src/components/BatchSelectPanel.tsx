import { FC } from "react";

interface BatchSelectPanelProps {
  show: boolean;
  onToggle: () => void;
  allDaysToggled: boolean;
  toggleAllDaysInMonth: () => void;
  weekdayToggles: boolean[];
  toggleWeekdayButton: (idx: number) => void;
  WEEK_LABELS: string[];
}

/**
 * まとめて選択パネルコンポーネント
 * @param show パネル展開状態
 * @param onToggle パネル開閉ハンドラ
 * @param allDaysToggled 月全体トグル状態
 * @param toggleAllDaysInMonth 月全体トグルハンドラ
 * @param weekdayToggles 曜日トグル配列
 * @param toggleWeekdayButton 曜日トグルハンドラ
 * @param WEEK_LABELS 曜日ラベル配列
 */
export const BatchSelectPanel: FC<BatchSelectPanelProps> = ({
  show,
  onToggle,
  allDaysToggled,
  toggleAllDaysInMonth,
  weekdayToggles,
  toggleWeekdayButton,
  WEEK_LABELS,
}) => (
  <>
    <div className="my-2 text-center bg-gray-200 p-1 rounded-lg w-full">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1 text-xs text-gray-600 font-bold underline hover:text-blue-800 transition"
        onClick={onToggle}
        aria-expanded={show}
      >
        <span>まとめて選択する</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            show ? "rotate-90" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {show && (
        <div className="flex flex-wrap gap-2 my-2 justify-center items-center">
          <button
            type="button"
            className={`px-3 py-1 rounded-full font-bold text-xs border transition min-w-[80px] text-center select-none focus:outline-none ${
              allDaysToggled
                ? "bg-blue-500 text-white border-blue-500 shadow"
                : "bg-white text-blue-500 border-blue-300 hover:bg-blue-50"
            }`}
            onClick={toggleAllDaysInMonth}
            aria-pressed={allDaysToggled}
          >
            この月をすべて選択
          </button>
          <div className="flex gap-1">
            {WEEK_LABELS.map((label, idx) => (
              <button
                key={idx}
                type="button"
                className={`px-3 py-1.5 rounded-full border font-bold text-xs transition focus:outline-none select-none min-w-[32px] text-center ${
                  weekdayToggles[idx]
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-white text-blue-500 border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => toggleWeekdayButton(idx)}
                aria-pressed={weekdayToggles[idx]}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </>
);
