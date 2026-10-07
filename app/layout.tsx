import type { Metadata } from 'next';
import './globals.css';
import { publicAsset } from '@/lib/public-asset';
export const metadata: Metadata = {
  title: '陈炎志 · 好奇心实验室',
  description:
    '把好奇心，做成真的。陈炎志的八个 AI 项目：science-harness 科研基础设施、悟空智投、坦克动荡、模型共享、面试辅助、阅读摘要、志愿规划，以及 Agent Router 编程协作调度器。',
  icons: { icon: publicAsset('/favicon.svg') },
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
