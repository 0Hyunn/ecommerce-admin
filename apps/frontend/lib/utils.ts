import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * className을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 결합하여 Tailwind CSS 클래스를 안전하게 병합
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
