import { Question } from '@/data/questions';

export interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface MbtiResult {
  mbti: string;
  scores: Scores;
  percentages: {
    EI: [number, number];
    SN: [number, number];
    TF: [number, number];
    JP: [number, number];
  };
}

const opposites: Record<string, string> = {
  E: 'I',
  I: 'E',
  S: 'N',
  N: 'S',
  T: 'F',
  F: 'T',
  J: 'P',
  P: 'J',
};

export function calculateMbti(
  questions: Question[],
  answers: number[]
): MbtiResult {
  const scores: Scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  questions.forEach((q, index) => {
    const answer = answers[index];
    // answer: 1~5 (매우 아니다 ~ 매우 그렇다)
    const value = answer - 3; // -2, -1, 0, 1, 2

    const dir = q.direction as keyof Scores;
    const opp = opposites[dir] as keyof Scores;

    if (value > 0) {
      scores[dir] += value;
    } else if (value < 0) {
      scores[opp] += Math.abs(value);
    }
  });

  const getPercent = (a: number, b: number): [number, number] => {
    const total = a + b;
    if (total === 0) return [50, 50];
    return [Math.round((a / total) * 100), Math.round((b / total) * 100)];
  };

  const mbti =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.N >= scores.S ? 'N' : 'S') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return {
    mbti,
    scores,
    percentages: {
      EI: getPercent(scores.E, scores.I),
      SN: getPercent(scores.S, scores.N),
      TF: getPercent(scores.T, scores.F),
      JP: getPercent(scores.J, scores.P),
    },
  };
}
