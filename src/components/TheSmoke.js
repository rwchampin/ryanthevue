/* eslint-disable no-console */
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
 
import { Pane } from 'tweakpane'
import gsap from 'gsap'
import logoDimensions from '~/components/TheLogo.vue'
import SmokeScene from '~/components/three/SmokeScene.js'
import s from '~/assets/img/e.png'

class TheSmoke   {
  constructor(props) {
    super()
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.explode = this.explode.bind(this)
    this.draw = this.draw.bind(this)
  }
}
 

onMounted(() => {
  const smoke = new SmokeScene()
  // console.log(logoDimensions)
  smoke.update()
})
</script>

<template>
  <section :style="layer0">
    <div id="container" ref="container" :style="layer1" />
    <div :style="layer2">
      <TheLogo />
    </div>
  </section>
</template>
