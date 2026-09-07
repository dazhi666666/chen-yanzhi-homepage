import { Art } from './src/client/art';
import { drawPaths } from './src/client/paths';
import type { ViewState } from './src/core/runtime';

export function controls(w: number, h: number) {
  return { stick: { x: 83, y: h - 88, radius: 55 }, fire: { x: w - 75, y: h - 80, radius: 49 } };
}

export function paintBattle(c: CanvasRenderingContext2D, art: Art, state: ViewState, w: number, h: number, stick: { x: number; y: number; cx: number; cy: number }, firing: boolean) {
  c.clearRect(0, 0, w, h);
  c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
  const text = (value: string, x: number, y: number, size = 14, color = '#68725f') => {
    c.fillStyle = color; c.font = `${size}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(value, x, y);
  };
  const compact = w < 620;
  const area = compact ? { x: 15, y: 58, w: w - 30, h: h - 235 } : { x: 150, y: 40, w: w - 300, h: h - 85 };
  const scale = Math.min(area.w / (state.width + 12), area.h / (state.height + 12));
  const x = area.x + (area.w - state.width * scale) / 2;
  const y = area.y + (area.h - state.height * scale) / 2;
  c.save(); c.translate(x, y); c.scale(scale, scale);
  c.fillStyle = '#e7e7e7'; c.fillRect(0, 0, state.width, state.height);
  c.lineCap = 'square'; c.lineJoin = 'miter'; c.strokeStyle = '#4d4d4d';
  for (const wall of state.walls) {
    c.lineWidth = 2 * wall.half; c.beginPath(); c.moveTo(wall.x1, wall.y1); c.lineTo(wall.x2, wall.y2); c.stroke();
  }
  for (const entity of state.entities) {
    if (['mazeBackground', 'AI'].includes(entity.kind)) continue;
    c.save(); c.translate(entity.x, entity.y); c.rotate(entity.rotation * Math.PI / 180); c.scale(entity.sx, entity.sy); c.globalAlpha = Math.max(0, Math.min(1, entity.alpha));
    if (entity.kind === 'gameTank') {
      art.draw(c, 'GameTank', 4, 1, entity.color); art.draw(c, 'GameTank', 68, entity.frame, entity.color);
    } else if (entity.kind === 'crate') art.draw(c, 'Crate', 'crate', 1);
    else if (!['effect', 'aimer', 'laser', 'deathRay', 'elToro', 'rCSignal', 'gatling', 'shield'].includes(entity.kind)) {
      art.draw(c, 'TankTroublev40', entity.kind, entity.frame, entity.color, entity.visualAge ?? 0);
    }
    drawPaths(c, entity.paths, entity.alpha); c.restore();
  }
  c.restore();
  const player = state.entities.find(e => e.kind === 'gameTank' && e.player === 0);
  text(`第 ${state.round} 回合`, w / 2, 22, 13);
  text(player ? (player.weapon === 'laser' ? '已拾取激光' : '普通炮弹') : '等待下一回合', compact ? w-68 : w-75, compact ? h-157 : 30, 12);
  if (state.phase !== '对战中') text(state.phase, w / 2, compact ? h-173 : h-21, 14);
  c.save(); c.translate(compact ? w-55 : w-75, compact ? h-194 : 110); c.scale(-.23, .23);
  art.drawLaika(c, state.tick, state.round, state.entities.some(e => e.kind === 'gameTank' && e.player === 1), player ? 1 : 0); c.restore();
  // Original default legacy stick: heading inside, forward strictly beyond .5.
  const driving = Math.hypot(stick.x, stick.y) > .5;
  c.save(); c.setLineDash([]);
  c.strokeStyle = '#4c7837'; c.fillStyle = '#b9dba5'; c.lineWidth = 2;
  c.beginPath(); c.arc(stick.cx, stick.cy, 55, 0, Math.PI*2); c.fill(); c.stroke();
  c.fillStyle = '#afd5ef'; c.beginPath(); c.arc(stick.cx, stick.cy, 55*.5, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 5; c.stroke(); c.strokeStyle = '#356d94'; c.lineWidth = 2; c.stroke();
  const ly = Math.min(h-17,stick.cy+72), lx = Math.max(7,stick.cx-68);
  c.fillStyle='#356d94';c.fillRect(lx,ly-4,8,8);text('仅转向',lx+32,ly,11,'#356d94');
  c.fillStyle='#4c7837';c.fillRect(lx+72,ly-4,8,8);text('前进',lx+97,ly,11,'#4c7837');
  c.fillStyle = driving ? '#5a873b' : '#437fa8'; c.strokeStyle='#fff';c.lineWidth=2;
  c.beginPath(); c.arc(stick.cx+stick.x*55, stick.cy+stick.y*55, 16, 0, Math.PI*2); c.fill();c.stroke();c.restore();
  const fire = controls(w,h).fire;
  c.fillStyle = firing ? '#9e2f2b' : '#bb4840'; c.strokeStyle = '#71322b'; c.lineWidth = 3;
  c.beginPath(); c.arc(fire.x,fire.y,fire.radius,0,Math.PI*2); c.fill(); c.stroke(); text('开火',fire.x,fire.y,21,'#fff6e7');
  text('按住连续射击',w-75,h-17,12);
}
