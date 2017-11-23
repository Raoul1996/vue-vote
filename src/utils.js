export function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
    console.log(`sleep ${ms / 1000}s`)
  })
}

export function goto (that, path) {
  that.$router.push(path)
}

export async function lazyGoto (that, path, ms = 1000) {
  await sleep(ms)
  that.$router.push(path)
}
