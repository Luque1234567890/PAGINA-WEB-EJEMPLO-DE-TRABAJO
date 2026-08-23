const modal=document.querySelector('#contact-modal');
document.querySelectorAll('.open-modal').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();modal.showModal()}));
document.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));
document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const d=new FormData(event.currentTarget);const message=`Hola AZSA, deseo solicitar asesoría.%0A%0ANombre: ${encodeURIComponent(d.get('nombre'))}%0AEmpresa: ${encodeURIComponent(d.get('empresa'))}%0ATeléfono: ${encodeURIComponent(d.get('telefono'))}%0ACorreo: ${encodeURIComponent(d.get('correo'))}%0AServicio: ${encodeURIComponent(d.get('servicio'))}%0AConsulta: ${encodeURIComponent(d.get('mensaje'))}`;window.open(`https://wa.me/51970526539?text=${message}`,'_blank');modal.close();});
