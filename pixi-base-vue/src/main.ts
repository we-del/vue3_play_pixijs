import { createRenderer } from 'vue'
// import { createPinia } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import App from './App.vue'

function randNum(range: number, base?: number = 0, requireInteger?: boolean = true) {
  if (requireInteger) {
    return Math.floor(Math.random() * range) + base
  } else {
    return Math.random() * range + base
  }
}
function randColor() {
  const color = '0x'

  // return
}

const scene = new Application({
  width: 500,
  height: 500
})
console.log('scene', scene)
document.querySelector('#app').append(scene.view)

const cachePreVNode = scene.view
/**
@description 标签解析生命周期调用(递归调用解析)  创建元素(深度递归开始点) -> 解析属性(递归返回点) -> 挂载元素
*/
// 开启自定义渲染模式，此模式下渲染的所有标签都需要自己处理关系 ，(在未开启自定义渲染时)默如情况下标签按dom处理
// 模板解析流程：底层会递归的解析，给每个标签调用以下钩子函数进行渲染
const renderer = createRenderer({
  // 解析标签的标签名,绑定对于的实体映射，然后交给其他钩子函数处理
  createElement(type) {
    let el
    console.log('el', type)
    if (type === 'rect') {
      el = new Graphics()
      el.beginFill(randNum(100000, 10000))
      el.drawRect(0, 0, randNum(100), randNum(100))
      el.endFill()
    } else if (type === 'circle') {
      el = new Graphics()
      el.beginFill(0xf00110)
      el.drawCircle(0, 0, 10, 10)
      el.endFill()
    }

    return el
  },

  // 将该结点元素插入到父结点上
  insert(el, parent) {
    // 过滤掉注释渲染
    if (!el) return
    console.log('insert', el, parent)
    if (!parent) cachePreVNode.addChild(el)
    else parent.addChild(el)
  },
  // 处理标签的属性
  patchProp(el, key, preValue, nextValue) {
    console.log('el,key,preValue,nextValue', el, key, preValue, nextValue)
    el[key] = nextValue
  },
  // 设置标签的文本内容该
  setElementText(node, text) {
    console.log('node,text', node, text)
    node.append(document.createTextNode(text))
  },
  // 解析注释，在编写注释后必须重写该函数,重写后无需返回内容，且在insert()方法中要过滤掉undefined
  createComment(text) {
    // console.log('comment', text)
    // return text
  },
  // 创建文本
  createText(text) {
    console.log('text', text)
    return text
  }
})
renderer.createApp(App).mount(scene.stage)
