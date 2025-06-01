import { useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface UseFormSubmitOptions<TData, TResponse> {
  onSubmit: (data: TData) => Promise<TResponse>;
  onSuccess?: (response: TResponse) => void;
  onError?: (error: unknown) => void;
}

/**
 * フォーム送信ロジックを抽象化するカスタムフック
 * 送信状態、ローディング状態、エラー状態を管理する
 */
export function useFormSubmit<TData, TResponse>({
  onSubmit,
  onSuccess,
  onError,
}: UseFormSubmitOptions<TData, TResponse>) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<TResponse | null>(null);

  /**
   * フォーム送信処理
   */
  const submitForm = async (data: TData) => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const result = await onSubmit(data);
      setResponse(result);
      setStatus("success");
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err: unknown) {
      setStatus("error");
      
      let message = "エラーが発生しました";
      if (err instanceof Error) {
        message = err.message || "送信に失敗しました";
      }
      
      setErrorMessage(message);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    }
  };

  /**
   * フォームをリセットしてidle状態に戻す
   */
  const resetForm = () => {
    setStatus("idle");
    setErrorMessage(null);
    setResponse(null);
  };

  return {
    submitForm,
    resetForm,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
    errorMessage,
    response,
    status,
  };
}
