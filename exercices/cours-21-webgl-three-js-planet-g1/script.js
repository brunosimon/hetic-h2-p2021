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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Dummy
 */
const dummy = new THREE.Mesh(
    new THREE.TorusKnotBufferGeometry(1, 0.3, 100, 16),
    new THREE.MeshNormalMaterial()
)
scene.add(dummy)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(windowWidth, windowHeight)
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