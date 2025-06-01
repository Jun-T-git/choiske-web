import { useFormSubmit } from "@/lib/hooks/useFormSubmit";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from 'vitest';

describe("useFormSubmit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常にフォームが送信される", async () => {
    // モックの準備
    const mockOnSubmit = vi.fn().mockResolvedValue({ id: "123" });
    const mockOnSuccess = vi.fn();

    // フックをレンダリング
    const { result } = renderHook(() =>
      useFormSubmit({
        onSubmit: mockOnSubmit,
        onSuccess: mockOnSuccess,
      })
    );

    // フォーム送信前の初期状態を確認
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.errorMessage).toBeNull();

    // フォーム送信実行
    await act(async () => {
      await result.current.submitForm({ name: "テスト太郎" });
    });

    // 送信後の状態を確認
    expect(mockOnSubmit).toBeCalledWith({ name: "テスト太郎" });
    expect(mockOnSuccess).toBeCalledWith({ id: "123" });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.response).toEqual({ id: "123" });
  });

  it("送信エラー時の処理", async () => {
    // エラーを投げるモック
    const error = new Error("送信に失敗しました");
    const mockOnSubmit = vi.fn().mockRejectedValue(error);
    const mockOnError = vi.fn();

    // フックをレンダリング
    const { result } = renderHook(() =>
      useFormSubmit({
        onSubmit: mockOnSubmit,
        onError: mockOnError,
      })
    );

    // エラーが発生する送信処理
    await act(async () => {
      try {
        await result.current.submitForm({ name: "テスト太郎" });
      } catch (e) {
        // エラーをキャッチするだけ
      }
    });

    // エラー状態の確認
    expect(mockOnSubmit).toBeCalledWith({ name: "テスト太郎" });
    expect(mockOnError).toBeCalledWith(error);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe("送信に失敗しました");
  });

  it("リセット機能が正常に動作する", async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ id: "123" });

    // フックをレンダリング
    const { result } = renderHook(() =>
      useFormSubmit({
        onSubmit: mockOnSubmit,
      })
    );

    // 送信してから
    await act(async () => {
      await result.current.submitForm({ name: "テスト太郎" });
    });

    expect(result.current.isSuccess).toBe(true);

    // リセット
    act(() => {
      result.current.resetForm();
    });

    // リセット後の状態確認
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.response).toBeNull();
  });
});
