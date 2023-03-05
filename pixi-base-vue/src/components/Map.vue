<script setup lang="ts">
import gameBgImg from '@/assets/fly/Images/background.png'
import gamePauseImg from '@/assets/fly/Images/game_pause_nor.png'
import gameResumeImg from '@/assets/fly/Images/game_resume_nor.png'
import { CHALLENGE, SCENE_SCREEN, type Challenge } from '@/config'
import { scene } from '@/game'
import { inject, reactive, ref, unref, watchEffect } from 'vue'
// import {Ticker} from 'pixi.js'

const gameState = inject('gameState')
const changeGameStateService = inject('changeGameStateService')

let grade = ref<number>(0)

function mapScroll() {
  console.log('scrolling')

  // 暂时有5级难度
  let challengeDeep = getGameChallengeDeep()

  // debugger
  bgSCroll.first.y += challengeDeep.speed
  bgSCroll.second.y += challengeDeep.speed

  // 越界重新滚动计算
  borderHandler()
}

function getGameChallengeDeep(): Challenge {
  let val = unref(grade)

  if (val <= 10) return CHALLENGE['1']
  else if (val <= 20) return CHALLENGE['2']
  else if (val <= 35) return CHALLENGE['3']
  else if (val <= 50) return CHALLENGE['4']
  else return CHALLENGE['5']
}

function borderHandler() {
  if (bgSCroll.first.y >= SCENE_SCREEN.height) {
    bgSCroll.first.y = -SCENE_SCREEN.height
  } else if (bgSCroll.second.y >= SCENE_SCREEN.height) {
    bgSCroll.second.y = -SCENE_SCREEN.height
  }
}

// 按扭固定位置(无需响应收集，只存在初始化渲染数据时，无需包装为响应数据)
let opeBtnPos = {
  x: 330,
  y: 20
}

let bgSCroll = reactive({
  first: {
    y: -SCENE_SCREEN.height,
    x: 0
  },
  second: {
    x: 0,
    y: 0
  }
})

// 修正：0（暂停(运行状态)） 1（起动(暂停状态)）   预期： 0(正在游戏) 1(正在游戏(被按下的状态)) 2(暂停游戏) 3(暂停游戏(被按下的状态))
let opeBtnState = ref(0)

watchEffect(() => {
  const state = gameState.value
  console.log('gaameState', state)
  console.log('gameState', gameState)
  // 游戏开始页面滚动
  if (state === 0) {
    scene.ticker.add(mapScroll)
    opeBtnState.value = 0
  } else {
    // 游戏终止,停止滚动
    scene.ticker.remove(mapScroll)
    opeBtnState.value = 1
  }

  // 有更多需求在于补充
  // else if(state === 1){
  //   // 游戏终止停止滚动

  // }else if(state === 2){
  //   // 游戏暂停保留坐标
  // }
})

function changeGameState(state) {
  opeBtnState.value = state
  switch (state) {
    case 0:
      // 游戏进行中
      changeGameStateService()

      break

    case 1:
      // 游戏暂停中
      changeGameStateService(2)

      break

    default:
      break
  }
  console.log('change', state)
}
</script>
 
<template>
  <pixi-container>
    <pixi-sprite :texture="gameBgImg"
                 :y="bgSCroll.first.y" />
    <pixi-sprite :texture="gameBgImg"
                 :y="bgSCroll.second.y" />
    <pixi-sprite :texture="gamePauseImg"
                 v-if="opeBtnState === 0"
                 @click="changeGameState(1)"
                 :x="opeBtnPos.x"
                 self="pause"
                 :y="opeBtnPos.y" />
    <!-- <pixi-sprite :texture="gamePausePressedImg"
            v-if="opeBtnState === 1"
            :x="opeBtnPos.x"
            :y="opeBtnPos.y" /> -->
    <pixi-sprite :texture="gameResumeImg"
                 @click="changeGameState(0)"
                 :x="opeBtnPos.x"
                 v-if="opeBtnState === 1"
                 self="resume"
                 :y="opeBtnPos.y" />
    <!-- <pixi-sprite :texture="gameResumePressedImg"
            :x="opeBtnPos.x"
            v-if="opeBtnState === 3"
            :y="opeBtnPos.y" /> -->
  </pixi-container>
</template>
 
<style lang="scss" scoped>
</style>