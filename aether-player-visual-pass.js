// AETHER PLAYER VISUAL PASS V1 — silhouette, armor layers, cloak and weapon dressing
(()=>{
if(window.__AETHER_PLAYER_VISUAL_PASS)return;window.__AETHER_PLAYER_VISUAL_PASS=true;const T=window.AetherThree;if(!T)return;let done=false,hero=null;
const M={steel:new T.MeshStandardMaterial({color:0x596a7c,metalness:.86,roughness:.24}),gold:new T.MeshStandardMaterial({color:0xcaa95d,metalness:.82,roughness:.2}),leather:new T.MeshStandardMaterial({color:0x4b2c20,roughness:.86}),cloth:new T.MeshStandardMaterial({color:0x1b3550,roughness:.78}),skin:new T.MeshStandardMaterial({color:0xb8795d,roughness:.7}),hair:new T.MeshStandardMaterial({color:0x211913,roughness:.92}),glow:new T.MeshStandardMaterial({color:0x4bbcff,emissive:0x177dff,emissiveIntensity:2.8,metalness:.15,roughness:.18})};
const add=(g,geo,m,p,s=[1,1,1],r=[0,0,0])=>{const o=new T.Mesh(geo,m);o.position.set(...p);o.scale.set(...s);o.rotation.set(...r);o.castShadow=o.receiveShadow=true;g.add(o);return o};
const find=()=>{const sc=window.__AETHER_ACTIVE_SCENE;if(!sc||done)return;sc.traverse(o=>{if(hero||!o.isGroup)return;if(o.children.length>=15&&o.position.z>2&&o.position.z<6)hero=o});if(!hero)return;done=true;
 add(hero,new T.TorusGeometry(.42,.08,10,24),M.gold,[0,2.42,.01],[1,.72,1]);
 add(hero,new T.SphereGeometry(.39,20,14),M.hair,[0,2.84,-.06],[1.02,.82,.92]);
 add(hero,new T.BoxGeometry(.82,.16,.7),M.leather,[0,1.15,.02]);
 add(hero,new T.BoxGeometry(1.02,.22,.58),M.gold,[0,1.48,.06],[1,.65,1]);
 for(const s of [-1,1]){add(hero,new T.SphereGeometry(.32,16,12),M.gold,[s*.59,2.05,.01],[1,.58,1]);add(hero,new T.CapsuleGeometry(.11,.28,6,8),M.leather,[s*.7,1.18,.01]);add(hero,new T.BoxGeometry(.26,.34,.32),M.steel,[s*.19,.16,.12]);}
 const cloak=add(hero,new T.ConeGeometry(.9,.1,24),M.cloth,[0,1.55,-.5],[1,10,1]);cloak.name='AetherCloak';
 const sigil=add(hero,new T.OctahedronGeometry(.11,1),M.glow,[0,1.78,.58]);sigil.name='AetherSigil';
 const blade=add(hero,new T.BoxGeometry(.08,1.9,.025),M.glow,[1.1,2.0,.12]);blade.name='AetherBladeGlow';
};
const animate=(t)=>{find();if(hero){const c=hero.getObjectByName('AetherCloak');if(c)c.rotation.z=Math.sin(t*.002)*.045;const s=hero.getObjectByName('AetherSigil');if(s){s.rotation.y=t*.0018;s.scale.setScalar(1+.08*Math.sin(t*.004))}}requestAnimationFrame(animate)};requestAnimationFrame(animate);
})();
