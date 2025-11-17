// 왜 api.ts는 use server고 userApi는 use client일까
/**
 * 이 두 파일을 나누는 기준
 * 실제로 next에서 fetch호출해서 외부 접근하니까 use server고 
use client는 돔에서만 동작하니까 use client

// use server = 서버 환경
// - Node.js에서 실행
// - 외부 API 호출 가능
// - 데이터베이스 직접 접근
// - 브라우저 API 없음 (window, document 등)

// use client = 브라우저 환경  
// - 브라우저에서 실행
// - DOM 조작 가능
// - useState, useEffect 사용 가능
// - 브라우저 API 사용 가능 (localStorage, Cookie 등)
 */

"use client";

import { getCookie } from "cookies-next/client";
import * as api from "@/lib/api";


const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export function useApi() {
  // 클라이언트에서 쿠키 가져오기 
  const token = getCookie(AUTH_COOKIE_NAME) as string;

  // api에 써진 함수 그대로 씀.
  return {
    getUserTest: () => api.getUserTest(token),
  };
}