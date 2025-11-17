import { Express } from 'express';

type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

// Express의 기존 User 인터페이스를 확장해서 우리가 정의한 JwtPayload 타입을 추가

/**
 *  declare global

전역 타입을 수정/확장할 때 사용
이미 존재하는 라이브러리의 타입을 우리가 원하는 대로 확장할 수 있음

. namespace Express

Express 라이브러리의 네임스페이스를 가리킴
Express 관련 타입들이 정의된 공간

interface User extends JwtPayload

Express.User 인터페이스를 확장
원래 User 타입에 우리가 정의한 JwtPayload의 속성들을 추가

=> Express 기본 Request 인터페이스에는 user 속성이 정의되어 있지 않음 passport.js에서 추가된것
=> 그럼 왜 추가하는가?
=> Passport의 타입 정의를 보면: Express.User는 원래 빈 인터페이스 확장이 필요하다.
 */
declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
