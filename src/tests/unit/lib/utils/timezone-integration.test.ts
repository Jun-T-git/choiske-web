import {
  isIsoDateString,
  jstIsoToUtcIso,
  toJstIsoString,
  toUtcIsoString,
  utcIsoToJstIso
} from '@/lib/utils/dateUtils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

/**
 * タイムゾーン処理の統合テスト
 * 
 * このテストでは、アプリケーション全体でのタイムゾーンの一貫した処理を
 * 検証します。特に、UTCとJST間の変換が正しく行われることを確認します。
 */
describe('Timezone Integration Tests', () => {
  // タイムゾーン処理の一貫性をテストするための特定の日付
  // この日付は2023年5月15日10:30:45 JSTに相当します
  const testDateJst = new Date(2023, 4, 15, 10, 30, 45); // JST
  const testDateUtc = new Date(Date.UTC(2023, 4, 15, 1, 30, 45)); // UTC (JST-9)

  const originalTimezone = process.env.TZ;

  beforeEach(() => {
    // テスト用にタイムゾーンをUTCに設定
    process.env.TZ = 'UTC';
  });

  afterEach(() => {
    // テスト後に元のタイムゾーンに戻す
    process.env.TZ = originalTimezone;
  });

  describe('基本的な変換テスト', () => {
    it('JSTのDateをUTC ISOに正しく変換できる', () => {
      const utcIso = toUtcIsoString(testDateJst);
      expect(utcIso).toMatch(/^2023-05-15T01:30:45.\d{3}Z$/);
    });

    it('UTCのDateをJST ISOに正しく変換できる', () => {
      const jstIso = toJstIsoString(testDateUtc);
      expect(jstIso).toMatch(/^2023-05-15T10:30:45\+09:00$/);
    });
  });

  describe('文字列変換テスト', () => {
    it('UTC ISO文字列をJST ISO文字列に変換できる', () => {
      const utcIso = '2023-05-15T01:30:45.000Z';
      const jstIso = utcIsoToJstIso(utcIso);
      expect(jstIso).toEqual('2023-05-15T10:30:45+09:00');
    });

    it('JST ISO文字列をUTC ISO文字列に変換できる', () => {
      const jstIso = '2023-05-15T10:30:45+09:00';
      const utcIso = jstIsoToUtcIso(jstIso);
      expect(utcIso).toMatch(/^2023-05-15T01:30:45.\d{3}Z$/);
    });
  });

  describe('日付変換の一貫性テスト', () => {
    it('UTC→JST→UTC変換が一貫している', () => {
      const utcIso = toUtcIsoString(testDateUtc);
      const jstIso = utcIsoToJstIso(utcIso);
      const utcIsoAgain = jstIsoToUtcIso(jstIso);
      
      const utcDate1 = new Date(utcIso);
      const utcDate2 = new Date(utcIsoAgain);
      
      expect(utcDate1.getTime()).toEqual(utcDate2.getTime());
    });

    it('JST→UTC→JST変換が一貫している', () => {
      const jstIso = toJstIsoString(testDateJst);
      const utcIso = jstIsoToUtcIso(jstIso);
      const jstIsoAgain = utcIsoToJstIso(utcIso);
      
      expect(jstIso).toEqual(jstIsoAgain);
    });
  });

  describe('Validation Tests', () => {
    it('正しいISO文字列を検証できる', () => {
      expect(isIsoDateString('2023-05-15T01:30:45.000Z')).toBe(true);
      expect(isIsoDateString('2023-05-15T10:30:45+09:00')).toBe(true);
    });

    it('正しくないISO文字列を検出できる', () => {
      expect(isIsoDateString('2023-05-15')).toBe(false);
      expect(isIsoDateString('2023/05/15 10:30:45')).toBe(false);
      expect(isIsoDateString('')).toBe(false);
      expect(isIsoDateString(undefined as unknown as string)).toBe(false);
    });
  });

  describe('実際のユースケース', () => {
    it('フォーム入力 → APIリクエスト → DB保存 → API返却 → 表示のフロー', () => {
      // テスト環境の設定に注意：process.env.TZ = 'UTC'のため
      // new Date()はローカル時間をUTCとして解釈します
      
      // フォーム入力 (JST)
      // テスト環境ではUTCとして扱われるため、Date.UTCで明示的に作成
      const userInputDate = new Date(Date.UTC(2023, 4, 15, 1, 30, 0)); // UTC+0 = JST-9
      
      // APIリクエストのためにUTC ISO文字列に変換
      const apiRequestDate = toUtcIsoString(userInputDate);
      expect(apiRequestDate).toMatch(/^2023-05-15T01:30:00.\d{3}Z$/);
      
      // DB保存（UTCのまま）
      const dbStoredDate = apiRequestDate;
      
      // APIレスポンスとしてクライアントに返却（UTCのまま）
      const apiResponseDate = dbStoredDate;
      
      // クライアント側で表示用にJSTに変換
      const displayDate = utcIsoToJstIso(apiResponseDate);
      expect(displayDate).toEqual('2023-05-15T10:30:00+09:00');
      
      // 元のUTC時間とJST表示時間の関係を確認（JSTはUTC+9時間）
      const originalUtcHours = userInputDate.getUTCHours(); // 1時間
      const originalUtcMinutes = userInputDate.getUTCMinutes(); // 30分
      
      // displayDateのUTC時刻がJST 10:30を正しく表す（= UTC 1:30）
      const displayDateObj = new Date(displayDate);
      const displayHours = displayDateObj.getHours();
      const displayMinutes = displayDateObj.getMinutes();
      
      // UTC 1:30 → JST 10:30 の変換を確認
      expect(displayHours).toEqual(1); // JST 10:30 → UTC 1:30
      expect(displayMinutes).toEqual(30);
    });
  });
});
