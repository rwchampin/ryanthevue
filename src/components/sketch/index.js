/* eslint-disable no-console */
import * as THREE from 'three'
import fragment from './fragment.glsl'
import vertex from './vertex.glsl'

export default class Sketch {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000)
    this.camera.position.z = 1000
    this.scene = new THREE.Scene()
    this.addMesh()
    this.time = 0
    this.render = this.render.bind(this)
    this.render()
  }

  addMesh() {
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        progress: {
          type: 'f', value: 0,
        },
        side: THREE.DoubleSide,
      },
    })
    this.geometry = new THREE.BufferGeometry()
    const number = 512 * 512

    this.positions = new THREE.BufferAttribute(new Float32Array(number * 3), 3)
    let index = 0
    for (let i = 0; i < 512; i++) {
      for (let j = 0; j < 512; j++) {
        this.positions.setXYZ(index, i, j, 0)
        index++
      }
    }

    this.geometry.setAttribute('position', this.positions)

    this.mesh = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.time++
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.02
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render)
  }
}

