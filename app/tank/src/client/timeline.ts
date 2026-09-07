/** Advance a visual child timeline, honoring exported stop/gotoAndStop frames. */
export function childFrame(sprite:{frames:any[];controls?:Record<string,{stop?:boolean;goto?:number}>},age:number):number {
 const length=sprite.frames.length;if(length<=1)return 1;
 let frame=1;
 const visited=new Map<number,number>();let elapsed=0;
 while(elapsed<=age){
  const control=sprite.controls?.[frame];if(control?.stop)return control.goto??frame;
  if(elapsed===age)return frame;
  const prior=visited.get(frame);if(prior!==undefined){const period=elapsed-prior;const skip=Math.floor((age-elapsed)/period)*period;if(skip){elapsed+=skip;continue;}}
  visited.set(frame,elapsed);frame=frame%length+1;elapsed++;
 }return frame;
}
