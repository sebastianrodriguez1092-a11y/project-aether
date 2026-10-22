// AETHER PLAYER MOTION V1 — procedural locomotion/combat animation pass
(()=>{
if(window.__AETHER_PLAYER_MOTION)return;window.__AETHER_PLAYER_MOTION=true;
let THREE=null,scene=null,hero=null,parts=null,last=0,attackUntil=0;
const find=()=>{
 THREE=window.AetherThree;if(!THREE)return;
 scene=window.__AETHER_ACTIVE_SCENE||scene;if(!scene)return;
 if(!hero){scene.traverse(o=>{if(hero||!o.isGroup)return;if(o.children.length>=15&&o.position.z>2&&o.position.z<6)hero=o})}
 if(hero&&!parts){const cs=hero.children;const near=(x,y)=>cs.filter(o=>Math.abs(o.position.x-x)<.16&&Math.abs(o.position.y-y)<.18);parts={la:near(-.62,1.82)[0],ra:near(.62,1.82)[0],ll:near(-.27,.7)[0],rl:near(.27,.7)[0],s:cs.find(o=>o.isGroup&&o.position.x>0.8)};}
};
const key={};addEventListener('keydown',e=>{key[e.code]=true;if(e.code==='KeyF'||e.code==='Mouse0')attackUntil=performance.now()+520});addEventListener('keyup',e=>key[e.code]=false);addEventListener('mousedown',e=>{if(e.button===0)attackUntil=performance.now()+520});
const tick=(t)=>{requestAnimationFrame(tick);find();if(!hero||!parts||!THREE)return;const dt=Math.min((t-last)/1000,.05)||.016;last=t;const moving=key.KeyW||key.KeyA||key.KeyS||key.KeyD;const sprint=key.ShiftLeft||key.ShiftRight;const rate=(sprint?11:8)*(moving?1:0.35);const walk=Math.sin(t*.001*rate);const blend=moving?1:0.18;
 if(parts.ll){parts.ll.rotation.x=walk*.48*blend;parts.ll.rotation.z=-.04*blend}if(parts.rl){parts.rl.rotation.x=-walk*.48*blend;parts.rl.rotation.z=.04*blend}if(parts.la){parts.la.rotation.z=.12+(-walk*.3*blend);parts.la.rotation.x=walk*.16*blend}if(parts.ra){parts.ra.rotation.z=-.12+(walk*.3*blend);parts.ra.rotation.x=-walk*.16*blend}
 hero.position.y=.08+Math.abs(walk)*.025*blend;hero.rotation.y += (moving?0:Math.sin(t*.0007)*.0008);
 if(parts.s){const a=performance.now()<attackUntil;parts.s.rotation.z=a?THREE.MathUtils.lerp(parts.s.rotation.z,-1.15,.25):THREE.MathUtils.lerp(parts.s.rotation.z,Math.sin(t*.002)*.04,.08)}
};tick(0);
})();
