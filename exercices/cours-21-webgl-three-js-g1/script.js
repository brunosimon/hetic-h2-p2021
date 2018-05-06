/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
const camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight)
camera.position.z = 3
camera.position.x = 1
scene.add(camera)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const grassTexture = textureLoader.load('grass.jpg')
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
grassTexture.repeat.set(4, 4)

/**
 * House
 */
const house = new THREE.Object3D()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 1.5),
    new THREE.MeshStandardMaterial({ color: 0xffcc99, metalness: 0.3, roughness: 0.8 })
)
walls.castShadow = true
walls.receiveShadow = true
house.add(walls)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4, 1, 1),
    new THREE.MeshStandardMaterial({ map: grassTexture, metalness: 0.3, roughness: 0.8 })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0.5
floor.receiveShadow = true
house.add(floor)

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.6, 0.01),
    new THREE.MeshStandardMaterial({ color: 0xff8866, metalness: 0.3, roughness: 0.8 })
)
door.position.z = 0.75
door.position.y = -0.2
door.castShadow = true
door.receiveShadow = true
house.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x44bb44, metalness: 0.3, roughness: 0.8 })
)
bush1.position.z = 0.9
bush1.position.x = 0.25
bush1.position.y = -0.4
bush1.castShadow = true
bush1.receiveShadow = true
house.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x44bb44, metalness: 0.3, roughness: 0.8 })
)
bush2.position.z = 0.9
bush2.position.x = -0.25
bush2.position.y = -0.42
bush2.castShadow = true
bush2.receiveShadow = true
house.add(bush2)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 0.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x885522, metalness: 0.3, roughness: 0.8 })
)
roof.castShadow = true
roof.position.y = 0.75
house.add(roof)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x003366)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1.5)
pointLight.position.z = 0.85
pointLight.position.y = 0.2
pointLight.castShadow = true
scene.add(pointLight)

const directionLight = new THREE.DirectionalLight(0xccccff, 0.7)
directionLight.position.x = 1
directionLight.position.y = 1
directionLight.position.z = 1
directionLight.castShadow = true
directionLight.shadow.camera.top = 1.20
directionLight.shadow.camera.right = 1.20
directionLight.shadow.camera.bottom = -1.20
directionLight.shadow.camera.left = -1.20
scene.add(directionLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(windowWidth, windowHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

/**
 * Mouse
 */
const mouse = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / windowWidth - 0.5
    mouse.y = event.clientY / windowHeight - 0.5
})

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    camera.aspect = windowWidth / windowHeight
    camera.updateProjectionMatrix()

    renderer.setSize(windowWidth, windowHeight)
})

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    camera.position.x = mouse.x * 3
    camera.position.y = - mouse.y * 3
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
}
loop()