// Set variables
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// Mouse
const mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Particles
const particles = []

// Create function
const create = () =>
{
    const particle = {}
    particle.x = mouse.x
    particle.y = mouse.y
    particle.speed = Math.random() * 3
    particle.radius = Math.random() * 15
    particle.fillStyle = `hsl(${Math.random() * 255}, 100%, 50%)`
    particle.angle = Math.PI * 2 * Math.random()

    particles.push(particle)
}

// Clear function
const clear = () =>
{
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = '#000000'
    context.fillRect(0, 0, $canvas.width, $canvas.height)
}

// Update function
const update = () =>
{
    // Each particle
    let i = 0
    for(const particle of particles)
    {
        // Update position
        particle.x += Math.sin(particle.angle) * particle.speed
        particle.y += Math.cos(particle.angle) * particle.speed

        // Destroy if out of canvas
        if(particle.x > $canvas.width || particle.y > $canvas.height || particle.x < 0 || particle.y < 0)
        {
            particles.splice(i, 1)
            i--
        }

        i++
    }
}

// Draw function
const draw = () =>
{
    context.globalCompositeOperation = 'lighten'

    // Each particle
    for(const particle of particles)
    {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.fillStyle
        context.fill()
    }
}

// Resize
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

// Set loop
const loop = () =>
{
    window.requestAnimationFrame(loop)

    create() // Create new particles
    clear() // Clear canvas
    update() // Update particles
    draw() // Draw particles
}
loop()