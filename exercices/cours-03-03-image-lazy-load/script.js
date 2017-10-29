/**
 * Learnt:
 * - browser network throttling
 * - image load event
 * - querySelectorAll
 * - Array.from()
 * - for ... of ...
 */

const $lazyLoads = Array.from(document.querySelectorAll('.lazy-load'))

for(const $lazyLoad of $lazyLoads)
{
    const $originalImg = $lazyLoad.querySelector('img')
    const src = $originalImg.getAttribute('src')
    
    $originalImg.removeAttribute('src')

    $originalImg.addEventListener('load', () =>
    {
        $lazyLoad.classList.add('loaded')
    })

    $originalImg.setAttribute('src', src)
}