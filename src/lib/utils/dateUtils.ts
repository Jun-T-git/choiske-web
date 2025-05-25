/**
 * 日付をJSTのISO形式の文字列に変換する
 * @param date - Dateオブジェクト
 * @returns JSTのISO形式の文字列
 * 例: "2023-10-01T12:00:00+09:00"
 */
export function toJstIsoString(date: Date): string {
  // JSTタイムゾーンで各値を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0');

  // JSTのオフセット（+09:00）
  const offset = '+09:00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}

/**
 * 指定した期間後の日時を取得する（1年後, 1日後, 3ヶ月後など）
 * @param date - Dateオブジェクト
 * @param period - 期間（例: { years: 1, months: 0, days: 0 }）
 * @param period.years - 年数
 * @param period.months - 月数
 * @param period.days - 日数
 * @returns 指定した期間後の日
 */
export function getDateAfterPeriod(date: Date, period: { years?: number; months?: number; days?: number }): Date {
  const newDate = new Date(date);
  if (period.years) {
    newDate.setFullYear(newDate.getFullYear() + period.years);
  }
  if (period.months) {
    newDate.setMonth(newDate.getMonth() + period.months);
  }
  if (period.days) {
    newDate.setDate(newDate.getDate() + period.days);
  }
  return newDate;
}

/**
 * 日付を「M/D(曜日)」形式で返すユーティリティ関数
 * @param date Dateオブジェクト
 * @returns "5/21(水)" のような文字列
 */
export function formatMonthDay(date: Date): string {
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${date.getMonth() + 1}/${date.getDate()} (${dayOfWeek})`;
}
