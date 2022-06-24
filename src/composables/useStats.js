import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import GUI from 'lil-gui'
import Stats from 'stats.js'

/* -------------------------------------------------------------------------- */
/*                                    useStats                                   */
/* -------------------------------------------------------------------------- */
export const useStats = (arrayOfStatIds) => {
  const stats = ref(new Stats())
  debugger
  // for(let i = 0; i < ) {
  //
  // }

  document.body.appendChild(stats.value.dom)

  return stats
}

// document.body.appendChild(stats.value.dom)

