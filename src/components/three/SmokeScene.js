import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

export default class SmokeScene {
  constructor(options) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    // this.stats = new Stats()
    // this.stats.showPanel(0)
    // document.body.appendChild(this.stats.dom)
    Object.assign(this, options, defaults)
    this.onResize = this.onResize.bind(this)

    this.addEventListeners()
    this.init()
  }

  init() {
    const { width, height } = this

    this.clock = new THREE.Clock()

    const renderer = this.renderer = new THREE.WebGLRenderer({ antialiased: true, alpha: true })

    renderer.setSize(width, height)

    this.scene = new THREE.Scene()

    const meshGeometry = new THREE.BufferGeometry(200, 200, 200)
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xAA6666,
      wireframe: false,
    })
    this.mesh = new THREE.Mesh(meshGeometry, meshMaterial)

    this.cubeSineDriver = 0

    this.addCamera()
    this.addLights()
    this.addParticles()
    this.addBackground()

    document.body.appendChild(renderer.domElement)
  }

  evolveSmoke(delta) {
    // const { smokeParticles } = this;

    // let smokeParticlesLength = smokeParticles.length

    // while (smokeParticlesLength--) {
    // smokeParticles[smokeParticlesLength].rotation.z += delta * Math.random() * 0.7
    //   gsap.to(smokeParticles[smokeParticlesLength].position, 30, {
    //     ease: 'expo',
    //     z: 800,
    //     stagger: delta,
    //     scrollTrigger: {
    //       target: this.renderer.domElement,
    //       start: 'top top',
    //       end: '300%',
    //       scrub: true,
    //       markers: true,
    //     },
    //   })
    // }
  }

  addLights() {
    const { scene } = this
    const light = new THREE.DirectionalLight(0xFF0000, 0.75)

    light.position.set(0, 0, 10)
    light.lookAt(0, 0, 0)
    scene.add(light)

    const spotLight = new THREE.SpotLight('green')
    spotLight.position.set(0, 10, 0)
    spotLight.lookAt(0, 0, 0)
  }

  addCamera() {
    const { scene } = this
    const camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000)

    camera.position.z = 200
    camera.lookAt(0, 0, 0)
    scene.add(camera)
  }

  addParticles() {
    const { scene } = this
    const textureLoader = new THREE.TextureLoader()
    const smokeParticles = this.smokeParticles = []

    textureLoader.load('./assets/img/black-smoke.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xCCCCCC,
        map: texture,
        transparent: true,
      })
      smokeMaterial.map.minFilter = new THREE.LinearFilter()
      const smokeGeometry = new THREE.PlaneBufferGeometry(200, 200)

      const smokeMeshes = []
      let limit = 1150

      while (limit--) {
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial)
        smokeMeshes[limit].position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, THREE.MathUtils.randInt(-100, 100))
        smokeMeshes[limit].rotation.z = Math.random() * 360
        smokeParticles.push(smokeMeshes[limit])
        scene.add(smokeMeshes[limit])
      }
    })
  }

  addBackground() {
    // const { scene } = this
    // const textureLoader = new THREE.TextureLoader()
    // const textGeometry = new THREE.PlaneBufferGeometry(600, 320)

    // textureLoader.load('https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/background.jpg', (texture) => {
    //   const textMaterial = new THREE.MeshLambertMaterial({
    //     blending: THREE.AdditiveBlending,
    //     color: 'green',
    //     map: texture,
    //     opacity: 1,
    //     transparent: true,
    //   })
    //   textMaterial.map.minFilter = THREE.LinearFilter
    //   const text = new THREE.Mesh(textGeometry, textMaterial)

    //   text.position.z = -100
    //   scene.add(text)
    // })
  }

  render() {
    const { mesh } = this

    this.cubeSineDriver += 0.01

    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.01
    // mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500

    this.renderer.render(this.scene, this.camera)
  }

  update() {
    // this.stats.begin()
    this.evolveSmoke(this.clock.getDelta())
    this.render()
    // this.stats.end()
    requestAnimationFrame(this.update.bind(this))
  }

  onResize() {
    const { camera } = this

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    camera.aspect = windowWidth / windowHeight
    camera.updateProjectionMatrix()

    this.renderer.setSize(windowWidth, windowHeight)
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize)
  }
}

/* app.js */

