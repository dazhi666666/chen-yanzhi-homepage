// Direct state/easing port of Core_game_logic_frame53.as Laika.onEnterFrame.
// Visual randomness never enters the simulation random stream.
export class LaikaAnimation {
 animation:'idle'|'growl'|'scoff'='idle';counter=0;rotation=0;bob=0;targetRotation=0;targetBob=0;eye=0;headFrame=1;eyeVisible=true;tick=-1;round=-1;alive=true;others=0;
 constructor(public random:()=>number=Math.random){}
 react(animation:'idle'|'growl'|'scoff'){
  this.animation=animation;
  while(this.targetRotation>6.283185){this.targetRotation-=6.283185;this.rotation-=6.283185;}
  while(this.targetBob>6.283185){this.targetBob-=6.283185;this.bob-=6.283185;}
  this.counter=0;
 }
 step(){
  switch(this.animation){
   case 'idle':this.targetRotation=0;this.targetBob=this.counter;this.headFrame=1;break;
   case 'growl':this.targetRotation=1.570796+this.random();this.targetBob=1.570796+this.random();this.headFrame=3;if(this.counter>4)this.react('idle');break;
   case 'scoff':this.targetRotation=1.570796;this.targetBob=1.570796+this.counter*10;this.headFrame=2;if(this.counter>3)this.react('idle');break;
  }
  this.counter+=.1;if(Math.floor(this.random()*30)===0)this.eye=Math.floor(this.random()*3);
  if(this.eye>0){this.eye--;this.eyeVisible=false;}else this.eyeVisible=true;
  this.rotation+=(this.targetRotation-this.rotation)*.3;this.bob+=(this.targetBob-this.bob)*.3;
 }
 update(tick:number,round:number,alive:boolean,others:number){
  if(this.round!==round||tick<this.tick){this.round=round;this.tick=tick-1;this.alive=alive;this.others=others;this.react('idle');}
  if(this.alive&&!alive)this.react('growl');else if(others<this.others)this.react('scoff');this.alive=alive;this.others=others;
  for(let i=0,n=Math.min(125,Math.max(0,tick-this.tick));i<n;i++)this.step();this.tick=tick;
 }
}
