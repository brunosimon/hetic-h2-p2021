const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// Je commence à tracer
context.beginPath()

// // Je défini un tracé
// context.moveTo(50, 50)
// context.lineTo(200, 200)
// context.lineTo(50, 200)

// // Je défini le style
// context.lineWidth = 20
// context.lineCap = 'round'
// context.lineJoin = 'bevel'
// context.strokeStyle = 'orange'

// context.fillStyle = 'blue'

// context.shadowColor = 'blue'
// context.shadowBlur = 50
// context.shadowOffsetX = 5
// context.shadowOffsetY = 10

// // Je dessine le tracé avec le style
// context.fill()
// context.stroke()

// // Style
// context.fillStyle   = 'orange'
// context.strokeStyle = 'orange'

// // Remplissage d'un rectangle
// context.beginPath()
// context.rect(50, 50, 200, 100)
// context.fill()

// context.beginPath()
// context.rect(50, 200, 200, 100)
// context.stroke()

// context.beginPath()
// context.arc(400, 50, 100, 0, Math.PI, false)
// context.fill()

// context.beginPath()
// context.arc(400, 200, 100, 0, Math.PI, false)
// context.stroke()

// context.fillStyle = 'orange'
// context.fillRect(50, 50, 300, 160)
// context.clearRect(50, 50, 100, 80)

// context.fillStyle = 'cyan'
// context.fillRect(160, 60, 20, 70)

// context.beginPath()
// context.fillStyle = 'black'
// context.arc(280, 210, 50, 0, Math.PI * 2, false)
// context.arc(120, 210, 50, 0, Math.PI * 2, false)
// context.fill()

const text = 'Lorem ipsum dolor sit amet'

console.log(context.measureText(text))

context.font = '40px Arial'
context.textAlign = 'center'
context.textBaseline = 'top'

console.log(context.measureText(text))

context.fillText(text, 300, 100)
context.strokeText(text, 300, 160)