(()=>{
const boot=()=>{
 const root=document.getElementById('raceSelect'); if(!root||root.querySelector('#aetherCharacterUpgrade')) return;
 const old=document.getElementById('aetherHeroStage'); if(old) old.style.display='none';
 const THREE=window.AetherThree||null;
 if(!THREE) return;
 const canvas=document.createElement('canvas'); canvas.id='aetherCharacterUpgrade'; canvas.setAttribute('aria-hidden','true');
 Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%',zIndex:'1',pointerEvents:'none'}); root.prepend(canvas);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5)); renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.18;
 const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x07101b,17,36);
 const camera=new THREE.PerspectiveCamera(31,1,.1,80); camera.position.set(0,3.35,25); camera.lookAt(0,2.25,0);
 scene.add(new THREE.HemisphereLight(0xcfe7ff,0x211a2c,2.4));
 const key=new THREE.DirectionalLight(0xffe4b0,3.4); key.position.set(-8,12,12); scene.add(key);
 const rim=new THREE.DirectionalLight(0x6fa9ff,2.6); rim.position.set(10,8,-12); scene.add(rim);
 const floor=new THREE.Mesh(new THREE.CylinderGeometry(11.5,12.2,.32,64),new THREE.MeshStandardMaterial({color:0x121925,metalness:.55,roughness:.42})); floor.position.y=-.2; scene.add(floor);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(9.7,.025,8,96),new THREE.MeshBasicMaterial({color:0xc6a768,transparent:true,opacity:.55})); ring.rotation.x=Math.PI/2; ring.position.y=-.02; scene.add(ring);
 const specs=[
  {race:'Aurelio',skin:0xc38e6c,cloth:0x25354d,armor:0xb6c0cf,trim:0xd8b86a,glow:0x6cbcff,helm:0},
  {race:'Sylvar',skin:0x9b705e,cloth:0x24452f,armor:0x5d8d61,trim:0xd4c47c,glow:0x7ee6a4,helm:1},
  {race:'Dravak',skin:0x8d503b,cloth:0x45251e,armor:0x8f3e2d,trim:0xe1a34e,glow:0xff704b,helm:2},
  {race:'Velari',skin:0xb78ac1,cloth:0x342650,armor:0x7658a6,trim:0xd9a8ff,glow:0xb78cff,helm:3},
  {race:'Varkyn',skin:0x76534b,cloth:0x20252d,armor:0x46525d,trim:0xb5c0c9,glow:0x8ac7ff,helm:4},
  {race:'Aethari',skin:0xd1ad86,cloth:0x263a42,armor:0x7896a1,trim:0xe7c873,glow:0x77e9df,helm:5}
 ];
 const heroes=[];
 const mat=(color,metal=0,rough=.55,em=0)=>new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough,emissive:em?color:0x000000,emissiveIntensity:em});
 const part=(g,geo,m,p,s=[1,1,1],r=[0,0,0])=>{const x=new THREE.Mesh(geo,m);x.position.set(...p);x.scale.set(...s);x.rotation.set(...r);x.castShadow=true;g.add(x);return x};
 const capsule=(g,m,p,s,r)=>part(g,new THREE.CapsuleGeometry(1,1,8,12),m,p,s,r);
 function hero(sp,i){
  const g=new THREE.Group(); g.position.x=(i-2.5)*2.25;
  const skin=mat(sp.skin,0,.72), cloth=mat(sp.cloth,0,.82), armor=mat(sp.armor,.72,.27), trim=mat(sp.trim,.8,.22), glow=mat(sp.glow,.25,.18,1.9), dark=mat(0x141922,.55,.3);
  // Anatomical base: pelvis, torso, neck, head, upper/lower limbs.
  capsule(g,cloth,[0,1.48,0],[.46,.62,.25],[0,0,0]);
  part(g,new THREE.SphereGeometry(.42,18,14),cloth,[0,2.13,0],[1,.82,.68]);
  part(g,new THREE.SphereGeometry(.27,16,12),skin,[0,2.72,.01],[1,1.08,.9]);
  part(g,new THREE.CylinderGeometry(.13,.16,.25,12),skin,[0,2.43,0]);
  // Chest plate with center ridge and layered abdominal plates.
  part(g,new THREE.SphereGeometry(.48,16,10),armor,[0,2.08,.22],[1,.62,.32]);
  part(g,new THREE.BoxGeometry(.12,.62,.05),trim,[0,2.08,.53],[1,1,.8]);
  for(let k=0;k<3;k++) part(g,new THREE.BoxGeometry(.34-.035*k,.11,.06),armor,[0,1.78+k*.13,.45],[1,1,.8]);
  // Belt, hip plates and armored thighs.
  part(g,new THREE.TorusGeometry(.41,.055,8,24),trim,[0,1.47,0],[1,.72,1],[Math.PI/2,0,0]);
  for(const side of [-1,1]){
   capsule(g,cloth,[side*.27,1.05,0],[.22,.48,.2],[0,0,0]);
   capsule(g,armor,[side*.29,.56,0],[.18,.48,.18],[0,0,0]);
   part(g,new THREE.SphereGeometry(.22,12,10),dark,[side*.29,.13,.02],[1,.55,.9]);
   // Shoulders and articulated arms.
   part(g,new THREE.SphereGeometry(.27,16,12),armor,[side*.55,2.13,0],[1,.8,1]);
   capsule(g,cloth,[side*.66,1.76,.01],[.16,.4,.16],[0,0,side*.08]);
   capsule(g,armor,[side*.67,1.36,.02],[.14,.35,.14],[0,0,side*-.08]);
   part(g,new THREE.SphereGeometry(.16,12,10),skin,[side*.68,.99,.02]);
   part(g,new THREE.CylinderGeometry(.12,.16,.24,10),trim,[side*.68,1.61,.03],[1,1,1],[0,0,side*.18]);
  }
  // Face, ears, brow and luminous eyes create readable character silhouettes.
  for(const side of [-1,1]){
   part(g,new THREE.SphereGeometry(.055,10,8),glow,[side*.13,2.77,.255],[1,.65,.5]);
   part(g,new THREE.ConeGeometry(.07,.18,8),skin,[side*.29,2.72,0],[1,1,1],[0,Math.PI/2,0]);
  }
  part(g,new THREE.BoxGeometry(.28,.055,.05),dark,[0,2.84,.25],[1,1,1]);
  // Helmets and lineage-specific silhouettes.
  if(sp.helm===0){part(g,new THREE.SphereGeometry(.39,18,10),armor,[0,2.79,0],[1,.65,.88]);part(g,new THREE.BoxGeometry(.48,.12,.12),trim,[0,2.62,.2]);}
  if(sp.helm===1){for(const s of [-1,1])part(g,new THREE.ConeGeometry(.11,.55,10),trim,[s*.22,3.08,0],[1,1,1],[0,0,s*-.22]);part(g,new THREE.TorusGeometry(.4,.025,8,28),glow,[0,2.88,0],[1,1,1],[Math.PI/2,0,0]);}
  if(sp.helm===2){for(const s of [-1,1])part(g,new THREE.ConeGeometry(.16,.65,10),trim,[s*.2,3.1,0],[1,1,1],[0,0,s*.38]);part(g,new THREE.SphereGeometry(.41,18,10),armor,[0,2.83,0],[1,.66,.9]);}
  if(sp.helm===3){part(g,new THREE.TorusGeometry(.43,.04,8,32),glow,[0,2.82,0],[1,1,1],[Math.PI/2,0,0]);part(g,new THREE.ConeGeometry(.13,.52,10),trim,[0,3.15,0]);}
  if(sp.helm===4){part(g,new THREE.SphereGeometry(.4,18,10),armor,[0,2.84,0],[1,.62,.92]);for(const s of [-1,1])part(g,new THREE.ConeGeometry(.12,.32,8),trim,[s*.28,3.1,0],[1,1,1],[0,0,s*.6]);}
  if(sp.helm===5){part(g,new THREE.SphereGeometry(.39,18,10),armor,[0,2.82,0],[1,.64,.9]);part(g,new THREE.TorusGeometry(.48,.025,8,32),glow,[0,2.93,0],[1,1,1],[Math.PI/2,0,0]);}
  // Cape and weapon.
  part(g,new THREE.BoxGeometry(.72,1.55,.07),cloth,[0,1.62,-.23],[1,.95,1],[.03,0,0]);
  const weapon=new THREE.Group(); weapon.position.set(.93,1.12,.03); g.add(weapon);
  part(weapon,new THREE.CylinderGeometry(.045,.06,.42,10),cloth,[0,-.08,0]);
  part(weapon,new THREE.BoxGeometry(.38,.07,.1),trim,[0,.14,0]);
  part(weapon,new THREE.ConeGeometry(.12,.95,8,1),armor,[0,.62,0]);
  part(weapon,new THREE.CylinderGeometry(.02,.02,.7,6),glow,[0,.61,.08]);
  part(weapon,new THREE.SphereGeometry(.085,10,8),trim,[0,-.31,0]);
  // Magical chest sigil.
  part(g,new THREE.OctahedronGeometry(.13,1),glow,[0,2.13,.56],[1,1.3,.45]);
  heroes.push({g,weapon,phase:i*.65,sp}); scene.add(g);
 }
 specs.forEach(hero);
 const resize=()=>{const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
 new ResizeObserver(resize).observe(root); resize();
 let prev=performance.now();
 const frame=now=>{requestAnimationFrame(frame);const dt=Math.min(.05,(now-prev)/1000);prev=now;const t=now*.001;heroes.forEach((h,i)=>{h.g.position.y=.025*Math.sin(t*1.8+h.phase);h.g.rotation.y=.045*Math.sin(t*.75+h.phase);h.weapon.rotation.z=-.12+.06*Math.sin(t*2+h.phase);h.weapon.rotation.x=.04*Math.sin(t*1.4+h.phase);});renderer.render(scene,camera)};
 requestAnimationFrame(frame); window.__AETHER_DETAILED_CHARACTERS_READY=true;
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();