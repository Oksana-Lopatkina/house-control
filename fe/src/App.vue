<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue';
import AppHeader from './components/layout/AppHeader.vue'

/** Composables */
const router = useRouter();

const pageName = computed(() => router.currentRoute.value.name);
</script>

<template>
  <div class="app" :class="pageName">
    <AppHeader class="app__header"/>

    <RouterView class="app__content"/>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 1rem;

  &.home::before {
    content: '';
    position: absolute;
    left: 0;
    z-index: -1;
    height: 100vh;
    width: 100%;
    background: no-repeat url('@/assets/bg.jpg') center / cover;
    filter: blur(2px) opacity(0.5);
  }

  &__content {
    padding-top: 32px;
  }
}
</style>
