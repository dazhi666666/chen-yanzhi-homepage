import type {DrawPath,Gradient} from '../core/runtime';
const hex=(n:number)=>'#'+(n>>>0).toString(16).padStart(6,'0').slice(-6);
export function gradientPaint(ctx:any,g:Gradient){
 const {x,y,w,h,r}=g.box,cx=x+w/2,cy=y+h/2,dx=Math.cos(r)*w/2,dy=Math.sin(r)*w/2;
 const paint=g.type==='radial'?ctx.createRadialGradient(cx,cy,0,cx,cy,Math.abs(w)/2):ctx.createLinearGradient(cx-dx,cy-dy,cx+dx,cy+dy);
 const stops=g.ratios.map((ratio,i)=>({at:Math.max(0,Math.min(1,ratio/255)),n:g.colors[i],a:g.alphas[i]/100})).sort((a,b)=>a.at-b.at);
 for(const s of stops)paint.addColorStop(s.at,`rgba(${s.n>>16&255},${s.n>>8&255},${s.n&255},${s.a})`);return paint;
}
export function drawPaths(c:any,paths:DrawPath[],alpha:number){
 for(const path of paths){if(!path.points.length)continue;c.beginPath();c.moveTo(path.points[0].x,path.points[0].y);for(const p of path.points.slice(1))c.lineTo(p.x,p.y);
  if(path.fill!==undefined){c.globalAlpha=Math.max(0,alpha*(path.fillAlpha??100)/100);c.fillStyle=path.fillGradient?gradientPaint(c,path.fillGradient):hex(path.fill);c.fill();}
  if(path.width>0){c.lineWidth=path.width;c.strokeStyle=path.gradient?gradientPaint(c,path.gradient):hex(path.color);c.globalAlpha=Math.max(0,alpha*path.alpha/100);c.lineCap='round';c.stroke();}
 }
}
