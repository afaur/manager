const { expect } = require('chai')
const { warmup, cooldown } = require('./manager')

const promiseTimeout = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
}

describe('cooldown', () => {
  it('executes cooldown after all promises resolve', (done) => {
    let amount = 5
    let iteration = 0
    const coolFn = cooldown(() => {
      return promiseTimeout().then(() => {
        amount--
      })
    }, () => {
      iteration++
      if (iteration === 1) {
        expect(amount).to.equal(0)
      } else {
        expect(amount).to.equal(-5)
        done()
      }
    })
    for (let i=0;i<5;i++) {
      coolFn()
    }
    setTimeout(() => {
      for (let i=0;i<5;i++) {
        coolFn()
      }
    }, 150)
  })
})

describe('warmup', () => {
  it('executes warmup before all promises resolve', (done) => {
    let amount = 5
    let iteration = 0
    const warmUp = warmup(() => {
      return promiseTimeout().then(() => {
        amount--
      })
    }, () => {
      iteration++
      if (iteration === 1) {
        expect(amount).to.equal(5)
      } else {
        expect(amount).to.equal(0)
        done()
      }
    })
    for (let i=0;i<5;i++) {
      warmUp()
    }
    setTimeout(() => {
      for (let i=0;i<5;i++) {
        warmUp()
      }
    }, 150)
  })
})


