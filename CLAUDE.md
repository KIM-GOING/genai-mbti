# AI MBTI 테스트

20개 문항으로 MBTI를 계산한 뒤, 16개 AI 캐릭터 중 하나를 결과로 보여주는 모바일 중심 웹앱.

- 배포: https://genai-mbti.vercel.app
- GitHub: https://github.com/KIM-GOING/genai-mbti

## 기술 스택

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Vercel 배포
- DB 없음 — 클라이언트 사이드에서 모든 로직 처리 (sessionStorage)

## 명령어

- `npm run dev` — 로컬 개발 서버 (http://localhost:3000)
- `npm run build` — 프로덕션 빌드
- `npx vercel --yes --name genai-mbti` — Vercel 배포

## 화면 흐름

시작(이름 입력) → 퀴즈(20문항) → 로딩(3초) → 결과

## 파일 구조

```
src/data/questions.ts      — 20개 문항 데이터 (텍스트, 축 EI/SN/TF/JP, 방향)
src/data/aiProfiles.ts     — 16개 AI 프로필 (이름, MBTI, 설명, 색상, 이미지 id 등)
src/lib/calculateMbti.ts   — MBTI 점수 계산 (축별 점수 누적 → 퍼센트 → 4글자 결정)

src/app/page.tsx            — 시작 화면 (이름 입력)
src/app/quiz/page.tsx       — 문항 화면 (한 문항씩, 5점 척도)
src/app/loading-page/page.tsx — 로딩 화면 (3초 후 결과로 이동)
src/app/result/page.tsx     — 결과 화면 (캐릭터 이미지 + 설명 + 퍼센티지 바)
src/app/layout.tsx          — 공통 레이아웃 (모바일 max-w-480px 중앙)
src/app/globals.css         — 글로벌 스타일, 애니메이션

public/images/*.png         — 16개 AI 캐릭터 일러스트 (500x500, 투명 배경)
```

## MBTI ↔ AI 매핑

| MBTI | AI | 캐릭터 키워드 |
|------|-----|-------------|
| INTJ | Antigravity | 전략가, 시스템 설계 |
| INTP | DeepSeek | 탐구형, 깊은 분석 |
| ENTJ | Codex | 실행 지휘관, 추진력 |
| ENTP | Grok | 아이디어 도발자, 순발력 |
| INFJ | Claude | 신중한 조언자, 통찰 |
| INFP | Suno AI | 감성 창작가, 표현력 |
| ENFJ | ChatGPT | 만능 가이드, 소통 |
| ENFP | Gemini | 자유로운 연결자, 호기심 |
| ISTJ | Microsoft Copilot | 실무형, 정확성 |
| ISFJ | NotebookLM | 지원자, 정리 능력 |
| ESTJ | Openclaw | 현실 실행가, 관리 |
| ESFJ | Canva AI | 친화형, 대중적 제작 |
| ISTP | Firefly | 문제해결사, 도구 활용 |
| ISFP | Midjourney | 예술가, 미적 감각 |
| ESTP | Perplexity | 탐색가, 빠른 판단 |
| ESFP | Genspark | 다재다능 표현가 |

## 계산 로직 요약

1. 각 문항은 4개 축(EI, SN, TF, JP) 중 하나에 연결됨
2. 5점 척도 응답을 점수로 변환 (매우 아니다 -2 ~ 매우 그렇다 +2)
3. 축별 점수 누적 후 높은 쪽 글자 선택 → MBTI 4글자 결정
4. MBTI를 위 매핑 테이블로 AI에 연결

## 디자인 톤

- 따뜻한 베이지/크림 배경
- 오렌지/코랄 포인트 컬러
- 캐릭터 중심의 꽉 찬 UI (박스 나열 X)
- 각 AI 결과 페이지의 테마 색상은 캐릭터 일러스트 색감에 맞춤

## 주의사항

- 사용자(하빈님)는 비개발자 — 기술 용어를 쉽게 풀어서 설명할 것
- 이 프로젝트는 바이브코딩 툴 4개(Antigravity, Claude Code, Codex, Google AI Studio) 비교 평가를 위한 테스트 프로덕트
