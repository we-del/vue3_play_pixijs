// 定义自定义元素标签,处理render报错
// 自定义元素和自定义组件配置项一致,帮助我们快速构建自定义元素(在和createRender自定义渲染一起使用时非常有用)
import containerEle from '@/runtime-canvas/customElement/containerEle'
import spriteEle from '@/runtime-canvas/customElement/spriteEle'
import { defineCustomElement } from 'vue'
export function registerCustomTagElement() {
  const container = defineCustomElement(containerEle)
  const sprite = defineCustomElement(spriteEle)

  customElements.define('pixi-container', container)
  customElements.define('pixi-sprite', sprite)
}
