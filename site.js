(function(){
 var c=document.getElementById('net');if(!c)return;var x=c.getContext('2d'),W,H,dpr=Math.min(window.devicePixelRatio||1,2),pts=[],mouse={x:-9999,y:-9999};
 var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var LINK=150;
 function init(){
  W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  var n=Math.min(W<700?60:130,Math.round(W*H/11000));pts=[];
  for(var i=0;i<n;i++){pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()<.12?2.2:1.2+Math.random()*.6})}
 }
 function frame(){
  x.clearRect(0,0,W,H);
  for(var i=0;i<pts.length;i++){var p=pts[i];
   if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
   for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<LINK){x.strokeStyle='rgba(255,255,255,'+(0.22*(1-d/LINK)).toFixed(3)+')';x.lineWidth=1;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
   var mx=p.x-mouse.x,my=p.y-mouse.y,md=Math.sqrt(mx*mx+my*my);
   if(md<200){x.strokeStyle='rgba(140,200,255,'+(0.45*(1-md/200)).toFixed(3)+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(mouse.x,mouse.y);x.stroke()}
   x.fillStyle=p.r>2?'rgba(255,255,255,.95)':'rgba(255,255,255,.7)';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
  }
  if(!reduce&&!document.hidden)requestAnimationFrame(frame);
 }
 addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY});
 addEventListener('mouseout',function(){mouse.x=mouse.y=-9999});
 init();addEventListener('resize',function(){init();if(reduce)frame()});frame();
 document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(frame)});
 addEventListener('scroll',function(){var k=Math.min(1,scrollY/(innerHeight*0.9));c.style.opacity=(1-0.5*k).toFixed(2)},{passive:true});
 var f=document.getElementById('demoForm'),ok=document.getElementById('ok');if(f)f.addEventListener('submit',function(e){e.preventDefault();var b=f.querySelector('button');b.disabled=true;fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){if(!r.ok)throw 0;f.reset();ok.textContent='Merci ! Nous vous recontactons très vite pour fixer la démonstration.';ok.style.color='';ok.hidden=false;}).catch(function(){ok.textContent='L\'envoi n\'a pas fonctionné. Écrivez-nous à 2aa.formation@gmail.com.';ok.style.color='#ffb4a8';ok.hidden=false;}).then(function(){b.disabled=false;});});
})();
