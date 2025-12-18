"use client";


import Link from "next/link";
import Image from "next/image";
import {
  Search,
  LayoutGrid,
  User,
  Play,
  Layers
} from "lucide-react";
import { CourseCategory } from "@/generated/openapi-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";



export default function SiteHeader({ categories }: { categories?: CourseCategory[] }) {
  const navLinks = [
    { label: "강의", href: "/courses" },
    { label: "로드맵", href: "/roadmaps" },
    { label: "멘토링", href: "/mentoring" },
    { label: "커뮤니티", href: "/community" },
  ];

  const pathname = usePathname();
  const isSiteHeaderNeeded = !pathname.includes("/course/");
  const isCategoryNeeded = pathname == "/" || pathname.includes("/courses");

  if (!isSiteHeaderNeeded) return null;
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {/* 왼쪽: 로고 + 네비게이션 */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <Image
                src="/images/inflearn_logo.svg"
                alt="inflearn"
                width={120}
                height={32}
                className="h-8 w-28 sm:h-9"
              />
            </Link>
            <nav
              aria-label="주요 탐색"
              className="hidden items-center gap-6 text-sm font-medium text-foreground lg:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap transition-colors hover:text-emerald-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 중앙: 검색창 */}
          <div className="order-3 w-full flex-1 lg:order-0 lg:max-w-2xl">
            <div className="relative">
              <Input
                type="search"
                placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
                className="w-full rounded-full pr-10 pl-4"
              />
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* 오른쪽: 아이콘들 */}
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-muted bg-muted/50 hover:bg-muted lg:flex"
            >
              <Link href="/instructor">지식공유자</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden text-muted-foreground hover:text-foreground lg:flex"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

        {isCategoryNeeded && (
          <nav className="category-nav flex gap-6 py-4 overflow-x-auto scrollbar-none">
            {categories?.map((category) => (
              <Link key={category.id} href={`/courses/${category.slug}`}>
                <div className="category-item flex flex-col items-center min-w-[72px] text-gray-700 hover:text-[#1dc078] cursor-pointer transition-colors">
                  <Layers size={28} className="mb-1" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        )}

    </header>
  );
}