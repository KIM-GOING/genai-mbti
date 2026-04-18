export type Axis = 'EI' | 'SN' | 'TF' | 'JP';
export type Direction = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  direction: Direction;
}

export const questions: Question[] = [
  // E/I 축 (에너지 방향)
  {
    id: 1,
    text: '새로운 사람들과 대화하거나 의견을 주고받을 때 오히려 에너지가 생기는 편이다.',
    axis: 'EI',
    direction: 'E',
  },
  {
    id: 2,
    text: '혼자 생각을 정리하는 시간보다, 누군가와 이야기하면서 방향을 잡는 게 더 편하다.',
    axis: 'EI',
    direction: 'E',
  },
  {
    id: 3,
    text: '무언가를 시작할 때 일단 사람들과 부딪혀보며 감을 잡는 편이다.',
    axis: 'EI',
    direction: 'E',
  },
  {
    id: 4,
    text: '아이디어가 떠오르면 머릿속에 오래 두기보다 바로 밖으로 꺼내 말해보는 편이다.',
    axis: 'EI',
    direction: 'E',
  },
  {
    id: 5,
    text: '중요한 결정을 앞두면 혼자 깊게 생각하기보다 여러 사람의 반응을 보며 정리하는 편이다.',
    axis: 'EI',
    direction: 'E',
  },

  // S/N 축 (정보 인식 방식)
  {
    id: 6,
    text: '새로운 정보를 볼 때 큰 가능성이나 의미보다 구체적인 사실부터 확인하는 편이다.',
    axis: 'SN',
    direction: 'S',
  },
  {
    id: 7,
    text: '설명을 들을 때 추상적인 방향성보다 실제 예시가 있어야 이해가 잘 된다.',
    axis: 'SN',
    direction: 'S',
  },
  {
    id: 8,
    text: '아이디어를 평가할 때 "재밌는 발상인가?"보다 "현실적으로 가능한가?"를 더 먼저 본다.',
    axis: 'SN',
    direction: 'S',
  },
  {
    id: 9,
    text: '지금 있는 정보만으로 판단하기보다, 앞으로 어떻게 확장될지를 상상하는 편이다.',
    axis: 'SN',
    direction: 'N',
  },
  {
    id: 10,
    text: '세부사항을 꼼꼼히 보는 것보다 전체 흐름과 맥락을 먼저 파악하는 편이다.',
    axis: 'SN',
    direction: 'N',
  },

  // T/F 축 (의사결정 기준)
  {
    id: 11,
    text: '결정을 내릴 때 사람의 기분보다 기준과 논리가 더 중요하다고 생각한다.',
    axis: 'TF',
    direction: 'T',
  },
  {
    id: 12,
    text: '누군가의 의견을 들을 때 그 말이 맞는지보다, 왜 그렇게 느꼈는지도 함께 보게 된다.',
    axis: 'TF',
    direction: 'F',
  },
  {
    id: 13,
    text: '문제를 해결할 때 공정하고 객관적인 기준을 유지하는 것이 가장 중요하다고 생각한다.',
    axis: 'TF',
    direction: 'T',
  },
  {
    id: 14,
    text: '같은 결과라면 더 효율적인 선택보다, 더 배려 있는 선택이 마음에 남는 편이다.',
    axis: 'TF',
    direction: 'F',
  },
  {
    id: 15,
    text: '누군가와 갈등이 생겼을 때 누가 맞는지 판단하는 것보다 관계가 상하지 않게 푸는 것이 더 중요하다.',
    axis: 'TF',
    direction: 'F',
  },

  // J/P 축 (생활 및 실행 방식)
  {
    id: 16,
    text: '해야 할 일이 생기면 대략적인 방향이라도 먼저 계획을 세워두는 편이다.',
    axis: 'JP',
    direction: 'J',
  },
  {
    id: 17,
    text: '일정이나 계획이 갑자기 바뀌면 생각보다 스트레스를 많이 받는 편이다.',
    axis: 'JP',
    direction: 'J',
  },
  {
    id: 18,
    text: '완전히 준비되지 않았더라도 일단 시작하면서 조정해나가는 방식이 더 잘 맞는다.',
    axis: 'JP',
    direction: 'P',
  },
  {
    id: 19,
    text: '마감이 멀리 있어도 미리 해두는 편이고, 마지막 순간까지 미루는 스타일은 아니다.',
    axis: 'JP',
    direction: 'J',
  },
  {
    id: 20,
    text: '선택지는 열어두는 것보다 빨리 결정하고 정리되는 상태가 더 편하다.',
    axis: 'JP',
    direction: 'J',
  },
];
