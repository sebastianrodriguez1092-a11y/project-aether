// AETHER PROLOGUE INPUT FIX V2 — true pointer-event isolation
(()=>{
const fix=()=>{
  const r=document.getElementById('aetherPrologue');
  if(!r)return false;
  r.style.pointerEvents='none';
  r.style.touchAction='none';
  const c=r.querySelector('canvas');
  if(c)c.style.pointerEvents='none';
  const d=r.querySelector('.dialogue');
  if(d){d.style.pointerEvents='auto';d.style.position='relative';d.style.zIndex='20'}
  const b=r.querySelector('#aetherBeginStory');
  if(b){b.style.pointerEvents='auto';b.style.position='relative';b.style.zIndex='30'}
  const s=r.querySelector('#aetherSkipStory');
  if(s){s.style.pointerEvents='auto';s.style.position='relative';s.style.zIndex='30'}
  return true;
};
if(fix())return;
const mo=new MutationObserver(()=>{if(fix())mo.disconnect()});
mo.observe(document.body,{childList:true,subtree:true});
})();
