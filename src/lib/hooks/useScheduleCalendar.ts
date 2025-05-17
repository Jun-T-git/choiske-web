import { useState } from "react";

/**
 * カレンダー・候補日選択・曜日/月一括トグルなど日付選択に関するロジックをまとめたカスタムフック
 * UIや動作はScheduleForm.tsxと同一
 */
export function useScheduleCalendar() {
  // タイトル入力
  const [title, setTitle] = useState("");
  // 選択中の日付リスト
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  // カレンダー表示中の月
  const [month, setMonth] = useState(new Date());
  // エラーメッセージ
  const [error, setError] = useState("");

  // 曜日トグルUIの状態（各曜日ごとにオン/オフ）
  const [weekdayToggles, setWeekdayToggles] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  /**
   * 曜日トグルボタンのクリック処理
   * @param idx 曜日インデックス（0:日〜6:土）
   */
  const toggleWeekdayButton = (idx: number) => {
    setWeekdayToggles((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    // 追加/削除ロジック
    const year = month.getFullYear();
    const m = month.getMonth();
    const days: Date[] = [];
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, m, d);
      if (date.getMonth() !== m) break;
      if (date.getDay() === idx) days.push(date);
    }
    if (!weekdayToggles[idx]) {
      // オンにした場合: 追加
      const newDays = days.filter(
        (day) => !selectedDays.some((sel) => sel.getTime() === day.getTime())
      );
      setSelectedDays([...selectedDays, ...newDays]);
    } else {
      // オフにした場合: 削除
      setSelectedDays(
        selectedDays.filter(
          (sel) => !days.some((day) => day.getTime() === sel.getTime())
        )
      );
    }
  };
  // リセット
  const resetSelectedDays = () => setSelectedDays([]);
  // 月移動
  const goPrevMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const goNextMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  // その月すべて選択トグルの状態
  const [allDaysToggled, setAllDaysToggled] = useState(false);
  /**
   * その月すべて選択/解除の処理
   */
  const toggleAllDaysInMonth = () => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const days: Date[] = [];
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, m, d);
      if (date.getMonth() !== m) break;
      days.push(date);
    }
    if (!allDaysToggled) {
      // 追加
      const newDays = days.filter(
        (day) => !selectedDays.some((sel) => sel.getTime() === day.getTime())
      );
      setSelectedDays([...selectedDays, ...newDays]);
      setAllDaysToggled(true);
    } else {
      // 削除
      setSelectedDays(
        selectedDays.filter(
          (sel) => !days.some((day) => day.getTime() === sel.getTime())
        )
      );
      setAllDaysToggled(false);
    }
  };

  // まとめて選択パネルの開閉状態
  const [showBatchSelect, setShowBatchSelect] = useState(false);

  return {
    title,
    setTitle,
    selectedDays,
    setSelectedDays,
    month,
    setMonth,
    error,
    setError,
    weekdayToggles,
    toggleWeekdayButton,
    allDaysToggled,
    toggleAllDaysInMonth,
    showBatchSelect,
    setShowBatchSelect,
    goPrevMonth,
    goNextMonth,
    resetSelectedDays,
  };
}
