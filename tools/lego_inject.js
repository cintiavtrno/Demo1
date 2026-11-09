/* ===== Versão tijolinhos: pós-processamento "mosaico de peças" =====
   O mundo (cenário, personagens, objetos) vira mosaico de peças 1x1 com pino, em paleta de tijolos.
   A interface (relógio, bandeja, diálogos) fica nítida numa segunda câmera.
   Teclas: L liga/desliga · [ e ] mudam o tamanho do pino. */
(function(){
 if(typeof Main==='undefined'||!window.Phaser)return;
 const PAL=[
  [242,243,242],[228,228,222],[163,162,164],[108,110,108],[27,42,52],     // branco, cinza claro, cinza, cinza escuro, preto
  [53,33,0],[105,64,40],[124,92,70],[170,125,85],[204,142,105],[246,215,179],[228,205,158],[149,138,115], // marrons / tons de pele / bege
  [160,95,52],[218,133,64],[249,186,97],[245,205,47],[255,240,141],           // laranjas e amarelos
  [196,40,27],[123,46,47],[222,110,90],[238,157,195],                           // vermelhos e rosa
  [13,105,171],[32,58,86],[115,150,200],[116,134,157],[180,210,228],              // azuis
  [40,127,70],[32,80,50],[160,188,172],[155,160,98],[166,202,85],                 // verdes
  [0,143,155],[95,38,131],[205,164,222]                                            // turquesa, roxos
 ];
 const FRAG=`precision mediump float;
uniform sampler2D uMainSampler;uniform vec2 uRes;uniform float uCell;uniform vec3 uPal[${PAL.length}];
varying vec2 outTexCoord;
vec3 near(vec3 c){float best=1e9;vec3 r=c;for(int i=0;i<${PAL.length};i++){vec3 p=uPal[i];vec3 d=c-p;float rm=(c.r+p.r)*.5;float e=(2.+rm)*d.r*d.r+4.*d.g*d.g+(3.-rm)*d.b*d.b;if(e<best){best=e;r=p;}}return r;}
void main(){
 vec2 px=outTexCoord*uRes;vec2 g=px/uCell;vec2 cell=floor(g);vec2 f=fract(g);vec2 base=cell*uCell;
 vec4 s=texture2D(uMainSampler,(base+uCell*vec2(.25,.25))/uRes)+texture2D(uMainSampler,(base+uCell*vec2(.75,.25))/uRes)
       +texture2D(uMainSampler,(base+uCell*vec2(.25,.75))/uRes)+texture2D(uMainSampler,(base+uCell*vec2(.75,.75))/uRes);
 s*=.25;float a=s.a;vec3 c=a>.001?s.rgb/a:vec3(0.);
 c=near(c);
 vec2 q=f-.5;float d=length(q);float R=.34;vec3 col;
 if(d<R){vec2 n=q/R;float l=-(n.x+n.y)*.5;col=c*(1.+.34*l);if(d>R*.8)col*=.82;col+= (d<R*.5&&l>.2)?vec3(.05):vec3(0.);}
 else{col=c*.88;float sh=smoothstep(R+.16,R,d)*step(0.,q.x+q.y);col*=1.-.22*sh;}
 float e=min(min(f.x,1.-f.x),min(f.y,1.-f.y));col*=.9+.1*smoothstep(0.,.08,e);
 gl_FragColor=vec4(col*a,a);
}`;
 const L=window.LEGO={on:!window.__legoStartOff,cell:(ZOOM>=3?2:3),min:2,max:4};
 class LegoFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline{
  constructor(game){super({game,name:'LegoFX',fragShader:FRAG});this._pal=new Float32Array(PAL.flat().map(v=>v/255));}
  onPreRender(){this.set2f('uRes',this.renderer.width,this.renderer.height);this.set1f('uCell',L.cell*ZOOM);this.set3fv('uPal',this._pal);}
 }
 const _c=Main.prototype.create;
 Main.prototype.create=function(){
  const r=_c.apply(this,arguments);
  try{
   const rd=this.game.renderer;
   if(!rd.pipelines||rd.type!==Phaser.WEBGL)return r;
   if(!rd.pipelines.getPostPipeline('LegoFX'))rd.pipelines.addPostPipeline('LegoFX',LegoFX);
   const main=this.cam;
   const ui=this.cameras.add(0,0,main.width,main.height);ui.setOrigin(0,0);ui.setZoom(ZOOM);ui.setScroll(0,0);
   this.uiCam=ui;L.scene=this;
   const apply=()=>{if(L.on)main.setPostPipeline('LegoFX');else main.resetPostPipeline()};L.apply=apply;apply();
   // cada objeto é desenhado por uma câmera só: interface (fixa e acima de 850) na nítida, o resto no mosaico
   this.events.on('prerender',()=>{
    const lst=this.children.list;
    for(let i=0;i<lst.length;i++){const o=lst[i];
     const isUI=L.on&&o.scrollFactorX===0&&o.depth>=850;
     if(isUI)o.cameraFilter=(o.cameraFilter|main.id)&~ui.id;
     else o.cameraFilter=(o.cameraFilter|ui.id)&~main.id;}
   });
  }catch(e){console.warn('lego',e)}
  return r};
 addEventListener('keydown',e=>{
  if(e.key==='l'||e.key==='L'){L.on=!L.on;L.apply&&L.apply()}
  else if(e.key==='['){L.cell=Math.max(L.min,L.cell-1)}
  else if(e.key===']'){L.cell=Math.min(L.max,L.cell+1)}
 });
})();
