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

const textures = {}
textures.globeDiffuse = textureLoader.load('./textures/planet/globe/diffuse.jpg')
textures.globeNormal = textureLoader.load('./textures/planet/globe/normal.jpg')
textures.globeSpecular = textureLoader.load('./textures/planet/globe/specular.jpg')
textures.cloudsAlpha = textureLoader.load('./textures/planet/clouds/alpha.jpg')
textures.rock = textureLoader.load('./textures/planet/rock/diffuse-alpha.png')

/**
 * Planet
 */
const planet = {}

// Container
planet.container = new THREE.Object3D()
scene.add(planet.container)

// Globe
planet.globe = {}
planet.globe.geometry = new THREE.SphereGeometry(1, 46, 46)
planet.globe.material = new THREE.MeshStandardMaterial({
    map: textures.globeDiffuse,
    normalMap: textures.globeNormal,
    metalnessMap: textures.globeSpecular
})
planet.globe.mesh = new THREE.Mesh(planet.globe.geometry, planet.globe.material)
planet.container.add(planet.globe.mesh)

// Clouds
planet.clouds = {}
planet.clouds.geometry = new THREE.SphereGeometry(1.015, 46, 46)
planet.clouds.material = new THREE.MeshStandardMaterial({
    alphaMap: textures.cloudsAlpha,
    transparent: true
})
planet.clouds.mesh = new THREE.Mesh(planet.clouds.geometry, planet.clouds.material)
planet.container.add(planet.clouds.mesh)

// Ring
planet.ring = {}
planet.ring.geometry = new THREE.Geometry()

for(let i = 0; i < 500000; i++)
{
    const point = new THREE.Vector3()
    const angle = Math.random() * Math.PI * 2

    point.x = Math.cos(angle) * (1.5 + Math.random() * 1.5)
    point.z = Math.sin(angle) * (1.5 + Math.random() * 1.5)

    point.x += (Math.random() - 0.5) * 0.2
    point.y += (Math.random() - 0.5) * 0.2
    point.z += (Math.random() - 0.5) * 0.2

    planet.ring.geometry.vertices.push(point)
}

planet.ring.material = new THREE.PointsMaterial({
    size: 0.01,
    map: textures.rock,
    transparent: true
})
planet.ring.points = new THREE.Points(planet.ring.geometry, planet.ring.material)
planet.container.add(planet.ring.points)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x222222)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffebcc, 1)
directionalLight.position.x = 1
directionalLight.position.y = 0.5
directionalLight.position.z = 1
scene.add(directionalLight)

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

    camera.position.x = Math.cos(mouse.x * 10) * 3
    camera.position.z = Math.sin(mouse.x * 10) * 3
    camera.position.y = mouse.y * 3
    camera.lookAt(scene.position)

    const time = Date.now()

    planet.container.rotation.y = time * 0.00005
    planet.ring.points.rotation.y = - time * 0.00003

    renderer.render(scene, camera)
}
loop()