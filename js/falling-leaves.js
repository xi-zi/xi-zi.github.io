// falling-leaves.js
(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'leaves-canvas';
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9980;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, leaves = [];

  function resize(){
    canvas.width = W = window.innerWidth;
    canvas.height = H = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // 叶子图片（可替换为水墨枫叶或花瓣 png）
  const img = new Image();
  img.src = '/images/leaf.png'; // 请把一张叶子或花瓣的透明PNG放到 /source/images/leaf.png

  function rand(a,b){ return Math.random()*(b-a)+a; }

  function createLeaf(){
    return {
      x: rand(0,W),
      y: -20,
      vx: rand(-0.3, 0.6),
      vy: rand(0.5, 1.5),
      rotation: rand(0, Math.PI*2),
      vr: rand(-0.02, 0.02),
      size: rand(12, 40),
      sx: rand(0.6,1.1)
    };
  }

  for(let i=0;i<25;i++) leaves.push(createLeaf());

  function update(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<leaves.length;i++){
      const lf = leaves[i];
      lf.x += lf.vx;
      lf.y += lf.vy;
      lf.rotation += lf.vr;
      lf.vy += 0.002; // gravity
      ctx.save();
      ctx.translate(lf.x, lf.y);
      ctx.rotate(lf.rotation);
      if (img.complete) {
        ctx.drawImage(img, -lf.size/2, -lf.size/2, lf.size, lf.size);
      } else {
        // fallback: simple circle
        ctx.fillStyle = 'rgba(180,80,50,0.8)';
        ctx.beginPath();
        ctx.ellipse(0,0, lf.size/2, lf.size/3, 0, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.restore();

      if (lf.y > H + 50 || lf.x < -50 || lf.x > W + 50) {
        leaves[i] = createLeaf();
        leaves[i].y = -20;
      }
    }
    requestAnimationFrame(update);
  }
  img.onload = update;
  // if img not load quickly
  setTimeout(()=> { if (!img.complete) update(); }, 500);
})();