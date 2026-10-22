from pathlib import Path
p=Path('PROJECT_AETHER_MOBILE_V004_RACES_CLASSES.html')
s=p.read_text()
old="for(let z=-6;z>-49;z-=7){box(-10,2,z,2.4,4,6);box(10,2,z,2.4,4,6);box(-6,4,z-2,5,1.3,1.2);box(6,4,z-2,5,1.3,1.2)}"
new="""for(let z=-6;z>-49;z-=9){\n const archW=2.0+Math.sin(z*.17)*.35, archH=4.4+Math.cos(z*.11)*.55;\n for(const side of [-1,1]){\n  const p=box(side*(9.2+Math.sin(z*.09)*.8),2.15,z,2.0+Math.random()*.35,4.3+Math.random()*.8,4.2);\n  p.rotation.y=(Math.random()-.5)*.08;\n  const cap=box(side*(7.0+Math.sin(z*.09)*.8),4.25,z-1.2,4.3,1.05,1.25); cap.rotation.z=(Math.random()-.5)*.035;\n }\n const lintel=box(0,archH,z-1.15,13.2,1.0,1.3,darkMat);\n lintel.rotation.y=(Math.random()-.5)*.025;\n}"""
if old not in s: raise SystemExit('corridor block not found')
s=s.replace(old,new,1)
needle="rubble.receiveShadow=true;scene.add(rubble);"
insert="""rubble.receiveShadow=true;scene.add(rubble);\n// Reforged world props: irregular boulders, broken pillars, roots and readable landmarks.\nconst rockMats=[stoneMat,new THREE.MeshStandardMaterial({color:0x59616b,roughness:.95}),new THREE.MeshStandardMaterial({color:0x343b45,roughness:.78,metalness:.18})];\nfor(let i=0;i<70;i++){const x=(rnd()-.5)*38,z=10-rnd()*88;const g=new THREE.Group();const rock=new THREE.Mesh(new THREE.IcosahedronGeometry(.7+rnd()*1.6,1),rockMats[i%rockMats.length]);rock.scale.set(1.2+rnd(),.65+rnd()*.7,.8+rnd()*1.1);rock.rotation.set(rnd(),rnd(),rnd());rock.castShadow=rock.receiveShadow=true;g.add(rock);if(i%5===0){const shard=new THREE.Mesh(new THREE.CylinderGeometry(.08,.22,.9+rnd()*1.6,7),darkMat);shard.position.set((rnd()-.5)*1.2,.7,(rnd()-.5)*1.2);shard.rotation.z=(rnd()-.5)*.8;shard.castShadow=true;g.add(shard)}g.position.set(x,.25,z);scene.add(g)}\nfor(let i=0;i<28;i++){const x=(rnd()-.5)*30,z=5-rnd()*80;for(const side of [-1,1]){const col=new THREE.Mesh(new THREE.CylinderGeometry(.28,.42,2.5+rnd()*2.5,8),darkMat);col.position.set(x+side*(2+rnd()*2),1.2,z);col.rotation.z=(rnd()-.5)*.18;col.castShadow=col.receiveShadow=true;scene.add(col)}}\n"""
if needle not in s: raise SystemExit('rubble needle not found')
s=s.replace(needle,insert,1)
needle2="crowns.forEach(c=>{c.castShadow=true;scene.add(c)});"
insert2="""crowns.forEach(c=>{c.castShadow=true;scene.add(c)});\nfor(let i=0;i<65;i++){const side=i%2?-1:1,x=side*(8+rnd()*35),z=12-rnd()*102,h=3+rnd()*4;const t=new THREE.Mesh(new THREE.CylinderGeometry(.12,.32,h,7),bark);t.position.set(x,h/2,z);t.rotation.z=(rnd()-.5)*.15;t.castShadow=true;scene.add(t);for(let b=0;b<3;b++){const br=new THREE.Mesh(new THREE.CylinderGeometry(.045,.1,1.2+rnd()*1.5,6),bark);br.position.set(x+(rnd()-.5)*1.2,h*.45+b*.5,z+(rnd()-.5)*1.2);br.rotation.z=(rnd()-.5)*1.1;br.rotation.x=(rnd()-.5)*.6;br.castShadow=true;scene.add(br)}}\n"""
if needle2 not in s: raise SystemExit('crowns needle not found')
s=s.replace(needle2,insert2,1)
s=s.replace("scene.fog=new THREE.FogExp2(0x7895a6,.009);","scene.fog=new THREE.FogExp2(0x657f92,.0065);")
s=s.replace("renderer.toneMappingExposure=1.18;","renderer.toneMappingExposure=1.06;")
p.write_text(s)
