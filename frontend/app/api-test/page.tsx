import * as api from "@/lib/api";
import ClientTest from "./client-test";

//export default 로 해줘야 next에서 자동으로 컴포넌트로 인식
export default async function ApiTestPage() {
    const apiResult = await api.getUserTest();
  
    return (
      <div className="p-8">
        <h1>백엔드 API 테스트</h1>
        <h2>서버 컴포넌트 API 테스트 결과</h2>
        <pre>{apiResult}</pre>
        <ClientTest />
      </div>
    );
  }