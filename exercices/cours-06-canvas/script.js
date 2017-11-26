const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')

// // Je commence à tracer
// context.beginPath()

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

// const text = 'Lorem ipsum dolor sit amet'

// console.log(context.measureText(text))

// context.font = '40px Arial'
// context.textAlign = 'center'
// context.textBaseline = 'top'

// console.log(context.measureText(text))

// context.fillText(text, 300, 100)
// context.strokeText(text, 300, 160)

// const $image = document.createElement('img')

// $image.addEventListener('load', () =>
// {
//     // Draw image without resizing
//     context.drawImage($image, 0, 0)

//     // // Draw image and resize
//     // context.drawImage($image, 0, 0, $image.width * 0.5, $image.height * 0.5)

//     // // Draw image, clip (meaning only take a part) and resize
//     // context.drawImage($image, 100, 100, 200, 200, 0, 0, $image.width * 0.5, $image.height * 0.5)
// })

// $image.src = 'image.jpg'

// const gradient = context.createLinearGradient(50, 50, 250, 250)
// gradient.addColorStop(0, 'rgb(255, 80, 0)')
// gradient.addColorStop(0.5, 'rgb(255, 191, 0)')
// gradient.addColorStop(1, 'rgb(255, 246, 155)')

// context.fillStyle = gradient

// context.fillRect(0, 0, 400, 400)

// const gradient = context.createRadialGradient(
//     100, 100, 50, // First circle position and radius
//     100, 250, 250 // Second circle position and radius
// )
// gradient.addColorStop(0, 'rgb(255, 80, 0)')
// gradient.addColorStop(0.5, 'rgb(255, 191, 0)')
// gradient.addColorStop(1, 'rgb(255, 246, 155)')

// context.fillStyle = gradient

// context.fillRect(0, 0, 400, 400)

// context.beginPath()
// context.moveTo(50, 50) // X et Y du point de départ
// context.bezierCurveTo(
//     300, // X du premier point de tension
//     100, // Y du premier point de tension
//     100, // X du second point de tension
//     300, // Y du second point de tension
//     300, // X du point d'arrivée
//     300  // Y du point d'arrivée
// )
// context.stroke()

// context.beginPath()
// context.moveTo(50, 50) // X et Y du point de départ
// context.quadraticCurveTo(
//     300, // X du seul point de tension
//     100, // Y du seul point de tension
//     300, // X du point d'arrivée
//     300  // Y du point d'arrivée
// )
// context.stroke()

// // Si vous utilisez une image dans le canvas, lancez MAMP/WAMP pour éviter les proplème de cross-domain
// const image = document.createElement('img')

// // Attend que l'image soit chargé
// image.addEventListener('load', () =>
// {
//     // Dessiner l'image chargée dans le canvas
//     context.drawImage(image, 0, 0)

//     // Récupérer les pixels dans imageData
//     const imageData = context.getImageData(0, 0, image.width, image.height)

//     // Parcourir les pixels 4 par 4
//     for(let i = 0; i < imageData.data.length; i += 4)
//     {
//         // Traiter ces pixels couleur par couleur
//         // Ici, on rend l'image noir et blanc en calculant une valeur de gris et en mettant cette valeur pour chaque couleur primaire
//         const gray = (imageData.data[i + 0] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
//         imageData.data[i + 0] = gray
//         imageData.data[i + 1] = gray
//         imageData.data[i + 2] = gray
//         // On ne touche pas à l'apha
//     }

//     // Dessiner la nouvelle image par dessus
//     context.putImageData(imageData, 0, 0)
// })

// image.src = 'image.jpg'

// const loop = () =>
// {
//     window.requestAnimationFrame(loop)
//     // console.log('loop')
// }
// window.requestAnimationFrame(loop)

// // Coordonnées de base
// const coords = { x: 100, y: 200 }

// // Fonction déclenchée à chaque frame
// const loop = () =>
// {
//     window.requestAnimationFrame(loop)

//     coords.x += 4
//     coords.y = 200 - Math.abs(Math.sin(Date.now() * 0.005)) * 100

//     if(coords.x > $canvas.width + 50)
//     {
//         coords.x = - 50
//     }

//     context.globalAlpha = 0.2
//     context.fillStyle = '#fff'
//     context.fillRect(0, 0, $canvas.width, $canvas.height)

//     context.beginPath()
//     context.arc(coords.x, coords.y, 50, 0, Math.PI * 2)
//     context.globalAlpha = 1
//     context.fillStyle = 'orange'
//     context.fill()
// }

// loop()

// Coordonnées de la souris
const mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Coordonnées de la la balle
const coords = { x: 0, y: 0 }

// Fonction déclenchée à chaque frame
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Met à jour les coordonnées de la balle en appliquant un easing
    coords.x += (mouse.x - coords.x) * 0.1
    coords.y += (mouse.y - coords.y) * 0.1

    // Efface le canvas
    context.globalAlpha = 0.2
    context.fillStyle = '#fff'
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    // Dessine la balle
    context.beginPath()
    context.arc(coords.x, coords.y, 50, 0, Math.PI * 2)
    context.globalAlpha = 1
    context.fillStyle = 'orange'
    context.fill()
}

loop()