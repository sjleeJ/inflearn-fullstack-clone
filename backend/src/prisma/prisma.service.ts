import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // 이 클래스는 의존성 주입이 가능한 서비스다
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); // ← 앱 시작할 때 DB 연결
  }
}