const modal=document.querySelector('#contact-modal');
document.querySelectorAll('.open-modal').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();modal.showModal()}));
document.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));
document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const d=new FormData(event.currentTarget);const message=`Hola AZSA, deseo solicitar asesoría.%0A%0ANombre: ${encodeURIComponent(d.get('nombre'))}%0AEmpresa: ${encodeURIComponent(d.get('empresa'))}%0ATeléfono: ${encodeURIComponent(d.get('telefono'))}%0ACorreo: ${encodeURIComponent(d.get('correo'))}%0AServicio: ${encodeURIComponent(d.get('servicio'))}%0AConsulta: ${encodeURIComponent(d.get('mensaje'))}`;window.open(`https://wa.me/51970526539?text=${message}`,'_blank');modal.close();});

(()=>{
  const carousel=document.querySelector('.hero-carousel');
  if(!carousel)return;
  const slides=[...carousel.querySelectorAll('.hero-slide')];
  const dots=[...carousel.querySelectorAll('.hero-carousel-dot')];
  const previous=carousel.querySelector('.hero-carousel-prev');
  const next=carousel.querySelector('.hero-carousel-next');
  let current=0;
  let autoplay;
  let touchStartX=0;

  const show=index=>{
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,position)=>slide.classList.toggle('is-active',position===current));
    dots.forEach((dot,position)=>{
      const active=position===current;
      dot.classList.toggle('is-active',active);
      dot.setAttribute('aria-selected',String(active));
    });
  };
  const restart=()=>{window.clearInterval(autoplay);autoplay=window.setInterval(()=>show(current+1),5000);};
  previous.addEventListener('click',()=>{show(current-1);restart();});
  next.addEventListener('click',()=>{show(current+1);restart();});
  dots.forEach((dot,index)=>dot.addEventListener('click',()=>{show(index);restart();}));
  carousel.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0].screenX;},{passive:true});
  carousel.addEventListener('touchend',event=>{
    const distance=event.changedTouches[0].screenX-touchStartX;
    if(Math.abs(distance)>40){show(current+(distance<0?1:-1));restart();}
  },{passive:true});
  carousel.addEventListener('mouseenter',()=>window.clearInterval(autoplay));
  carousel.addEventListener('mouseleave',restart);
  document.addEventListener('visibilitychange',()=>document.hidden?window.clearInterval(autoplay):restart());
  restart();
})();
