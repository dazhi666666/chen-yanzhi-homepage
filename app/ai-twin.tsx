'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Send, Square, RotateCcw } from 'lucide-react';
import Markdown from 'react-markdown';
import './ai-twin.css';

type Message = { role: 'user' | 'assistant'; content: string };
const suggestions = ['先介绍一下你做的项目', 'Agent Router 和 science-harness 有什么区别？', '悟空智投的工作流程是什么？', '坦克动荡可以怎么玩？'];

export default function AiTwin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (nearBottom.current && conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight;
  }, [messages, busy, error]);

  async function ask(question = input) {
    const text = question.trim();
    if (!text || controller.current || text.length > 1500) return;
    const endpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT || 'https://game.dzskyid.cn/api/chat';
    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setError('');
    setBusy(true);
    nearBottom.current = true;
    const request = new AbortController();
    controller.current = request;
    const timeout = window.setTimeout(() => request.abort('timeout'), 60000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12) }), signal: request.signal,
      });
      if (!response.ok) throw new Error(response.status === 429 ? '提问有点频繁，请稍等一分钟再试。' : '暂时没能连接 AI，请稍后重试。');
      const result = await response.json() as { reply?: string };
      if (!result.reply?.trim()) throw new Error('AI 暂时没有返回回答，请再试一次。');
      setMessages([...next, { role: 'assistant', content: result.reply }]);
    } catch (cause) {
      setMessages(messages);
      setInput(text);
      setError(request.signal.aborted ? (request.signal.reason === 'timeout' ? '回答等待超时，问题已保留，可以重试。' : '已停止，问题已保留。') : cause instanceof Error ? cause.message : '连接失败，请重试。');
    } finally {
      clearTimeout(timeout);
      controller.current = null;
      setBusy(false);
    }
  }

  return (
    <section className="ai-twin section-shell" id="ai-twin" aria-labelledby="twin-title">
      <div className="twin-persona">
        <div className="eyebrow">03 / ME, IN ANOTHER FORM</div>
        <span className="twin-badge"><i /> AI 数字分身 · 项目向导</span>
        <h2 id="twin-title">你好，<br />我是 <span>数字分身。</span></h2>
        <p>把好奇心留给我。<br />从一个想法到一段实现，<br />聊聊这八个项目背后的故事。</p>
        <div className="twin-knowledge"><span>08</span><div>个项目的完整介绍<br /><small>作为每次回答的参考</small></div></div>
      </div>
      <div className="twin-chat">
        <div className="twin-chat-head"><span><i /> {busy ? '正在翻阅项目、组织回答…' : '关于作品，尽管问我'}</span><button type="button" disabled={busy || !messages.length} onClick={() => { setMessages([]); setError(''); inputRef.current?.focus(); }} aria-label="清空当前对话"><RotateCcw size={16} /> 重新聊</button></div>
        <div className="twin-conversation" ref={conversation} role="log" aria-label="与 AI 分身的对话" aria-live="polite" onScroll={(event) => { const el = event.currentTarget; nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 90; }}>
          <div className="twin-message assistant"><span className="twin-speaker">数字分身</span><p>欢迎来到我的好奇心实验室！我可以根据陈炎志的项目介绍，聊聊各个作品解决的问题、技术思路和使用场景。你想先了解哪一个？</p></div>
          {messages.map((message, index) => <div key={index} className={'twin-message ' + message.role}><span className="twin-speaker">{message.role === 'user' ? '你' : '数字分身'}</span><Markdown components={{ a: ({ href, children }) => <a href={href} target={href?.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{children}</a> }}>{message.content}</Markdown></div>)}
          {busy && <div className="twin-thinking" role="status"><span /><span /><span /> 正在思考</div>}
        </div>
        {!messages.length && <div className="twin-suggestions">{suggestions.map((question) => <button key={question} disabled={busy} onClick={() => void ask(question)}>{question}<ArrowUpRight size={14} /></button>)}</div>}
        {error && <p className="twin-error" role="alert">{error}</p>}
        <form className="twin-composer" onSubmit={(event) => { event.preventDefault(); void ask(); }}>
          <label className="sr-only" htmlFor="twin-question">向 数字分身提问</label>
          <textarea ref={inputRef} id="twin-question" value={input} disabled={busy} maxLength={1500} rows={2} placeholder="你想了解哪个项目？" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void ask(); } }} />
          {busy ? <button type="button" className="twin-send" onClick={() => controller.current?.abort()} aria-label="停止回答"><Square size={17} /></button> : <button className="twin-send" type="submit" disabled={!input.trim()} aria-label="发送问题"><Send size={19} /></button>}
        </form>
        <p className="twin-disclosure">AI 分身，非本人实时回复。提问时，会将对话和公开项目介绍发送至 AI 服务；回答仅供了解项目，请勿输入敏感信息。</p>
      </div>
    </section>
  );
}
