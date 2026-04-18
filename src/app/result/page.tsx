'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { aiProfiles } from '@/data/aiProfiles';
import type { MbtiResult } from '@/lib/calculateMbti';

function PercentageBar({
  leftLabel,
  rightLabel,
  leftPercent,
  rightPercent,
  color,
}: {
  leftLabel: string;
  rightLabel: string;
  leftPercent: number;
  rightPercent: number;
  color: string;
}) {
  const isLeftDominant = leftPercent >= rightPercent;
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span className={isLeftDominant ? 'text-gray-800' : 'text-gray-400'}>
          {leftLabel} {leftPercent}%
        </span>
        <span className={!isLeftDominant ? 'text-gray-800' : 'text-gray-400'}>
          {rightPercent}% {rightLabel}
        </span>
      </div>
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="h-full rounded-l-full transition-all duration-1000"
          style={{
            width: `${leftPercent}%`,
            backgroundColor: isLeftDominant ? color : '#e5e7eb',
          }}
        />
        <div
          className="h-full rounded-r-full transition-all duration-1000"
          style={{
            width: `${rightPercent}%`,
            backgroundColor: !isLeftDominant ? color : '#e5e7eb',
          }}
        />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<MbtiResult | null>(null);
  const [userName, setUserName] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = sessionStorage.getItem('userName');
    const resultData = sessionStorage.getItem('mbtiResult');

    if (!name || !resultData) {
      router.push('/');
      return;
    }

    setUserName(name);
    setResult(JSON.parse(resultData));
  }, [router]);

  if (!result || !userName) return null;

  const profile = aiProfiles[result.mbti];

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">결과를 불러올 수 없습니다.</p>
        <button onClick={() => router.push('/')} className="mt-4 text-orange-500 font-bold text-lg underline">
          다시 테스트하기
        </button>
      </div>
    );
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = window.location.origin;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetry = () => {
    sessionStorage.removeItem('mbtiResult');
    router.push('/');
  };

  return (
    <div className="pb-10 -mx-5">
      {/* 상단 결과 헤더 - 배경 블록 */}
      <div
        className="relative px-5 pt-10 pb-8 rounded-b-[3rem] mb-6 animate-scale-in"
        style={{
          background: `linear-gradient(180deg, ${profile.color}20 0%, ${profile.color}08 100%)`,
        }}
      >
        {/* 장식 */}
        <div className="absolute top-6 left-6 w-3 h-3 rounded-full opacity-30 animate-float" style={{ backgroundColor: profile.color }} />
        <div className="absolute top-14 right-8 w-2 h-2 rounded-full opacity-20 animate-float-slow" style={{ backgroundColor: profile.color }} />

        <div className="text-center">
          {/* 캐릭터 이미지 */}
          <div className="animate-float-slow mb-4">
            <div className="w-72 h-72 mx-auto relative">
              <Image
                src={`/images/${profile.id}.png`}
                alt={profile.name}
                width={500}
                height={500}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* MBTI 태그 */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4"
            style={{ backgroundColor: profile.color }}
          >
            {result.mbti}
          </span>

          {/* 이름 + AI */}
          <h1 className="text-xl font-bold text-gray-700 mb-1">
            {userName}님은
          </h1>
          <p className="text-3xl font-extrabold mb-1" style={{ color: profile.color }}>
            {profile.name}
          </p>
          <p className="text-xl font-bold text-gray-700 mb-4">
            같은 사람입니다
          </p>

          {/* 한줄 요약 */}
          <p className="text-base text-gray-500 leading-relaxed px-2">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* 성향 분석 */}
      <div className="px-5 mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          📊 성향 분석
        </h2>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6">
          <PercentageBar
            leftLabel="외향 (E)"
            rightLabel="내향 (I)"
            leftPercent={result.percentages.EI[0]}
            rightPercent={result.percentages.EI[1]}
            color={profile.color}
          />
          <PercentageBar
            leftLabel="감각 (S)"
            rightLabel="직관 (N)"
            leftPercent={result.percentages.SN[0]}
            rightPercent={result.percentages.SN[1]}
            color={profile.color}
          />
          <PercentageBar
            leftLabel="사고 (T)"
            rightLabel="감정 (F)"
            leftPercent={result.percentages.TF[0]}
            rightPercent={result.percentages.TF[1]}
            color={profile.color}
          />
          <PercentageBar
            leftLabel="판단 (J)"
            rightLabel="인식 (P)"
            leftPercent={result.percentages.JP[0]}
            rightPercent={result.percentages.JP[1]}
            color={profile.color}
          />
        </div>
      </div>

      {/* 이런 사람이에요 */}
      <div className="px-5 mb-6 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          💬 이런 사람이에요
        </h2>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6">
          <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium">
            {profile.summary}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {profile.description}
          </p>
        </div>
      </div>

      {/* 이런 것이 어울려요 */}
      <div className="px-5 mb-6 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
        <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          ✨ 이런 것이 어울려요
        </h2>
        <div className="space-y-3">
          {profile.strengths.map((s, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3"
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: profile.color }}
              >
                {i + 1}
              </span>
              <span className="text-base text-gray-700 leading-relaxed">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI 활용 조언 */}
      <div className="px-5 mb-8 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
        <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          💡 AI 활용 조언
        </h2>
        <div className="space-y-3">
          {profile.aiTips.map((tip, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-base leading-relaxed"
              style={{
                backgroundColor: `${profile.color}10`,
                color: '#4a4a4a',
              }}
            >
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="px-5 space-y-3 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
        <button
          onClick={handleCopyLink}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-extrabold text-lg active:scale-[0.97] transition-all shadow-lg shadow-orange-200/50"
        >
          {copied ? '링크가 복사되었어요!' : '테스트 공유하기 🔗'}
        </button>
        <button
          onClick={handleRetry}
          className="w-full py-4 rounded-2xl bg-white/80 text-gray-600 font-bold text-lg active:scale-[0.97] transition-all shadow-sm"
        >
          다시 테스트하기 🔄
        </button>
      </div>
    </div>
  );
}
