// AETHER MMO ACTORS V1 — living world / NPCs / enemies / quest dressing
(()=>{
const THREE=window.AetherThree;if(!THREE)return;
if(window.__AETHER_MMO_ACTORS_PATCHED)return;window.__AETHER_MMO_ACTORS_PATCHED=true;
let activeScene=null,activeCamera=null,installed=false,actors=[];
const mat=(c,m=0,r=.72,e=0)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,emissive:e?c:0,emissiveIntensity:e});
const mats={skin:mat(0xb77a5e,0,.72),cloth:mat(0x2d4564,0,.8),cloth2:mat(0x70452e,0,.84),steel:mat(0x667889,.82,.26),gold:mat(0xd7b85e,.85,.2),dark:mat(0x263238,.18,.72),red:mat(0x8f3030,0,.78),green:mat(0x4e824f,0,.82),bone:mat(0xb9aa8d,0,.9),crystal:mat(0x55caff,.15,.16,3),purple:mat(0x9b63ff,.12,.2,3)};
const mesh=(g,m,p,s)=>{const o=new THREE.Mesh(g,m);o.position.set(...p);if(s)o.scale.set(...s);o.castShadow=o.receiveShadow=true;return o};
function humanoid(kind){const g=new THREE.Group();const enemy=kind==='enemy';
 g.add(mesh(new THREE.CapsuleGeometry(.34,.7,7,12),enemy?mats.dark:mats.cloth,[0,1.2,0],[1.05,1,.78]));
 g.add(mesh(new THREE.SphereGeometry(.38,18,14),enemy?mats.bone:mats.skin,[0,2.05,0],[1,.98,.9]));
 for(const s of [-1,1]){g.add(mesh(new THREE.CapsuleGeometry(.1,.58,6,9),enemy?mats.dark:mats.cloth,[s*.46,1.38,0]));g.add(mesh(new THREE.CapsuleGeometry(.16,.66,7,9),enemy?mats.dark:mats.cloth,[s*.19,.55,0]));g.add(mesh(new THREE.BoxGeometry(.4,.28,.55),enemy?mats.red:mats.steel,[s*.19,.17,0]));}
 if(enemy){for(const s of [-1,1])g.add(mesh(new THREE.ConeGeometry(.09,.32,6),mats.bone,[s*.16,2.42,.02],[1,1,1],[0,0,s*.45]));g.add(mesh(new THREE.OctahedronGeometry(.14),mats.purple,[0,2.06,.34]));}
 else{g.add(mesh(new THREE.CylinderGeometry(.34,.42,.12,16),mats.gold,[0,2.45,0]));g.add(mesh(new THREE.BoxGeometry(.68,.1,.1),mats.gold,[0,1.45,.37]));}
 return g;
}
function addNPC(x,z,name,color){const g=humanoid('npc');g.position.set(x,.15,z);g.scale.setScalar(1.08);const orb=mesh(new THREE.SphereGeometry(.11,12,10),mat(color,.15,.18,3),[0,2.48,0]);g.add(orb);activeScene.add(g);actors.push({g,baseY:g.position.y,phase:Math.random()*6,name,npc:true});
 const light=new THREE.PointLight(color,1.7,5);light.position.set(x,2.3,z);activeScene.add(light);
 return g;}
function addEnemy(x,z){const g=humanoid('enemy');g.position.set(x,.12,z);g.scale.setScalar(.9+Math.random()*.28);activeScene.add(g);actors.push({g,baseY:g.position.y,phase:Math.random()*6,enemy:true});return g;}
function addQuestMarker(x,z){const m=mat(0xffd45a,.1,.18,4);const ring=new THREE.Mesh(new THREE.TorusGeometry(.35,.045,8,24),m);ring.rotation.x=-Math.PI/2;ring.position.set(x,2.7,z);activeScene.add(ring);const stem=mesh(new THREE.CylinderGeometry(.035,.035,.9,8),m,[x,2.25,z]);activeScene.add(stem);actors.push({g:ring,baseY:2.7,phase:Math.random()*6,marker:true});}
function addLantern(x,z){const g=new THREE.Group();g.position.set(x,0,z);g.add(mesh(new THREE.CylinderGeometry(.06,.1,3.1,8),mats.dark,[0,1.55,0]));g.add(mesh(new THREE.BoxGeometry(.34,.42,.34),mats.gold,[0,3.05,0]));const bulb=mesh(new THREE.SphereGeometry(.11,12,10),mat(0xffc65a,.05,.18,4),[0,3.05,0]);g.add(bulb);activeScene.add(g);const l=new THREE.PointLight(0xffb24a,3.2,9);l.position.set(x,3,z);activeScene.add(l);actors.push({g,baseY:0,phase:Math.random()*6,lantern:true,light:l});}
function populate(){if(installed||!activeScene)return;installed=true;
 addNPC(-3,-16,'Guardia del Alba',0x59b7ff);addNPC(5,-20,'Cronista',0xd9a84e);addNPC(-6,-38,'Artesana',0x70d58b);
 addQuestMarker(-3,-16);
 addEnemy(-9,-27);addEnemy(8,-33);addEnemy(12,-48);addEnemy(-12,-58);
 addLantern(-4,-12);addLantern(4,-12);addLantern(-8,-34);addLantern(8,-43);
 const bannerMat=mat(0x7b2434,0,.85);for(const x of [-5,5]){const pole=mesh(new THREE.CylinderGeometry(.045,.07,5.2,8),mats.gold,[x,2.6,-11]);activeScene.add(pole);const flag=mesh(new THREE.PlaneGeometry(1.2,1.65),bannerMat,[x-.52,3.45,-11]);flag.rotation.y=Math.PI;activeScene.add(flag);}
}
const oldRender=THREE.WebGLRenderer.prototype.render;
THREE.WebGLRenderer.prototype.render=function(scene,camera){activeScene=activeScene||scene;activeCamera=camera;populate();return oldRender.call(this,scene,camera)};
const clock=new THREE.Clock();
const tick=()=>{const t=clock.getElapsedTime();for(const a of actors){if(!a.g)continue;if(a.enemy){a.g.position.y=a.baseY+Math.sin(t*2+a.phase)*.035;a.g.rotation.y=Math.sin(t*.55+a.phase)*.16;}else if(a.npc){a.g.position.y=a.baseY+Math.sin(t*1.5+a.phase)*.045;a.g.rotation.y=Math.sin(t*.35+a.phase)*.12;}else if(a.marker){a.g.position.y=a.baseY+Math.sin(t*2+a.phase)*.22;a.g.rotation.z=t*1.4;}if(a.light)a.light.intensity=2.8+Math.sin(t*3+a.phase)*.55;}requestAnimationFrame(tick)};tick();
})();
