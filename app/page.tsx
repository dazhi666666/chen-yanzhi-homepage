'use client';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { CSSProperties } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Asterisk,
  ChevronLeft,
  ChevronRight,
  X,
  MoveUpRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import projects from './projects.json';
import ProjectDemo from './project-demo';
import { demoIds } from './demo-data';
import { publicAsset } from '@/lib/public-asset';
type Project = (typeof projects)[number];
const names: Record<string, string> = {
  wukong: 'AI 投研', modelshare: '模型共享', answerplayer: 'AI 面试',
  reading: 'AI 阅读', admissions: 'AI 志愿', tank: '多人对战', 'science-harness': 'AI 科研', 'agent-router': 'Agent 协作',
};
const mapOrder = projects.map((_, index) => index);
const projectCount = String(projects.length).padStart(2, '0');
export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);
  const [detailTab, setDetailTab] = useState<string>('overview');
  const dialogRef = useRef<HTMLDivElement>(null);
  function openProject(p: Project, tab?: string) {
    setSlide(0);
    setSelected(p);
    setDetailTab(tab ?? (demoIds.includes(p.id) ? 'demo' : 'overview'));
    dialogRef.current?.scrollTo({ top: 0 });
  }
  function changeDetailTab(value: string) {
    setDetailTab(value);
    dialogRef.current?.scrollTo({ top: 0 });
  }
  return (
    <>
      <a className="skip" href="#works">
        跳到项目作品
      </a>
      <header className="header">
        <a href="#top" className="brand" aria-label="陈炎志主页">
          <span className="brand-mark">
            Y<span>.</span>
          </span>
          <span>
            陈炎志<span className="brand-sub">YANZHI CHEN</span>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#works">
            项目作品 <span>{projectCount}</span>
          </a>
          <a href="#about">关于我</a>
        </nav>
        <span className="header-note">
          <i /> 保持好奇，持续创造
        </span>
      </header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-plus">+</span> A PERSONAL LAB OF AI
              POSSIBILITIES
            </div>
            <h1 id="hero-title">
              把好奇心，
              <br />
              <span>
                做成真的<span className="title-stop">。</span>
              </span>
            </h1>
            <div className="hero-description">
              <span className="intro-rule" />
              <p>
                你好，我是陈炎志。
                <br />用 AI 探索问题，用代码实现想法。
                <br />
                这里收藏着我最近两个月的 AI 创造。
              </p>
            </div>
            <a className="primary-link" href="#works">
              探索我的作品 <ArrowDown size={18} />
            </a>
            <div className="hero-tags">
              <span>AI BUILDER</span>
              <span>CURIOUS MIND</span>
              <span>HANDS-ON</span>
            </div>
          </div>
          <div className="project-map" aria-label="八个项目的探索地图">
            <div className="map-axis axis-x" />
            <div className="map-axis axis-y" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="map-center">
              <Asterisk size={37} strokeWidth={1.1} />
              <span>AI × 好奇心</span>
              <small>START HERE</small>
            </div>
            <div className="map-caption">AI IDEAS → THINGS THAT WORK</div>
            {mapOrder.map((n, i) => (
              <a
                className={'map-card map-card-' + i}
                style={
                  { '--project-color': projects[n].color } as CSSProperties
                }
                href={'#' + projects[n].id}
                key={n}
              >
                <span className="map-label">
                  <span className="map-dot" /> {names[projects[n].id]}
                  <ArrowUpRight size={14} />
                </span>
                <img
                  src={publicAsset(projects[n].cover)}
                  alt={projects[n].subtitle}
                  loading={i > 1 ? 'lazy' : 'eager'}
                />
                <span className="map-card-no">EXPERIMENT / 0{n + 1}</span>
              </a>
            ))}
            <span className="coordinate coord-top">+ {projectCount} DIRECTIONS</span>
            <span className="coordinate coord-bottom">ONE CURIOUS MIND +</span>
          </div>
          <div className="hero-bottom">
            <span>
              <span className="green-dot" /> 围绕 AI · 从想法到作品
            </span>
            <span>RECENT TWO MONTHS / 2026</span>
            <a href="#works" aria-label="向下查看作品">
              <ArrowDown size={17} />
            </a>
          </div>
        </section>
        <section
          className="works section-shell"
          id="works"
          aria-labelledby="works-title"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">01 / SELECTED EXPERIMENTS</div>
              <h2 id="works-title">
                AI 的<span className="serif-word">八种</span>可能
                <span className="green-dot" />
              </h2>
            </div>
            <p>
              从智能投研与科研，到多人对战中的 AI 伙伴。
              <br />
              八个项目，探索 AI 在不同场景中的可能。
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <article
                id={p.id}
                key={p.id}
                className={'project project-' + p.id}
                style={{ '--project-color': p.color } as CSSProperties}
              >
                <button
                  className="project-image"
                  onClick={() => openProject(p)}
                  aria-label={'查看' + p.title + '的项目介绍和图片'}
                >
                  <div className="image-topline">
                    <span>
                      0{i + 1} / {names[p.id]}
                    </span>
                    <ArrowUpRight size={21} />
                  </div>
                  <div className={'screenshot-wrap screenshot-' + p.id}>
                    <img
                      src={publicAsset(p.cover)}
                      alt={p.images[0].caption}
                      loading="lazy"
                    />
                  </div>
                  <span className="image-bottomline">
                    {p.images.length.toString().padStart(2, '0')} 张项目图片{' '}
                    <span>
                      {demoIds.includes(p.id) ? '进入互动体验' : '打开项目'} <ArrowUpRight size={14} />
                    </span>
                  </span>
                </button>
                <div className="project-meta">
                  <div className="eyebrow">{p.category}</div>
                  <button
                    className="project-title"
                    onClick={() => openProject(p)}
                  >
                    <h3>{p.title}</h3>
                    <ArrowUpRight size={24} />
                  </button>
                  <p>{p.line}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {demoIds.includes(p.id) && <button className="demo-card-link" onClick={() => openProject(p, 'demo')}>亲手试一试 <ArrowRight size={15} /></button>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="about section-shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-side">
            <div className="eyebrow">02 / THE MIND BEHIND</div>
            <div className="signature">
              Yanzhi<span>↗</span>
            </div>
            <span className="about-name">陈炎志 / 一个动手做的人</span>
          </div>
          <div className="about-copy">
            <h2 id="about-title">
              我喜欢让想法
              <br />
              有一个<span>可以打开的版本。</span>
            </h2>
            <p>
              这两个月，我一直围绕 AI
              做东西：让智能体协作投研，让模型资源流动，让阅读、表达与志愿规划更有条理，在多人对战小游戏中加入可选的机器人 Laika 对战功能，也搭建连接科研思考与实验执行的基础设施，让多个编程 Agent 组成团队。八个项目，探索的是同一个问题：AI
              能怎样进入真实的使用场景？
            </p>
            <p>这些项目，是我寻找答案的方式。</p>
            <div className="about-metrics">
              <div>
                <strong>{projectCount}</strong>
                <span>个 AI 项目</span>
              </div>
              <div>
                <strong>02</strong>
                <span>个月的探索</span>
              </div>
              <div>
                <Asterisk size={42} strokeWidth={1} />
                <span>好奇心未完待续</span>
              </div>
            </div>
          </div>
        </section>
        <section className="closing">
          <span className="eyebrow">ALWAYS A WORK IN PROGRESS</span>
          <p>
            下一个想法，<span>正在发生。</span>
            <Asterisk strokeWidth={1} />
          </p>
          <a href="#top">
            回到起点 <MoveUpRight size={17} />
          </a>
        </section>
      </main>
      <footer>
        <a href="#top" className="footer-brand">
          陈炎志 <span>© 2026</span>
        </a>
        <span>MADE OF CURIOSITY & CODE</span>
        <span>保持好奇。动手创造。</span>
      </footer>
      <Dialog
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent
          ref={dialogRef}
          className={'project-dialog' + (selected?.id === 'wukong' && detailTab === 'demo' ? ' wukong-dialog' : '')}
          showCloseButton={false}
        >
          {selected && (
            <>
              <div className="dialog-top">
                <span className="eyebrow">
                  PROJECT /{' '}
                  {String(
                    projects.findIndex((p) => p.id === selected.id) + 1,
                  ).padStart(2, '0')}
                </span>
                <DialogClose className="close-button" aria-label="关闭项目">
                  <X size={23} />
                </DialogClose>
              </div>
              <div className="dialog-heading">
                <DialogTitle className="dialog-title">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="dialog-description">
                  {selected.subtitle}
                </DialogDescription>
                {'repository' in selected && typeof selected.repository === 'string' && <a className="project-repository" href={selected.repository} target="_blank" rel="noreferrer">查看 GitHub 仓库 <ArrowUpRight size={14} /></a>}
              </div>
              <Tabs
                value={detailTab}
                onValueChange={(value) => changeDetailTab(String(value))}
              >
                <TabsList
                  className="project-detail-tabs"
                  aria-label="项目详情内容"
                >
                  {demoIds.includes(selected.id) && <TabsTrigger value="demo">互动体验</TabsTrigger>}
                  <TabsTrigger value="overview">{selected.id === 'science-harness' ? '架构配图' : '真实截图'}</TabsTrigger>
                  <TabsTrigger value="introduction">完整介绍</TabsTrigger>
                </TabsList>
                {demoIds.includes(selected.id) && <TabsContent value="demo"><ProjectDemo key={selected.id} id={selected.id} /></TabsContent>}
                <TabsContent value="overview">
                  <div
                    className="gallery"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        setSlide((slide + 1) % selected.images.length);
                      }
                      if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        setSlide(
                          (slide - 1 + selected.images.length) %
                            selected.images.length,
                        );
                      }
                    }}
                  >
                    <div className="gallery-image">
                      <img
                        src={publicAsset(selected.images[slide].src)}
                        alt={selected.images[slide].caption}
                      />
                    </div>
                    <div className="gallery-controls">
                      <span>
                        {String(slide + 1).padStart(2, '0')} /{' '}
                        {String(selected.images.length).padStart(2, '0')}
                        <span className="gallery-caption">
                          {selected.images[slide].caption}
                        </span>
                      </span>
                      <div>
                        <a
                          className="original-link"
                          href={publicAsset(selected.images[slide].src)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          查看原图 <ArrowUpRight size={14} />
                        </a>
                        <button
                          aria-label="上一张"
                          disabled={selected.images.length === 1}
                          onClick={() =>
                            setSlide(
                              (slide - 1 + selected.images.length) %
                                selected.images.length,
                            )
                          }
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          aria-label="下一张"
                          disabled={selected.images.length === 1}
                          onClick={() =>
                            setSlide((slide + 1) % selected.images.length)
                          }
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="thumbnails" aria-label="选择项目图片">
                      {selected.images.map((img, i) => (
                        <button
                          className={slide === i ? 'active' : ''}
                          key={img.src}
                          onClick={() => setSlide(i)}
                          aria-label={img.caption}
                          aria-pressed={slide === i}
                        >
                          <img src={publicAsset(img.src)} alt="" loading="lazy" />
                          <span>{String(i + 1).padStart(2, '0')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="dialog-story">
                    <h3>{selected.line}</h3>
                    <p>{selected.description}</p>
                    <div className="project-points">
                      {selected.points.map(([title, desc], i) => (
                        <div key={title}>
                          <span>0{i + 1}</span>
                          <h4>{title}</h4>
                          <p>{desc}</p>
                        </div>
                      ))}
                    </div>
                    {selected.note && (
                      <p className="project-note">{selected.note}</p>
                    )}
                  </div>
                  <button
                    className="read-introduction"
                    onClick={() => changeDetailTab('introduction')}
                  >
                    阅读我的完整项目介绍 <ArrowRight size={18} />
                  </button>
                </TabsContent>
                <TabsContent value="introduction">
                  <div className="introduction-byline">
                    <span>项目介绍 · 陈炎志</span>
                    <span>原文全文</span>
                  </div>
                  <article
                    className="original-introduction"
                    aria-label={selected.subtitle + '完整介绍'}
                  >
                    <Markdown
                      skipHtml
                      components={{
                        h1: ({ children }) => <h3>{children}</h3>,
                        h2: ({ children }) => <h4>{children}</h4>,
                        h3: ({ children }) => <h4>{children}</h4>,
                      }}
                    >
                      {selected.originalIntroduction}
                    </Markdown>
                  </article>
                </TabsContent>
              </Tabs>
              <button
                className="next-project"
                onClick={() =>
                  openProject(
                    projects[
                      (projects.findIndex((p) => p.id === selected.id) + 1) %
                        projects.length
                    ],
                  )
                }
              >
                继续探索下一个项目 <ArrowRight size={20} />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
