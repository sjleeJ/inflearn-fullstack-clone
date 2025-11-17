"use client";

import { useApi } from "../../hooks/userApi";
import { useQuery } from "@tanstack/react-query";

export default function ClientTest() {
  const api = useApi();

  const { data, error, isLoading } = useQuery({
    //queryKey는 React Query가 캐시를 관리하기 위한 고유 식별자! 내 마음대로 지정할 수 있다.
    queryKey: ["user-test"],
    // 즉시실행함수를 쓰지 않고 그냥 api.getUserTest()만 호출시 에러가 날 수 있다.
    // 왜냐면 queryFn 실행시점에 언제 어떤 인자를 넘겨주는지 정확히 모름(런타임시점에)
    queryFn: () => api.getUserTest(),
  });

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }

  return (
    <div className="p-8">
      <h2>클라이언트 컴포넌트 API 테스트 결과</h2>
      <pre>{data}</pre>
    </div>
  );
}