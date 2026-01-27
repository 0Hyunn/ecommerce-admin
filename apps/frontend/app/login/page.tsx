"use client";

import { useState } from "react";
import type { ZodIssue } from "zod";
import { z } from "zod";
import Link from "next/link";

// 로그인 폼 검증 스키마
// - 클라이언트에서 1차 검증을 수행해 불필요한 서버 요청을 줄임
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다.").max(64, "비밀번호는 최대 64자까지 가능합니다."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  // 입력 값 변경 핸들러
  const handleChange =
    (field: keyof LoginFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFormValues((previousFormValues: LoginFormValues) => ({
        ...previousFormValues,
        [field]: event.target.value,
      }));

      // 사용자가 입력을 수정할 때, 해당 필드의 에러 메시지를 즉시 제거
      setFormErrors((previousFormErrors: Partial<Record<keyof LoginFormValues, string>>) => ({
        ...previousFormErrors,
        [field]: undefined,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitErrorMessage(null);

    // 1차: Zod로 전체 폼 검증
    const parsed = loginSchema.safeParse(formValues);

    if (!parsed.success) {
      // 에러를 필드별 메시지로 매핑
      const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {};

      for (const issue of parsed.error.issues as ZodIssue[]) {
        const path = issue.path[0];

        // path 가 존재하지 않는 경우를 방어적으로 처리
        if (typeof path === "string") {
          // 이미 에러 메시지가 존재하면 덮어쓰지 않고 최초 에러만 유지
          if (!fieldErrors[path as keyof LoginFormValues]) {
            fieldErrors[path as keyof LoginFormValues] = issue.message;
          }
        }
      }

      setFormErrors(fieldErrors);
      return;
    }

    // 2차: 서버 요청을 보내는 동안 중복 요청 방지
    setIsSubmitting(true);

    try {
      // TODO: 실제 로그인 API 연동 시 이 부분을 백엔드 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("로그인 요청:", parsed.data);
    } catch (error) {
      // 예상치 못한 오류에 대한 안전한 처리
      setSubmitErrorMessage("로그인 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasEmailError = Boolean(formErrors.email);
  const hasPasswordError = Boolean(formErrors.password);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">로그인</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">zod 활용 폼 검증 기능 구현 완료, 스타일은 수정 필요</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
              이메일
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange("email")}
              className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 dark:text-slate-50 ${
                hasEmailError
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/40 dark:border-rose-500"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/40 dark:border-slate-700 dark:focus:border-slate-200"
              } bg-white/90 dark:bg-slate-900/80`}
              placeholder="admin@example.com"
            />
            {hasEmailError && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{formErrors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleChange("password")}
              className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 dark:text-slate-50 ${
                hasPasswordError
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/40 dark:border-rose-500"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/40 dark:border-slate-700 dark:focus:border-slate-200"
              } bg-white/90 dark:bg-slate-900/80`}
              placeholder="비밀번호를 입력하세요"
            />
            {hasPasswordError && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{formErrors.password}</p>}
          </div>

          {submitErrorMessage && (
            <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
              {submitErrorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-50 shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700/60 disabled:text-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <span>테스트 페이지 · 실제 인증 연동 전</span>
          <Link href="/" className="font-medium text-slate-900 underline-offset-2 hover:underline dark:text-slate-200">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
