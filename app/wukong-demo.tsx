'use client';
/* eslint-disable jsx-a11y/prefer-tag-over-role -- SVG charts and focusable SVG paths need explicit roles; native img/button elements cannot replace this interactive vector geometry. */

import { useEffect, useId, useMemo, useReducer, useRef, useState } from 'react';
import { ArrowRight, BrainCircuit, ChartNoAxesCombined, Check, ChevronDown, ChevronUp, Database, FileText, Focus, GitBranch, History, Pause, Play, RotateCcw, Search, ShieldCheck, SkipForward, Telescope, TrendingDown, TrendingUp, UserRound, Workflow, ZoomIn, ZoomOut, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { buildFrames, connections, initialPlayback, playbackReducer, roles, scenes } from './wukong-data';
import type { EdgeId, Frame, NodeId } from './wukong-data';
import './wukong-demo.css';

type Selection = { kind: 'node'; id: NodeId } | { kind: 'edge'; id: EdgeId };
type Camera = { x: number; y: number; scale: number };
const icons = { user: UserRound, data: Database, research: Workflow, fundamental: ChartNoAxesCombined, technical: TrendingUp, sentiment: FileText, summary: GitBranch, market: Telescope, boss: BrainCircuit, sub: Search, watcher: Focus, execution: ShieldCheck, memory: History };
const positions: Partial<Record<NodeId, [number, number, number, number]>> = {
  user: [40, 40, 200, 100], market: [410, 40, 200, 100], sub: [760, 40, 200, 100],
  research: [70, 305, 230, 120], boss: [410, 285, 200, 100], watcher: [760, 285, 200, 100],
  data: [40, 550, 200, 100], memory: [410, 550, 200, 100], execution: [760, 550, 200, 100],
  fundamental: [40, 240, 140, 76], technical: [40, 335, 140, 76], sentiment: [40, 430, 140, 76], summary: [215, 335, 130, 76],
};
const routes: Record<EdgeId, [string, number, number]> = {
  mandate: ['M240 90 H350 Q365 90 365 105 V235 Q365 250 380 250 H470 V285', 327, 192],
  sources: ['M140 550 V425', 139, 488],
  'macro-data': ['M40 595 H12 V15 H510 V40', 276, 15],
  'fundamental-report': ['M180 278 H191 Q198 278 198 290 V358 H215', 196, 313],
  'technical-report': ['M180 373 H215', 197, 373],
  'sentiment-report': ['M180 468 H191 Q198 468 198 454 V390 H215', 197, 431],
  report: ['M300 365 H365 Q380 365 380 350 V335 H410', 356, 335],
  brief: ['M510 140 V285', 510, 215],
  delegate: ['M580 285 V235 H860 V140', 711, 235],
  evidence: ['M800 140 V180 H590 V285', 692, 180],
  strategy: ['M610 325 H760', 685, 325],
  quotes: ['M240 620 H275 V680 H982 V250 H880 V285', 928, 250],
  intent: ['M860 385 V550', 835, 450],
  'order-status': ['M915 550 V385', 935, 500],
  receipt: ['M760 600 H710 V482 H550 V385', 672, 482],
  deviation: ['M760 362 H680 V434 H585 V385', 699, 403],
  save: ['M470 385 V550', 470, 475],
  restore: ['M610 590 H643 V460 H530 V385', 643, 530],
};
const innerNodes: NodeId[] = ['fundamental', 'technical', 'sentiment', 'summary'];

export default function WukongDemo() {
  const [playback, dispatch] = useReducer(playbackReducer, initialPlayback);
  const [expanded, setExpanded] = useState(false);
  const [selection, setSelection] = useState<Selection>({ kind: 'node', id: 'boss' });
  const frames = useMemo(() => buildFrames(playback.scene), [playback.scene]);
  const frame = frames[playback.step];
  const finished = playback.step === frames.length - 1;

  useEffect(() => {
    if (!playback.playing) return;
    const timer = window.setTimeout(() => dispatch({ type: 'tick' }), 2600);
    return () => window.clearTimeout(timer);
  }, [playback.playing, playback.step, playback.scene]);
  useEffect(() => {
    const pause = () => { if (document.hidden) dispatch({ type: 'pause' }); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);

  function inspect(next: Selection) {
    dispatch({ type: 'pause' });
    setSelection(next);
  }
  function reset() {
    dispatch({ type: 'reset' });
    setSelection({ kind: 'node', id: 'boss' });
  }
  return <div className="wk-demo">
    <header className="wk-header">
      <div className="wk-brand"><span className="wk-brand-icon"><BrainCircuit size={27} /></span><div><span className="wk-eyebrow">WUKONG / AGENT WORKSPACE</span><h3>让一次决策，有迹可循。</h3></div></div>
      <span className="wk-mode"><i /> 场景演示</span>
    </header>
    <div className="wk-context">
      <div><span className="wk-stock-symbol">星</span><div><strong>星云科技 <small>虚构标的</small></strong><span>单股上限 10% · 初始空仓</span></div></div>
      <PriceChart prices={frame.prices} />
      <div className="wk-context-stat"><span>当前策略</span><strong>{frame.decision ? `V${frame.decision.version}` : '待研究'}</strong></div>
      <div className="wk-context-stat"><span>场景时间</span><strong>{frame.time}</strong></div>
    </div>

    <div className="wk-runbar">
      <div className="wk-run-actions">
        <Button className="wk-primary" disabled={finished} onClick={() => dispatch({ type: playback.playing ? 'pause' : 'play' })}>{playback.playing ? <Pause /> : <Play fill="currentColor" />}{playback.playing ? '暂停演示' : playback.step === 0 ? '启动 AI 团队研究' : finished ? '阶段已完成' : '继续演示'}</Button>
        <Button variant="outline" disabled={finished} onClick={() => dispatch({ type: 'next' })}><SkipForward /> 单步</Button>
        <Button variant="ghost" onClick={reset} aria-label="重置整个投研演示"><RotateCcw /> 重置</Button>
      </div>
      <output className="wk-run-status">{playback.playing ? '正在推进' : playback.step === 4 && !playback.scene ? '等待你选择市场事件' : finished ? '可回看任意已发生步骤' : '点击节点或连线，查看依据'}</output>
    </div>

    <div className="wk-workspace">
      <div className="wk-main">
        <FlowCanvas frame={frame} playing={playback.playing} expanded={expanded} setExpanded={setExpanded} selection={selection} inspect={inspect} />
        <div className="wk-current" aria-live="polite"><span>{String(playback.step + 1).padStart(2, '0')}</span><div><strong>{frame.title}</strong><p>{frame.description}</p></div></div>
        <div className="wk-events">
          <div className="wk-section-label"><span><Zap size={15} /> 改变市场，观察团队如何回应</span><small>{playback.step < 4 ? '完成首次研究后解锁' : '每次选择都会从 V1 开始新分支'}</small></div>
          <div className="wk-event-options">{scenes.map((scene, index) => {
            const Icon = [TrendingUp, Zap, TrendingDown][index];
            return <Button variant="outline" key={scene.id} disabled={playback.step < 4} aria-pressed={playback.scene === scene.id} onClick={() => { dispatch({ type: 'event', scene: scene.id }); setSelection({ kind: 'node', id: scene.id === 'news' ? 'market' : 'watcher' }); }}><Icon /><span><strong>{scene.title}</strong><small>{scene.description}</small></span><ArrowRight /></Button>;
          })}</div>
        </div>
      </div>
      <aside className="wk-inspector" aria-label="节点、消息与决策详情">
        <Inspector selection={selection} frame={frame} />
        <div className="wk-decision">
          <div className="wk-section-label"><span><BrainCircuit size={16} /> 当前决策</span><b>{frame.decision ? `V${frame.decision.version}` : '—'}</b></div>
          {frame.decision ? <><h4>{frame.decision.title}</h4><p>{frame.decision.reason}</p><div className="wk-condition"><span>生效条件</span><p>{frame.decision.condition}</p></div>{frame.previous && <details className="wk-comparison"><summary>V{frame.previous.version} → V{frame.decision.version} · 查看变更</summary><div><span>此前 V{frame.previous.version}</span><p>{frame.previous.condition}</p><span>现在 V{frame.decision.version}</span><p>{frame.decision.condition}</p></div></details>}<div className="wk-execution"><ShieldCheck size={17} /><span>{frame.decision.execution}</span></div></> : <div className="wk-awaiting"><GitBranch size={25} /><p>先收集证据，再形成策略。</p><span>启动研究，观察各角色如何协作。</span></div>}
        </div>
      </aside>
    </div>

    <div className="wk-timeline">
      <div className="wk-section-label"><span><History size={17} /> 决策时间线</span><small>拖动回看 · 已记录 {playback.reached + 1} 个时点</small></div>
      <Slider aria-label="回放已记录的决策时点" aria-valuetext={`${frame.time}，${frame.title}`} min={0} max={Math.max(1, playback.reached)} step={1} value={[playback.step]} disabled={playback.reached === 0} onValueChange={value => dispatch({ type: 'seek', step: Array.isArray(value) ? value[0] : value })} />
      <ol>{frames.map((item, i) => <li key={i}><button disabled={i > playback.reached} aria-current={playback.step === i ? 'step' : undefined} onClick={() => dispatch({ type: 'seek', step: i })}><span>{i < playback.step ? <Check size={12} /> : String(i + 1).padStart(2, '0')}</span><strong>{item.title}</strong><small>{item.time}</small></button></li>)}</ol>
    </div>
    <footer className="wk-footnote">虚构标的与预设消息，仅用于体验协作流程；不连接实时行情、模型或交易服务。</footer>
  </div>;
}

function PriceChart({ prices }: { prices: number[] }) {
  const points = prices.map((price, index) => `${8 + index * 164 / (prices.length - 1)},${64 - (price - 38) * 2.1}`).join(' ');
  return <div className="wk-price"><svg viewBox="0 0 180 72" role="img" aria-label="随演示事件变化的示例价格走势"><path d="M8 60H172 M8 35H172 M8 10H172" stroke="#dce5f0" strokeDasharray="3 5" fill="none" /><polyline points={points} fill="none" stroke={prices.at(-1)! < 48 ? '#a56b2c' : '#426cad'} strokeWidth="2.4" strokeLinejoin="round" /></svg><span>示例走势 · 非实时</span></div>;
}

function Inspector({ selection, frame }: { selection: Selection; frame: Frame }) {
  if (selection.kind === 'edge') {
    const connection = connections.find(edge => edge.id === selection.id)!;
    const message = frame.messages[selection.id];
    return <section className="wk-detail"><span className="wk-eyebrow">MESSAGE / 连线消息</span><h4>{connection.label}</h4><div className="wk-message-route">{roles[connection.from].title}<ArrowRight size={15} />{roles[connection.to].title}</div><span className="wk-detail-label">{message ? frame.edges.includes(selection.id) ? '此时传递的消息' : '截至此时的最近一条消息' : '尚未传递消息'}</span><p className="wk-output">{message ?? '继续演示，消息经过这条连线时，可以在这里查看具体内容。'}</p><small>显示的是场景中明确传递的摘要。</small></section>;
  }
  const role = roles[selection.id];
  const Icon = icons[selection.id];
  return <section className="wk-detail"><span className="wk-eyebrow">ROLE / 节点详情</span><h4><Icon size={21} /> {role.title}</h4><span className="wk-role-kind">{role.kind}</span><p>{role.duty}</p><div className="wk-io"><span>输入</span><p>{role.input}</p><span>输出</span><p>{role.output}</p></div><span className="wk-detail-label">{frame.active.includes(selection.id) ? '此时正在处理' : '截至此时的状态'}</span><p className="wk-output">{frame.outputs[selection.id] ?? '待命，尚未收到本场景的任务。'}</p>{selection.id === 'memory' && <div className="wk-memory-list">{['近期上下文', '日级总结', '事件记忆'].map((name, i) => <div key={name}><History size={14} /><span><strong>{name}</strong><small>{['各岗位近期观察与消息', '当天判断、行动和结果', '持续影响与未解决事项'][i]}</small></span></div>)}{frame.memory.length > 0 && <ul>{frame.memory.map(line => <li key={line}>{line}</li>)}</ul>}</div>}</section>;
}

function FlowCanvas({ frame, playing, expanded, setExpanded, selection, inspect }: { frame: Frame; playing: boolean; expanded: boolean; setExpanded: (value: boolean) => void; selection: Selection; inspect: (value: Selection) => void }) {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; camera: Camera } | null>(null);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: .8 });
  const [size, setSize] = useState({ width: 800, height: 560 });
  const markerId = 'wk-arrow-' + useId().replace(/:/g, '');
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width, height = entry.contentRect.height;
      if (width === 0 || height === 0) return;
      setSize({ width, height });
      const scale = Math.max(.72, Math.min((width - 24) / 1000, (height - 24) / 700, 1.15));
      setCamera({ x: (width - 1000 * scale) / 2, y: (height - 700 * scale) / 2, scale });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  function zoom(factor: number) {
    setCamera(current => {
      const scale = Math.max(.28, Math.min(1.8, current.scale * factor));
      return { scale, x: size.width / 2 - (size.width / 2 - current.x) * scale / current.scale, y: size.height / 2 - (size.height / 2 - current.y) * scale / current.scale };
    });
  }
  function fit() {
    const scale = Math.min((size.width - 24) / 1000, (size.height - 24) / 700, 1.15);
    setCamera({ x: (size.width - 1000 * scale) / 2, y: (size.height - 700 * scale) / 2, scale });
  }
  function showFocusedNode(position: [number, number, number, number]) {
    const [x, y, width, height] = position;
    setCamera(current => {
      if (x * current.scale + current.x >= 5 && (x + width) * current.scale + current.x < size.width - 5 && y * current.scale + current.y >= 5 && (y + height) * current.scale + current.y < size.height - 5) return current;
      return { ...current, x: size.width / 2 - (x + width / 2) * current.scale, y: size.height / 2 - (y + height / 2) * current.scale };
    });
  }
  const visibleNodes = (Object.keys(positions) as NodeId[]).filter(id => expanded ? id !== 'research' : !innerNodes.includes(id));
  return <div className="wk-flow-shell">
    <div className="wk-flow-toolbar"><span><Workflow size={17} /> 协作流程图</span><div><Button variant="ghost" onClick={() => zoom(.8)} aria-label="缩小流程图"><ZoomOut /></Button><span>{Math.round(camera.scale * 100)}%</span><Button variant="ghost" onClick={() => zoom(1.25)} aria-label="放大流程图"><ZoomIn /></Button><Button variant="ghost" onClick={fit}><Focus /> 适应</Button></div></div>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The diagram viewport implements keyboard pan/zoom; its native buttons and SVG message paths remain individually focusable. */}
    <div className="wk-canvas" ref={viewport} tabIndex={0} role="application" aria-label="可拖动的协作流程图，方向键平移，加减键缩放，数字 0 适应画布；Tab 选择节点与消息" onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      const moves: Record<string, [number, number]> = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] };
      if (moves[event.key]) { event.preventDefault(); const [x, y] = moves[event.key]; setCamera(c => ({ ...c, x: c.x + x, y: c.y + y })); }
      if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1.25); }
      if (event.key === '-') { event.preventDefault(); zoom(.8); }
      if (event.key === '0') { event.preventDefault(); fit(); }
    }} onPointerDown={event => {
      if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('button, [role="button"], [data-flow-edge]')) return;
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, camera };
      event.currentTarget.setPointerCapture(event.pointerId);
    }} onPointerMove={event => {
      const start = drag.current;
      if (!start || start.id !== event.pointerId) return;
      setCamera({ ...start.camera, x: start.camera.x + event.clientX - start.x, y: start.camera.y + event.clientY - start.y });
    }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
      <div className={'wk-flow-world ' + (playing ? 'is-playing' : '')} style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
        <div className={'wk-research-boundary ' + (expanded ? 'is-expanded' : '')}><button onClick={() => { setExpanded(!expanded); inspect({ kind: 'node', id: 'research' }); }} aria-expanded={expanded}><span>个股研究工作流</span>{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button><span>{expanded ? '并行分析 → 综合汇总' : '点击展开内部节点'}</span></div>
        <svg className="wk-edges" width="1000" height="700" aria-label="角色之间的消息连线">
          <defs><marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="context-stroke" /></marker></defs>
          {connections.filter(edge => expanded || !edge.id.endsWith('-report')).map(edge => {
            const [route, x, y] = routes[edge.id];
            let d = route;
            if (expanded && edge.id === 'sources') d = 'M140 550 V520';
            if (expanded && edge.id === 'report') d = 'M345 373 H370 Q382 373 382 355 V335 H410';
            const active = frame.edges.includes(edge.id), sent = !!frame.messages[edge.id], selected = selection.kind === 'edge' && selection.id === edge.id;
            const internal = edge.id.endsWith('-report');
            return <g key={edge.id} data-flow-edge onClick={() => inspect({ kind: 'edge', id: edge.id })} className={'wk-edge ' + (active ? 'is-active ' : sent ? 'is-sent ' : '') + (selected ? 'is-selected' : '')}>
              <path className="wk-edge-line" d={d} markerEnd={`url(#${markerId})`} />
              {active && <path className="wk-edge-pulse" d={d} />}
              {!internal && <g className="wk-edge-label" transform={`translate(${x},${y})`}><rect x="-39" y="-13" width="78" height="26" rx="5" /><text textAnchor="middle" dominantBaseline="central">{edge.label}</text></g>}
              <path className="wk-edge-hit" d={d} role="button" tabIndex={0} aria-label={`${roles[edge.from].title}至${roles[edge.to].title}：${edge.label}${sent ? '，已有消息' : '，尚无消息'}`} aria-pressed={selected} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); inspect({ kind: 'edge', id: edge.id }); } }} onFocus={() => showFocusedNode([x - 40, y - 15, 80, 30])} />
            </g>;
          })}
        </svg>
        {visibleNodes.map(id => {
          const [left, top, width, height] = positions[id]!;
          const active = frame.active.includes(id), warning = frame.warning.includes(id), completed = !!frame.outputs[id];
          const selected = selection.kind === 'node' && selection.id === id;
          const Icon = icons[id];
          const mini = innerNodes.includes(id);
          return <button key={id} className={`wk-node ${id === 'boss' ? 'wk-boss ' : ''}${mini ? 'wk-mini ' : ''}${active ? 'is-active ' : ''}${warning ? 'is-warning ' : ''}${selected ? 'is-selected ' : ''}`} style={{ left, top, width, height }} aria-pressed={selected} aria-label={`${roles[id].title}，${warning ? '存在分歧或风险' : active ? '当前步骤' : completed ? '已有记录' : '待命'}${id === 'research' ? '，点击展开工作流' : ''}`} onClick={() => { inspect({ kind: 'node', id }); if (id === 'research') setExpanded(true); }} onFocus={() => showFocusedNode(positions[id]!)}>
            <span className="wk-node-title"><Icon size={mini ? 18 : 23} /><strong>{roles[id].title}</strong></span>
            {!mini && <span className="wk-node-kind">{roles[id].kind}</span>}
            <span className="wk-node-state"><i />{warning ? '分歧 / 风险' : active ? '当前步骤' : completed ? '已有记录' : '待命'}{id === 'research' && <ChevronDown size={14} />}</span>
          </button>;
        })}
      </div>
    </div>
    <div className="wk-legend"><span><i className="wk-dot-active" /> 当前步骤</span><span><i className="wk-dot-warning" /> 分歧 / 风险</span><span><i /> 待命</span><small>拖动画布 · 点击节点或连线</small></div>
  </div>;
}
