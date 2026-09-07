import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '陈炎志 · 好奇心实验室',
  description:
    '把好奇心，做成真的。陈炎志的七个 AI 项目：智能投研、模型共享、面试辅助、阅读摘要、志愿规划、带有 Laika 机器人的微信多人小游戏，以及 science-harness 科研基础设施。',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
