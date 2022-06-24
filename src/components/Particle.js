// let particleArray = []
// const canvas = document.createElement('canvas')
// const ctx = canvas.getContext('2d')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

const mouse = {
  x: null,
  y: null,
  radius: 150,
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})
export default class Particle {
  constructor(x, y, z, ctx) {
    this.x = x
    this.y = y
    this.z = z
    this.ctx = ctx
    this.size = 3
    this.baseX = this.x
    this.baseY = this.y
    this.baseZ = this.z
    this.density = (Math.random() * 30) + 1
  }

  draw() {
    this.ctx.fillStyle = 'white'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  }

  update() {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx * dy * dy)
    if (distance < 300)
      this.size = 30
    else this.size = 3
  }
}

// function init() {
//   for (let i = 0; i < 1200; i++) {
//     const x = Math.random() * canvas.width
//     const y = Math.random() * canvas.height
//     particleArray.push(new Particle(x, y))
//   }
// }
// init()

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   for (let i = 0; i < particleArray.length; i++) {
//     particleArray[i].draw()
//     particleArray[i].update()
//   }
//   requestAnimationFrame(animate)
// }
