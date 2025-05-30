import { addDays, addMonths, addYears, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const JST_TIMEZONE = 'Asia/Tokyo';

/**
 * 日付をJSTのISO形式の文字列に変換する
 * @param date - Dateオブジェクト
 * @returns JSTのISO形式の文字列
 */
export function toJstIsoString(date: Date): string {
  return formatInTimeZone(date, JST_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssxxx");
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
  let result = new Date(date);
  
  if (period.years) {
    result = addYears(result, period.years);
  }
  
  if (period.months) {
    result = addMonths(result, period.months);
  }
  
  if (period.days) {
    result = addDays(result, period.days);
  }
  
  return result;
}

/**
 * 日付を「M/D(曜日)」形式で返すユーティリティ関数
 * @param date Dateオブジェクト
 * @returns "5/21(水)" のような文字列
 */
export function formatMonthDay(date: Date): string {
  // 日本語の曜日表記を使用
  const dayOfWeekJP = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return format(date, 'M/d') + ` (${dayOfWeekJP})`;
}
