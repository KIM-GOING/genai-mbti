'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (!name.trim()) return;
    sessionStorage.setItem('userName', name.trim());
    router.push('/quiz');
  };

  return (
    <div className="flex flex-col min-h-[92vh]">
      {/* 상단 캐릭터 + 배경 영역 */}
      <div className="relative bg-gradient-to-b from-[#FFE0C2] via-[#FFD6B0] to-[#F5EDE3] rounded-b-[3rem] pt-10 pb-8 -mx-5 px-5 mb-8">
        {/* 장식 요소들 */}
        <div className="deco-stars" />
        <div className="absolute top-6 left-6 w-3 h-3 bg-yellow-300 rounded-full opacity-30 animate-float" />
        <div className="absolute top-16 right-8 w-2 h-2 bg-orange-300 rounded-full opacity-25 animate-float-slow" />
        <div className="absolute bottom-12 left-12 w-2.5 h-2.5 bg-pink-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />

        {/* 캐릭터 */}
        <div className="flex justify-center mb-6">
          <div className="animate-float-slow">
            <div className="text-[5.5rem] leading-none drop-shadow-lg">
              🤖
            </div>
          </div>
        </div>

        {/* 작은 AI 아이콘들 */}
        <div className="flex justify-center gap-3 mb-2">
          <span className="text-2xl animate-float" style={{ animationDelay: '0.2s' }}>💡</span>
          <span className="text-2xl animate-float" style={{ animationDelay: '0.6s' }}>🎨</span>
          <span className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🔍</span>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-[2.5rem] font-extrabold text-gray-800 leading-tight mb-3">
          나와 닮은
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
            AI
          </span>
          는?
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          20개 문항으로 알아보는
          <br />
          나의 AI 페르소나
        </p>
      </div>

      {/* 입력 + 버튼 (전체 너비) */}
      <div className="mt-auto space-y-3 mb-2">
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          className="w-full px-5 py-4 rounded-2xl border-2 border-orange-100 bg-white text-center text-lg font-medium focus:outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300 shadow-sm"
        />
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-extrabold text-lg hover:from-orange-500 hover:to-amber-600 active:scale-[0.97] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-orange-200/50"
        >
          시작하기
        </button>
      </div>

      {/* 하단 안내 */}
      <div className="flex justify-center items-center gap-3 py-4 text-sm text-gray-400">
        <span>약 3분 소요</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span>총 20문항</span>
      </div>
    </div>
  );
}
