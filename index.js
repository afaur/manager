const { warmup, cooldown } = require('./manager')

function range(start, end) {
  return Math.floor(Math.random() * end) + start
}

const warmupExampleFn = warmup(() => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, range(1000, 5000))
  })
}, () => {
  console.log('warming up...')
})

const cooldownExampleFn = cooldown(() => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, range(1000, 5000))
  })
}, () => {
  console.log('cooling down...')
})

function main () {
  let amount = range(3, 6)
  for (let i=0;i<amount;i++) {
    cooldownExampleFn()
    warmupExampleFn()
  }
}

main() // install plugins
setTimeout(main, 8000) // update plugins
