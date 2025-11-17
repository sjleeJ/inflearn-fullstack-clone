"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        signIn("credentials", {
          email,
          password,
          redirectTo: "/",
        });
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen  gap-4">
            <h1 className="text-3xl font-bold">로그인</h1>
            <p className=" text-gray-700">계정 로그인</p>
            <form onSubmit={handleSubmit}className="flex flex-col gap-2  min-w-[300px]">
            <label htmlFor="email">이메일</label>
                <input type="email" 
                placeholder="이메일을 입력해주세요" 
                className="border-2 border-gray-300 rounded-sm p-2"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">비밀번호</label>
                <input 
                type="password" 
                placeholder="비밀번호를 입력해주세요" 
                className="border-2 border-gray-300 rounded-sm p-2"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
                <button 
                type="submit"
                className="bg-green-500 text-white font-bold cursor-pointer rounded-sm p-2"
                >로그인</button>
                <Link href="/signup"  className="text-center">회원가입</Link>
            </form>
        </div>
    )

}