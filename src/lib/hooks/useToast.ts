import { useCallback, useEffect, useState } from "react";

interface UseToastOptions {
  /**
   * トースト表示時間（ミリ秒）
   * @default 3000
   */
  duration?: number;
  /**
   * 自動的に消えるかどうか
   * @default true
   */
  autoClose?: boolean;
  /**
   * トースト表示時のコールバック関数
   */
  onShow?: () => void;
  /**
   * トースト非表示時のコールバック関数
   */
  onHide?: () => void;
}

/**
 * トースト通知を管理するためのフック
 * 複数のコンポーネントで通知を表示する際に使用する
 */
export function useToast(options: UseToastOptions = {}) {
  const { 
    duration = 3000, 
    autoClose = true,
    onShow,
    onHide
  } = options;
  
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<"success" | "error" | "info" | "warning">("info");

  const hideToast = useCallback(() => {
    setVisible(false);
    
    if (onHide) {
      onHide();
    }
  }, [onHide]);

  /**
   * トーストを表示する
   */
  const showToast = useCallback(
    (
      newMessage: string,
      newType: "success" | "error" | "info" | "warning" = "info"
    ) => {
      setMessage(newMessage);
      setType(newType);
      setVisible(true);
      
      if (onShow) {
        onShow();
      }
      
      // 自動的に閉じる場合
      if (autoClose) {
        setTimeout(() => {
          hideToast();
        }, duration);
      }
    },
    [autoClose, duration, onShow, hideToast]
  );

  // コンポーネントがアンマウントされたときにタイマーをクリアするため、
  // visibleが変わったときにeffectを実行
  useEffect(() => {
    return () => {
      // クリーンアップ関数（コンポーネントがアンマウントされたとき実行される）
    };
  }, [visible]);

  return {
    showToast,
    hideToast,
    message,
    visible,
    type,
  };
}
