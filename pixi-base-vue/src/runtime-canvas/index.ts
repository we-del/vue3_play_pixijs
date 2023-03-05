import { Container, Graphics, Sprite, Texture } from 'pixi.js'
import { createRenderer } from 'vue'
function randNum(range: number, base?: number = 0, requireInteger?: boolean = true) {
  if (requireInteger) {
    return Math.floor(Math.random() * range) + base
  } else {
    return Math.random() * range + base
  }
}

// 缓存上一个操作结点，避免出现null值
const cacheNode = null
/**
@description 标签解析生命周期调用(递归调用解析)  创建元素(深度递归开始点) -> 解析属性(递归返回点) -> 挂载元素
*/
// 开启自定义渲染模式，此模式下渲染的所有标签都需要自己处理关系 ，(在未开启自定义渲染时)默如情况下标签按dom处理
// 模板解析流程：底层会递归的解析，给每个标签调用以下钩子函数进行渲染
const renderer = createRenderer({
  // 解析标签的标签名,绑定对于的实体映射，然后交给其他钩子函数处理
  createElement(type) {
    let el
    // console.log('el', type)
    if (type === 'pixi-rect') {
      el = new Graphics()
      el.beginFill(randNum(100000, 10000))
      el.drawRect(0, 0, randNum(100), randNum(100))
      el.endFill()
    } else if (type === 'circle') {
      el = new Graphics()

      el.beginFill(0xf00110)
      el.drawCircle(0, 0, 10, 10)
      el.endFill()
    } else if (type === 'pixi-container') {
      el = new Container()
    } else if (type === 'pixi-sprite') {
      el = new Sprite()
    }
    // console.log('el', el)
    return el
  },
  // 在改变组件状态时，调用的render接口，需要返回他的父元素
  parentNode(node) {
    // console.log('parentNode', node)
    // 重新建立关联关系(引用会在containerd.children中保存)， 避免因为元素的反复挂载导致元素引用丢失
    if (node instanceof Container) {
      node.children.forEach((s) => (s.parent = node))
    }
    return node.parent
  },
  // 在够改变组件状态时，调用的render接口，无需处理
  nextSibling() {},
  // 页面切换(diff更新页面元素,页面关联可能丢失，需要重新挂载)
  remove(el) {
    // 第二个元素没有构建正确的父级
    // console.log('remove', el)
    // console.log('remove-parennt', el && el.parent)
    if (el && el.parent) {
      // console.log('el.parent', el.parent)
      const cache = el.parent
      // 从canvas中移除元素
      el.parent.removeChild(el)
      // 关联丢失，需重新绑定
      el.parent = cache
    }
  },
  // 将该结点元素插入到父结点上
  insert(el, parent) {
    // 过滤掉注释渲染
    if (!el) return
    // console.log('insert', el, parent)
    // if (!parent) el.__parent.addChild(el)
    // else
    parent.addChild(el)
  },
  // 处理标签的属性
  patchProp(el, key, preValue, nextValue) {
    // console.log('el,key,nextValue', el, key, nextValue)
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue)

        break
      case 'onClick':
        // el.on('pointertap', nextValue)
        // pixijs事件绑定时，其 interactive属性一定需要为true,否则事件无法绑定成功
        el.on('click', nextValue)
        el.interactive = true
        // el[key.toLowerCase()] = nextValue
        break
      default:
        el[key] = nextValue
        break
    }
    // console.log('el,key,preValue,nextValue', el, key, preValue, nextValue)
    // el[key] = nextValue
  },
  // 设置标签的文本内容该
  setElementText(node, text) {
    // console.log('node,text', node, text)
    node.append(document.createTextNode(text))
  },
  // 解析注释，在编写注释后必须重写该函数,重写后无需返回内容，且在insert()方法中要过滤掉undefined
  createComment(text) {
    // console.log('comment', text)
    // return text
  },
  // 创建文本
  createText(text) {
    // console.log('text', text)
    return text
  }
})
export default function createApp(rootContainer) {
  return renderer.createApp(rootContainer)
}
