export type ControlMode = 'legacy' | 'point' | 'tracks' | 'buttons';
export interface TankInput { forward:boolean; backup:boolean; turnLeft:boolean; turnRight:boolean; fire:boolean; legacy?:{angle:number;distance:number} }
export function legacyInput(x:number,y:number,rotation:number,fire=false):TankInput {
 const distance=Math.min(1,Math.hypot(x,y))*120;
 return {...idleInput(),fire,forward:distance>60,legacy:{angle:distance>6?wrap(Math.atan2(y,x)*180/Math.PI+90):rotation,distance:distance>6?distance:0}};
}
export const idleInput = ():TankInput => ({forward:false,backup:false,turnLeft:false,turnRight:false,fire:false});
export const wrap = (a:number) => ((a+180)%360+360)%360-180;
export interface DrivingState { moving:boolean; reverse:boolean }
export function pointInput(x:number,y:number,rotation:number,state:DrivingState,fire=false,remote=false):TankInput {
  const out=idleInput();out.fire=fire;
  const magnitude=Math.hypot(x,y);
  if(magnitude<=.05){state.moving=false;return out;}
  const wanted=Math.atan2(y,x)*180/Math.PI+90;
  let error=wrap(wanted-rotation);
  if(!remote){
    const reverse=Math.abs(error)===90?state.reverse:Math.abs(error)>90;
    if(reverse!==state.reverse)state.moving=false;
    state.reverse=reverse;
    if(reverse)error=wrap(error+180);
  }
  const turnStep=remote?15:10;
  out.turnLeft=error < -turnStep/2;out.turnRight=error>turnStep/2;
  if(remote)return out;
  if(magnitude<.45||Math.abs(error)>45)state.moving=false;
  else if(Math.abs(error)<30)state.moving=true;
  if(state.moving){out.forward=!state.reverse;out.backup=state.reverse;}
  return out;
}
export function tracksInput(x:number,y:number,fire=false):TankInput {
  return {forward:y<-.25,backup:y>.25,turnLeft:x<-.25,turnRight:x>.25,fire};
}
export function validateInput(value:unknown):TankInput|null {
  if(!value||typeof value!=='object')return null;
  const out=idleInput();
  for(const key of ['forward','backup','turnLeft','turnRight','fire'] as const){if(typeof (value as any)[key]!=='boolean')return null;out[key]=(value as any)[key];}
  if('legacy' in value){const v=(value as any).legacy;if(!v||!Number.isFinite(v.angle)||Math.abs(v.angle)>180||!Number.isFinite(v.distance)||v.distance<0||v.distance>120)return null;out.legacy={angle:v.angle,distance:v.distance};out.forward=v.distance>60;out.backup=out.turnLeft=out.turnRight=false;}
  return out;
}
