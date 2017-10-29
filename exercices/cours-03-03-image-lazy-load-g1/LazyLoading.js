class LazyLoading
{
    parse()
    {
        // Set variables
        const $lazyLoads = document.querySelectorAll('.lazy-load')

        for(const $lazyLoad of $lazyLoads)
        {
            const $img = $lazyLoad.querySelector('img')
            const $newImg = document.createElement('img')

            $newImg.addEventListener('load', () =>
            {
                $lazyLoad.classList.add('loaded')
            })

            $newImg.src = $img.src
        }
    }
}