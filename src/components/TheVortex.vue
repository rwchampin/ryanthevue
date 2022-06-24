<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import s from '~/assets/img/d.png'
const container = ref(null)
let controls, helper; const smokeParticles = []
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.01, 1000)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor(0x282928, 1)

renderer.setSize(window.innerWidth, window.innerHeight)

const clock = new THREE.Clock(); let portalGeo, portalMaterial, sceneLight
const directionalHelper = null
const animate = (time = 0) => {
  const delta = clock.getElapsedTime()

  smokeParticles.forEach((p) => {
    p.position.set(
      Math.sin(Math.PI * 2 * delta) * 300,
      Math.cos(Math.PI * 2 * delta) * 300,
      0.5 * p * Math.sin((4 * p * Math.PI) / 180),
    )
  })
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function particleSetup() {
  const loader = new THREE.TextureLoader()

  loader.load(s, (texture) => {
    portalGeo = new THREE.PlaneBufferGeometry(350, 350)
    portalMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
    })

    for (let p = 880; p > 250; p--) {
      const elapsedTime = clock.getElapsedTime()
      const particle = new THREE.Mesh(portalGeo, portalMaterial)
      particle.position.set(
        (Math.PI * Math.cos(elapsedTime) * 0.002) * 300,
        (Math.PI * Math.cos(elapsedTime) * 0.002),
        0.5 * p * Math.sin((4 * p * Math.PI) / 180),
      )
      particle.material.opacity = Math.random() * 0.5
      particle.rotation.z = Math.random() * 360
      scene.add(particle)
    }
    renderer.render(scene, camera)
    animate()
  })
}

const clear = (obj) => {
  while (obj.children.length > 0) {
    clear(obj.children[0])
    obj.remove(obj.children[0])
  }

  if (obj.geometry)
    obj.geometry.dispose()
  if (obj.material)
    obj.material.dispose()
  if (obj.texture)
    obj.texture.dispose()
}

onMounted(() => {
  // Using <div id="container" ... ></div>, access to DOM HTMLElement with $el
  //   debugger
  //   container = this.refs.$el.children.namedItem('container')

  if (!container.value.contains(renderer.domElement)) {
    container.value.appendChild(renderer.domElement)

    camera.position.set(0, 0, 1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    sceneLight = new THREE.DirectionalLight(0xFF0000, 444440.5)
    sceneLight.position.set(0, 0, 100)
    sceneLight.lookAt(new THREE.Vector3(0, 0, 0))
    helper = new THREE.AxesHelper()
    scene.add(sceneLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.movementSpeed = 150
    controls.lookSpeed = 0.1
  }

  clear(scene)
  particleSetup()
})
</script>

<template>
  <div id="container" ref="container" />
</template>
