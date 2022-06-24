<script setup>
// import Sketch from '~/components/sketch'
// import SmokeScene from '~/components/three/SmokeScene.js'
// import TheLogo from '~/components/TheLogo.vue'
// import TheImageLogo from '~/components/TheImageLogo.vue'
// import Sketch from '~/components/sketch/index.js'
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
// const w = new SmokeScene()
// const t = new Sketch();
// const e = new useStats()
const { t } = useI18n()
</script>

<template>
  <!-- <TheImageLogo /> -->
  <ThePointsLogo />
  <!-- <TheLogo /> -->
  <!-- <SmokeScene /> -->
  <!-- <TheVortex /> -->
</template>

<route lang="yaml">
meta:
  layout: home
</route>
