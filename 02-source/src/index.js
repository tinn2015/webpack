import add from './module'
import aa from './asset/aa.jpg'
import bb from './asset/bb.png'
import cc from './asset/cc.txt'
import dd from './asset/dd.svg'
const result = add(1, 3)
console.log(result)

const img = document.createElement('img')
img.src = aa
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = bb
document.body.appendChild(img2)

const block = document.createElement('div')
console.log('txt', cc)
block.textContent = cc
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.src = dd
document.body.appendChild(img3)