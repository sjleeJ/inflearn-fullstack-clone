// openapi-runtime.ts란?
// 실제로 api를 호출하는 함수를 호출할 것이다.
// 실제로 우리가 fetch를 할 때 쿠키를 넣어서 보낸다거나 하는 일을 관리를 해야한다. 
// 이 때 openapi-runtime.ts라는 것을 만들어서 실제 api호출전에 이 파일을 호출하고 나서 실제로 호출한다.


import { CreateClientConfig } from "@/generated/openapi-client/client";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

const API_URL = process.env.API_URL || "http://localhost:8000";

//문서에 나온 부분 createClientConfig는 꼭 이름 그대로 만들어야한다.
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_URL,
  async auth() {
    return getCookie(AUTH_COOKIE_NAME, { cookies });
  },
});