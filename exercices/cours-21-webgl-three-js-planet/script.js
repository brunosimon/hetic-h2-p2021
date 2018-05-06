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
camera.position.z = 2
scene.add(camera)

/**
 * Textures 
 */
const textureLoader = new THREE.TextureLoader()

const planetDiffuseMap = textureLoader.load('./textures/planet/globe/diffuse.jpg')
const planetNormalMap = textureLoader.load('./textures/planet/globe/normal.jpg')
const planetSpecularMap = textureLoader.load('./textures/planet/globe/specular.jpg')
const cloudsMap = textureLoader.load('./textures/planet/clouds/alpha.jpg')
const rockMap = textureLoader.load('./textures/planet/rock/diffuse-alpha.png')

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
    map: planetDiffuseMap,
    normalMap: planetNormalMap,
    metalnessMap: planetSpecularMap
})
planet.globe.material.normalScale.x = 2
planet.globe.material.normalScale.y = 2
planet.globe.mesh = new THREE.Mesh(planet.globe.geometry, planet.globe.material)
planet.container.add(planet.globe.mesh)

// Clouds
planet.clouds = {}
planet.clouds.geometry = new THREE.SphereGeometry(1.01, 46, 46)
planet.clouds.material = new THREE.MeshStandardMaterial({
    alphaMap: cloudsMap,
    transparent: true
})
planet.clouds.mesh = new THREE.Mesh(planet.clouds.geometry, planet.clouds.material)
planet.container.add(planet.clouds.mesh)

// Ring
planet.ring = {}
planet.ring.geometry = new THREE.Geometry()

for(let i = 0; i < 100000; i++)
{
    const point = new THREE.Vector3()
    const angle = Math.PI * 2 * Math.random()
    const radius = 1.5 + Math.random() * 1.5
    point.x = Math.cos(angle) * radius
    point.z = Math.sin(angle) * radius

    point.x += (Math.random() - 0.5) * 0.1
    point.y += (Math.random() - 0.5) * 0.1
    point.z += (Math.random() - 0.5) * 0.1

    planet.ring.geometry.vertices.push(point)
}

planet.ring.material = new THREE.PointsMaterial({ map: rockMap, transparent: true, size: 0.015 })
planet.ring.points = new THREE.Points(planet.ring.geometry, planet.ring.material)
planet.container.add(planet.ring.points)

/**
 * Lights
 */
const ambiantLight = new THREE.AmbientLight(0x222222)
scene.add(ambiantLight)

const directionalLight = new THREE.DirectionalLight(0xffebcc, 1)
directionalLight.position.x = 1
directionalLight.position.y = 1
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

    const time = Date.now()

    camera.position.x = Math.sin(mouse.x * 3) * 2.5
    camera.position.z = Math.cos(mouse.x * 3) * 2.5
    camera.position.y = - mouse.y * 3
    camera.lookAt(scene.position)

    planet.container.rotation.y = time * 0.0001
    planet.ring.points.rotation.y = -time * 0.00005

    renderer.render(scene, camera)
}
loop()