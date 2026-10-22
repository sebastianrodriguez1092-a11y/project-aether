// AETHER_CHARACTER_BRIDGE_COMPAT_V2
(()=>{
const boot=()=>{
 const root=document.getElementById('raceSelect')||document.getElementById('select'); if(!root||root.querySelector('#aetherCharacterUpgrade')) return;
 const old=document.getElementById('aetherHeroStage'); if(old) old.style.display='none';
 const THREE=window.AetherThree||null; if(!THREE) return;
 const canvas=document.createElement('canvas'); canvas.id='aetherCharacterUpgrade'; canvas.setAttribute('aria-hidden','true');
 Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%',zIndex:'1',pointerEvents:'none'}); root.prepend(canvas);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5)); renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.15;
 const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x07101b,18,38);
 const camera=new THREE.PerspectiveCamera(31,1,.1,80); camera.position.set(0,3.05,22); camera.lookAt(0,2.05,0);
 scene.add(new THREE.HemisphereLight(0xcfe7ff,0x211a2c,2.3));
 const key=new THREE.DirectionalLight(0xffe4b0,3.4); key.position.set(-8,12,12); scene.add(key);
 const rim=new THREE.DirectionalLight(0x6fa9ff,2.5); rim.position.set(10,8,-12); scene.add(rim);
 const floor=new THREE.Mesh(new THREE.CylinderGeometry(11.5,12.2,.32,64),new THREE.MeshStandardMaterial({color:0x121925,metalness:.5,roughness:.4})); floor.position.y=-.2; scene.add(floor);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(9.7,.025,8,96),new THREE.MeshBasicMaterial({color:0xc6a768,transparent:true,opacity:.5})); ring.rotation.x=Math.PI/2; scene.add(ring);
 const specs=[
  {race:'Aurelio',skin:0xc38e6c,cloth:0x25354d,armor:0xb6c0cf,trim:0xd8b86a,glow:0x6cbcff,helm:0},
  {race:'Sylvar',skin:0x9b705e,cloth:0x24452f,armor:0x5d8d61,trim:0xd4c47c,glow:0x7ee6a4,helm:1},
  {race:'Dravak',skin:0x8d503b,cloth:0x45251e,armor:0x8f3e2d,trim:0xe1a34e,glow:0xff704b,helm:2},
  {race:'Velari',skin:0xb78ac1,cloth:0x342650,armor:0x7658a6,trim:0xd9a8ff,glow:0xb78cff,helm:3},
  {race:'Varkyn',skin:0x76534b,cloth:0x20252d,armor:0x46525d,trim:0xb5c0c9,glow:0x8ac7ff,helm:4},
  {race:'Aethari',skin:0xd1ad86,cloth:0x263a42,armor:0x7896a1,trim:0xe7c873,glow:0x77e9df,helm:5}
 ];
 const mat=(color,metal=0,rough=.55,em=0)=>new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough,emissive:em?color:0x000000,emissiveIntensity:em});
 const part=(g,geo,m,p,s=[1,1,1],r=[0,0,0])=>{const x=new THREE.Mesh(geo,m);x.position.set(...p);x.scale.set(...s);x.rotation.set(...r);x.castShadow=true;g.add(x);return x};
 const capsule=(g,m,p,s)=>part(g,new THREE.CapsuleGeometry(1,1,8,12),m,p,s);
 const heroes=[];
 function hero(sp,i){
  const g=new THREE.Group(); g.position.x=(i-2.5)*2.3;
  const skin=mat(sp.skin,0,.72),cloth=mat(sp.cloth,0,.82),armor=mat(sp.armor,.72,.27),trim=mat(sp.trim,.8,.22),glow=mat(sp.glow,.25,.18,2.0),dark=mat(0x141922,.55,.3);
  for(const side of [-1,1]){capsule(g,cloth,[side*.28,.78,0],[.22,.58,.22]);part(g,new THREE.SphereGeometry(.23,14,10),armor,[side*.28,.16,.08],[1,.55,1.45]);part(g,new THREE.BoxGeometry(.34,.14,.58),dark,[side*.28,.09,.18])}
  part(g,new THREE.TorusGeometry(.47,.06,10,28),trim,[0,1.36,0],[1,.72,1],[Math.PI/2,0,0]);capsule(g,cloth,[0,1.76,0],[.5,.68,.3]);part(g,new THREE.SphereGeometry(.49,20,14),armor,[0,2.05,.14],[1,.72,.42]);
  for(let k=0;k<3;k++)part(g,new THREE.BoxGeometry(.6-.07*k,.11,.09),armor,[0,1.55+k*.15,.31],[1,1,.7]);
  for(const side of [-1,1]){part(g,new THREE.SphereGeometry(.3,16,10),armor,[side*.58,2.1,0],[1,.85,1]);capsule(g,cloth,[side*.7,1.7,0],[.17,.42,.17]);capsule(g,armor,[side*.72,1.28,.01],[.15,.35,.15]);part(g,new THREE.SphereGeometry(.16,12,9),skin,[side*.72,.89,.01]);part(g,new THREE.SphereGeometry(.19,12,9),dark,[side*.72,.73,.03],[1,.65,1.2]);}
  part(g,new THREE.CylinderGeometry(.13,.16,.26,14),skin,[0,2.5,0]);part(g,new THREE.SphereGeometry(.4,22,16),skin,[0,2.84,.02],[1,.98,.9]);part(g,new THREE.SphereGeometry(.39,22,14),armor,[0,2.95,-.02],[1,.38,.94]);
  part(g,new THREE.BoxGeometry(.42,.13,.08),dark,[0,2.76,.34],[1,.8,.7]);part(g,new THREE.SphereGeometry(.07,10,8),skin,[0,2.68,.37],[1,.8,.65]);
  for(const side of [-1,1])part(g,new THREE.SphereGeometry(.045,10,8),glow,[side*.145,2.88,.345],[1,.7,.55]);
  part(g,new THREE.BoxGeometry(1.25,1.7,.06),cloth,[0,1.55,-.34],[1,1,1],[.06,0,0]);part(g,new THREE.OctahedronGeometry(.14,1),glow,[0,2.05,.48],[1,1.4,.5]);
  if(sp.helm===0)part(g,new THREE.SphereGeometry(.43,18,10),armor,[0,3.03,0],[1,.6,.9]);
  if(sp.helm===1){for(const s of [-1,1])part(g,new THREE.ConeGeometry(.12,.58,10),trim,[s*.22,3.4,0],[1,1,1],[0,0,s*-.22]);part(g,new THREE.TorusGeometry(.42,.025,8,28),glow,[0,3.1,0],[1,1,1],[Math.PI/2,0,0]);}
  if(sp.helm===2){for(const s of [-1,1])part(g,new THREE.ConeGeometry(.15,.68,10),trim,[s*.21,3.42,0],[1,1,1],[0,0,s*.4]);}
  if(sp.helm===3){part(g,new THREE.TorusGeometry(.45,.04,8,32),glow,[0,3.12,0],[1,1,1],[Math.PI/2,0,0]);part(g,new THREE.ConeGeometry(.13,.55,10),trim,[0,3.45,0]);}
  if(sp.helm===4){part(g,new THREE.SphereGeometry(.42,18,10),armor,[0,3.06,0],[1,.62,.92]);for(const s of [-1,1])part(g,new THREE.ConeGeometry(.12,.36,8),trim,[s*.3,3.4,0],[1,1,1],[0,0,s*.6]);}
  if(sp.helm===5){part(g,new THREE.SphereGeometry(.42,18,10),armor,[0,3.05,0],[1,.62,.9]);part(g,new THREE.TorusGeometry(.5,.025,8,32),glow,[0,3.18,0],[1,1,1],[Math.PI/2,0,0]);}
  const weapon=new THREE.Group();weapon.position.set(.98,1.2,.02);g.add(weapon);part(weapon,new THREE.CylinderGeometry(.055,.065,.52,10),dark,[0,-.1,0]);part(weapon,new THREE.BoxGeometry(.42,.07,.1),trim,[0,.2,0]);part(weapon,new THREE.BoxGeometry(.12,.9,.07),armor,[0,.72,0]);part(weapon,new THREE.ConeGeometry(.09,.25,4),armor,[0,1.3,0]);part(weapon,new THREE.BoxGeometry(.025,.65,.025),glow,[0,.72,.05]);part(weapon,new THREE.SphereGeometry(.09,10,8),trim,[0,-.4,0]);
  heroes.push({g,weapon,phase:i*.65});scene.add(g);
 }
 specs.forEach(hero);
 const resize=()=>{const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};new ResizeObserver(resize).observe(root);resize();
 let active=0;const sync=()=>{const cards=[...root.querySelectorAll('.race')];const idx=cards.findIndex(x=>x.classList.contains('active'));if(idx>=0)active=idx};setInterval(sync,180);
 const frame=now=>{requestAnimationFrame(frame);const t=now*.001;heroes.forEach((h,i)=>{h.g.visible=true;h.g.position.y=.025*Math.sin(t*1.8+h.phase);h.g.rotation.y=.045*Math.sin(t*.75+h.phase);h.weapon.rotation.z=-.12+.06*Math.sin(t*2+h.phase)});renderer.render(scene,camera)};requestAnimationFrame(frame);window.__AETHER_DETAILED_CHARACTERS_READY=true;
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
