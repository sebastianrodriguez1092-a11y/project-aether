// AETHER_PROLOGUE_3D_V3
(()=>{
const boot=()=>{
 if(window.__AETHER_PROLOGUE_INSTALLED)return;
 window.__AETHER_PROLOGUE_INSTALLED=true;
 const THREE=window.AetherThree;if(!THREE)return;
 const style=document.createElement('style');style.textContent=`
#aetherPrologue{position:fixed;inset:0;z-index:95;background:#03070b;color:#eee;overflow:hidden;font-family:Inter,system-ui,sans-serif}
#aetherPrologue canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#aetherPrologue .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 48%,transparent 28%,rgba(0,0,0,.22) 62%,rgba(0,0,0,.86) 100%)}
#aetherPrologue .top{position:absolute;left:6vw;top:7vh;letter-spacing:5px;font:700 11px Georgia,serif;color:#d9c28b;text-shadow:0 2px 12px #000}
#aetherPrologue .title{position:absolute;left:6vw;bottom:17vh;max-width:760px;text-shadow:0 5px 30px #000}
#aetherPrologue h1{margin:0 0 12px;font:600 clamp(30px,5vw,68px)/.98 Georgia,serif;letter-spacing:3px;color:#f3e3bd}
#aetherPrologue p{margin:0;color:#c7d1d9;font-size:clamp(13px,1.35vw,18px);line-height:1.65;max-width:680px}
#aetherPrologue .dialogue{position:absolute;left:50%;bottom:5.5vh;transform:translateX(-50%);width:min(900px,88vw);padding:18px 22px;background:linear-gradient(180deg,rgba(4,9,15,.78),rgba(3,6,10,.94));border:1px solid rgba(214,184,112,.6);box-shadow:0 20px 60px #0009;backdrop-filter:blur(5px)}
#aetherPrologue .speaker{color:#e5c77e;font:700 12px Georgia,serif;letter-spacing:2px;margin-bottom:7px}
#aetherPrologue .line{font-size:15px;line-height:1.55;color:#edf2f5;min-height:47px}
#aetherPrologue button{margin-top:12px;padding:9px 18px;border:1px solid #d8bc7a;background:linear-gradient(#e5ce92,#956d34);color:#160f07;font-weight:900;letter-spacing:1.5px;cursor:pointer}
#aetherPrologue .skip{position:absolute;right:24px;top:20px;background:#050a10aa;color:#d8e0e6;border:1px solid #ffffff33}
#aetherPrologue .caption{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:700 clamp(24px,4vw,54px) Georgia,serif;letter-spacing:8px;color:#fff;opacity:0;text-shadow:0 0 30px #6db7ff;pointer-events:none;white-space:nowrap}
`;
document.head.appendChild(style);
const root=document.createElement('div');root.id='aetherPrologue';root.innerHTML=`<canvas></canvas><div class="vignette"></div><div class="top">PROJECT AETHER · PRÓLOGO</div><div class="title"><h1>LA ÚLTIMA AURORA</h1><p>La noche en que las tres lunas se alinearon, las antiguas defensas despertaron. Algo respondió desde el Umbral de Obsidiana.</p></div><div class="dialogue"><div class="speaker">ORDEN DEL ALBA</div><div class="line">Despierta, caminante. La frontera ha caído. Si puedes oírme, todavía queda una oportunidad.</div><button id="aetherBeginStory">CONTINUAR LA HISTORIA</button></div><button class="skip" id="aetherSkipStory">SALTAR</button><div class="caption">AETHER</div>`;document.body.appendChild(root);
const canvas=root.querySelector('canvas'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x06111a);scene.fog=new THREE.FogExp2(0x07131d,.028);
const camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.1,120);camera.position.set(7,4.4,11);camera.lookAt(0,2,0);
scene.add(new THREE.HemisphereLight(0x9bc7e7,0x1b1016,1.45));const moon=new THREE.DirectionalLight(0xa7c9ff,2.3);moon.position.set(-8,13,-8);scene.add(moon);const fire=new THREE.PointLight(0xff9a55,5,18);fire.position.set(1,2.2,3);scene.add(fire);const voidLight=new THREE.PointLight(0x486dff,4,24);voidLight.position.set(-7,5,-5);scene.add(voidLight);
const mat=(c,m=0,r=.65,e=0)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,emissive:e?c:0x000000,emissiveIntensity:e});
const stone=mat(0x353d45,.25,.9),dark=mat(0x111820,.5,.55),steel=mat(0x73808a,.82,.28),gold=mat(0xd2b56a,.8,.23),cloth=mat(0x1b3145,0,.85),skin=mat(0xb98262,0,.78),glow=mat(0x5e9dff,.1,.2,2.6);
const floor=new THREE.Mesh(new THREE.CircleGeometry(30,64),stone);floor.rotation.x=-Math.PI/2;floor.position.y=-.03;scene.add(floor);
for(let i=0;i<18;i++){const a=i*.73,r=8+(i%5)*2.2,h=2+(i%4)*1.4;const b=new THREE.Mesh(new THREE.BoxGeometry(.8+Math.random()*1.5,h,.8+Math.random()*1.5),stone);b.position.set(Math.cos(a)*r,h/2-.02,Math.sin(a)*r-4);b.rotation.y=a*.7;scene.add(b)}
for(let i=0;i<16;i++){const a=i*.91,r=5+(i%4)*1.7;const tree=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.32,2.8,7),dark);trunk.position.y=1.4;tree.add(trunk);for(let j=0;j<3;j++){const crown=new THREE.Mesh(new THREE.ConeGeometry(1.25-j*.22,2.4,7),mat(0x163329,0,.92));crown.position.y=2.6+j*1.05;tree.add(crown)}tree.position.set(Math.cos(a)*r,0,Math.sin(a)*r-5);scene.add(tree)}
const hero=new THREE.Group();hero.position.set(0,0,-.8);scene.add(hero);
const part=(geo,m,p,s=[1,1,1],r=[0,0,0])=>{const o=new THREE.Mesh(geo,m);o.position.set(...p);o.scale.set(...s);o.rotation.set(...r);o.castShadow=true;hero.add(o);return o};
part(new THREE.CapsuleGeometry(.42,.9,8,12),cloth,[0,1.55,0],[1,1,.72]);part(new THREE.SphereGeometry(.48,20,16),steel,[0,2.15,.02],[1,.75,.72]);part(new THREE.SphereGeometry(.32,20,16),skin,[0,2.78,0],[1,1.05,.88]);part(new THREE.CylinderGeometry(.14,.16,.28,12),skin,[0,2.47,0]);
for(const s of [-1,1]){part(new THREE.CapsuleGeometry(.18,.7,8,10),cloth,[s*.62,1.82,0],[1,1,.9],[0,0,s*.08]);part(new THREE.CapsuleGeometry(.15,.62,8,10),steel,[s*.67,1.28,.01]);part(new THREE.SphereGeometry(.2,12,10),skin,[s*.68,.91,.02]);part(new THREE.SphereGeometry(.26,16,12),steel,[s*.54,2.18,0]);part(new THREE.CapsuleGeometry(.19,.75,8,10),cloth,[s*.29,.7,0]);part(new THREE.BoxGeometry(.28,.55,.38),dark,[s*.29,.22,.03])}
part(new THREE.BoxGeometry(.82,1.3,.1),cloth,[0,1.62,-.3]);part(new THREE.BoxGeometry(.12,.8,.06),gold,[0,1.7,.55]);part(new THREE.OctahedronGeometry(.13),glow,[0,2.15,.62]);part(new THREE.ConeGeometry(.08,.32,8),gold,[-.2,3.12,0],[1,1,1],[0,0,-.15]);part(new THREE.ConeGeometry(.08,.32,8),gold,[.2,3.12,0],[1,1,1],[0,0,.15]);
const sword=new THREE.Group();sword.position.set(1.02,1.25,.05);hero.add(sword);const blade=new THREE.Mesh(new THREE.BoxGeometry(.13,1.7,.08),steel);blade.position.y=.65;sword.add(blade);const edge=new THREE.Mesh(new THREE.BoxGeometry(.035,1.45,.025),glow);edge.position.set(.06,.66,.06);sword.add(edge);const guard=new THREE.Mesh(new THREE.BoxGeometry(.65,.09,.12),gold);guard.position.y=-.25;sword.add(guard);const grip=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.55,10),dark);grip.position.y=-.53;sword.add(grip);
const particles=new THREE.BufferGeometry(),count=220,pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*25;pos[i*3+1]=Math.random()*10;pos[i*3+2]=(Math.random()-.5)*25-2}particles.setAttribute('position',new THREE.BufferAttribute(pos,3));const pm=new THREE.PointsMaterial({color:0x9bc8ff,size:.045,transparent:true,opacity:.75});scene.add(new THREE.Points(particles,pm));
const resize=()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()};addEventListener('resize',resize);
let started=false,step=0;const line=root.querySelector('.line'),speaker=root.querySelector('.speaker'),title=root.querySelector('.title'),caption=root.querySelector('.caption');const lines=[['ORDEN DEL ALBA','Despierta, caminante. La frontera ha caído. Si puedes oírme, todavía queda una oportunidad.'],['ORDEN DEL ALBA','Las tres lunas han despertado las defensas. Algo antiguo está cruzando desde el Umbral de Obsidiana.'],['GUARDIÁN DE LA GRIETA','No eres el elegido. Eres lo que quedó cuando los seis linajes olvidaron por qué tenían miedo.'],['AETHER','Entonces levántate. El mundo acaba de empezar a recordarte.']];
const finish=()=>{if(started)return;started=true;root.style.transition='opacity 1s';root.style.opacity='0';setTimeout(()=>{root.remove();const hud=document.getElementById('hud');if(hud)hud.style.display='block';const game=document.getElementById('game');if(game)game.style.visibility='visible';window.__AETHER_PROLOGUE_COMPLETE=true;window.dispatchEvent(new CustomEvent('aether:prologue-complete'));},1000)};
root.querySelector('#aetherBeginStory').onclick=()=>{step++;if(step>=lines.length){finish();return}speaker.textContent=lines[step][0];line.textContent=lines[step][1];if(step===1)title.style.opacity='.35';if(step===2){camera.position.set(-6,3.4,8);camera.lookAt(0,2,0)}if(step===3){camera.position.set(2.5,2.8,6);camera.lookAt(0,2.1,0);caption.style.opacity='1';setTimeout(()=>caption.style.opacity='0',1200)}};
root.querySelector('#aetherSkipStory').onclick=finish;
const animate=t=>{requestAnimationFrame(animate);const q=t*.001;hero.position.y=.035*Math.sin(q*1.8);hero.rotation.y=.08*Math.sin(q*.65);sword.rotation.z=-.15+.08*Math.sin(q*2.1);fire.intensity=4.3+Math.sin(q*4)*.8;voidLight.intensity=3.2+Math.sin(q*1.6)*.8;if(!started){camera.position.x=Math.sin(q*.12)*7;camera.position.z=10+Math.cos(q*.12)*2;camera.lookAt(0,2,0)}renderer.render(scene,camera)};requestAnimationFrame(animate);
window.__AETHER_PROLOGUE_READY=true;
};
window.AetherStartPrologue=()=>{if(window.__AETHER_PROLOGUE_READY||window.__AETHER_PROLOGUE_INSTALLED)return;boot()};
window.addEventListener('aether:character-ready',()=>window.AetherStartPrologue(),{once:true});
const bindStart=()=>{const b=document.getElementById('continue');if(b)b.addEventListener('click',()=>setTimeout(()=>window.AetherStartPrologue&&window.AetherStartPrologue(),100),{once:true,capture:true})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindStart,{once:true});else bindStart();
})();
