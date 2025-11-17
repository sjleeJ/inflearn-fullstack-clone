import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-util";
import * as jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일 입력",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
    },
    async authorize(credentials) {
      if (!credentials || !credentials.email || !credentials.password) {
        throw new Error("이메일과 비밀번호를 입력해주세요.");
      }
      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      });
      if (!user) {
        throw new Error("존재하지 않는 이메일입니다.");
      }
      const passwordMatch = comparePassword(
        credentials.password as string,
        user.hashedPassword as string
      );

      if (!passwordMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      return user;
    },
  }),
  ],
  session: {
    strategy: "jwt",
  },
  //이거 안하면 나중에 encoding decoding을 따로 지정안하면 next에서 사용하는걸 사용하기에 에러남
  jwt: {
		encode: async ({ token, secret }) => {
			return jwt.sign(token as jwt.JwtPayload, secret as string);
		},
		decode: async ({ token, secret }) => {
			return jwt.verify(token as string, secret as string) as 
			JWT;
		},
	},
  pages: {},
  callbacks: {},
})