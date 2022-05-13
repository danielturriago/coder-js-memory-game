//DOM VARIABLES
const menuBtn = document.querySelector('.menu');
const aside = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
  aside.classList.toggle('show');
})