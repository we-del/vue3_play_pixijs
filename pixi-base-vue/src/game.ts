import { SCENE_SCREEN } from '@/config'
import { Application } from 'pixi.js'
export const scene = new Application(SCENE_SCREEN)
document.body.append(scene.view)

export function getRootContainer() {
  return scene.stage
}
