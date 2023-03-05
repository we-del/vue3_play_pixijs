<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ x: number; y: number; planeImg: string }>()
</script>
<template>
  <pixi-container>
    <pixi-sprite :texture="planeImg"
                 :x="x"
                 :y="y" />

  </pixi-container>
</template>