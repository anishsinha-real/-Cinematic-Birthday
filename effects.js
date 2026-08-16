(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const symbols = ['✦','✧','♡','·'];
  const root = document.body;
  const style = document.createElement('style');
  style.textContent = `
    .fx-progress{position:fixed;top:0;left:0;width:100%;height:2px;background:rgba(255,255,255,.06);z-index:100}.fx-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#cbaea8,#fff);box-shadow:0 0 14px #cbaea8}
    .fx-cursor{position:fixed;width:260px;height:260px;border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(203,174,168,.12),transparent 68%);filter:blur(4px)}
    .fx-particles{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:2}.fx-particle{position:absolute;bottom:-30px;opacity:0;color:#cbaea8;text-shadow:0 0 14px currentColor;animation:fx-rise var(--d) linear infinite;animation-delay:var(--delay)}
    .fx-orb{position:fixed;border-radius:50%;pointer-events:none;filter:blur(70px);opacity:.12;z-index:-1}.fx-orb.a{width:280px;height:280px;background:#8c5960;left:-100px;top:20%;animation:fx-drift 12s ease-in-out infinite}.fx-orb.b{width:320px;height:320px;background:#d2a7a0;right:-140px;top:60%;animation:fx-drift 15s ease-in-out infinite reverse}
    .fx-reveal{opacity:0;transform:translateY(35px) scale(.985);transition:opacity 1s ease,transform 1s cubic-bezier(.2,.8,.2,1)}.fx-reveal.fx-visible{opacity:1;transform:none}
    .fx-tilt{transform-style:preserve-3d;transition:transform .35s ease,box-shadow .35s ease}.fx-tilt:hover{box-shadow:0 25px 70px rgba(0,0,0,.28)}
    button,.scroll{transition:transform .25s ease,box-shadow .25s ease}.fx-ripple{position:relative;overflow:hidden}.fx-ripple::after{content:'';position:absolute;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.35);transform:scale(0);pointer-events:none}.fx-ripple:active::after{animation:fx-ripple .55s ease}
    @keyframes fx-rise{0%{transform:translate3d(0,0,0) rotate(0);opacity:0}12%{opacity:.7}50%{transform:translate3d(var(--x),-50vh,0) rotate(150deg)}100%{transform:translate3d(calc(var(--x)*-1),-115vh,0) rotate(330deg);opacity:0}}
    @keyframes fx-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(80px,-45px,0)}}@keyframes fx-ripple{to{transform:scale(35);opacity:0}}
    @media(max-width:700px){.fx-cursor{display:none}.fx-orb{filter:blur(55px);opacity:.08}}
  `;
  root.appendChild(style);
  const progress=document.createElement('div');progress.className='fx-progress';progress.innerHTML='<i></i>';root.appendChild(progress);
  ['a','b'].forEach(c=>{const o=document.createElement('div');o.className='fx-orb '+c;root.appendChild(o)});
  const particles=document.createElement('div');particles.className='fx-particles';root.appendChild(particles);
  if(!reduced){for(let i=0;i<55;i++){const p=document.createElement('span');p.className='fx-particle';p.textContent=symbols[Math.floor(Math.random()*symbols.length)];p.style.left=Math.random()*100+'%';p.style.fontSize=8+Math.random()*16+'px';p.style.setProperty('--x',(Math.random()*180-90)+'px');p.style.setProperty('--d',8+Math.random()*12+'s');p.style.setProperty('--delay',-Math.random()*18+'s');particles.appendChild(p)}}
  const cursor=document.createElement('div');cursor.className='fx-cursor';root.appendChild(cursor);addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
  document.querySelectorAll('section').forEach(s=>s.classList.add('fx-reveal'));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-visible');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.fx-reveal').forEach(e=>io.observe(e));
  document.querySelectorAll('.reason-grid article,.memory-card,.letter-paper,.scroll,button').forEach(e=>e.classList.add('fx-tilt','fx-ripple'));
  if(!reduced)document.querySelectorAll('.fx-tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(700px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
  addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.firstElementChild.style.width=(max>0?scrollY/max*100:0)+'%'});
})();