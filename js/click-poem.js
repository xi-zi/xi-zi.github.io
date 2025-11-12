// click-poem.js
(function(){
  const poems = [
    "床前明月光，疑是地上霜。——李白",
    "落花人独立，微雨燕双飞。——晏殊",
    "月落乌啼霜满天，江枫渔火对愁眠。——张继",
    "天街小雨润如酥，草色遥看近却无。——韩愈",
    "山光悦鸟性，潭影空人心。——王勃"
  ];

  function spawnText(x, y, text) {
    const el = document.createElement('span');
    el.textContent = text;
    el.style.position = 'fixed';
    el.style.left = (x) + 'px';
    el.style.top = (y) + 'px';
    el.style.zIndex = 9999;
    el.style.fontFamily = "'Noto Serif SC','Songti SC','serif'";
    el.style.fontSize = '14px';
    el.style.color = 'rgba(50,30,20,0.95)';
    el.style.pointerEvents = 'none';
    el.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out';
    document.body.appendChild(el);

    requestAnimationFrame(()=> {
      el.style.transform = 'translateY(-80px) scale(1.05)';
      el.style.opacity = '0';
    });
    
    setTimeout(()=> document.body.removeChild(el), 1400);
  }

  document.addEventListener('click', function(e){
    // 30% 概率显示诗句，避免每次点击都弹
    if (Math.random() < 0.3) {
      const idx = Math.floor(Math.random() * poems.length);
      spawnText(e.clientX + 10, e.clientY + 10, poems[idx]);
    }
  });
})();