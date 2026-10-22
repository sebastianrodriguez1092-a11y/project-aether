// AETHER_VISUAL_OVERHAUL_V1
(()=>{
  const apply=()=>{
    const root=document.getElementById('raceSelect');
    if(!root)return false;
    if(!document.getElementById('aetherVisualOverhaulStyle')){
      const style=document.createElement('style');
      style.id='aetherVisualOverhaulStyle';
      style.textContent=`
#raceSelect{background:radial-gradient(circle at 50% 18%,rgba(34,55,82,.94),rgba(4,8,15,.98) 72%)!important;isolation:isolate}
#aetherCharacterUpgrade{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:0!important;display:block!important;opacity:1!important}
#aetherHeroStage{display:none!important}
#raceSelect>.racePanel{position:relative;z-index:3!important;background:linear-gradient(180deg,rgba(5,9,16,.58),rgba(5,9,16,.38))!important;border:1px solid rgba(211,181,113,.48)!important;backdrop-filter:blur(2px)!important;box-shadow:0 30px 100px rgba(0,0,0,.72)!important}
#raceSelect .raceTop{position:relative;z-index:4}
#raceSelect .raceGrid{position:relative;z-index:4;gap:9px!important}
#raceSelect .raceCard{background:linear-gradient(180deg,rgba(13,20,32,.62),rgba(6,10,17,.78))!important;border-color:rgba(122,143,174,.48)!important;box-shadow:0 12px 28px rgba(0,0,0,.34),inset 0 1px rgba(255,255,255,.05)!important;backdrop-filter:blur(3px)!important}
#raceSelect .raceCard:hover,#raceSelect .raceCard.selected{background:linear-gradient(180deg,rgba(31,43,63,.78),rgba(7,11,18,.78))!important;border-color:#e1c27b!important;box-shadow:0 16px 38px rgba(0,0,0,.52),0 0 28px rgba(218,180,99,.16)!important}
#raceSelect .raceArt{background:transparent!important;opacity:.18!important;pointer-events:none}
#raceSelect .raceFigure{opacity:0!important;visibility:hidden!important}
#raceSelect .raceInfo{position:relative;z-index:5;background:linear-gradient(180deg,rgba(5,9,16,.06),rgba(5,9,16,.72))!important}
#raceSelect .raceTop h2{text-shadow:0 3px 20px #000;font-size:30px!important;letter-spacing:5px!important}
#aether3DQualityBadge{position:absolute;left:50%;top:16px;transform:translateX(-50%);z-index:5;padding:7px 13px;border:1px solid rgba(218,187,112,.7);border-radius:999px;background:rgba(5,9,16,.64);color:#ead39b;font:700 10px/1 system-ui;letter-spacing:2px;text-transform:uppercase;pointer-events:none;box-shadow:0 4px 18px #0008}
@media(max-width:800px){#aether3DQualityBadge{top:8px;font-size:8px}.raceTop h2{font-size:21px!important}}
      `;
      document.head.appendChild(style);
    }
    if(!document.getElementById('aether3DQualityBadge')){
      const badge=document.createElement('div');
      badge.id='aether3DQualityBadge';
      badge.textContent='AETHER · 3D CHARACTER SHOWCASE';
      root.appendChild(badge);
    }
    return true;
  };
  const tick=()=>{
    if(apply()){
      window.__AETHER_VISUAL_OVERHAUL_READY=true;
      return;
    }
    setTimeout(tick,250);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tick,{once:true});else tick();
})();
