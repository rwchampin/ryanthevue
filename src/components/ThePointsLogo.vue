<script setup>
import { onMounted } from 'vue'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

import * as THREE from 'three'
import GUI from 'lil-gui'
import Stats from 'stats.js'
import { useParallax } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import smoke from '~/assets/img/black-smoke.png'
import c from '~/assets/img/bk-smoke-s.png'
import logo from '~/assets/models/logo-seperated-loop-cut.glb?url'

const r = (min, max) => {
  if (min && max && arguments.length === 2)
    return THREE.MathUtils.randFloat(min, max)

  if (arguments.length === 1)
    return Math.random() * arguments[0]

  return Math.random()
}

let scene, camera
const particles = []

const gui = new GUI()
gui.open(0)
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

document.body.appendChild(stats.dom)

const clock = new THREE.Clock()
const axesHelper = new THREE.AxesHelper(500)
onMounted(() => {
  /* -------------------------------------------------------------------------- */
  /*                                  // scene                                  */
  /* -------------------------------------------------------------------------- */
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2('#20272F', 0.002)
  scene.receiveShadow = true
  scene.castShadow = true

  /* -------------------------------------------------------------------------- */
  /*                                  // camera                                 */
  /* -------------------------------------------------------------------------- */
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)

  const helper = new THREE.CameraHelper(camera)
  scene.add(camera)
  scene.add(helper)
  const camSection = gui.addFolder('CAMERA')
  camSection.add(camera.position, 'x')
  camSection.add(camera.position, 'y')
  camSection.add(camera.position, 'z')
  camSection.add(camera.rotation, 'x')
  camSection.add(camera.rotation, 'y')
  camSection.add(camera.rotation, 'z')
  camera.rotation.set(0, 50, 0)
  camera.lookAt(0, 5, 0)
  camera.position.set(0, 100, 400)

  // const box = new THREE.BoxGeometry(10, 10, 10)
  // const matty = new THREE.MeshBasicMaterial({ color: 'blue' })
  // const boxy = new THREE.Mesh(box, matty)
  // boxy.scale.set(5, 5, 5)
  // boxy.castShadow = true
  // boxy.receiveShadow = true
  // boxy.position.set(0, 50, 0)
  // scene.add(boxy)
  /* -------------------------------------------------------------------------- */
  /*                                 FLOOR                                 */
  /* -------------------------------------------------------------------------- */
  const floorGeometry = new THREE.PlaneBufferGeometry(1500, 1500)
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.position.set(0, 0, 0)
  floor.rotation.x = Math.PI * 1.5
  floor.receiveShadow = true
  floor.castShadow = true
  scene.add(floor)
  const floorSection = gui.addFolder('FLOOR')
  floorSection.add(floor.position, 'x')
  floorSection.add(floor.position, 'y')
  floorSection.add(floor.position, 'z')
  floorSection.add(floor.rotation, 'x')
  floorSection.add(floor.rotation, 'y')
  floorSection.add(floor.rotation, 'z')
  floorSection.add(floor.scale, 'x')
  floorSection.add(floor.scale, 'y')
  floorSection.add(floor.scale, 'z')

  /* -------------------------------------------------------------------------- */
  /*                                  BACKWALL                                  */
  /* -------------------------------------------------------------------------- */
  const backwallGeometry = new THREE.PlaneBufferGeometry(1000, 1000)
  const backwallMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide })
  const backwall = new THREE.Mesh(backwallGeometry, backwallMaterial)
  backwall.receiveShadow = true
  backwall.castShadow = true
  const backwallSection = gui.addFolder('BACKWALL')
  backwallSection.add(backwall.position, 'x')
  backwallSection.add(backwall.position, 'y')
  backwallSection.add(backwall.position, 'z')
  backwallSection.add(backwall.rotation, 'x')
  backwallSection.add(backwall.rotation, 'y')
  backwallSection.add(backwall.rotation, 'z')
  backwallSection.add(backwall.scale, 'x')
  backwallSection.add(backwall.scale, 'y')
  backwallSection.add(backwall.scale, 'z')

  backwall.rotation.set(0, 0, 0)
  backwall.position.set(0, 0, -20)
  scene.add(backwall)

  /* --------------------------------------------------------------------------
                                      LOGO MODEL
    -------------------------------------------------------------------------- */
  const buildModelLogo = (gltf) => {
    // const MAX_POINTS = 50000
    // const MAX_POINTS = 500

    // attributes
    // const geometry = new THREE.BufferGeometry({ size: 0.05, map: c })
    // const positions = new Float32Array(MAX_POINTS * 3) // 3 vertices per point
    // console.log(model)
    // geometry.setAttribute('position', new THREE.Float32BufferAttribute(model.scene, 3), true)
    //
    // draw range
    // const drawCount = 20000 // draw the first 2 points, only
    // geometry.setDrawRange(0, drawCount)

    // material
    // const material = new THREE.PointsMaterial({ size: 0.01, color: 0xFF0000 })
    // geometry.computeBoundingSphere()
    // s geometry.computeBoundingBox()

    // line
    // debugger

    // const points = new THREE.Points(geometry, material)
    scene.add(gltf.scene)
    // console.log(points.position)
    // for (let i = 0, l = MAX_POINTS; i < l; i++) {
    // positions[index++] = x
    // positions[index++] = y
    // positions[index++] = z

    // x += (Math.random() - 0.5) * 30
    // y += (Math.random() - 0.5) * 30
    // z += (Math.random() - 0.5) * 30
    // }

    // console.log(mesh, 'yup')
    // mode.scene.position.set(0, 0, 0)
    // debugger
    // line.geometry.computeBoundingBox()
    // line.geometry.computeBoundingSphere()
    // scene.position.set(0, 0, 0)
    // scene.scale.set(5, 5, 5)
    // scene.add(scene.children)
  }

  /* -------------------------------------------------------------------------- */
  /*                                POINTS MODEL                                */
  /* -------------------------------------------------------------------------- */
  const buildPointLogo = (gltf) => {
    // const uniforms = {

    // pointTexture: { value: new THREE.TextureLoader().load(c) },

    // }

    // const shaderMaterial = new THREE.ShaderMaterial({

    // uniforms,
    // vertexShader: document.getElementById('vertexshader').textContent,
    // fragmentShader: document.getElementById('fragmentshader').textContent,

    // blending: THREE.AdditiveBlending,
    // depthTest: false,
    // transparent: true,
    // vertexColors: true,

    // })

    const radius = 200

    const letters = gltf.scene.children[0].children

    const positions = []
    for (let x = 0; x < letters.length; x++) {
      if (letters[x].isMesh)
        positions.push(...letters[x].geometry.attributes.position.array)
    }
    for (let index = 0; y < positions.length; index + 3) {
      positions[index++] = x
      positions[index++] = y
      positions[index++] = z

      x += (Math.random() - 0.5) * 30
      y += (Math.random() - 0.5) * 30
      z += (Math.random() - 0.5) * 30
    }
    // console.log(positions)
    const material = new THREE.PointsMaterial({ size: 0.05, map: c, color: 'red' })
    material.needsUpdate = true
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.scale(500, 500, 500)
    geometry.center()

    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    const logo = new THREE.Points(geometry, material)
    logo.scale.set(50, 50, 50)
    const measure = new THREE.Vector3()
    // const box = logo.getSize('measure', measure)
    // console.log(box)
    logo.scale.set(5, 5, 5)
    logo.position.set(0, 0, 0)
    scene.add(logo)
    // logo.geometry.attributes.position.needsUpdate = true
    // return { mergedGeos, logo }
  }
  /* -------------------------------------------------------------------------- */
  /*                             SPHERE POINTS MODEL                            */
  /* -------------------------------------------------------------------------- */
  const buildSpherePointsLogo = (mergedGeos) => {
    const particles = 500000

    const geometry = new THREE.BufferGeometry()

    const positions = []
    const colors = []

    const color = new THREE.Color()

    const n = 1000; const n2 = n / 2 // particles spread in the cube

    for (let i = 0; i < particles; i++) {
      // positions

      const x = Math.random() * n - n2
      const y = Math.random() * n - n2
      const z = Math.random() * n - n2

      positions.push(x, y, z)

      // colors

      const vx = (x / n) + 0.5
      const vy = (y / n) + 0.5
      const vz = (z / n) + 0.5

      color.setRGB(vx, vy, vz)

      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    geometry.computeBoundingSphere()

    //

    const material = new THREE.PointsMaterial({ size: 15, vertexColors: true })

    points = new THREE.Points(geometry, material)
    scene.add(points)
  }
  /* ----------------------------- LOADERS ---------------------------- */
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

  const gltfLoader = new GLTFLoader()
  gltfLoader.load(logo, (gltf) => {
    // console.log('GLTF', gltf)
    // buildModelLogo(gltf)
    buildPointLogo(gltf)

    // console.log(letters)
    // for (let i = 0; i < letters.length; i++) {
    // const letter = letters[i]
    // if (letter.isMesh) {
    // const { geometry } = letter
    // console.log(geometry)

    // const material = new THREE.PointsMaterial({ size: 0.005, color: 0x888888 })

    // const points = new THREE.Points(geometry, material)
    // points.position.set(0, 100, 0)
    // letter.scale.set(100, 100, 100)
    // scene.add(points)
    // }
  })
  // const { geometry } = word
  // const material = new THREE.PointsMaterial({ size: 0.005, color: 'blue' })

  // const points = new THREE.Points(geometry, material)

  // scene.add(points)
  // for (const letter of word) {

  // if (letter.isMesh) {
  // for (let i = 0; i < letter.children.length; i++) {
  // if (letter.isMesh) {
  // debugger
  // console.log('gemetry', child.geometry.attributes.position.array)
  // child.position.set(Math.random() * 3000, 0, 700)
  // child.rotation.set(50, -70, -100)
  // child.receiveShadow = true
  // child.castShadow = true

  // unmergedPositions.push(child.geometry.attributes.position)
  //
  // unmergedGeometry.push(child.geometry)
  // }
  // }
  // }
  // }
  //  /console.log('exploded', explodedPoints.length, explodedPoints)
  //  /console.log('umerged', unmergedGeometry)

  // const mergedGeometries = BufferGeometryUtils.mergeBufferGeometries(unmergedGeometry)
  // const mergedPositions = BufferGeometryUtils.mergeBufferAttributes(unmergedPositions)

  const sceneGroup = gui.addFolder('LOGO GROUP')
  sceneGroup.add(scene.position, 'x')
  sceneGroup.add(scene.position, 'y')
  sceneGroup.add(scene.position, 'z')
  sceneGroup.add(scene.rotation, 'x')
  sceneGroup.add(scene.rotation, 'y')
  sceneGroup.add(scene.rotation, 'z')
  sceneGroup.add(scene.scale, 'x')
  sceneGroup.add(scene.scale, 'y')
  sceneGroup.add(scene.scale, 'z')
  /* -------------------------------------------------------------------------- */
  /*                                  spotlight                                 */
  /* -------------------------------------------------------------------------- */
  const spotLight = new THREE.SpotLight('#ff0000')

  spotLight.position.set(0, 50, 0)

  spotLight.castShadow = true

  spotLight.shadow.mapSize.width = 40
  spotLight.shadow.mapSize.height = 40

  spotLight.shadow.camera.near = 0
  spotLight.shadow.camera.far = 500
  spotLight.shadow.camera.fov = 200

  // scene.add(spotLight)

  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLightHelper)
  /* --------------------------------------------------------------------------
                                 HEMISPHERE LIGHT
    -------------------------------------------------------------------------- */
  const hemiLight = new THREE.HemisphereLight('black', 'black', 50)
  // hemiLight.groundColor.setHSL(0.095, 100, 0.75)
  hemiLight.position.set(0, 320, 0)
  scene.add(hemiLight)
  // hemiLight.castShadow = true
  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 100)
  // scene.add(hemiLightHelper)
  // scene.add(hemiLight)
  const hemiLightSection = gui.addFolder('HEMISPHERE LIGHT')
  hemiLightSection.add(hemiLightHelper.position, 'x')
  hemiLightSection.add(hemiLightHelper.position, 'y')
  hemiLightSection.add(hemiLightHelper.position, 'z')
  hemiLightSection.add(hemiLightHelper.rotation, 'x')
  hemiLightSection.add(hemiLightHelper.rotation, 'y')
  hemiLightSection.add(hemiLightHelper.rotation, 'z')

  /*
    --------------------------------------------------------------------------
  //                               Directional LIGHT
    --------------------------------------------------------------------------
    */
  const dirLight = new THREE.DirectionalLight('black', 100)
  // dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(0, 0, 8)

  dirLight.castShadow = true

  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048

  const d = 500

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d

  dirLight.shadow.camera.far = 3500
  dirLight.shadow.bias = -0.0001

  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 1000)
  scene.add(dirLightHelper)

  const dirLightHelperSection = gui.addFolder('DIRECTION LIGHT')
  dirLightHelperSection.add(dirLightHelper.position, 'x')
  dirLightHelperSection.add(dirLightHelper.position, 'y')
  dirLightHelperSection.add(dirLightHelper.position, 'z')
  dirLightHelperSection.add(dirLightHelper.rotation, 'x')
  dirLightHelperSection.add(dirLightHelper.rotation, 'y')
  dirLightHelperSection.add(dirLightHelper.rotation, 'z')

  /*
    --------------------------------------------------------------------------
                                RENDERER
    --------------------------------------------------------------------------
    */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap
  document.body.appendChild(renderer.domElement)

  // -------------------------------------------------------------------------
  //  CONTROLS
  // --------------------------------------------------------------------------

  const orbitControls = new OrbitControls(camera, renderer.domElement)
  orbitControls.movementSpeed = 150
  orbitControls.damping = 50
  orbitControls.lookSpeed = 0.01
  orbitControls.target.set(0, 0, 0)
  // orbitControls.addEventListener('drag', (e) => {
  //   debugger
  // })
  scene.add(axesHelper)

  /*
   ------------------------------------------------------------------------
                               ANIMATE
   -------------------------------------------------------------------------
   */
  // const box = new THREE.Box3()
  const animate = () => {
    const elapsedTime = clock.getElapsedTime() * 0.5
    stats.begin()
    // camera.update()
    camera.updateProjectionMatrix()
    // helper.update()
    // box.copy(particleMesh.geometry.boundingBox).applyMatrix4(particleMesh.matrixWorld)
    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<template>
  <div />
</template>
