// AETHER_WORLD_ART_PASS_V1 — atmosphere, foreground detail and MMO-style readability
(()=>{
const start=()=>{
 if(window.__AETHER_ART_PASS_READY)return;
 const THREE=window.AetherThree;
 const root=document.getElementById('aetherWorld');
 if(!THREE||!root){setTimeout(start,300);return}
 window.__AETHER_ART_PASS_READY=true;
 const style=document.createElement('style');
 style.textContent='#aetherArtPass{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden}#aetherArtPass canvas{width:100%;height:100%;display:block}.aetherVignette{position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,transparent 38%,rgba(5,10,12,.18) 72%,rgba(2,5,8,.62) 100%);mix-blend-mode:multiply}.aetherSun{position:absolute;width:34vw;height:34vw;max-width:520px;max-height:520px;right:4vw;top:-12vw;border-radius:50%;background:radial-gradient(circle,rgba(255,225,164,.25),rgba(255,205,120,.07) 34%,transparent 68%);filter:blur(8px)}';
 document.head.appendChild(style);
 const layer=document.createElement('div');layer.id='aetherArtPass';layer.innerHTML='<canvas></canvas><div class="aetherSun"></div><div class="aetherVignette"></div>';root.appendChild(layer);
 const canvas=layer.querySelector('canvas');
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.setClearColor(0x000000,0);
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.1,120);camera.position.set(0,3.2,10);
 scene.add(new THREE.HemisphereLight(0xe6f4ff,0x334426,1.5));
 const warm=new THREE.DirectionalLight(0xffd99c,2.1);warm.position.set(-8,12,8);scene.add(warm);
 const mats={leaf:new THREE.MeshStandardMaterial({color:0x4f873f,roughness:.9}),leaf2:new THREE.MeshStandardMaterial({color:0x79a84d,roughness:.92}),flower:new THREE.MeshStandardMaterial({color:0xf2cf69,emissive:0x8a5515,emissiveIntensity:.15}),wood:new THREE.MeshStandardMaterial({color:0x68462b,roughness:.92}),stone:new THREE.MeshStandardMaterial({color:0x72786f,roughness:.95}),gold:new THREE.MeshStandardMaterial({color:0xd7b866,metalness:.7,roughness:.28}),magic:new THREE.MeshStandardMaterial({color:0x55bfff,emissive:0x167dff,emissiveIntensity:2.4,roughness:.2})};
 const grass=new THREE.Group();scene.add(grass);
 for(let i=0;i<130;i++){
  const blade=new THREE.Mesh(new THREE.ConeGeometry(.025+Math.random()*.035,.35+Math.random()*.65,5),i%4?mats.leaf:mats.leaf2);
  blade.position.set((Math.random()-.5)*18,-.55,-1-Math.random()*13);blade.rotation.z=(Math.random()-.5)*.55;blade.rotation.x=(Math.random()-.5)*.35;blade.scale.x=1.2+Math.random()*1.8;grass.add(blade);
 }
 const flowers=new THREE.Group();scene.add(flowers);
 for(let i=0;i<42;i++){
  const g=new THREE.Group();g.position.set((Math.random()-.5)*16,-.28,-1-Math.random()*15);
  for(let p=0;p<5;p++){const petal=new THREE.Mesh(new THREE.SphereGeometry(.045,7,5),p%3?mats.flower:mats.magic);petal.scale.set(1.8,.55,.8);const a=p*Math.PI*2/5;petal.position.set(Math.cos(a)*.09,.08,Math.sin(a)*.09);g.add(petal)}
  flowers.add(g);
 }
 const leaves=new THREE.Group();scene.add(leaves);
 for(let i=0;i<28;i++){
  const l=new THREE.Mesh(new THREE.PlaneGeometry(.16+.16*Math.random(),.35+.3*Math.random()),i%2?mats.leaf:mats.leaf2);
  l.position.set((Math.random()-.5)*17,1+Math.random()*5,-3-Math.random()*18);l.rotation.set(Math.random(),Math.random(),Math.random());leaves.add(l);
 }
 const birdsGeo=new THREE.BufferGeometry(),bp=new Float32Array(18*3);for(let i=0;i<18;i++){bp[i*3]=(Math.random()-.5)*22;bp[i*3+1]=5+Math.random()*7;bp[i*3+2]=-12-Math.random()*20}birdsGeo.setAttribute('position',new THREE.BufferAttribute(bp,3));const birds=new THREE.Points(birdsGeo,new THREE.PointsMaterial({color:0x17212a,size:.08,transparent:true,opacity:.8,depthWrite:false}));scene.add(birds);
 const dustGeo=new THREE.BufferGeometry(),dp=new Float32Array(260*3);for(let i=0;i<260;i++){dp[i*3]=(Math.random()-.5)*25;dp[i*3+1]=Math.random()*9-1;dp[i*3+2]=-1-Math.random()*25}dustGeo.setAttribute('position',new THREE.BufferAttribute(dp,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xf6df9e,size:.035,transparent:true,opacity:.5,depthWrite:false}));scene.add(dust);
 const banners=new THREE.Group();scene.add(banners);
 for(const x of [-6.5,6.5]){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.035,.055,2.7,7),mats.wood);pole.position.set(x,.7,-8);banners.add(pole);const cloth=new THREE.Mesh(new THREE.PlaneGeometry(.7,1.1),mats.gold);cloth.position.set(x+.35,1.65,-8);cloth.rotation.y=(x>0?-.08:.08);banners.add(cloth)}
 let mx=0,my=0;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
 const resize=()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()};addEventListener('resize',resize);resize();
 const clock=new THREE.Clock();const tick=()=>{requestAnimationFrame(tick);const t=clock.getElapsedTime();camera.position.x+=((mx*1.2)-camera.position.x)*.025;camera.position.y+=(3.2-my*.45-camera.position.y)*.025;camera.lookAt(0,2,-10);leaves.rotation.y=Math.sin(t*.25)*.035;flowers.position.y=Math.sin(t*1.4)*.015;grass.rotation.z=Math.sin(t*.7)*.012;const a=dust.geometry.attributes.position.array;for(let i=1;i<a.length;i+=3){a[i]+=Math.sin(t*.7+i)*.0015;if(a[i]>8)a[i]=-1}dust.geometry.attributes.position.needsUpdate=true;birds.position.x=Math.sin(t*.07)*1.8;renderer.render(scene,camera)};tick();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
