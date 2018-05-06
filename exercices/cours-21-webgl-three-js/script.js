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
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(windowWidth, windowHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

/**
 * Mouse
 */
const mouse = { x: 0.5, y: 0.5 }
window.addEventListener('mousemove', () =>
{
    mouse.x = event.clientX / windowWidth - 0.5
    mouse.y = event.clientY / windowHeight - 0.5
})

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

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4, 1, 1),
    new THREE.MeshStandardMaterial({ map: grassTexture, metalness: 0.3, roughness: 0.8 })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0.5
floor.castShadow = true
floor.receiveShadow = true
house.add(floor)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 1.5),
    new THREE.MeshStandardMaterial({ color: 0xffcc99, metalness: 0.3, roughness: 0.8 })
)
walls.castShadow = true
walls.receiveShadow = true
house.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 0.6, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x885522, metalness: 0.3, roughness: 0.8 })
)
roof.position.y += 0.8
roof.rotation.y += Math.PI * 0.25
roof.castShadow = true
roof.receiveShadow = true
house.add(roof)

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.4, 0.2),
    new THREE.MeshStandardMaterial({ color: 0xff8866, metalness: 0.3, roughness: 0.8 })
)
door.position.x = - 0.76
door.position.y = - 0.3
door.castShadow = true
door.receiveShadow = true
house.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 0.32, 0.32),
    new THREE.MeshStandardMaterial({ color: 0x228833, metalness: 0.3, roughness: 0.8 })
)
bush1.position.x = - 0.8
bush1.position.z = 0.2
bush1.position.y = - 0.45
bush1.castShadow = true
bush1.receiveShadow = true
house.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x228833, metalness: 0.3, roughness: 0.8 })
)
bush2.position.x = - 0.8
bush2.position.z = - 0.2
bush2.position.y = - 0.48
bush2.castShadow = true
bush2.receiveShadow = true
house.add(bush2)

/**
 * Lights
 */
const doorLight = new THREE.PointLight()
doorLight.position.x = -1.02
doorLight.position.y = 0
doorLight.position.z = 0
doorLight.castShadow = true
house.add(doorLight)

const ambientLight = new THREE.AmbientLight(0x555555)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffffff, 0.6)
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = 1.20
sunLight.shadow.camera.bottom = -1.20
sunLight.shadow.camera.left = -1.20
house.add(sunLight)

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

    // Update house
    house.rotation.y += 0.01
    
    // Update camera
    camera.position.x = mouse.x * 3
    camera.position.y = - mouse.y * 3
    camera.lookAt(new THREE.Vector3())

    // Render
    renderer.render(scene, camera)
}

loop()