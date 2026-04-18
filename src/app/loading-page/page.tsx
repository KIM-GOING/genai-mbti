'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const name = sessionStorage.getItem('userName');
    const result = sessionStorage.getItem('mbtiResult');

    if (!name || !result) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      router.push('/result');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[92vh] text-center">
      {/* 장식 */}
      <div className="relative">
        <div className="absolute -top-8 -left-8 w-4 h-4 bg-orange-300 rounded-full opacity-30 animate-float" />
        <div className="absolute -top-4 right-0 w-3 h-3 bg-amber-300 rounded-full opacity-25 animate-float-slow" />
        <div className="absolute bottom-0 -left-6 w-2.5 h-2.5 bg-pink-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />

        {/* 캐릭터 */}
        <div className="animate-float-slow mb-2">
          <div className="text-[7rem] leading-none">🔍</div>
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-800 mb-2 mt-6 leading-snug">
        당신과 닮은 AI를
        <br />
        찾고 있어요...
      </h2>

      <p className="text-base text-gray-400 mb-10">
        잠시만 기다려주세요!
      </p>

      {/* 로딩 도트 */}
      <div className="flex gap-3">
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
        <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}
