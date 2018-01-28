class CursorParallax
{
    constructor()
    {
        this.setItems()
        this.setMouse()
        this.setRAF()
    }

    setItems()
    {
        const $elements = document.querySelectorAll('.js-cursor-parallax')
        
        this.items = []

        for(const $element of $elements)
        {
            const item = {}
            item.$element = $element
            item.offsetX = 0
            item.offsetY = 0
            item.amplitude = parseFloat($element.dataset.amplitude)

            this.items.push(item)
        }
    }

    setMouse()
    {
        this.mouse = {}
        this.mouse.x = 0
        this.mouse.y = 0

        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight

        window.addEventListener('resize', (event) =>
        {
            windowWidth = window.innerWidth
            windowHeight = window.innerHeight
        })

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / windowWidth - 0.5
            this.mouse.y = event.clientY / windowHeight - 0.5
        })
    }

    setRAF()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            for(const item of this.items)
            {
                const offsetX = - this.mouse.x * 100 * item.amplitude
                const offsetY = - this.mouse.y * 100 * item.amplitude

                item.offsetX += (offsetX - item.offsetX) * 0.1
                item.offsetY += (offsetY - item.offsetY) * 0.1

                const roundedOffsetX = Math.round(item.offsetX * 100) / 100
                const roundedOffsetY = Math.round(item.offsetY * 100) / 100

                item.$element.style.transform = `
                    translateX(${roundedOffsetX}px)
                    translateY(${roundedOffsetY}px)
                `
            }
        }
        loop()
    }
}

