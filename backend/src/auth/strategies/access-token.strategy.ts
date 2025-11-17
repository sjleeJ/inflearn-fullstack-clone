import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
    sub: string;
    email?: string;
    name?: string;
    picture?: null;
    iat?: number;
  };

@Injectable() 
export class AccessTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-access-token'
){
    constructor() {
        super({
            // header bearer 이거 고정해줌
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          //만료된 토큰 무시할건지
          ignoreExpiration: false,
          secretOrKey: process.env.AUTH_SECRET!,
        });
    }

    async validate(payload: JwtPayload) {
        return payload;
    }
}