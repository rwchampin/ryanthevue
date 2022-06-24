import gsap from 'gsap'
import * as THREE from 'three'

export default class Smoke {
  constructor(x, y, radius, textureLoader) {
    this.x = x
    this.y = y
    this.size = 3
    this.baseX = x
    this.baseY = y
    this.radius = radius
    this.density = (Math.random() * 30) + 1
    this.textureLoader = textureLoader
  }

  draw() {
    this.textureLoader.load('https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xCCCCCC,
        map: texture,
        transparent: true,
      })
      smokeMaterial.map.minFilter = THREE.LinearFilter
      const smokeGeometry = new THREE.PlaneBufferGeometry(200, 200)

      const smokeMeshes = []

      while (this.limit--) {
        const limit = this.limit
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, this.smokeMaterial)
        smokeMeshes[limit].position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, THREE.MathUtils.randInt(-100, 100))
        smokeMeshes[limit].rotation.z = Math.random() * 360
        this.smokeParticles.push(smokeMeshes[limit])
        this.scene.add(smokeMeshes[limit])
      }
    })
  }
}
const init = () => {
  for (let i = 0; i < this.limit; i++) {
    const x = Math.random() + window.innerWidth
    const y = Math.random() + window.innerHeight
    this.smokeParticles.push(new Smoke())
  }
}

