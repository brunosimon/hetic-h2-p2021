class CursorParallax
{
    constructor()
    {
        this.setItems()
        this.setSize()
        this.setMouse()
        this.setRAF()
    }

    setItems()
    {
        this.items = []
        const $elements = document.querySelectorAll('.js-parallax')

        for(const $element of $elements)
        {
            const item = {}
            item.$element = $element
            item.parallaxX = 0
            item.parallaxY = 0
            item.multiplier = parseFloat($element.dataset.multiplier)

            this.items.push(item)
        }
    }

    setSize()
    {
        this.size = {}
        this.size.width = window.innerWidth
        this.size.height = window.innerHeight

        window.addEventListener('resize', (event) =>
        {
            this.size.width = window.innerWidth
            this.size.height = window.innerHeight
        })
    }

    setMouse()
    {
        this.mouse = {}
        this.mouse.x = 0
        this.mouse.y = 0

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.size.width - 0.5
            this.mouse.y = event.clientY / this.size.height - 0.5
        })
    }

    setRAF()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            for(const item of this.items)
            {
                const parallaxTargetX = - this.mouse.x * 100 * item.multiplier
                const parallaxTargetY = - this.mouse.y * 100 * item.multiplier

                item.parallaxX += (parallaxTargetX - item.parallaxX) * 0.2
                item.parallaxY += (parallaxTargetY - item.parallaxY) * 0.2

                item.parallaxX = Math.round(item.parallaxX * 100) / 100
                item.parallaxY = Math.round(item.parallaxY * 100) / 100

                item.$element.style.transform = `translateX(${item.parallaxX}px) translateY(${item.parallaxY}px)`
            }
        }

        loop()
    }
}