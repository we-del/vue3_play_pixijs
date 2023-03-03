<script setup lang="ts">
import Circle from '@/components/Circle.vue'
import { reactive, ref } from 'vue'
const count = ref<number>(0)
const obj = reactive({
  n: 1,
  deep: {
    d: 3
  }
})
</script>

<template>
  <rect x="100"
        y="100">
    <!-- 注释 -->
    <rect y="200"
          x="200">
      <!-- 我可以编写注释了 -->
      <Circle />
    </rect>
  </rect>
</template>

<style scoped>
</style>
