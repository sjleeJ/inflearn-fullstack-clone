/**
 * @hey-api/openapi-ts는 OpenAPI 스키마(Swagger)를 TypeScript 타입과 클라이언트 코드로 자동 생성해주는 도구
 * 
 * 주요 기능
1. 타입 자동 생성:
typescript// OpenAPI 스키마에서 자동 생성됨
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}
2. API 클라이언트 자동 생성:
typescript// 자동 생성된 클라이언트 함수들
import { getUserById, createUser, updateUser } from './generated/client';

// 타입 안전한 API 호출
const user = await getUserById({ id: 123 }); // User 타입 반환
const newUser = await createUser({ 
  requestBody: { name: 'John', email: 'john@example.com' }
});
 */
import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/docs-json", //실제 백엔드 주소
  output: "generated/openapi-client", // 어느 폴더에 코드를 generated할것인지
  plugins: [
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "./config/openapi-runtime.ts",
    },
  ],
});