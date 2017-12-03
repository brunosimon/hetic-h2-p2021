const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

/**
 * Mouse coordinates
 */
const mouse = { x: 0, y: 0 }

document.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

/**
 * Handle resize
 */
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

/**
 * Create particles
 */
const particles = []

const create = () =>
{
    const particle = {}
    particle.x = mouse.x
    particle.y = mouse.y
    particle.angle = Math.random() * Math.PI * 2
    particle.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`
    particle.radius = Math.random() * 20
    particle.speed = Math.random() * 5

    particles.push(particle)
}

const update = () =>
{
    let i = 0
    for(const particle of particles)
    {
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed

        if(
            particle.x < 0 ||
            particle.x > $canvas.width ||
            particle.y < 0 ||
            particle.y > $canvas.height
        )
        {
            particles.splice(i, 1)
        }

        i++
    }
}

const clear = () =>
{
    context.clearRect(0, 0, $canvas.width, $canvas.height)
}

const draw = () =>
{
    context.globalCompositeOperation = 'lighter'

    for(const particle of particles)
    {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.fillStyle
        context.fill()
    }
}

const loop = () =>
{
    window.requestAnimationFrame(loop)

    create()
    update()
    clear()
    draw()
}

loop()