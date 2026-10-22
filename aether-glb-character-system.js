// AETHER_GLB_CHARACTER_SYSTEM_V1 — real skinned characters + animation state machine
(()=>{
const VERSION='20261022-GLB1';
if(window.__AETHER_GLB_CHARACTER_SYSTEM)return;
window.__AETHER_GLB_CHARACTER_SYSTEM=true;
const SOURCES={
  ranger:'https://assetyard.dev/pack/files/ashfen-ranger.glb',
  shieldmaiden:'https://assetyard.dev/pack/files/vale-shieldmaiden.glb',
  warden:'https://assetyard.dev/pack/files/hollow-warden.glb'
};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const findPlayer=root=>{
  if(!root)return null;
  let best=null;
  root.traverse(o=>{
    if(!o.isGroup)return;
    const n=o.children.length;
    const p=o.position;
    if(n>=15&&p&&p.z>2&&p.z<8){best=o}
  });
  return best;
};
const selected=()=>{
  const r=(window.__AETHER_SELECTED_RACE||window.AETHER_SELECTED_RACE||'').toString().toLowerCase();
  if(r.includes('varkyn')||r.includes('aethari')||r.includes('dravak'))return 'warden';
  if(r.includes('sylvar')||r.includes('velari'))return 'ranger';
  return 'shieldmaiden';
};
const classify=(clips)=>{
  const out={};
  const pick=(re,exclude)=>clips.find(c=>re.test(c.name)&&(!exclude||!exclude.test(c.name)));
  out.idle=pick(/idle|standing|breath/i)||clips[0];
  out.walk=pick(/walk/i)||out.idle;
  out.run=pick(/run|sprint/i)||out.walk;
  out.attack=pick(/slash|sword|attack|thrust|strike/i,/idle/i)||out.walk;
  out.hit=pick(/hit|stagger/i)||out.idle;
  out.death=pick(/death|knock.*down/i)||out.hit||out.idle;
  return out;
};
const install=async()=>{
  const THREE=window.AetherThree;if(!THREE)return false;
  const mod=await import('three/addons/loaders/GLTFLoader.js');
  const Loader=mod.GLTFLoader;const loader=new Loader();
  let scene=null,player=null;
  for(let i=0;i<100&&!player;i++){
    scene=window.__AETHER_ACTIVE_SCENE||null;
    player=findPlayer(scene);
    if(!player)await wait(150);
  }
  if(!player||!scene)return false;
  const key=selected();
  const url=SOURCES[key];
  window.__AETHER_GLB_SOURCE={key,url,version:VERSION};
  let gltf;
  try{gltf=await loader.loadAsync(url)}catch(err){console.warn('[AETHER GLB] external asset failed; keeping procedural fallback',err);return false}
  const model=gltf.scene;
  model.name='AETHER_REAL_PLAYER_MODEL';
  model.traverse(o=>{
    if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material){o.material.needsUpdate=true}}
  });
  const box=new THREE.Box3().setFromObject(model);const size=box.getSize(new THREE.Vector3());
  const height=Math.max(.001,size.y);const scale=2.15/height;model.scale.setScalar(scale);
  const box2=new THREE.Box3().setFromObject(model);const minY=box2.min.y;model.position.y-=minY;
  // Keep the original world/player wrapper for collision, movement and quest systems.
  player.traverse(o=>{if(o!==player&&o.isMesh)o.visible=false});
  model.position.set(0,0,0);player.add(model);
  const mixer=new THREE.AnimationMixer(model);const clips=classify(gltf.animations||[]);const actions={};
  Object.entries(clips).forEach(([k,c])=>{if(c)actions[k]=mixer.clipAction(c)});
  Object.values(actions).forEach(a=>{a.enabled=true;a.clampWhenFinished=false});
  let current='idle';
  const play=(name,fade=.18,loop=true)=>{
    if(!actions[name])return;
    const next=actions[name];
    if(current===name){next.paused=false;return}
    const prev=actions[current];
    if(prev)prev.fadeOut(fade);
    next.reset().fadeIn(fade);next.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);next.play();current=name;
    if(!loop)next.getMixer().addEventListener('finished',()=>{if(current===name)play('idle',.12,true)},{once:true});
  };
  play('idle',0,true);
  let attackUntil=0,lastPos=player.position.clone();
  const api={model,mixer,actions,player,playAttack:()=>{attackUntil=performance.now()+900;play('attack',.08,false)},getState:()=>current};
  window.__AETHER_GLTF_PLAYER=api;
  player.userData.aetherRealCharacter=true;
  addEventListener('pointerdown',e=>{if(e.button===0)api.playAttack()},{passive:true});
  addEventListener('keydown',e=>{if(e.code==='Space'&&api.actions.jump)play('jump',.08,false)},{passive:true});
  const clock=new THREE.Clock();
  const tick=()=>{
    const dt=Math.min(clock.getDelta(),.05);
    mixer.update(dt);
    if(performance.now()>attackUntil){
      const moved=player.position.distanceTo(lastPos)/Math.max(dt,.001);
      if(moved>4.2)play('run',.15,true);
      else if(moved>.25)play('walk',.15,true);
      else if(current!=='attack')play('idle',.2,true);
    }
    lastPos.copy(player.position);
    requestAnimationFrame(tick);
  };
  tick();
  return true;
};
const boot=async()=>{
  for(let i=0;i<120;i++){
    if(window.AetherThree&&window.__AETHER_ACTIVE_SCENE){
      try{await install()}catch(e){console.warn('[AETHER GLB] system fallback',e)}
      return;
    }
    await wait(250);
  }
};
boot();
})();
