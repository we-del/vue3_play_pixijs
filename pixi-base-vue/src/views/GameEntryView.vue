<script setup lang="ts">
import startImg from '@/assets/fly/Images/game_again.png'
import continueImg from '@/assets/fly/Images/game_continue.png'
import gameOverImg from '@/assets/fly/Images/game_over.png'
import Map from '@/components/Map.vue'
import { provide, ref } from 'vue'

// 控制图片显示  游戏状态 0 为正在游戏 1为准备(重新)开始  2 为暂停 ， 3为游戏结束
const gameState = ref<number>(1)
const changeGameStateService = (state = 0) => (gameState.value = state)
provide('gameState', gameState)
provide('changeGameStateService', changeGameStateService)

const imgPos = {
  x: 40,
  y: 700
}
</script>
<template>
  <pixi-container>
    <Map></Map>
    <!-- pixijs环境中，只有添加了 interactive属性后绑定的时间才能够触发 -->
    <pixi-sprite v-if="gameState===1"
                 @click="changeGameStateService()"
                 :x="imgPos.x"
                 :interactive="true"
                 :y="imgPos.y"
                 :texture="startImg"></pixi-sprite>
    <pixi-sprite v-if="gameState===2"
                 @click="changeGameStateService()"
                 :x="imgPos.x"
                 :interactive="true"
                 :y="imgPos.y"
                 :texture="continueImg"></pixi-sprite>
    <pixi-sprite v-if="gameState===3"
                 :x="imgPos.x"
                 :interactive="true"
                 @click="changeGameStateService()"
                 :y="imgPos.y"
                 :texture="gameOverImg"></pixi-sprite>
  </pixi-container>
</template>
<style lang="scss" scoped>
</style>