const menu = document.querySelector('.menu')
const menuToggle = document.querySelector('.menu-toggle')

menuToggle.addEventListener('click', () =>
{
    menu.classList.toggle('active')
})