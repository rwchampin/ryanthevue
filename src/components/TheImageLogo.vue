/* eslint-disable vue/no-parsing-error */
<script setup>
// import fs from 'file-system'
import { ref } from 'vue'
// import { useResizeObserver } from '@vueuse/core'
import * as THREE from 'three'
import logo from '~/assets/img/logo.png'
import mask from '~/assets/img/c.png'
const canvasRef = ref(null)
const logoRef = ref(null)

const setSize = () => {
  canvasRef.value.height = window.innerHeight
  canvasRef.value.width = window.innerWidth
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = Math.random() * 255
  const a = Math.random()
  document.body.style.background = `rgba(${r},${g},${b},${a})`
}
window.addEventListener('load', setSize)

onMounted(() => {
  setSize()

  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  // use the image, e.g. draw part of it on a canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  logoRef.value.style.height = 'auto'
  logoRef.value.style.width = 400
  logoRef.value.src = logo
  // context.drawImage(image1, 0, 0, canvas.width, canvas.height)

  // const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height)
  // const scannedData = scannedImage.data
  // for (let i = 0; i < scannedData.length; i += 4) {
  //   const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2]
  //   const averageColorValue = total / 3
  //   scannedData[i] = scannedData[i + 1] = scannedData[i + 2] = averageColorValue
  // }
  // scannedImagedata = scannedData
  // context.putImageData(scannedImage, 0, 0)
})
</script>

<template>
  <div style="height: 100%">
    <img id="logo" ref="logoRef">
    <canvas
      ref="canvasRef"
    />
  </div>
</template>

