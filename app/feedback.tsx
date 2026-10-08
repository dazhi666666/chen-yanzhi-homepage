'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import './feedback.css';

const kinds = [
  { id: 'suggestion', label: '提个建议' },
  { id: 'bug', label: '发现问题' },
  { id: 'praise', label: '说声喜欢' },
  { id: 'other', label: '其他想法' },
] as const;
type Kind = (typeof kinds)[number]['id'];

const endpoint = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT || 'https://game.dzskyid.cn/api/feedback';

export default function Feedback() {
  const [kind, setKind] = useState<Kind>('suggestion');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = message.trim();
    if (!text || sending) return;
    setSending(true);
    setError('');
    const request = new AbortController();
    timer.current = window.setTimeout(() => request.abort('timeout'), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: kind, message: text, name: name.trim(), contact: contact.trim() }),
        signal: request.signal,
      });
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? '提交有点频繁，请十分钟后再试。'
            : response.status === 503
              ? '反馈通道还在准备中，请稍后再来。'
              : '暂时没提交成功，请稍后重试。',
        );
      }
      setDone(true);
    } catch (cause) {
      setError(cause instanceof Error && cause.message ? cause.message : '暂时没提交成功，请稍后重试。');
    } finally {
      window.clearTimeout(timer.current);
      setSending(false);
    }
  }

  function reset() {
    setDone(false);
    setKind('suggestion');
    setMessage('');
    setName('');
    setContact('');
    setError('');
  }

  return (
    <section className="feedback section-shell" id="feedback" aria-labelledby="feedback-title">
      <div className="feedback-persona">
        <div className="eyebrow">04 / YOUR TURN</div>
        <span className="feedback-badge">
          <i /> 反馈 · 让这里更好
        </span>
        <h2 id="feedback-title">
          看完之后，
          <br />
          <span>和我说说？</span>
        </h2>
        <p>
          一句建议、一个 bug，
          <br />
          或者只是打个招呼，
          <br />
          都会被认真读到。
        </p>
        <div className="feedback-note">
          <span>04</span>
          <div>
            类反馈都欢迎
            <br />
            <small>建议 / 问题 / 喜欢 / 其他</small>
          </div>
        </div>
      </div>
      <div className="feedback-card">
        {done ? (
          <div className="feedback-done" role="status">
            <span className="feedback-done-icon">
              <Check size={24} />
            </span>
            <h3>收到你的反馈，谢谢！</h3>
            <p>每一条都会被认真看。</p>
            <button type="button" onClick={reset}>
              再写一条 <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <fieldset className="feedback-kinds">
              <legend>
                想说的类型 <em>选一个</em>
              </legend>
              <div>
                {kinds.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={kind === item.id ? 'active' : ''}
                    aria-pressed={kind === item.id}
                    onClick={() => setKind(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="feedback-label" htmlFor="feedback-message">
              想说的话 <em>必填</em>
            </label>
            <textarea
              id="feedback-message"
              value={message}
              maxLength={1000}
              rows={5}
              required
              placeholder="哪里让你停留了一下？哪里希望更好？随便写。"
              onChange={(event) => setMessage(event.target.value)}
            />
            <div className="feedback-row">
              <div>
                <label htmlFor="feedback-name">
                  怎么称呼你 <em>选填</em>
                </label>
                <input
                  id="feedback-name"
                  value={name}
                  maxLength={30}
                  placeholder="昵称就好"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="feedback-contact">
                  联系方式 <em>选填</em>
                </label>
                <input
                  id="feedback-contact"
                  value={contact}
                  maxLength={80}
                  placeholder="邮箱 / 微信，方便回复"
                  onChange={(event) => setContact(event.target.value)}
                />
              </div>
            </div>
            {error && (
              <p className="feedback-error" role="alert">
                {error}
              </p>
            )}
            <div className="feedback-actions">
              <button className="feedback-submit" type="submit" disabled={sending || !message.trim()}>
                {sending ? (
                  '正在发送…'
                ) : (
                  <>
                    发送反馈 <Send size={15} />
                  </>
                )}
              </button>
              <span className="feedback-count">{message.length}/1000</span>
            </div>
          </form>
        )}
        <p className="feedback-disclosure">反馈只会发给站长本人，不会公开展示；如需回复请留下联系方式，请勿填写敏感信息。</p>
      </div>
    </section>
  );
}
