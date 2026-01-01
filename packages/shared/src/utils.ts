// 공유 유틸리티 함수 예시

/**
 * 날짜를 포맷팅하는 함수
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 숫자를 통화 형식으로 변환
 */
export function formatCurrency(amount: number, currency: string = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
  }).format(amount);
}

