'use client';

import { useReducer, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, BrainCircuit, Check, ChevronRight, Copy, Database, FileCheck2, FlaskConical, GitBranch, Link2, Plug, Radio, RotateCcw, ShieldCheck, Unplug, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { experiment, initialScience, layerDetails, scienceReducer, statusLabels } from './science-data';
import type { ScienceSelection } from './science-data';
import './science-demo.css';

export default function ScienceDemo() {
  const [state, dispatch] = useReducer(scienceReducer, initialScience);
  const [selection, setSelection] = useState<ScienceSelection>('midbrain');
  const [view, setView] = useState('log');
  const registered = state.status !== 'idle';
  const canAdvance = state.connected && ['registered', 'running'].includes(state.status);
  const unknown = state.status === 'unknown';
  const complete = state.status === 'completed';
  const detail = layerDetails[selection];
  const activeLayer = !registered ? 'brain' : unknown || complete || state.status === 'registered' ? 'midbrain' : 'provider';
  function reset() { dispatch({ type: 'reset' }); setView('log'); setSelection('midbrain'); }
  const layers = [
    { id: 'brain' as const, number: '01', name: '大脑', english: 'RESEARCH', title: '提出问题，决定研究方向', icon: BrainCircuit, nodes: ['主研究 Agent', '假设分支', '分析分支'] },
    { id: 'midbrain' as const, number: '02', name: '中脑', english: 'ORCHESTRATION', title: '将实验需求转成可管理的操作', icon: Workflow, nodes: ['请求身份', '资源与预算', '状态与恢复'] },
    { id: 'provider' as const, number: '03', name: '小脑', english: 'EXECUTION', title: '通过插件连接执行能力', icon: Plug, nodes: ['模拟仪器', '长计算', '领域工具'] },
  ];

  return <div className="sc-demo">
    <header className="sc-header"><div><span className="sc-eyebrow">SCIENCE-HARNESS / RESEARCH INFRASTRUCTURE</span><h3>从一个问题，到一次有据可查的实验。</h3><p>点击三层架构，或亲手让一次实验中断、恢复。</p></div><span className="sc-version">Infrastructure <b>v0.1</b></span></header>
    <div className="sc-workbench">
      <section className="sc-architecture" aria-label="三层科研流程图">
        <div className="sc-section-heading"><span><GitBranch size={17} /> 科研协作架构</span><small>可配置组织示例</small></div>
        <div className="sc-flow">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return <div key={layer.id}>
              <button className={'sc-layer sc-layer-' + layer.id + (selection === layer.id ? ' selected' : '') + (isActive ? ' current' : '')} aria-pressed={selection === layer.id} onClick={() => setSelection(layer.id)}>
                <span className="sc-layer-heading"><span className="sc-layer-icon"><Icon size={25} /></span><span><strong>{layer.name}<small>{layer.english}</small></strong><span>{layer.title}</span></span><b>{layer.number}</b></span>
                <span className="sc-subnodes">{layer.nodes.map(node => <span key={node}>{node}</span>)}</span>
                <span className="sc-layer-bottom"><span><i />{isActive ? unknown ? '等待核对' : complete ? '结果已核验' : '当前环节' : '点击查看职责与输入输出'}</span><ChevronRight size={15} /></span>
              </button>
              {index < 2 && <div className={'sc-flow-links' + (registered ? ' has-record' : '')}>
                <button aria-pressed={selection === (index === 0 ? 'request' : 'execution')} onClick={() => setSelection(index === 0 ? 'request' : 'execution')}><ArrowDown size={24} /><span>{index === 0 ? '实验需求' : '具体执行请求'}</span></button>
                <button aria-pressed={selection === 'feedback'} onClick={() => setSelection('feedback')}><ArrowUp size={24} /><span>{index === 0 ? '结果 / 异常反馈' : '状态 / 原始观察'}</span></button>
              </div>}
            </div>;
          })}
        </div>
        <div className="sc-future"><Plug size={16} /><span>后续方向：真实实验设备 · 机器人协作</span></div>
        <div className="sc-layer-detail"><span className="sc-eyebrow">INSPECT / 点击节点与连线探索</span><h4>{detail.name}</h4><p>{detail.duty}</p><dl><dt>输入</dt><dd>{detail.input}</dd><dt>输出</dt><dd>{detail.output}</dd></dl><small>{detail.boundary}</small></div>
      </section>

      <section className="sc-experiment" aria-label="模拟实验操作台">
        <div className="sc-section-heading"><span><FlaskConical size={18} /> 一次实验，始终有同一个身份</span><span className={'sc-host ' + (!state.connected ? 'offline' : '')}><i />{state.connected ? '控制端在线' : '控制端已断开'}</span></div>
        <div className="sc-question"><span className="sc-eyebrow">EXPERIMENT / 001</span><h4>模拟仪器校准</h4><p>对参考值 <b>1.00</b> 采样三次，记录原始读数，再追溯平均值的来源。</p><div><span>参考值 <strong>1.00</strong></span><span>采样次数 <strong>3</strong></span><span>预算 <strong>30 单位</strong></span></div></div>
        <div className="sc-operation">
          <div><span className="sc-eyebrow">OPERATION</span><strong>{registered ? experiment.operationId : '等待登记'}</strong></div>
          <span className={'sc-status sc-status-' + state.status}>{unknown ? <ShieldCheck size={14} /> : complete ? <Check size={14} /> : <Radio size={14} />}{statusLabels[state.status]}</span>
        </div>
        <div className="sc-request-key"><Link2 size={14} /><span>请求键</span><code>{experiment.requestKey}</code></div>
        <div className="sc-measurements" aria-label="已记录的原始观察">{experiment.readings.map((_, i) => <div key={i} className={state.readings[i] !== undefined ? 'recorded' : ''}><span>观察 0{i + 1}</span><strong>{state.readings[i] !== undefined ? state.readings[i].toFixed(2) : '—'}</strong><small>{state.readings[i] !== undefined ? '设备记录已保留' : '等待采样'}</small></div>)}</div>
        <div className="sc-counters"><span>提交次数 <b>{state.submissions}</b></span><span>操作数 <b>{registered ? 1 : 0}</b></span><span>仪器启动 <b>{state.starts}</b> 次</span></div>
        <div className="sc-actions">
          <Button className="sc-primary" disabled={registered && !canAdvance} onClick={() => dispatch({ type: registered ? 'advance' : 'submit' })}>{complete ? <Check /> : <FlaskConical />}{!registered ? '提交实验' : complete ? '实验已完成' : unknown ? '先核对状态再继续' : state.readings.length === 3 ? '核验并登记结果' : '执行一步'}{!complete && !unknown && <ChevronRight />}</Button>
          <Button variant="outline" disabled={!registered || !state.connected} onClick={() => dispatch({ type: 'submit' })}><Copy /> 重复提交</Button>
          <Button variant="outline" disabled={!canAdvance} onClick={() => dispatch({ type: 'interrupt' })}><Unplug /> 模拟中断</Button>
        </div>
        <p className="sc-action-hint">{!registered ? '先登记，再逐步采样。你可以在任一步模拟中断。' : unknown ? '已有记录仍在。先核对设备状态，不能直接重新执行。' : complete ? '点击下方「结果溯源」，查看这份结果是怎样产生的。' : '试着重复提交：请求次数增加，操作身份与启动次数保持不变。'}</p>
        {unknown && <div className="sc-recovery"><div><ShieldCheck size={21} /><span><strong>恢复从核对开始</strong><small>保留已有 {state.readings.length}/3 次观察，仪器资源继续占用。</small></span></div><p>可以先模拟设备无响应，观察系统如何保留未知状态；拿到设备记录后，再恢复管理原操作。</p><div><Button variant="outline" onClick={() => dispatch({ type: 'reconcile', available: false })}>模拟核对无响应</Button><Button className="sc-recover-button" onClick={() => dispatch({ type: 'reconcile', available: true })}><RotateCcw /> 核对并恢复</Button></div></div>}
        <div className="sc-resource"><Database size={15} /><span>模拟仪器 <b>{state.reserved ? '占用中' : '空闲'}</b></span><span>已登记预算 <b>{registered ? experiment.reservedBudget : 0} / 100</b></span></div>

        <Tabs value={view} onValueChange={value => setView(String(value))} className="sc-records"><TabsList className="sc-record-tabs" aria-label="实验记录视图"><TabsTrigger value="log">执行记录 <span>{state.logs.length}</span></TabsTrigger><TabsTrigger value="provenance" disabled={!state.result}>结果溯源 {state.result && <FileCheck2 size={14} />}</TabsTrigger></TabsList>
          <TabsContent value="log"><div className="sc-log" aria-label="实验执行历史">{!state.logs.length ? <div className="sc-log-empty"><Database size={23} /><p>操作、输入和结果，会在这里留下记录。</p></div> : <ol>{[...state.logs].reverse().map(log => <li key={log.sequence} className={'sc-log-' + log.kind}><span>{String(log.sequence).padStart(2, '0')}</span><div><strong>{log.title}</strong><p>{log.detail}</p></div></li>)}</ol>}</div></TabsContent>
          <TabsContent value="provenance">{state.result && <div className="sc-provenance"><div className="sc-result"><span>示例平均值</span><strong>{state.result.mean.toFixed(2)}</strong><small>({state.readings.map(n => n.toFixed(2)).join(' + ')}) / 3</small></div><ol><li><span>01</span><div><strong>结果产物 · {state.result.id}</strong><p>根据三条原始观察计算均值。</p></div></li><li><span>02</span><div><strong>执行操作 · {experiment.operationId}</strong><p>Provider：{experiment.provider}<br />仪器启动 {state.starts} 次，操作身份贯穿中断与恢复。</p></div></li><li><span>03</span><div><strong>原始输入与观察</strong><p>输入：参考值 {experiment.input.reference}，采样 {experiment.input.samples} 次。<br />观察：{state.readings.map(n => n.toFixed(2)).join('、')}。</p></div></li></ol><p>预设样例仅展示记录与来源关联，不代表仪器精度或科学结论已通过验证。</p></div>}</TabsContent>
        </Tabs>
        <output className="sc-latest" aria-live="polite">{state.logs.at(-1)?.title ?? '等待提交实验。'}</output>
      </section>
    </div>
    <div className="sc-bottom"><span>本地预设演示；状态保留在当前打开的体验中，不连接真实模型、设备或科研服务。</span><Button variant="outline" onClick={reset}><RotateCcw /> 重新演示</Button><a href="https://github.com/dazhi666666/science-harness" target="_blank" rel="noreferrer">查看 GitHub 仓库 <ArrowUpRight size={16} /></a></div>
  </div>;
}
