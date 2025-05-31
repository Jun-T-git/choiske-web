import { useCallback, useState } from "react";

interface UseClipboardOptions {
  /**
   * コピー成功時のメッセージを表示する時間（ミリ秒）
   * @default 1500
   */
  timeout?: number;
  /**
   * コピー成功時のコールバック関数
   */
  onCopy?: () => void;
  /**
   * コピー失敗時のコールバック関数
   */
  onError?: (error: unknown) => void;
}

/**
 * クリップボードにテキストをコピーするためのフック
 * CopyableTextやShareButtonsなどで使用する
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 1500, onCopy, onError } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * テキストをクリップボードにコピーする
   */
  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        
        if (onCopy) {
          onCopy();
        }
        
        // 一定時間後に状態をリセット
        setTimeout(() => {
          setCopied(false);
        }, timeout);
        
        return true;
      } catch (err) {
        console.error("クリップボードへのコピーに失敗しました", err);
        setError(err instanceof Error ? err : new Error("コピーに失敗しました"));
        setCopied(false);
        
        if (onError) {
          onError(err);
        }
        
        return false;
      }
    },
    [timeout, onCopy, onError]
  );

  return {
    copy,
    copied,
    error,
    isError: !!error,
  };
}
