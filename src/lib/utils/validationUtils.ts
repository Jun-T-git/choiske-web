/**
 * フォーム入力のバリデーションユーティリティ
 * 各フォームコンポーネントで使用する共通のバリデーションロジック
 */

/**
 * 文字列の長さを検証する
 * @param value 検証対象の文字列
 * @param options バリデーションオプション
 * @returns エラーメッセージ（エラーがなければnull）
 */
export function validateLength(
  value: string,
  options: { 
    minLength?: number; 
    maxLength?: number;
    required?: boolean;
    fieldName?: string;
  }
): string | null {
  const { minLength, maxLength, required = false, fieldName = "入力値" } = options;
  
  // 必須チェック
  if (required && (!value || value.trim() === "")) {
    return `${fieldName}は必須です`;
  }
  
  // 空文字列は以降のバリデーションをスキップ
  if (!value || value.trim() === "") {
    return null;
  }
  
  // 最小文字数チェック
  if (minLength !== undefined && value.length < minLength) {
    return `${fieldName}は${minLength}文字以上で入力してください`;
  }
  
  // 最大文字数チェック
  if (maxLength !== undefined && value.length > maxLength) {
    return `${fieldName}は${maxLength}文字以内で入力してください`;
  }
  
  return null;
}

/**
 * 時間フォーマット（HH:MM）を検証する
 * @param value 検証対象の時間文字列
 * @returns エラーメッセージ（エラーがなければnull）
 */
export function validateTimeFormat(value: string): string | null {
  if (!value) return null;
  
  // 正規表現でHH:MM形式をチェック
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(value)) {
    return "時間は HH:MM 形式で入力してください";
  }
  
  return null;
}

/**
 * 開始時間と終了時間の関係を検証する
 * @param startTime 開始時間
 * @param endTime 終了時間
 * @returns エラーメッセージ（エラーがなければnull）
 */
export function validateTimeRange(startTime: string, endTime: string): string | null {
  if (!startTime || !endTime) return null;
  
  // 時間を比較
  if (startTime >= endTime) {
    return "終了時間は開始時間より後にしてください";
  }
  
  return null;
}

/**
 * 選択された日付の数を検証する
 * @param dates 日付の配列
 * @param minCount 最小選択数
 * @returns エラーメッセージ（エラーがなければnull）
 */
export function validateSelectedDates(
  dates: Date[],
  minCount = 1
): string | null {
  if (dates.length < minCount) {
    return `少なくとも${minCount}つの日付を選択してください`;
  }
  
  return null;
}
