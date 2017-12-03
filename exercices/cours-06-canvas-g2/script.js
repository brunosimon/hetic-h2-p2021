const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// context.beginPath()

// context.moveTo(50, 50)
// context.lineTo(200, 200)
// context.lineTo(50, 200)
// // context.closePath()

// context.lineWidth = 20
// context.lineCap = 'round'
// context.lineJoin = 'round'
// context.strokeStyle = 'orange'

// context.fillStyle = 'red'

// context.shadowColor = 'rgba(100, 0, 0, 0.3)'
// context.shadowBlur = 20
// context.shadowOffsetX = 8
// context.shadowOffsetY = 30

// context.fill()

// context.shadowColor = 'rgba(0, 0, 0, 0)'

// context.stroke()

// context.beginPath()
// context.rect(50, 50, 200, 100)
// context.fill()

// context.beginPath()
// context.rect(400, 50, 200, 100)
// context.stroke()

// context.beginPath()
// context.moveTo(150, 300)
// context.arc(150, 300, 100, Math.PI * 0.25, Math.PI * 1.75)
// context.fillStyle = 'yellow'
// context.fill()

// context.beginPath()
// context.arc(150, 260, 10, 0, Math.PI * 2)
// context.fillStyle = 'black'
// context.fill()

// context.fillStyle = 'orange'
// context.fillRect(100, 100, 300, 200)

// context.clearRect(100, 150, 100, 100)

// const text = 'Lorem ipsum dolores'

// context.font = '40px Arial'
// context.textAlign = 'left'
// context.textBaseline = 'top'

// const measures = context.measureText(text)
// console.log(measures)

// context.fillText(text, 150, 300)
// context.strokeStyle = 'red'
// context.lineWidth = 2
// context.strokeText(text, 150, 300)

// const $image = new Image()

// $image.addEventListener('load', () =>
// {
//     context.drawImage($image, 50, 50, $image.width * 0.5, $image.height * 0.5)
// })

// $image.src = 'image.jpg'

// const gradient = context.createLinearGradient(50, 50, 250, 250)
// const gradient = context.createRadialGradient(
//     100, 100, 50,
//     100, 280, 250
// )

// gradient.addColorStop(0, 'rgb(255, 80, 0)')
// gradient.addColorStop(0.5, 'rgb(255, 191, 0)')
// gradient.addColorStop(1, 'rgb(255, 246, 155)')

// context.fillStyle = gradient

// context.fillRect(0, 0, 500, 500)

// context.beginPath()
// context.moveTo(100, 100)
// context.bezierCurveTo(
//     300, 100,
//     100, 300,
//     300, 300
// )
// context.lineWidth = 10
// context.stroke()

// context.beginPath()
// context.moveTo(100, 100)
// context.quadraticCurveTo(
//     300, 100,
//     300, 300
// )
// context.strokeStyle = 'red'
// context.stroke()

// context.globalCompositeOperation = 'lighter'

// context.fillStyle = '#ff0000'
// context.fillRect(50, 50, 200, 200)

// context.fillStyle = '#00ff00'
// context.fillRect(100, 100, 200, 200)

// context.fillStyle = '#0000ff'
// context.fillRect(150, 150, 200, 200)

// const ballCoords = { x: 300, y: 300 }
// const radius = 50

// const loop = () =>
// {
//     window.requestAnimationFrame(loop)

//     ballCoords.x += 4
//     ballCoords.y = 300 - Math.abs(Math.sin(Date.now() / 200)) * 100

//     if(ballCoords.x >= $canvas.width + radius)
//     {
//         ballCoords.x = - radius
//     }

//     context.clearRect(0, 0, $canvas.width, $canvas.height)

//     context.beginPath()
//     context.arc(ballCoords.x, ballCoords.y, radius, 0, Math.PI * 2)
//     context.fillStyle = 'orange'
//     context.fill()
// }
// loop()

const mouse = { x: 0, y: 0 }

document.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

const ballCoords = { x: 0, y: 0 }

const loop = () =>
{
    window.requestAnimationFrame(loop)

    ballCoords.x += (mouse.x - ballCoords.x) / 10
    ballCoords.y += (mouse.y - ballCoords.y) / 10

    context.fillStyle = 'rgba(255, 255, 255, 0.2)'
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    context.beginPath()
    context.arc(ballCoords.x, ballCoords.y, 50, 0, Math.PI * 2)
    context.fillStyle = 'orange'
    context.fill()
}
loop()
