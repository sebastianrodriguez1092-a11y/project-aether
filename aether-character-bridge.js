import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
window.AetherThree=THREE;
const loadScript=(src,attr)=>{if(document.querySelector(`script[data-${attr}="1"]`))return;const s=document.createElement('script');s.src=src;s.dataset[attr]='1';document.body.appendChild(s)};
const loadAssets=()=>{
  if(!window.__AETHER_DETAILED_CHARACTERS_READY)loadScript('./aether-character-upgrade.js?v=20261022c','aether-character-upgrade');
  loadScript('./aether-visual-overhaul.js?v=20261022c','aether-visual-overhaul');
  loadScript('./aether-prologue.js?v=20261022c','aether-prologue');
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadAssets,{once:true});else loadAssets();
