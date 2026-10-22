// AETHER_CHARACTER_BRIDGE_V7
(()=>{
const loadScript=(src,attr,onload)=>{
  const selector=`script[data-aether-loader="${attr}"]`;
  const existing=document.querySelector(selector);
  if(existing){if(onload){if(existing.dataset.loaded==='1')setTimeout(onload,0);else existing.addEventListener('load',onload,{once:true})}return existing}
  const s=document.createElement('script');s.src=src;s.setAttribute('data-aether-loader',attr);if(onload)s.addEventListener('load',onload,{once:true});
  s.addEventListener('load',()=>{s.dataset.loaded='1'});s.addEventListener('error',e=>{window.__AETHER_BRIDGE_ERROR=`Failed to load ${src}`;console.error('[AETHER] failed to load',src,e)});document.body.appendChild(s);return s;
};
const loadBackgroundAssets=()=>{if(!window.__AETHER_DETAILED_CHARACTERS_READY)loadScript('./aether-character-upgrade.js?v=20261022i','aether-character-upgrade');loadScript('./aether-visual-overhaul.js?v=20261022i','aether-visual-overhaul')};
const preparePrologue=()=>loadScript('./aether-prologue.js?v=20261022i','aether-prologue');
const startPrologue=()=>{const launch=()=>{if(typeof window.AetherStartPrologue==='function')window.AetherStartPrologue();else window.__AETHER_PROLOGUE_ERROR='AetherStartPrologue was not defined after loading aether-prologue.js'};const script=document.querySelector('script[data-aether-loader="aether-prologue"]');if(script&&script.dataset.loaded==='1')launch();else if(script)script.addEventListener('load',launch,{once:true});else loadScript('./aether-prologue.js?v=20261022i','aether-prologue',launch)};
const bind=async()=>{loadBackgroundAssets();preparePrologue();try{const THREE=await import('three');window.AetherThree=THREE;window.__AETHER_THREE_READY=true}catch(error){window.__AETHER_THREE_ERROR=(error&&error.stack)||((error&&error.message)||String(error));console.error('[AETHER] Three.js bridge import failed',error);return}const continueButton=document.getElementById('continue');if(continueButton)continueButton.addEventListener('click',startPrologue,{once:true,capture:true})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
