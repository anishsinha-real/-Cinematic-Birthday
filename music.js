/* Made With Feelings — simple background music system. */
(() => {
  const init=()=>{
    const existingButton=document.querySelector('#sound,#soundToggle,.sound-toggle');
    const button=existingButton||document.createElement('button');
    if(!existingButton){button.id='soundToggle';button.className='sound-toggle';button.type='button';button.setAttribute('aria-label','Toggle music');button.textContent='♪';(document.querySelector('.top,header')||document.body).appendChild(button);}else{button.classList.add('sound-toggle');button.type='button';button.setAttribute('aria-label','Toggle music');}
    let music=document.querySelector('#bgMusic');
    if(!music){music=document.createElement('audio');music.id='bgMusic';music.src='music2.mp3';document.body.appendChild(music);}
    music.loop=true;music.preload='auto';music.playsInline=true;music.volume=.42;music.setAttribute('playsinline','');
    let pausedByUser=false;
    const sync=()=>{const playing=!music.paused&&!music.ended;button.classList.toggle('active',playing);button.textContent=playing?'♫':'♪';button.setAttribute('aria-pressed',String(playing));};
    const play=async()=>{try{await music.play();pausedByUser=false;}catch(_){ }sync();};
    const unlock=()=>{if(!pausedByUser&&music.paused)play();};
    button.addEventListener('pointerdown',e=>e.stopPropagation());button.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
    button.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();if(music.paused)await play();else{pausedByUser=true;music.pause();sync();}});
    document.addEventListener('pointerdown',unlock,{once:true,passive:true});document.addEventListener('keydown',unlock,{once:true});
    music.addEventListener('play',sync);music.addEventListener('pause',sync);music.addEventListener('ended',sync);music.addEventListener('error',sync);sync();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
