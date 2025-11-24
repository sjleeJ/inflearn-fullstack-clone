import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


/**
 * NestJS 구조:기본 패턴:
    1. Service (@Injectable) - 실제 비즈니스 로직
    2. Module (@Module) - Service를 등록하고 관리
    3. 다른 곳에서 Service 주입받아 사용
 */
@Global() // 이 모듈은 전역적으로 사용 가능하다, import없이 사용 가능
@Module({
    providers: [PrismaService],  // ← "PrismaService 인스턴스 생성해줘"
    exports: [PrismaService],    // ← "다른 모듈에서 쓸 수 있게 공개해줘"
})
export class PrismaModule {}
