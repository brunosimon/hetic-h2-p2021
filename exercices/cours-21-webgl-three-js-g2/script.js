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
scene.add(camera)

/**
 * House
 */
const textureLoader = new THREE.TextureLoader()
const grass = textureLoader.load('grass.jpg')
grass.wrapS = THREE.RepeatWrapping;
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.x = 4
grass.repeat.y = 4

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
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ map: grass, color: 0x00aa55, metalness: 0.3, roughness: 0.8 })
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
door.position.y = - 0.2
door.castShadow = true
door.receiveShadow = true
house.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x009955, metalness: 0.3, roughness: 0.8 })
)
bush1.position.z = 0.85
bush1.position.x = 0.22
bush1.position.y = - 0.4
bush1.castShadow = true
bush1.receiveShadow = true
house.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x009955, metalness: 0.3, roughness: 0.8 })
)
bush2.position.z = 0.85
bush2.position.x = - 0.22
bush2.position.y = - 0.42
bush2.castShadow = true
bush2.receiveShadow = true
house.add(bush2)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 0.5, 16),
    new THREE.MeshStandardMaterial({ color: 0x885522, metalness: 0.3, roughness: 0.8 })
)
roof.position.y = 0.75
door.castShadow = true
house.add(roof)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x003366)
scene.add(ambientLight)

const doorLight = new THREE.PointLight(0xffffff, 1.5)
doorLight.position.z = 0.85
doorLight.position.y = 0.2
doorLight.castShadow = true
house.add(doorLight)

const moonLight = new THREE.DirectionalLight(0xccccff, 0.7)
moonLight.position.x = 1
moonLight.position.y = 1
moonLight.position.z = 1
moonLight.castShadow = true
moonLight.shadow.camera.top = 1
moonLight.shadow.camera.right = 1
moonLight.shadow.camera.bottom = - 1
moonLight.shadow.camera.left = - 1
scene.add(moonLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
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