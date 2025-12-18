'use server'

import { cookies } from "next/headers"
import { getCookie } from "cookies-next/server"
import { appControllerTestUser, categoriesControllerFindAll, coursesControllerCreate, coursesControllerFindAll, coursesControllerFindOne, coursesControllerUpdate, UpdateCourseDto } from "@/generated/openapi-client";

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

const API_URL = process.env.API_URL || "http://localhost:8000";

// 모든 api호출은 여기서 정의할것
// openapi-client를 사용하여 이게 인제 호출 이렇게 안해도 됨
// async function fetchApi<T>(
//     endpoint: string,
//     options: RequestInit = {},
//     token?: string
//   ) {
//     const headers = {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//       } as Record<string, string>;

//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//     }

//     const config: RequestInit = {
//         ...options,
//         headers,
//         cache: "no-store", // nextjs는 기본적으로 캐싱을 함
//       };

//       //body가 json일때 string으로
//     if (options.body && typeof options.body !== "string") {
//         config.body = JSON.stringify(options.body);
//     }
//     const response = await fetch(`${API_URL}${endpoint}`, config);

//     if (!response.ok) {
//         throw new Error(`API 요청 실패: ${response.status}`);
//     }

//     // 즉 값이 비어있거나 json이 아닐경우
//     if (response.status === 204) {
//         return {} as T;
//     }

//     //Content-Type 체크 json이 아니면 모두 text로 통일
//     const contentType = response.headers.get("Content-Type");
//     if (contentType && contentType.includes("application/json")) {
//       return response.json() as Promise<T>;
//     } else {
//       return response.text() as Promise<T>;
//     }
// }
// 로그인은 한 번 하는데 왜 이 함수가 필요한가.
// getUserTest 함수가 필요한 이유는 Next.js의 Server/Client Components 환경 차이 
// 로그인은 한 번 하지만, 사용자 정보 조회는:

// 서버: 페이지 로딩, API 라우트, middleware 등
// 클라이언트: 버튼 클릭, 실시간 업데이트, 조건부 렌더링 등


// export async function getUserTest(token?: string) {
//     // 서버 컴포넌트에서 호출된 경우
//     if (!token && typeof window === "undefined") {
//         // getCookie는 이미 브라우저에서 서버로 전송된 쿠키를 읽는 거
//         // 브라우저에서 서버로 요청할 때 자동으로 포함됨
//         // GET /api/user-test
//         // Cookie: auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//       token = await getCookie(AUTH_COOKIE_NAME, { cookies });
//       //로그인하지 않은 사용자의 경우 여기서 null이 반환된다.
//     }
//   //실제 HTTP 요청은 fetchApi에서 처리
//     return fetchApi<string>("/user-test", {}, token);
//   }

export const getAllCategories = async () => {
  const { data, error } = await categoriesControllerFindAll();

  return {
    data,
    error,
  };
};

export const getAllInstructorCourses = async () => {
  const { data, error } = await coursesControllerFindAll();

  return {
    data,
    error,
  };
};


export const getCourseById = async (id: string) => {
  const { data, error } = await coursesControllerFindOne({
    path: {
      id,
    },
  });

  return {
    data,
    error,
  };
};

export const createCourse = async (title: string) => {
  const { data, error } = await coursesControllerCreate({
    body: {
      title,
    },
  });

  return {
    data,
    error,
  };
};

export const updateCourse = async (
  id: string,
  updateCourseDto: UpdateCourseDto
) => {
  const { data, error } = await coursesControllerUpdate({
    path: {
      id,
    },
    body: updateCourseDto,
  });

  return { data, error };
};