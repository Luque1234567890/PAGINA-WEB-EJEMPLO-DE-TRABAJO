const menuToggle=document.querySelector('.menu-toggle');
const siteNav=document.querySelector('.header nav');
if(menuToggle&&siteNav){menuToggle.addEventListener('click',()=>siteNav.classList.toggle('open'));}
