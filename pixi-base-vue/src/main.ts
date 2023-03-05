// import { createPinia } from 'pinia'
import { registerCustomTagElement } from '@/runtime-canvas/customElement'
import App from './App.vue'
import { getRootContainer } from './game'
import createApp from './runtime-canvas'
const app = createApp(App)

// 排除自定义组件警告
app.config.compilerOptions.isCustomElement = (tag) => {
  console.log('tag', tag)
  return true
}
// 注册自定义元素
registerCustomTagElement()
app.mount(getRootContainer())
