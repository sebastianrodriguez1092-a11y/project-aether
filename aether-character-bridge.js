import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
window.AetherThree=THREE;
const loadAssets=()=>{
  if(!window.__AETHER_DETAILED_CHARACTERS_READY){
    const existing=document.querySelector('script[data-aether-character-upgrade="1"]');
    if(!existing){
      const script=document.createElement('script');
      script.src='./aether-character-upgrade.js?v=20261022b';
      script.dataset.aetherCharacterUpgrade='1';
      document.body.appendChild(script);
    }
  }
  const visual=document.createElement('script');
  visual.src='./aether-visual-overhaul.js?v=20261022b';
  visual.dataset.aetherVisualOverhaul='1';
  document.body.appendChild(visual);
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadAssets,{once:true});
else loadAssets();
