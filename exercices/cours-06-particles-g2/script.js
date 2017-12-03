const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

/**
 * Mouse
 */
const mouse = { x: 0, y: 0 }

document.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

/**
 * Resize
 */
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

/**
 * Particles
 */
const particles = []

const create = () =>
{
    const particle = {}
    particle.x = mouse.x
    particle.y = mouse.y
    particle.angle = Math.random() * Math.PI * 2
    particle.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    particle.radius = Math.random() * 20
    particle.speed = Math.random() * 2

    particles.push(particle)
}

const update = () =>
{
    let i = 0
    for(const particle of particles)
    {
        particle.x += Math.sin(particle.angle) * particle.speed
        particle.y += Math.cos(particle.angle) * particle.speed

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
        context.fillStyle = particle.color
        context.fill()
    }
}

const loop = () =>
{
    window.requestAnimationFrame(loop)

    for(let i = 0; i < 2; i++)
    {
        create()
    }
    update()
    clear()
    draw()
}
loop()
