import add, {getData} from './module'
import aa from './asset/aa.jpg'
import bb from './asset/bb.png'
import cc from './asset/cc.txt'
import dd from './asset/dd.svg'
import './asset/style.less'
import './asset/base.less'

const result = add(1, 3)
console.log(result)

async function getDataAsync () {
  const res = await getData()
  console.log('getDataAsync', res)
}

getDataAsync()

const img = document.createElement('img')
img.src = aa
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = bb
document.body.appendChild(img2)

const block = document.createElement('div')
console.log('txt', cc)
block.textContent = cc
block.className = 'bg'
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.src = dd
document.body.appendChild(img3)