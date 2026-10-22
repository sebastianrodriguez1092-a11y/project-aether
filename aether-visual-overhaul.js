// AETHER_VISUAL_OVERHAUL_V2
(()=>{
  const apply=()=>{
    const root=document.getElementById('raceSelect')||document.getElementById('select');
    if(!root)return false;
    if(!document.getElementById('aetherVisualOverhaulStyle')){
      const style=document.createElement('style');style.id='aetherVisualOverhaulStyle';
      style.textContent=`
#select{background:radial-gradient(circle at 50% 18%,rgba(34,55,82,.76),rgba(4,8,15,.97) 76%)!important;isolation:isolate}
#aetherCharacterUpgrade{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:0!important;display:block!important;opacity:1!important;pointer-events:none!important}
#select .selectWrap{position:relative;z-index:3;min-height:100%;padding-top:18px}
#select .selectHead{position:relative;z-index:4;border-bottom-color:rgba(212,181,112,.34)!important}
#select .cards{position:relative;z-index:4;gap:10px!important}
#select .race{background:linear-gradient(180deg,rgba(10,17,27,.48),rgba(4,8,14,.72))!important;border-color:rgba(126,145,170,.34)!important;backdrop-filter:blur(2px)!important;box-shadow:0 10px 30px rgba(0,0,0,.32)!important}
#select .race:hover,#select .race.active{background:linear-gradient(180deg,rgba(25,37,54,.62),rgba(5,9,15,.7))!important;border-color:#e4c77b!important;box-shadow:0 16px 45px rgba(0,0,0,.6),0 0 34px var(--glow)!important}
#select .portrait{background:transparent!important}
#select .portrait canvas{display:none!important}
#select .raceInfo{background:linear-gradient(180deg,rgba(5,9,16,.08),rgba(5,9,16,.76))!important;position:relative;z-index:5}
#select .detail{background:rgba(4,9,16,.62)!important;backdrop-filter:blur(4px)!important}
#aether3DQualityBadge{position:absolute;left:50%;top:12px;transform:translateX(-50%);z-index:6;padding:7px 13px;border:1px solid rgba(218,187,112,.7);border-radius:999px;background:rgba(5,9,16,.68);color:#ead39b;font:700 10px/1 system-ui;letter-spacing:2px;text-transform:uppercase;pointer-events:none;box-shadow:0 4px 18px #0008}
@media(max-width:800px){#aether3DQualityBadge{top:6px;font-size:8px}}
      `;document.head.appendChild(style);
    }
    if(!document.getElementById('aether3DQualityBadge')){const badge=document.createElement('div');badge.id='aether3DQualityBadge';badge.textContent='AETHER · 3D CHARACTER SHOWCASE';root.appendChild(badge)}
    return true;
  };
  const tick=()=>{if(apply()){window.__AETHER_VISUAL_OVERHAUL_READY=true;return}setTimeout(tick,250)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tick,{once:true});else tick();
})();
