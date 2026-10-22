import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
window.AetherThree=THREE;

const loadScript=(src,attr,onload)=>{
  const existing=document.querySelector(`script[data-${attr}="1"]`);
  if(existing){ if(onload) existing.addEventListener('load',onload,{once:true}); return existing; }
  const s=document.createElement('script');
  s.src=src;
  s.dataset[attr]='1';
  if(onload)s.addEventListener('load',onload,{once:true});
  s.addEventListener('error',e=>console.error('[AETHER] failed to load',src,e));
  document.body.appendChild(s);
  return s;
};

const loadBackgroundAssets=()=>{
  if(!window.__AETHER_DETAILED_CHARACTERS_READY)loadScript('./aether-character-upgrade.js?v=20261022e','aether-character-upgrade');
  loadScript('./aether-visual-overhaul.js?v=20261022e','aether-visual-overhaul');
};

const startPrologue=()=>{
  const launch=()=>{
    if(typeof window.AetherStartPrologue==='function')window.AetherStartPrologue();
    else window.dispatchEvent(new CustomEvent('aether:character-ready'));
  };
  loadScript('./aether-prologue.js?v=20261022e','aether-prologue',launch);
};

const bind=()=>{
  loadBackgroundAssets();
  const continueButton=document.getElementById('continue');
  if(continueButton)continueButton.addEventListener('click',startPrologue,{once:true,capture:true});
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
