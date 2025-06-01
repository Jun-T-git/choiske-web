import { formatMonthDay, getDateAfterPeriod, toJstIsoString } from '@/lib/utils/dateUtils';
import { describe, expect, it } from 'vitest';

describe('dateUtils', () => {
  describe('toJstIsoString', () => {
    it('UTC日付をJST(+9)のISO文字列に変換する', () => {
      // 2023-01-01 00:00:00 UTC => 2023-01-01 09:00:00 JST
      const utcDate = new Date('2023-01-01T00:00:00Z');
      const result = toJstIsoString(utcDate);
      
      // JSTでは9時間進んでいる
      expect(result).toMatch(/^2023-01-01T09:00:00\+09:00$/);
    });

    it('UTC→JST変換で日付が変わる場合', () => {
      // 2023-01-01 23:00:00 UTC => 2023-01-02 08:00:00 JST
      const utcDate = new Date('2023-01-01T23:00:00Z');
      const result = toJstIsoString(utcDate);
      
      // 日付が2日に変わる
      expect(result).toMatch(/^2023-01-02T08:00:00\+09:00$/);
    });
  });

  describe('getDateAfterPeriod', () => {
    it('年数を追加できる', () => {
      const baseDate = new Date('2023-01-01T00:00:00Z');
      const result = getDateAfterPeriod(baseDate, { years: 1 });
      
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // 0-indexed (1月)
      expect(result.getDate()).toBe(1);
    });

    it('月数を追加できる', () => {
      const baseDate = new Date('2023-01-01T00:00:00Z');
      const result = getDateAfterPeriod(baseDate, { months: 3 });
      
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(3); // 0-indexed (4月)
      expect(result.getDate()).toBe(1);
    });

    it('日数を追加できる', () => {
      const baseDate = new Date('2023-01-01T00:00:00Z');
      const result = getDateAfterPeriod(baseDate, { days: 10 });
      
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(0); // 0-indexed (1月)
      expect(result.getDate()).toBe(11);
    });

    it('年、月、日を組み合わせて追加できる', () => {
      const baseDate = new Date('2023-01-01T00:00:00Z');
      const result = getDateAfterPeriod(baseDate, { years: 1, months: 2, days: 3 });
      
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(2); // 0-indexed (3月)
      expect(result.getDate()).toBe(4);
    });

    it('元の日付を変更しない', () => {
      const baseDate = new Date('2023-01-01T00:00:00Z');
      getDateAfterPeriod(baseDate, { years: 1 });
      
      expect(baseDate.getFullYear()).toBe(2023);
      expect(baseDate.getMonth()).toBe(0);
      expect(baseDate.getDate()).toBe(1);
    });
  });

  describe('formatMonthDay', () => {
    it('日付を「M/D(曜日)」形式でフォーマットする', () => {
      // 2023-05-21は日曜日
      const date = new Date(2023, 4, 21); // 月は0-indexed
      const result = formatMonthDay(date);
      
      expect(result).toBe('5/21 (日)');
    });

    it('1桁の月と日は先頭のゼロなしでフォーマットする', () => {
      // 2023-01-02は月曜日
      const date = new Date(2023, 0, 2); // 1月2日
      const result = formatMonthDay(date);
      
      expect(result).toBe('1/2 (月)');
    });

    it('すべての曜日が正しくフォーマットされる', () => {
      const sunday = new Date(2023, 0, 1); // 2023-01-01 (日)
      expect(formatMonthDay(sunday)).toContain('(日)');
      
      const monday = new Date(2023, 0, 2); // 2023-01-02 (月)
      expect(formatMonthDay(monday)).toContain('(月)');
      
      const tuesday = new Date(2023, 0, 3); // 2023-01-03 (火)
      expect(formatMonthDay(tuesday)).toContain('(火)');
      
      const wednesday = new Date(2023, 0, 4); // 2023-01-04 (水)
      expect(formatMonthDay(wednesday)).toContain('(水)');
      
      const thursday = new Date(2023, 0, 5); // 2023-01-05 (木)
      expect(formatMonthDay(thursday)).toContain('(木)');
      
      const friday = new Date(2023, 0, 6); // 2023-01-06 (金)
      expect(formatMonthDay(friday)).toContain('(金)');
      
      const saturday = new Date(2023, 0, 7); // 2023-01-07 (土)
      expect(formatMonthDay(saturday)).toContain('(土)');
    });
  });
});