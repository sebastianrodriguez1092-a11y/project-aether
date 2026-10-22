// AETHER_WORLD_REFORGE_V1
(()=>{
const boot=()=>{
 if(window.__AETHER_WORLD_REFORGE_READY)return;
 const THREE=window.AetherThree;if(!THREE)return;
 const game=document.getElementById('game');if(!game)return;
 const style=document.createElement('style');style.textContent=`#aetherWorld{position:fixed;inset:0;z-index:2;pointer-events:auto}#aetherWorld canvas{width:100%;height:100%;display:block}#aetherWorld .nameplate{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);font:700 11px Georgia,serif;letter-spacing:2px;color:#e8d49b;text-shadow:0 2px 7px #000;pointer-events:none}#aetherWorld .location{position:absolute;left:50%;top:13%;transform:translateX(-50%);font:600 clamp(22px,3vw,38px) Georgia,serif;letter-spacing:5px;color:#f1e0b5;text-shadow:0 3px 18px #000;opacity:.9;pointer-events:none}@media(max-width:800px){#aetherWorld .location{top:12%;font-size:20px;letter-spacing:3px}}`;document.head.appendChild(style);
 const root=document.createElement('div');root.id='aetherWorld';root.innerHTML='<canvas></canvas><div class="location">FRONTERA DE AURELIA</div><div class="nameplate">CAMINANTE DEL ALBA</div>';document.body.appendChild(root);game.style.visibility='hidden';
 const canvas=root.querySelector('canvas');const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x8aa8bb);scene.fog=new THREE.FogExp2(0x7894a4,.012);
 const camera=new THREE.PerspectiveCamera(62,1,.05,500);camera.position.set(0,4.1,8.5);
 scene.add(new THREE.HemisphereLight(0xdff2ff,0x263127,1.7));const sun=new THREE.DirectionalLight(0xffe5bd,3);sun.position.set(-35,45,25);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);const fill=new THREE.DirectionalLight(0x6b9dff,1.15);fill.position.set(30,14,-30);scene.add(fill);
 const mat=(c,m=0,r=.7,e=0)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,emissive:e?c:0,emissiveIntensity:e});
 const grass=mat(0x4b7045,0,1),earth=mat(0x5d4c39,0,1),stone=mat(0x73797b,.08,.92),rock=mat(0x53585b,.12,.82),wood=mat(0x553c28,0,.95),leaf=mat(0x315d3b,0,.92),leaf2=mat(0x477a45,0,.9),steel=mat(0x697783,.75,.3),gold=mat(0xd0ae63,.8,.24),cloth=mat(0x24374a,0,.82),skin=mat(0xb98061,0,.72),magic=mat(0x5c9fff,.2,.18,2.5);
 const tg=new THREE.PlaneGeometry(260,260,90,90),tp=tg.attributes.position;for(let i=0;i<tp.count;i++){const x=tp.getX(i),y=tp.getY(i);tp.setZ(i)=0}