import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: '나와 닮은 AI는? | AI MBTI 테스트',
  description:
    '20개 문항으로 알아보는 나와 닮은 AI! 당신의 성향과 가장 잘 맞는 AI를 찾아보세요.',
  openGraph: {
    title: '나와 닮은 AI는? | AI MBTI 테스트',
    description: '20개 문항으로 알아보는 나와 닮은 AI!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full font-[var(--font-noto)]">
        <div className="mx-auto w-full max-w-[480px] min-h-screen px-5 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
