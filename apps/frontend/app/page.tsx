"use client";

import { useQuery } from "@tanstack/react-query";
import { useExampleStore } from "@/store/example-store";

/**
 * API 데이터를 가져오는 함수 (예시)
 */
async function fetchExampleData(): Promise<{ message: string; timestamp: string }> {
  // 실제 API 호출 대신 예시 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "데이터를 성공적으로 가져왔습니다!",
        timestamp: new Date().toLocaleString("ko-KR"),
      });
    }, 1000);
  });
}

/**
 * 메인 페이지 컴포넌트
 * TanStack Query, Zustand, Tailwind CSS 사용 예시
 */
export default function Home() {
  // TanStack Query 사용 예시
  const { data, isLoading, error } = useQuery({
    queryKey: ["example"],
    queryFn: fetchExampleData,
  });

  // Zustand 스토어 사용 예시
  const { count, name, increment, decrement, setName, reset } = useExampleStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 헤더 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Ecommerce Admin 테스트 페이지</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Next.js, TanStack Query, Zustand, Tailwind CSS 통합 테스트</p>
          </div>

          {/* TanStack Query 예시 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">TanStack Query 예시</h2>
            {isLoading && <div className="text-gray-600 dark:text-gray-400">데이터를 불러오는 중...</div>}
            {error && <div className="text-red-600 dark:text-red-400">오류가 발생했습니다</div>}
            {data && (
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">{data.message}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{data.timestamp}</p>
              </div>
            )}
          </div>

          {/* Zustand 예시 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Zustand 예시</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  카운트: <span className="text-blue-600 dark:text-blue-400">{count}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={decrement} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors font-medium">
                  감소
                </button>
                <button onClick={increment} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium">
                  증가
                </button>
                <button onClick={reset} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors font-medium">
                  리셋
                </button>
              </div>
            </div>
          </div>

          {/* Tailwind CSS 예시 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tailwind CSS 예시</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <p className="font-semibold text-blue-900 dark:text-blue-100">Primary</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">파란색 카드</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <p className="font-semibold text-green-900 dark:text-green-100">Success</p>
                <p className="text-sm text-green-700 dark:text-green-300">초록색 카드</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                <p className="font-semibold text-purple-900 dark:text-purple-100">Info</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">보라색 카드</p>
              </div>
            </div>
          </div>

          {/* 상태 표시 */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-200 font-medium">✅ 모든 의존성이 정상적으로 작동 중입니다!</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">Next.js 16.1.1 • React 19.2.3 • TanStack Query • Zustand • Tailwind CSS</p>
          </div>
        </div>
      </div>
    </main>
  );
}
