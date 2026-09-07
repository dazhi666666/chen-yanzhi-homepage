'use client';
import { lazy, Suspense, useState } from 'react';
import { ArrowRight, RotateCcw, ChevronLeft, ChevronRight, Check, Layers, BookOpen, MessageSquare, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { distributeRequests, interviewCases, rankedArticles, readingProfiles } from './demo-data';
import './project-demo.css';

const TankDemo = lazy(() => import('./tank-demo'));
const WukongDemo = lazy(() => import('./wukong-demo'));
const ScienceDemo = lazy(() => import('./science-demo'));

export default function ProjectDemo({ id }: { id: string }) {
  return <section className={'demo-shell' + (id === 'wukong' ? ' wk-shell' : id === 'science-harness' ? ' sc-shell' : '')} aria-label="项目互动体验">
    <div className="demo-disclosure"><span><i /> {id === 'tank' ? '可游玩 · 单人试玩' : '可互动 · 模拟演示'}</span><span>{id === 'tank' ? '默认摇杆 · 对战规则型 AI Laika' : '预设示例，不调用真实模型'}</span></div>
    {id === 'science-harness' ? <Suspense fallback={<p className="tank-loading" role="status">正在准备科研实验演示…</p>}><ScienceDemo /></Suspense> : id === 'wukong' ? <Suspense fallback={<p className="tank-loading" role="status">正在准备悟空智投协作工作台…</p>}><WukongDemo /></Suspense> : id === 'modelshare' ? <SharingDemo /> : id === 'answerplayer' ? <InterviewDemo /> : id === 'reading' ? <ReadingDemo /> : id === 'tank' ? <Suspense fallback={<p className="tank-loading" role="status">正在准备坦克、迷宫和 Laika…</p>}><TankDemo /></Suspense> : null}
  </section>;
}

function SharingDemo() {
  const [requests, setRequests] = useState(9);
  const [enabled, setEnabled] = useState([true, true, true]);
  const result = distributeRequests(requests, enabled);
  function reset() { setRequests(9); setEnabled([true, true, true]); }
  return <div className="sharing-demo">
    <div className="demo-heading"><div><span className="demo-kicker">MODELSHARE / ROUTING LAB</span><h3>一次请求，可以有很多条路。</h3><p>关闭一个资源节点，看看请求会去哪里。</p></div><Layers size={30} /></div>
    <div className="routing-input"><label id="request-label">同时到达的请求 <strong>{requests}</strong></label><Slider aria-labelledby="request-label" value={[requests]} min={1} max={20} step={1} onValueChange={value => setRequests(Array.isArray(value) ? value[0] : value)} /><span>1 个</span><span>20 个</span></div>
    <div className="routing-gateway"><span>应用请求</span><ArrowRight size={18} /><strong>统一 API Key</strong><ArrowRight size={18} /><span>共享资源池</span></div>
    <div className="resource-pool">{enabled.map((on, i) => <div className={'resource-node ' + (!on ? 'is-off' : '')} key={i}><div className="resource-title"><h4>节点 {String.fromCharCode(65+i)}</h4><Switch checked={on} onCheckedChange={checked => setEnabled(previous => previous.map((value,j) => j === i ? checked : value))} aria-label={'节点 '+String.fromCharCode(65+i)+' 参与调度'} /></div><span className="node-state">{on ? '参与共享' : '已暂停 · 请求转交其他节点'}</span><div className="node-load"><strong>{result.assigned[i]}</strong><span>/ {result.capacity[i]} 并发</span></div><div className="request-slots" aria-label={'分配了 '+result.assigned[i]+' 个请求'}>{Array.from({length:result.capacity[i]},(_,j)=><span key={j} className={j < result.assigned[i] ? 'filled' : ''} />)}</div></div>)}</div>
    <div className="routing-result" role="status"><div><Check size={19}/><span><strong>{requests-result.remaining}</strong> 个已分配</span></div><div><span className="queue-count">{result.remaining}</span> 个等待中</div><p>{result.totalCapacity === 0 ? '所有节点已暂停，请求留在队列中。打开任意节点即可恢复分配。' : result.remaining ? '请求超过可用并发，剩余请求等待空位。增加共享节点或减少请求即可缓解。' : enabled.every(Boolean) ? '请求按节点可用并发分配。试着暂停节点 B，观察其余节点承接请求。' : '暂停节点不再接收请求，其余可用节点在容量范围内承接。'}</p></div>
    <div className="demo-bottom"><span>示例容量与轮转分配，用于说明调度思路。</span><Button variant="outline" onClick={reset}><RotateCcw/> 重置场景</Button></div>
  </div>;
}

function InterviewDemo() {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const [sentence, setSentence] = useState(0);
  const current = interviewCases[scenario];
  const stages = ['选择问题', '识别问题', '组织思路', '提词练习'];
  function reset() { setStep(0); setSentence(0); }
  return <div className="interview-demo">
    <div className="demo-heading"><div><span className="demo-kicker">ANSWERPLAYER / EXPRESSION LAB</span><h3>把脑中的经历，变成清楚的表达。</h3><p>选一道问题，走完识别、建议和提词三个步骤。</p></div><MessageSquare size={30}/></div>
    <Tabs value={String(scenario)} onValueChange={value=>{setScenario(Number(value));reset();}}><TabsList className="demo-choices" aria-label="面试示例问题">{interviewCases.map((c,i)=><TabsTrigger value={String(i)} key={c.label}>{c.label}</TabsTrigger>)}</TabsList>{interviewCases.map((c,i)=><TabsContent value={String(i)} key={c.label}><div className="demo-background">{c.background}</div></TabsContent>)}</Tabs>
    <ol className="demo-steps" aria-label="演示进度">{stages.map((title,i)=><li key={title} className={step>=i?'reached':''}><span>{i < step ? <Check size={14}/> : i+1}</span>{title}</li>)}</ol>
    <div className="interview-panels"><div className="conversation-preview"><span className="panel-caption">对话记录 / 示例转写</span><div className="interviewer-bubble"><small>面试官</small><p>{current.question}</p></div><div className="recognition" role="status">{step===0?'点击下方按钮，模拟接收到这道问题。':<><Check size={16}/> 已识别问题 · {current.label}</>}</div>{step>=2&&<div className="answer-bubble"><small>AI 回答思路 · 预设示例</small>{current.answer.map((text,i)=><p key={text}><span>0{i+1}</span>{text}</p>)}</div>}</div>
    <div className={'teleprompter '+(step===3?'ready':'')}><span className="panel-caption">悬浮提词预览</span>{step<3?<div className="teleprompter-idle"><MessageSquare size={34}/><p>先整理回答思路，<br/>再把注意力放回表达。</p></div>:<><span className="sentence-number">{sentence+1} / {current.answer.length}</span><p className="prompt-sentence" aria-live="polite">{current.answer[sentence]}</p><div className="prompt-controls"><Button variant="outline" disabled={sentence===0} aria-label="上一句提词" onClick={()=>setSentence(v=>v-1)}><ChevronLeft/></Button><span>按句切换，跟上自己的节奏</span><Button variant="outline" disabled={sentence===current.answer.length-1} aria-label="下一句提词" onClick={()=>setSentence(v=>v+1)}><ChevronRight/></Button></div></>}</div></div>
    <div className="demo-bottom interview-actions"><Button variant="outline" onClick={reset}><RotateCcw/> 重新演示</Button>{step<3?<Button className="interview-primary-action" onClick={()=>setStep(v=>v+1)}>{step===0&&<Play aria-hidden="true" fill="currentColor"/>}{['模拟识别问题','查看回答思路','开始提词练习'][step]}<ArrowRight aria-hidden="true"/></Button>:<span role="status">已进入提词练习，可以逐句切换。</span>}</div>
  </div>;
}

function ReadingDemo() {
  const [profile, setProfile] = useState(0);
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState('summary');
  const articles = rankedArticles(profile);
  const current = articles.find(a=>a.index===selected)!;
  return <div className="reading-demo">
    <div className="demo-heading"><div><span className="demo-kicker">READING / ATTENTION LAB</span><h3>同样三篇文章，你会先读哪篇？</h3><p>切换兴趣方向，比较阅读排序与推荐理由。</p></div><BookOpen size={30}/></div>
    <Tabs value={String(profile)} onValueChange={value=>setProfile(Number(value))}><TabsList className="demo-choices" aria-label="阅读兴趣">{readingProfiles.map((p,i)=><TabsTrigger key={p} value={String(i)}>{p}</TabsTrigger>)}</TabsList>{readingProfiles.map((p,i)=><TabsContent value={String(i)} key={p}><p className="demo-background">当前关注：{p} · 以下均为演示原创短文与预设评分。</p></TabsContent>)}</Tabs>
    <div className="reading-workspace"><div className="reading-index"><span className="panel-caption">阅读索引 / 按相关度排序</span>{articles.map((article,i)=><button key={article.index} className={'reading-item '+(selected===article.index?'selected':'')} aria-pressed={selected===article.index} onClick={()=>setSelected(article.index)}><span className="reading-rank">0{i+1}</span><span><strong>{article.title}</strong><small>{article.length}</small></span><span className="reading-score">{article.score}<small>分</small></span></button>)}</div>
    <div className="reading-document"><span className="panel-caption">{current.length}</span><h4>{current.title}</h4><Tabs value={view} onValueChange={value=>setView(String(value))}><TabsList className="demo-choices document-tabs" aria-label="文章视图"><TabsTrigger value="summary">摘要与推荐</TabsTrigger><TabsTrigger value="original">示例原文</TabsTrigger></TabsList><TabsContent value="summary"><p className="article-summary">{current.summary}</p><ul className="article-points">{current.bullets.map(point=><li key={point}>{point}</li>)}</ul></TabsContent><TabsContent value="original"><p className="article-original">{current.text}</p></TabsContent></Tabs><div className="reading-reason" role="status"><span>对「{readingProfiles[profile]}」的相关度 <strong>{current.score} / 100</strong></span><p>{current.reason}</p></div></div></div>
    <div className="demo-bottom"><span>评分随兴趣变化，原文与摘要保持一致。</span><Button variant="outline" onClick={()=>{setProfile(0);setSelected(0);setView('summary');}}><RotateCcw/> 重置偏好</Button></div>
  </div>;
}
