// AETHER_PRODUCTION_WORLD_V1 — replace the visibly prototype-like world with authored GLB environment + real characters
(()=>{
const VERSION='20261022-PROD1';
if(window.__AETHER_PRODUCTION_WORLD)return;
window.__AETHER_PRODUCTION_WORLD=true;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const loadGLTF=async()=>{const THREE=window.AetherThree;if(!THREE)return null;const mod=await import('three/addons/loaders/GLTFLoader.js');return new mod.GLTFLoader()};
const frame=(root,target=90)=>{const THREE=window.AetherThree;const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3());const max=Math.max(size.x,size.y,size.z)||1;root.scale.multiplyScalar(target/max);const b2=new THREE.Box3().setFromObject(root);root.position.y-=b2.min.y;return {box:new THREE.Box3().setFromObject(root),size:b2.getSize(new THREE.Vector3())}};
const prep=()=>{const THREE=window.AetherThree,scene=window.__AETHER_ACTIVE_SCENE;if(!THREE||!scene)return null;const player=window.__AETHER_GLTF_PLAYER?.player||null;const camera=window.__AETHER_ACTIVE_CAMERA||null;return {THREE,scene,player,camera}};
const install=async()=>{
 const p=prep();if(!p)return false;const {THREE,scene,player,camera}=p;
 const loader=await loadGLTF();if(!loader)return false;
 // Wait briefly for the real skinned player. If it never arrives, retain the authored fallback rather than breaking gameplay.
 let realPlayer=player;for(let i=0;i<30&&!realPlayer;i++){await wait(200);realPlayer=window.__AETHER_GLTF_PLAYER?.player||null}
 if(!realPlayer)return false;
 // Preserve the real player and active camera; discard the old prototype geometry and lights.
 const keep=new Set([realPlayer]);if(camera)keep.add(camera);
 scene.children.slice().forEach(o=>{if(!keep.has(o))scene.remove(o)});
 realPlayer.position.set(0,0,8);realPlayer.rotation.y=Math.PI;
 // Authored environment: the gate is the focal landmark instead of boxes/cones.
 let env;
 try{const gltf=await loader.loadAsync('./assets/aether/environments/last-gate.glb');env=gltf.scene;env.name='AETHER_AUTHORED_FRONTIER';env.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(Array.isArray(o.material))o.material.forEach(m=>{m.needsUpdate=true});else if(o.material)o.material.needsUpdate=true}});frame(env,125);env.position.set(0,0,-42);scene.add(env)}catch(e){console.warn('[AETHER PROD] environment GLB unavailable',e)}
 // A broad organic terrain base keeps the scene grounded even if the environment asset has gaps.
 const groundMat=new THREE.MeshStandardMaterial({color:0x304b31,roughness:.96,metalness:0});const ground=new THREE.Mesh(new THREE.CircleGeometry(145,96),groundMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.08;ground.receiveShadow=true;scene.add(ground);
 // Curved road, deliberately tapered rather than a rectangular prototype strip.
 const pts=[new THREE.Vector3(-7,.02,18),new THREE.Vector3(-4,.02,4),new THREE.Vector3(2,.02,-10),new THREE.Vector3(-1,.02,-25),new THREE.Vector3(7,.02,-44),new THREE.Vector3(4,.02,-66)];
 const curve=new THREE.CatmullRomCurve3(pts);const verts=[],width=5.5,segments=80;for(let i=0;i<=segments;i++){const t=i/segments,c=curve.getPoint(t),tan=curve.getTangent(t).normalize(),side=new THREE.Vector3(-tan.z,0,tan.x);const w=width*(1-.16*t);verts.push(c.x+side.x*w,c.y,c.z+side.z*w,c.x-side.x*w,c.y,c.z-side.z*w)}const idx=[];for(let i=0;i<segments;i++){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setIndex(idx);geo.computeVertexNormals();const road=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0x6d5138,roughness:1}));road.receiveShadow=true;scene.add(road);
 // Atmospheric backdrop: soft haze and distant forms, not gameplay-blocking geometry.
 scene.background=new THREE.Color(0x91b6c4);scene.fog=new THREE.FogExp2(0x78969d,.0065);
 scene.add(new THREE.HemisphereLight(0xd8edff,0x263426,2.2));const sun=new THREE.DirectionalLight(0xffd7a0,3.7);sun.position.set(-45,70,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-90;sun.shadow.camera.right=90;sun.shadow.camera.top=90;sun.shadow.camera.bottom=-90;scene.add(sun);const fill=new THREE.DirectionalLight(0x7196d5,1.1);fill.position.set(35,28,-45);scene.add(fill);
 // Landmark lighting.
 const beacon=new THREE.PointLight(0x63baff,20,34);beacon.position.set(0,8,-42);scene.add(beacon);
 // Two real creature assets create scale and life in the scene.
 const addCreature=async(path,pos,desired,rot=0)=>{try{const g=(await loader.loadAsync(path)).scene;g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});frame(g,desired);g.position.set(...pos);g.rotation.y=rot;scene.add(g);return g}catch(e){console.warn('[AETHER PROD] creature unavailable',path,e);return null}};
 const stalker=await addCreature('./assets/aether/creatures/gloom-stalker.glb',[-12,0,-27],4.5,.55);const stalker2=await addCreature('./assets/aether/creatures/gloom-stalker.glb',[15,0,-53],4.2,-.8);const dragon=await addCreature('./assets/aether/creatures/ashfen-dragon.glb',[27,8,-78],18,-.4);if(dragon)dragon.userData.aetherFlying=true;
 // Rich foreground foliage clusters using low-cost instancing-like repeated meshes.
 const leafMat=new THREE.MeshStandardMaterial({color:0x527a4d,roughness:.95});const trunkMat=new THREE.MeshStandardMaterial({color:0x5b3e28,roughness:1});for(let i=0;i<38;i++){const x=(Math.random()-.5)*105,z=-6-Math.random()*105;if(Math.abs(x)<9&&z>-70)continue;const g=new THREE.Group();g.position.set(x,0,z);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.12,.28,2.2+Math.random()*1.8,7),trunkMat);tr.position.y=1.1;g.add(tr);for(let j=0;j<3;j++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.9+Math.random()*.65,1),leafMat);c.position.set((Math.random()-.5)*1.2,2.2+j*.45,(Math.random()-.5)*1.2);c.scale.y=.75;c.castShadow=true;g.add(c)}scene.add(g)}
 // Floating motes add depth without making the map look synthetic.
 const pg=new THREE.BufferGeometry(),count=500,posA=new Float32Array(count*3);for(let i=0;i<count;i++){posA[i*3]=(Math.random()-.5)*90;posA[i*3+1]=.5+Math.random()*16;posA[i*3+2]=-Math.random()*115+10}pg.setAttribute('position',new THREE.BufferAttribute(posA,3));scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xffe8b5,size:.055,transparent:true,opacity:.42,depthWrite:false})));
 // Camera is pulled closer and lower for a character-led MMORPG composition.
 if(camera){camera.fov=62;camera.near=.05;camera.far=500;camera.updateProjectionMatrix();camera.position.set(7,5,15);camera.lookAt(0,2,4)}
 window.__AETHER_PRODUCTION_WORLD_READY={version:VERSION,environment:!!env,creatures:[!!stalker,!!stalker2,!!dragon],player:!!realPlayer};return true;
};
(async()=>{for(let i=0;i<180;i++){try{if(await install())return}catch(e){console.warn('[AETHER PROD] retry',e)}await wait(250)}})();
})();
