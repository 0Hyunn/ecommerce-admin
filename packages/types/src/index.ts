// 공유 TypeScript 타입 정의
// API 응답 타입, 엔티티 타입 등을 프론트엔드와 백엔드에서 공유합니다.

// 예시: 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

// 예시: API 응답 래퍼
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 예시: 페이지네이션
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
