// AETHER PROLOGUE INPUT FIX V1
(()=>{
const fix=()=>{const r=document.getElementById('aetherPrologue');if(!r)return false;const c=r.querySelector('canvas');if(c)c.style.pointerEvents='none';const d=r.querySelector('.dialogue');if(d)d.style.pointerEvents='auto';const b=r.querySelector('#aetherBeginStory');if(b)b.style.pointerEvents='auto';const s=r.querySelector('#aetherSkipStory');if(s)s.style.pointerEvents='auto';return true};
if(fix())return;const mo=new MutationObserver(()=>{if(fix())mo.disconnect()});mo.observe(document.body,{childList:true,subtree:true});
})();
