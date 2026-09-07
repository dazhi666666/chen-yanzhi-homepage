'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SoloSession } from './tank/solo-session';
import { Art } from './tank/src/client/art';
import { controls, paintBattle } from './tank/paint';
import type { TankInput } from './tank/src/core/input';
import './tank-demo.css';

export default function TankDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<SoloSession | null>(null);
  const [mode, setMode] = useState<'ready'|'playing'|'paused'>('ready');
  const [score, setScore] = useState({you:0, laika:0, round:1});
  const [error, setError] = useState(false);
  const refresh = useRef<()=>void>(()=>{});

  useEffect(() => {
    const canvas = canvasRef.current!, host = hostRef.current!;
    const context = canvas.getContext('2d');
    if (!context) { setError(true); return; }
    const game = new SoloSession(); sessionRef.current = game;
    const art = new Art(()=>document.createElement('canvas'));
    let width = 800, height = 460, last = 0, raf = 0, lastScore = '', stickId: number|null = null;
    let stickCenter = {x:83,y:height-88};
    const firePointers = new Set<number>();
    function release() { game.clearInput(); stickId=null; firePointers.clear(); stickCenter=controls(width,height).stick; }
    function draw() {
      const state = game.match.view();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      context!.setTransform(ratio,0,0,ratio,0,0);
      paintBattle(context!,art,state,width,height,{...game.stick,cx:stickCenter.x,cy:stickCenter.y},game.fireHeld||game.keyboard.fire);
      const value = `${state.scores[0]}:${state.scores[1]}:${state.round}`;
      if(value!==lastScore){lastScore=value;setScore({you:state.scores[0],laika:state.scores[1],round:state.round});}
    }
    function resize() {
      width = Math.max(280,host.getBoundingClientRect().width);
      height = width<620 ? 540 : Math.max(430,Math.round(width*.55));
      const ratio = Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);canvas.style.height=height+'px';
      release(); draw();
    }
    refresh.current=()=>{release();draw();};
    function pause() { if(game.playing){game.pause();setMode('paused');} release();draw(); }
    const position = (event:PointerEvent) => {const rect=canvas.getBoundingClientRect();return {x:(event.clientX-rect.left)*width/rect.width,y:(event.clientY-rect.top)*height/rect.height};};
    function down(event:PointerEvent) {
      if(!game.playing)return;
      const p=position(event), fire=controls(width,height).fire;
      let handled=false;
      if(Math.hypot(p.x-fire.x,p.y-fire.y)<59){firePointers.add(event.pointerId);game.fireHeld=true;game.firePulse=true;handled=true;}
      else if(p.x<width*.42&&p.y>65&&stickId===null){
        stickId=event.pointerId;
        stickCenter={x:Math.max(65,Math.min(width*.32,p.x)),y:Math.max(120,Math.min(height-65,p.y))};handled=true;move(event);
      }
      if(handled){event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);draw();}
    }
    function move(event:PointerEvent) {
      if(stickId!==event.pointerId)return;
      const p=position(event),x=(p.x-stickCenter.x)/55,y=(p.y-stickCenter.y)/55,magnitude=Math.max(1,Math.hypot(x,y));
      game.stick={x:x/magnitude,y:y/magnitude};event.preventDefault();
    }
    function up(event:PointerEvent) {
      if(stickId===event.pointerId){stickId=null;game.stick={x:0,y:0};game.drive.moving=false;stickCenter=controls(width,height).stick;}
      firePointers.delete(event.pointerId);game.fireHeld=firePointers.size>0;
      if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
    }
    const keys:Record<string,Exclude<keyof TankInput,'legacy'>>={ArrowUp:'forward',KeyW:'forward',ArrowDown:'backup',KeyS:'backup',ArrowLeft:'turnLeft',KeyA:'turnLeft',ArrowRight:'turnRight',KeyD:'turnRight',Space:'fire',KeyM:'fire'};
    function keydown(event:KeyboardEvent){if(!game.playing)return;if(event.code==='KeyP'){event.preventDefault();pause();return;}const key=keys[event.code];if(key){event.preventDefault();game.keyboard[key]=true;}}
    function keyup(event:KeyboardEvent){const key=keys[event.code];if(key){event.preventDefault();game.keyboard[key]=false;}}
    function frame(time:number) {if(game.playing){game.advance(last?time-last:0);draw();}last=time;raf=requestAnimationFrame(frame);}
    function visibility(){if(document.hidden)pause();}
    function focusOut(event:FocusEvent){if(!host.contains(event.relatedTarget as Node|null))pause();}
    const observer = new ResizeObserver(resize);observer.observe(host);
    canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('lostpointercapture',up);
    canvas.addEventListener('keydown',keydown);canvas.addEventListener('keyup',keyup);host.addEventListener('focusout',focusOut);
    document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',pause);
    resize();raf=requestAnimationFrame(frame);
    return ()=>{game.pause();sessionRef.current=null;refresh.current=()=>{};cancelAnimationFrame(raf);observer.disconnect();art.cache.clear();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('lostpointercapture',up);canvas.removeEventListener('keydown',keydown);canvas.removeEventListener('keyup',keyup);host.removeEventListener('focusout',focusOut);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',pause);};
  }, []);

  function start(){sessionRef.current?.resume();setMode('playing');canvasRef.current?.focus({preventScroll:true});}
  function pause(){sessionRef.current?.pause();refresh.current();setMode('paused');}
  function restart(){sessionRef.current?.restart();refresh.current();setMode('ready');}
  return <div className="tank-demo">
    <div className="demo-heading"><div><span className="demo-kicker">TANK TROUBLE / SOLO PLAY</span><h3>来一局，挑战 Laika。</h3><p>多人对战游戏的单人试玩 · 默认旧版鼠标摇杆</p></div></div>
    <div className="tank-stage" ref={hostRef}>
      <div className="tank-scoreboard" aria-live="polite"><span className="player-score">你 <strong>{score.you}</strong></span><span>第 {score.round} 回合</span><span className="laika-score">Laika <strong>{score.laika}</strong></span></div>
      <div className="tank-canvas-wrap"><canvas ref={canvasRef} tabIndex={0} aria-label="坦克单人对战：方向键或 WASD 移动，空格开火，P 暂停。触屏使用左侧默认摇杆和右侧开火按钮。" aria-describedby="tank-help" />{(mode!=='playing'||error)&&<div className="tank-cover"><div><span className="demo-kicker">YOU × LAIKA</span><h4>{error?'暂时无法启动画布':mode==='ready'?'反弹，也可能击中自己。':'休息一下，再战一局。'}</h4><p>{error?'请使用支持 Canvas 的浏览器打开试玩。':'左手控制方向，右手开火。击毁对手得分，回合结束后自动换图。'}</p>{!error&&<Button className="tank-start" onClick={start}><Play fill="currentColor"/>{mode==='ready'?'开始单人对战':'继续对战'}</Button>}</div></div>}</div>
      <div className="tank-action-bar"><span>{mode==='playing'?'对战中':mode==='paused'?'已暂停':'准备就绪'} · 无需联网</span><div><Button variant="outline" onClick={mode==='playing'?pause:start} disabled={error}>{mode==='playing'?<Pause/>:<Play/>}{mode==='playing'?'暂停':'开始 / 继续'}</Button><Button variant="outline" onClick={restart} disabled={error}><RotateCcw/>重新开局</Button></div></div>
    </div>
    <div id="tank-help" className="tank-help"><p><strong>默认摇杆</strong>蓝色内区仅转向，推过半径一半进入绿色区后前进，不自动倒车；右侧按住开火。</p><p><strong>键盘操作</strong>方向键 / WASD 控制，空格 / M 开火，P 暂停。切走页面会自动暂停。</p><p><strong>试玩规则</strong>普通炮弹会反弹，箱子提供激光。这里仅体验单人模式，完整项目以多人对战为核心。</p></div>
  </div>;
}

