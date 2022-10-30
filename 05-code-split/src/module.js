const add = (a, b) => a + b
export default add

export function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world')
    }, 1000)
  })
}
