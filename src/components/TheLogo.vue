<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import matcap from '/static/matcaps/blk3-matcap.png?url'
import matcap from '~/assets/img/smoke-matcap.png'
import theFont from '~/components/Sarah_Script_Regular.typeface.json?url'
let scene, camera, helper
const mesh = new THREE.Group()

onMounted(() => {
  // scene

  const clock = new THREE.Clock()
  scene = new THREE.Scene()
  scene.receiveShadow = true
  scene.castShadow = true
  scene.fog = new THREE.FogExp2(0x000000, 0.105)

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
  // camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.set(0, 0, 2)
  camera.rotation.set(0, 0, 33)
  const cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)

  const hemiLight = new THREE.HemisphereLight(0x000000, 0xFFFFFF, 0.6)
  // hemiLight.color.setHSL(0.6, 1, 0.6)
  hemiLight.groundColor.setHSL(0.095, 1, 0.75)
  hemiLight.position.set(0, 100, 0)
  scene.add(hemiLight)

  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10)
  scene.add(hemiLightHelper)

  const dirLight = new THREE.DirectionalLight(0x03A9FC, 1)
  // dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-1, 1.75, 1)
  dirLight.position.multiplyScalar(30)
  scene.add(dirLight)

  dirLight.castShadow = true

  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048

  const d = 50

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d

  dirLight.shadow.camera.far = 3500
  dirLight.shadow.bias = -0.0001

  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10)
  scene.add(dirLightHelper)

  const fontLoader = new FontLoader()
  fontLoader.load(theFont, (font) => {
    // console.log(font)
    const ryanConfig = {
      font,
      size: 1,
      height: 0.08,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
    const theConfig = {
      font,
      size: 0.4,
      height: 0.08,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
    const developerConfig = {
      font,
      size: 0.8,
      height: 0.08,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
    const ryanGeometry = new TextGeometry('Ryan', ryanConfig)
    const theGeometry = new TextGeometry('the', theConfig)
    const developerGeometry = new TextGeometry('Developer', developerConfig)

    ryanGeometry.center()
    theGeometry.center()
    developerGeometry.center()

    // ryanGeometry.computeBoundingBox()
    // theGeometry.computeBoundingBox()
    // developerGeometry.computeBoundingBox()

    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load(matcap)

    // const textMaterial = new THREE.MeshPhongMaterial()
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    // material.wireframe = true
    const ryanText = new THREE.Mesh(ryanGeometry, material)
    const theText = new THREE.Mesh(theGeometry, material)
    const developerText = new THREE.Mesh(developerGeometry, material)

    ryanText.position.set(0, 0, 0)
    theText.position.set(0.14, -0.4, 0)
    developerText.position.set(0.09, -0.9, 0)

    // ryanText.rotation.x = -270
    // theText.rotation.x = -270
    // developerText.rotation.x = -270

    scene.add(ryanText)
    scene.add(theText)
    scene.add(developerText)
    ryanText.traverse((child) => {
      // if (child.isMesh)
      // gsap.to(child[0].position, { z: 2, duation: 3 })
    })
    const donuts = []
    const donutGeometry = new THREE.TorusBufferGeometry(1, 0.04, 16, 100, 6.2)
    for (let i = 0; i < 1000; i++) {
      const donut = new THREE.Mesh(donutGeometry, material)
      donut.position.x = THREE.MathUtils.randInt(-10, 10)
      donut.position.y = THREE.MathUtils.randInt(-10, 10)
      donut.position.z = camera.position.z + 100
      const s = THREE.MathUtils.randFloat(0.001, 1.00)
      donut.scale.set(s, s, s)
      // donut.rotation.set(Math.random() * (Math.PI * 2), Math.random() * (Math.PI * 2), Math.random() * (Math.PI * 2))
      donuts.push(donut)
      scene.add(donut)
    }
    const elapsedTime = clock.getElapsedTime()
    for (let i = 0; i < donuts.length; i++) {
      gsap.to(donuts[i].position, { z: THREE.MathUtils.randInt(camera.position.z - 1, camera.position.z - 100), duration: (Math.random() * 5) * elapsedTime, delay: Math.random() * 5 * elapsedTime, ease: 'expo' })
      gsap.to(donuts[i], { rotationX: `${Math.round(Math.random() * (Math.PI * 2))}deg`, rotationY: `${Math.round(Math.random() * (Math.PI * 2))}deg`, rotationZ: `${Math.round(Math.random() * (Math.PI * 2))}deg`, duration: (Math.random() * 5) * elapsedTime })
    }
    gsap.to(camera.position, { z: 2, duration: 1, ease: 'expo', delay: 0.5 })
  })

  // const loader = new GLTFLoader()
  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  // const dracoLoader = new DRACOLoader()
  // dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  // loader.setDRACOLoader(dracoLoader)
  // loader.load(logoModel, (gltf) => {
  //   mesh.add(gltf.scene.children[0])
  //   mesh.receiveShadow = true
  //   mesh.castShadow = true
  //   mesh.position.set(0, 0, -100)
  //   mesh.scale.set(0.4, 0.4, 0.4)
  //   scene.add(mesh)
  // })

  // INIT RENDERER THAT ACTUALLY
  // DOES THE WRITING OF THE FRAMES
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.shadowMapType = THREE.PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.domElement.style = { ...props.parallax }
  renderer.domElement.setAttribute('id', 'logo')
  document.body.appendChild(renderer.domElement)

  // const logoElement = document.getElementById('logo')
  // const logoMeasurements = logoElement.getBoundingClientRect()
  // const logo = {
  //   x: logoMeasurements.left,
  //   y: logoMeasurements.top,
  //   height: logoMeasurements.offsetHeight,
  //   width: logoMeasurements.offsetW,
  // }
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.movementSpeed = 5
  controls.damping = 50
  controls.lookSpeed = 0.9
  // scene.add(controls)

  const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    // mesh.position.x = Math.sin(elapsedTime * Math.PI * 2) * 50
    // mesh.position.y = Math.cos(elapsedTime * Math.PI * 2) * 50

    controls.update()
    camera.updateProjectionMatrix()
    cameraHelper.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()

  // return { logoMeasurements }
})
</script>

<template>
  <div ref="logoRef" />
</template>

