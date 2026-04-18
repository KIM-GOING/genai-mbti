'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { calculateMbti } from '@/lib/calculateMbti';

const answerOptions = [
  { label: '전혀 아니다', emoji: '😣', value: 1 },
  { label: '별로 아니다', emoji: '😕', value: 2 },
  { label: '보통이다', emoji: '😐', value: 3 },
  { label: '어느 정도 그렇다', emoji: '😊', value: 4 },
  { label: '매우 그렇다', emoji: '😆', value: 5 },
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = sessionStorage.getItem('userName');
    if (!name) {
      router.push('/');
      return;
    }
    setUserName(name);
  }, [router]);

  const handleAnswer = (value: number) => {
    if (isTransitioning) return;

    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      }, 350);
    } else {
      const result = calculateMbti(questions, newAnswers);
      sessionStorage.setItem('mbtiResult', JSON.stringify(result));
      router.push('/loading-page');
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const question = questions[currentIndex];

  if (!userName) return null;

  return (
    <div className="flex flex-col min-h-[92vh]">
      {/* 진행률 영역 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              {currentIndex + 1}
            </span>
            <span className="text-sm text-gray-400 font-medium">/ {questions.length}</span>
          </div>
          <span className="text-sm font-bold text-orange-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-orange-100/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 문항 영역 - 카드 없이 바로 텍스트 */}
      <div className="flex-1 flex flex-col">
        <div
          className={`flex-1 flex flex-col justify-center transition-all duration-350 ${
            isTransitioning
              ? 'opacity-0 translate-x-10'
              : 'opacity-100 translate-x-0'
          }`}
        >
          {/* 이모지 + 문항 */}
          <div className="mb-10">
            <div className="text-5xl mb-5">🤔</div>
            <p className="text-[1.3rem] font-bold leading-relaxed text-gray-800">
              {question.text}
            </p>
          </div>

          {/* 답변 버튼 */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                disabled={isTransitioning}
                className="w-full py-4 px-5 rounded-2xl bg-white/80 text-gray-700 font-semibold hover:bg-orange-50 hover:shadow-md active:scale-[0.97] transition-all disabled:opacity-50 flex items-center gap-4 shadow-sm backdrop-blur-sm"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-base">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
