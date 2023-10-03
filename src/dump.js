const originalConsoleLog = console.log

console = new Proxy(console, {
  get(target, prop) {
    return (...args) => {
      // originalConsoleLog(...args)
      fetch('https://consoledump.io/0va6lo3i', {
        method: 'POST',
        body: JSON.stringify([args]),
      })
    }
  },
})

console.dump = (...args) => {
  originalConsoleLog(...args)
  fetch('https://consoledump.io/0va6lo3i', {
    method: 'POST',
    body: JSON.stringify([args]),
  })
}

console.log = console.dump
console.error = console.dump
console.info = console.dump
console.warn = console.dump
