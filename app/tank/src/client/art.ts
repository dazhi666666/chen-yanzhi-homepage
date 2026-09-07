import original from '../../assets/art.json';
import {LaikaAnimation} from './laika-animation';
import {childFrame} from './timeline';
const art:any=original;
const color=(n:number)=>'#'+(n>>>0).toString(16).padStart(6,'0').slice(-6);
export class Art {
  cache=new Map<string,{canvas:any;bounds:number[]}>();
  constructor(public makeCanvas:()=>any){}
  laika=new LaikaAnimation();
  drawLaika(ctx:any,tick:number,round:number,alive:boolean,others:number){
    this.laika.update(tick,round,alive,others);
    const b=art.Laika,bob=Math.sin(this.laika.bob),turn=10*Math.sin(this.laika.rotation),headFrame=this.laika.headFrame;
    for(const item of b.sprites[b.symbols.Laika].frames[0]){
      ctx.save();ctx.transform(...item.m);
      if(item.name?.startsWith('head')){ctx.translate(0,2*bob);ctx.rotate(turn*Math.PI/180);}
      else if(item.name?.startsWith('neckA')){ctx.translate(0,3*bob);ctx.rotate(turn*.4*Math.PI/180);}
      else if(item.name?.startsWith('neckB')){ctx.translate(0,4*bob);ctx.rotate(-turn*.2*Math.PI/180);}
      else if(item.name==='cylinder'){ctx.translate(0,4*bob);ctx.rotate(turn*.3*Math.PI/180);}
      this.vector(ctx,b,item.id,item.name?.startsWith('head')?headFrame:1,undefined,undefined,0);ctx.restore();
    }
  }
  paint(ctx:any,value:any){
    if(typeof value==='string')return value;
    const [a,b,c,d,tx,ty]=value.matrix,point=(x:number,y:number)=>[a*x+c*y+tx,b*x+d*y+ty];
    const center=point(value.cx,value.cy),start=point(value.x1,value.y1),end=point(value.x2,value.y2);
    const g=value.kind==='radial'?ctx.createRadialGradient(center[0],center[1],0,center[0],center[1],value.r*Math.hypot(a,b)):ctx.createLinearGradient(start[0],start[1],end[0],end[1]);
    for(const stop of value.stops){const n=parseInt(stop.color.slice(1),16);g.addColorStop(stop.offset,`rgba(${n>>16&255},${n>>8&255},${n&255},${stop.alpha})`);}return g;
  }
  draw(ctx:any,bank:string,symbol:number|string,frame=1,tint?:number,age=0){
    const b=art[bank],id=typeof symbol==='string'?b.symbols[symbol]:symbol;if(id==null)return;
    if(age>0){this.vector(ctx,b,id,frame,tint,undefined,0,age);return;}
    const key=[bank,id,frame,tint].join(':');let cached=this.cache.get(key);
    if(!cached){
      const s=b.sprites[id];const bounds=s?.bounds[Math.min(frame-1,s.bounds.length-1)]??b.shapes[id]?.bounds;if(!bounds||bounds[2]<=0)return;
      const c=this.makeCanvas();c.width=Math.ceil(bounds[2])+4;c.height=Math.ceil(bounds[3])+4;const g=c.getContext('2d');g.translate(2-bounds[0],2-bounds[1]);
      this.vector(g,b,id,frame,tint,undefined,0);cached={canvas:c,bounds};this.cache.set(key,cached);
      if(this.cache.size>256){const oldest=this.cache.keys().next().value!;this.cache.delete(oldest);}
    }
    ctx.drawImage(cached.canvas,cached.bounds[0]-2,cached.bounds[1]-2);
  }
  vector(ctx:any,b:any,id:number,frame:number,tint:number|undefined,override:number|undefined,depth:number,age=0){
    if(depth>20)return;
    const shape=b.shapes[id];
    if(shape){
      for(const p of shape.paths){
        ctx.beginPath();let x=0,y=0;
        for(const op of p.ops){
          const c=op[0];switch(c){
            case 'M':ctx.moveTo(op[1],op[2]);x=op[1];y=op[2];break;
            case 'L':ctx.lineTo(op[1],op[2]);x=op[1];y=op[2];break;
            case 'Q':ctx.quadraticCurveTo(...op.slice(1));x=op[3];y=op[4];break;
            case 'C':ctx.bezierCurveTo(...op.slice(1));x=op[5];y=op[6];break;
            case 'H':ctx.lineTo(op[1],y);x=op[1];break;
            case 'V':ctx.lineTo(x,op[1]);y=op[1];break;
            case 'Z':case 'z':ctx.closePath();break;
          }
        }
        const alpha=ctx.globalAlpha;
        if(p.fill&&p.fill!=='none'){ctx.fillStyle=override===undefined?this.paint(ctx,p.fill):color(override);ctx.globalAlpha=alpha*Number(p['fill-opacity']??1);ctx.fill('evenodd');}
        if(p.stroke&&p.stroke!=='none'){ctx.strokeStyle=override===undefined?this.paint(ctx,p.stroke):color(override);ctx.lineWidth=Number(p['stroke-width']??1);ctx.lineCap=p['stroke-linecap']??'round';ctx.lineJoin=p['stroke-linejoin']??'round';ctx.globalAlpha=alpha*Number(p['stroke-opacity']??1);ctx.stroke();}
        ctx.globalAlpha=alpha;
      }return;
    }
    const sprite=b.sprites[id];if(!sprite?.frames.length)return;
    for(const item of sprite.frames[Math.max(0,Math.min(frame-1,sprite.frames.length-1))]){
      if(b===art.Laika&&item.name==='eye'&&!this.laika.eyeVisible)continue;
      ctx.save();ctx.transform(...item.m);if(item.c)ctx.globalAlpha*=item.c[3];
      const elapsed=Math.max(0,age-Math.max(0,(item.born??1)-1)),child=b.sprites[item.id];
      this.vector(ctx,b,item.id,child?childFrame(child,elapsed):1,tint,item.name==='background'?tint:override,depth+1,elapsed);ctx.restore();
    }
  }
}
export {color};
