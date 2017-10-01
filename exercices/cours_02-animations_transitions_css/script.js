const $menu = document.querySelector('.menu')
const $menuToggle = document.querySelector('.menu-toggle')

$menuToggle.addEventListener('click', (event) =>
{
    event.preventDefault()
    $menu.classList.toggle('active')
})