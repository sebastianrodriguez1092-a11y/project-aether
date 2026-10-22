import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
window.AetherThree=THREE;
const loadUpgrade=()=>{
  if(window.__AETHER_DETAILED_CHARACTERS_READY) return;
  const existing=document.querySelector('script[data-aether-character-upgrade="1"]');
  if(existing) return;
  const script=document.createElement('script');
  script.src='./aether-character-upgrade.js';
  script.dataset.aetherCharacterUpgrade='1';
  document.body.appendChild(script);
};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadUpgrade,{once:true});
else loadUpgrade();
